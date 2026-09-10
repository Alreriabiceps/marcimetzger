import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Quote, Layers, Eye, Award, SlidersHorizontal } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialStory: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const headingMaskRef = useRef<HTMLHeadingElement>(null);
  const imageClipRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLImageElement>(null);
  const manifestoQuoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Staggered Mask Reveal on Section Headline
      gsap.from('.editorial-line', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.18,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingMaskRef.current,
          start: 'top 80%',
        },
      });

      // 2. Image Clip-Path Reveal
      gsap.fromTo(
        imageClipRef.current,
        {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          scale: 1.08,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1.0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: imageClipRef.current,
            start: 'top 75%',
          },
        }
      );

      // 3. Subtle Parallax for Large Architecture Photography
      gsap.to(parallaxImgRef.current, {
        yPercent: isMobile ? 6 : 14,
        ease: 'none',
        scrollTrigger: {
          trigger: imageClipRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      // 4. Quote and Philosophy Cards Reveal
      gsap.from(manifestoQuoteRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: manifestoQuoteRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-[#090a0b] text-[#f2ede4] border-t border-[#181a1e] relative overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Tag */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-6">
          <Layers className="w-3.5 h-3.5" />
          <span>The Architectural Manifesto</span>
        </div>

        {/* Masked Clip Reveal Heading */}
        <div ref={headingMaskRef} className="mb-16 overflow-hidden">
          <div className="overflow-hidden">
            <h2 className="editorial-line font-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#f2ede4] tracking-tight leading-[1.15]">
              Architecture is not mere shelter.
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="editorial-line font-display text-3xl sm:text-5xl lg:text-6xl font-light text-[#c5a059] tracking-tight leading-[1.15]">
              It is the choreography of light, silence &amp; stone.
            </h2>
          </div>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Masked Image with Subtle Parallax */}
          <div className="lg:col-span-7">
            <div
              ref={imageClipRef}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#15171b] border border-[#23262d] shadow-2xl"
            >
              <img
                ref={parallaxImgRef}
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop&q=90"
                alt="Engadin Alpine Architecture Glass Hearth"
                loading="lazy"
                className="w-full h-[120%] -mt-[10%] object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0b]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#cfcac0] bg-[#0c0d0e]/80 backdrop-blur-md px-4 py-3 rounded-xl border border-[#23262d]">
                <span>Valser Quartzite &amp; Thermal Structural Glass</span>
                <span className="text-[#c5a059] font-mono">Engadin, CH</span>
              </div>
            </div>
          </div>

          {/* Right: Architectural Principles */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div
              ref={manifestoQuoteRef}
              className="p-8 rounded-2xl bg-[#121417]/80 border border-[#22252c] relative"
            >
              <Quote className="w-8 h-8 text-[#c5a059]/40 mb-4" />
              <p className="font-display text-lg sm:text-xl text-[#f2ede4] font-light italic leading-relaxed mb-4">
                “When you strip away ornamentation, only gravity, horizon, and truth remain. An estate
                must not impose itself upon the landscape—it must surrender to it.”
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#23262d]">
                <div className="w-9 h-9 rounded-full bg-[#202329] border border-[#c5a059]/40 flex items-center justify-center font-display text-xs text-[#c5a059]">
                  VO
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#f2ede4]">
                    Valerio Olgiati
                  </span>
                  <span className="text-[11px] text-[#9b9ca1]">Master Architect &amp; Laureate</span>
                </div>
              </div>
            </div>

            {/* Micro Pillars */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1114] border border-[#1e2126] hover:border-[#c5a059]/30 transition-colors">
                <Eye className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#f2ede4] font-semibold mb-1">
                    Radical Landscape Inversion
                  </h4>
                  <p className="text-xs text-[#8f929a] leading-relaxed font-light">
                    Every residence is oriented along solar azimuths, transforming natural daily shadows into living artworks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1114] border border-[#1e2126] hover:border-[#c5a059]/30 transition-colors">
                <Award className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#f2ede4] font-semibold mb-1">
                    Museum-Grade Materiality
                  </h4>
                  <p className="text-xs text-[#8f929a] leading-relaxed font-light">
                    Poured titanium concrete, custom bronze alloy hardware, and hand-chiseled Scandinavian stones tested for centuries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
