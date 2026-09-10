import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_IMAGES } from '../data/estateData';
import { GalleryImage } from '../types';
import { Lightbox } from './Lightbox';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Maximize2, MapPin, Camera, Sparkles, SlidersHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GallerySection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Exterior Architecture', 'Interior Design', 'Landscape Architecture', 'Monolithic Structure'];

  const filteredImages = activeCategoryFilter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategoryFilter);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Gallery grid items staggered entrance
      gsap.from('.gallery-tile', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion, activeCategoryFilter]);

  const handleTileClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    // Subtle scale animation before opening lightbox
    if (!isReducedMotion) {
      gsap.to(e.currentTarget, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(e.currentTarget, { scale: 1 });
          setActiveImageIndex(index);
        },
      });
    } else {
      setActiveImageIndex(index);
    }
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-[#0c0d0e] text-[#f2ede4] relative z-20 border-t border-[#181a1e]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Gallery Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Anthology</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f2ede4] tracking-tight">
              Editorial Gallery
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
                  activeCategoryFilter === cat
                    ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold'
                    : 'bg-[#15171b] text-[#9b9ca1] hover:text-[#f2ede4] border border-[#23272e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric / Masonry Editorial Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-12 gap-6 sm:gap-8"
        >
          {filteredImages.map((image, idx) => {
            // Find true index in master GALLERY_IMAGES array
            const trueIndex = GALLERY_IMAGES.findIndex((item) => item.id === image.id);

            return (
              <div
                key={image.id}
                className={`gallery-tile ${image.spanClass || 'col-span-12 sm:col-span-6 lg:col-span-4'} group`}
              >
                <button
                  onClick={(e) => handleTileClick(trueIndex !== -1 ? trueIndex : idx, e)}
                  className="relative w-full overflow-hidden rounded-2xl bg-[#14161a] border border-[#23262d] group-hover:border-[#c5a059]/60 transition-all duration-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                  style={{ aspectRatio: image.aspectRatio || '16/10' }}
                  aria-label={`Open photo lightbox: ${image.title}`}
                >
                  {/* Image with Lazy Load & Defined Aspect Ratio */}
                  <img
                    src={image.thumbUrl}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-106 filter brightness-[0.9] group-hover:brightness-100"
                  />

                  {/* Dark Neutral Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/90 via-[#0c0d0e]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Category & Year Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs z-10 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider bg-[#0c0d0e]/80 backdrop-blur-md text-[#e4caa0] border border-[#c5a059]/30">
                      {image.category}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[#9b9ca1] bg-[#0c0d0e]/80 backdrop-blur-md px-2 py-0.5 rounded border border-[#23272e]">
                      {image.year}
                    </span>
                  </div>

                  {/* Hover Floating Action Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 pointer-events-none z-10">
                    <div className="w-12 h-12 rounded-full bg-[#c5a059] text-[#0c0d0e] flex items-center justify-center shadow-2xl">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Caption Information */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-left z-10 transform transition-transform duration-300 group-hover:-translate-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-[#c5a059] font-mono mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{image.location}</span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-[#f2ede4] font-medium leading-snug">
                      {image.title}
                    </h3>
                    <p className="text-xs text-[#9b9ca1] mt-1 line-clamp-1 font-light opacity-90 group-hover:text-[#cfcac0]">
                      {image.caption}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        images={GALLERY_IMAGES}
        currentIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(null)}
        onNavigate={(newIndex) => setActiveImageIndex(newIndex)}
      />
    </section>
  );
};
