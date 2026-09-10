import React, { useState, useEffect, useRef } from 'react';
import { GALLERY_IMAGES } from '../data/estateData';
import { GalleryImage } from '../types';
import { Lightbox } from './Lightbox';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Maximize2, MapPin, Camera, Sparkles, SlidersHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { softReveal } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const GallerySection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Exteriors', 'Interiors', 'Community'];

  const filteredImages = activeCategoryFilter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategoryFilter);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      softReveal('.gallery-header > *', sectionRef.current, { stagger: 0.08 });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  useEffect(() => {
    if (isReducedMotion || !gridRef.current) return;

    const tiles = gridRef.current.querySelectorAll('.gallery-tile');
    if (!tiles.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tiles,
        { y: 18, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );

      tiles.forEach((tile) => {
        const img = tile.querySelector('img');
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.1 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: tile,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    }, gridRef);

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
      className="py-28 sm:py-36 bg-[#0c0d0e] text-[#f2ede4] relative z-20 border-t border-[#181a1e] scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Gallery Header */}
        <div ref={headerRef} className="gallery-header flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Photo Gallery</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f2ede4] tracking-tight">
              Pahrump Living
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`min-h-11 px-4 py-2.5 rounded-full text-xs tracking-wider transition-all duration-300 ${
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
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform scale-100 md:scale-90 md:group-hover:scale-100 pointer-events-none z-10">
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
