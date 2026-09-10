import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GalleryImage } from '../types';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const { pauseScroll, resumeScroll, isReducedMotion } = useSmoothScroll();
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const activeImgRef = useRef<HTMLImageElement>(null);

  // Mobile touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  // Handle Pause / Resume Scroll in Lenis + hide site header
  useEffect(() => {
    if (isOpen) {
      pauseScroll();
      document.body.classList.add('lightbox-open');
    } else {
      resumeScroll();
      document.body.classList.remove('lightbox-open');
    }
    return () => {
      resumeScroll();
      document.body.classList.remove('lightbox-open');
    };
  }, [isOpen, pauseScroll, resumeScroll]);

  // Entrance GSAP Animation
  useEffect(() => {
    if (!isOpen) return;

    setImageLoaded(false);

    if (isReducedMotion) {
      if (backdropRef.current) backdropRef.current.style.opacity = '1';
      if (imageWrapperRef.current) {
        imageWrapperRef.current.style.opacity = '1';
        imageWrapperRef.current.style.transform = 'none';
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Lightbox opacity: 0 -> 1
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );

      // Image container scale: 0.96 -> 1, opacity: 0 -> 1
      gsap.fromTo(
        imageWrapperRef.current,
        { scale: 0.96, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen, isReducedMotion]);

  // Image change animation
  useEffect(() => {
    if (!isOpen || isReducedMotion || !activeImgRef.current) return;

    gsap.fromTo(
      activeImgRef.current,
      { opacity: 0.4, scale: 0.98 },
      { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
  }, [currentIndex, isOpen, isReducedMotion]);

  // Close handler with smooth GSAP exit
  const handleClose = useCallback(() => {
    if (isReducedMotion) {
      onClose();
      return;
    }

    gsap.to(imageWrapperRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: onClose,
    });
  }, [isReducedMotion, onClose]);

  // Prev / Next actions
  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handlePrev, handleNext]);

  // Touch swipe events
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Keep reference
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only handle horizontal swipes that dominate vertical ones
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || !currentImage) return null;

  const counterString = `${String((currentIndex ?? 0) + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`;

  return (
    <div
      ref={containerRef}
      id="photo-lightbox"
      className="fixed inset-0 z-[60] flex items-center justify-center select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo Gallery Lightbox: ${currentImage.title}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dark Neutral Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        className="absolute inset-0 bg-[#070809]/95 backdrop-blur-xl transition-opacity duration-300 cursor-zoom-out"
      />

      {/* Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-4 sm:p-6 text-[#f2ede4] pointer-events-none">
        {/* Left: Counter and Category */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <span className="font-mono text-xs tracking-widest text-[#c5a059] bg-[#14161a] border border-[#23262d] px-3 py-1.5 rounded-full">
            {counterString}
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#9b9ca1]">
            {currentImage.category}
          </span>
        </div>

        {/* Right: Close Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            id="lightbox-close-btn"
            onClick={handleClose}
            aria-label="Close Lightbox (ESC)"
            className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-[#c5a059] border border-[#c5a059] text-[#0c0d0e] hover:bg-[#e4caa0] transition-colors duration-200 font-medium text-xs uppercase tracking-[0.16em]"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Previous Button (Left) */}
      <button
        id="lightbox-prev-btn"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        aria-label="Previous Image (Left Arrow)"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#14161a]/90 border border-[#252830] text-[#f2ede4] hover:bg-[#c5a059] hover:text-[#0c0d0e] flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-105"
      >
        <ChevronLeft className="w-6 h-6 -translate-x-0.5" />
      </button>

      {/* Next Button (Right) */}
      <button
        id="lightbox-next-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        aria-label="Next Image (Right Arrow)"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#14161a]/90 border border-[#252830] text-[#f2ede4] hover:bg-[#c5a059] hover:text-[#0c0d0e] flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-105"
      >
        <ChevronRight className="w-6 h-6 translate-x-0.5" />
      </button>

      {/* Main Image Stage */}
      <div
        ref={imageWrapperRef}
        className="relative z-20 max-w-[90vw] max-h-[82vh] flex flex-col items-center justify-center pointer-events-auto"
      >
        {/* Loading placeholder skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#111316] rounded-xl border border-[#23262d] min-w-0 w-full max-w-full min-h-[200px] sm:min-h-[320px]">
            <div className="w-8 h-8 border-2 border-[#c5a059] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* High Resolution Photography */}
        <img
          ref={activeImgRef}
          src={currentImage.highResUrl}
          alt={currentImage.title}
          onLoad={() => setImageLoaded(true)}
          className={`max-w-[88vw] max-h-[76vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ willChange: 'transform, opacity' }}
        />
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-[#0e1013]/85 border border-[#22252c] backdrop-blur-md max-w-[92vw] overflow-x-auto scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={img.id}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(idx);
            }}
            className={`relative shrink-0 w-14 h-11 sm:w-14 sm:h-10 rounded-lg overflow-hidden transition-all duration-200 ${
              idx === currentIndex
                ? 'ring-2 ring-[#c5a059] scale-105 opacity-100'
                : 'opacity-40 hover:opacity-80'
            }`}
            aria-label={`Jump to image ${idx + 1}: ${img.title}`}
          >
            <img
              src={img.thumbUrl}
              alt={img.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
