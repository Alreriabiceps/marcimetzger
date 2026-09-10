import React, { useState, useEffect, useRef } from 'react';
import { ESTATES_DATA } from '../data/estateData';
import { PropertyItem } from '../types';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowUpRight, Bed, Bath, Maximize2, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedEstatesProps {
  onSelectProperty?: (property: PropertyItem) => void;
}

export const FeaturedEstates: React.FC<FeaturedEstatesProps> = ({ onSelectProperty }) => {
  const { isReducedMotion } = useSmoothScroll();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedEstateModal, setSelectedEstateModal] = useState<PropertyItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Coastal', 'Alpine', 'Urban Penthouse', 'Desert Monolith'];

  const filteredEstates = activeCategory === 'All'
    ? ESTATES_DATA
    : ESTATES_DATA.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Cards staggered entrance
      gsap.from('.property-card', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion, activeCategory]);

  return (
    <section
      id="estates"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-[#0c0d0e] relative z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
              <span className="w-6 h-[1px] bg-[#c5a059]" />
              <span>Current Portfolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#f2ede4] tracking-tight">
              Signature Sanctuaries
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#c5a059] text-[#0c0d0e] font-semibold shadow-md'
                    : 'bg-[#16181b] text-[#9b9ca1] hover:text-[#f2ede4] border border-[#23272e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEstates.map((estate) => (
            <article
              key={estate.id}
              className="property-card group relative flex flex-col rounded-2xl bg-[#131518] border border-[#23262d] overflow-hidden hover:border-[#c5a059]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Image Container with Zoom & Overlay Transition */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1a1d22]">
                <img
                  src={estate.image}
                  alt={estate.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-[0.92] group-hover:brightness-100"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#131518] via-transparent to-transparent opacity-80" />

                {/* Badge Category */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium bg-[#0c0d0e]/80 backdrop-blur-md text-[#e4caa0] border border-[#c5a059]/30">
                    {estate.category}
                  </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#0c0d0e]/85 backdrop-blur-md text-[#f2ede4] border border-[#2d313a]">
                    {estate.price}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#9b9ca1] mb-2 font-mono">
                    <span>{estate.location}</span>
                    <span>Arch: {estate.architect}</span>
                  </div>

                  <h3 className="font-display text-xl font-medium text-[#f2ede4] mb-3 group-hover:text-[#c5a059] transition-colors duration-300">
                    {estate.title}
                  </h3>

                  <p className="text-xs text-[#8f929a] line-clamp-2 leading-relaxed mb-6 font-light">
                    {estate.description}
                  </p>
                </div>

                {/* Specifications Bar */}
                <div className="pt-4 border-t border-[#23272e] flex items-center justify-between text-xs text-[#cfcac0]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5" title="Bedrooms">
                      <Bed className="w-3.5 h-3.5 text-[#9b9ca1]" />
                      <span>{estate.bedrooms}</span>
                    </span>
                    <span className="flex items-center gap-1.5" title="Bathrooms">
                      <Bath className="w-3.5 h-3.5 text-[#9b9ca1]" />
                      <span>{estate.bathrooms}</span>
                    </span>
                    <span className="flex items-center gap-1.5" title="Interior Area">
                      <Maximize2 className="w-3.5 h-3.5 text-[#9b9ca1]" />
                      <span>{estate.sqft}</span>
                    </span>
                  </div>

                  {/* Micro-interaction Action Button */}
                  <button
                    onClick={() => {
                      setSelectedEstateModal(estate);
                      onSelectProperty?.(estate);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#c5a059] group-hover:text-[#f2ede4] font-medium transition-colors"
                  >
                    <span>Dossier</span>
                    <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Property Architectural Dossier Modal */}
      {selectedEstateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#14161a] border border-[#2a2e37] rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-[#23262d] mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium">
                  Confidential Architectural Dossier
                </span>
                <h3 className="font-display text-2xl text-[#f2ede4] font-light mt-1">
                  {selectedEstateModal.title}
                </h3>
                <p className="text-xs text-[#9b9ca1] mt-0.5">
                  {selectedEstateModal.location} • Designed by {selectedEstateModal.architect} ({selectedEstateModal.year})
                </p>
              </div>

              <button
                onClick={() => setSelectedEstateModal(null)}
                className="p-2 rounded-full text-[#9b9ca1] hover:text-[#ffffff] hover:bg-[#22262d] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 border border-[#23272e]">
              <img
                src={selectedEstateModal.image}
                alt={selectedEstateModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#cfcac0] leading-relaxed mb-6 font-light">
              {selectedEstateModal.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-[#c5a059] mb-3 font-semibold">
                Structural &amp; Estate Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedEstateModal.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-[#b8bcc6] bg-[#1a1d22] px-3 py-2 rounded-lg border border-[#25282f]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#23262d]">
              <div>
                <span className="text-[10px] uppercase text-[#9b9ca1]">Acquisition Guidance</span>
                <div className="font-display text-xl text-[#f2ede4] font-medium">{selectedEstateModal.price}</div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedEstateModal(null)}
                  className="px-4 py-2 text-xs uppercase tracking-wider rounded-lg border border-[#2a2d33] text-[#9b9ca1] hover:text-white"
                >
                  Close
                </button>
                <a
                  href="#inquire"
                  onClick={() => setSelectedEstateModal(null)}
                  className="px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg bg-[#c5a059] text-[#0c0d0e] hover:bg-[#e4caa0]"
                >
                  Schedule Private Viewing
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
