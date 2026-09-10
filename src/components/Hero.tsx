import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowDown, Compass, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const { scrollTo, isReducedMotion } = useSmoothScroll();
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroImageContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isReducedMotion) {
      // Instant display for reduced motion
      gsap.set(
        [
          heroImageRef.current,
          headlineRef.current,
          subtextRef.current,
          ctaContainerRef.current,
          badgeRef.current,
          floatingCardRef.current,
        ],
        { opacity: 1, y: 0, scale: 1, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Step 1 to 6 sequence timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state
      gsap.set(badgeRef.current, { opacity: 0, y: -15 });
      gsap.set(heroImageContainerRef.current, {
        clipPath: 'polygon(0% 12%, 100% 12%, 100% 88%, 0% 88%)',
      });
      gsap.set(heroImageRef.current, { scale: 1.15, opacity: 0.2 });
      gsap.set(headlineRef.current, { opacity: 0, y: isMobile ? 25 : 50 });
      gsap.set(subtextRef.current, { opacity: 0, y: isMobile ? 15 : 30 });
      gsap.set(ctaContainerRef.current, { opacity: 0, y: 20 });
      gsap.set(floatingCardRef.current, { opacity: 0, y: 30, scale: 0.95 });

      // 1. Badge & Hero subtle reveal
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.2,
      })
      // 2. Hero image subtly reveals
      .to(
        heroImageContainerRef.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.4,
          ease: 'power4.inOut',
        },
        '-=0.4'
      )
      .to(
        heroImageRef.current,
        {
          scale: 1,
          opacity: 0.65,
          duration: 1.6,
          ease: 'power2.out',
        },
        '<'
      )
      // 3. Main headline fades/slides into position
      .to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
        },
        '-=0.9'
      )
      // 4. Supporting text appears
      .to(
        subtextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        '-=0.6'
      )
      // 5. CTA appears
      .to(
        ctaContainerRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        '-=0.4'
      )
      // 6. Architectural floating spec card settles in
      .to(
        floatingCardRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.2)',
        },
        '-=0.5'
      );

      // ScrollTrigger: Subtle Parallax on Hero Image (reduced distance on mobile)
      gsap.to(heroImageRef.current, {
        yPercent: isMobile ? 8 : 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#0c0d0e]"
    >
      {/* Background Architectural Canvas with Parallax Container */}
      <div
        ref={heroImageContainerRef}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img
          ref={heroImageRef}
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&auto=format&fit=crop&q=90"
          alt="The Solarium Cliff Residence Big Sur"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Editorial Gradients for Deep Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/40 to-[#0c0d0e]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e]/90 via-transparent to-[#0c0d0e]/80" />
      </div>

      {/* Grid Overlay Line Accents for Architectural Feel */}
      <div className="absolute inset-0 pointer-events-none z-10 flex justify-between max-w-7xl mx-auto px-6 opacity-15">
        <div className="w-[1px] h-full bg-[#f2ede4]" />
        <div className="w-[1px] h-full bg-[#f2ede4] hidden md:block" />
        <div className="w-[1px] h-full bg-[#f2ede4]" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-3xl">
          {/* Top Editorial Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#16181b]/80 border border-[#c5a059]/40 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-[#e4caa0] font-medium">
              Curated Architectural Portfolio • 2025 Edition
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#f2ede4] leading-[1.08] mb-6"
          >
            Monuments to <br />
            <span className="italic font-normal text-[#e8c88f]">Quiet Solitude</span> &amp; Form.
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-[#cfcac0] leading-relaxed max-w-2xl font-light mb-10"
          >
            L’Arche represents the world’s most significant modernist sanctuaries—where raw landscape,
            sculpted concrete, and structural glass converge into timeless residential monuments.
          </p>

          {/* CTA Buttons with Micro-interactions */}
          <div
            ref={ctaContainerRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <button
              id="hero-cta-explore"
              onClick={() => scrollTo('#estates')}
              className="group relative inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#c5a059] text-[#0c0d0e] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#e4caa0] hover:shadow-lg hover:shadow-[#c5a059]/20"
            >
              <span>Explore Collection</span>
              <Compass className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-45" />
            </button>

            <button
              id="hero-cta-gallery"
              onClick={() => scrollTo('#gallery')}
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#16181b]/70 backdrop-blur-md border border-[#2a2d32] text-[#f2ede4] text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#c5a059]/60 hover:bg-[#1f2227]"
            >
              <span>Editorial Gallery</span>
              <ArrowDown className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>
        </div>

        {/* Floating Spec Card: Featured Landmark Details */}
        <div
          ref={floatingCardRef}
          className="mt-14 lg:mt-0 lg:absolute lg:right-8 lg:bottom-12 max-w-sm w-full bg-[#14161a]/85 backdrop-blur-xl border border-[#2a2d32] p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#25282f] mb-4">
            <div className="flex items-center gap-2 text-xs text-[#c5a059] font-mono tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>Big Sur, CA</span>
            </div>
            <span className="text-[10px] tracking-widest uppercase bg-[#22262d] text-[#9b9ca1] px-2 py-0.5 rounded">
              Lot 01
            </span>
          </div>

          <h4 className="font-display text-lg text-[#f2ede4] font-medium leading-snug mb-1">
            The Solarium Cliff Residence
          </h4>
          <p className="text-xs text-[#9b9ca1] mb-4">
            Cantilevered glass pavilion by Kengo &amp; Associates.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#25282f]">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#6e727a]">Acquisition</span>
              <span className="font-display text-sm text-[#c5a059] font-medium">$28,500,000</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#6e727a]">Scale</span>
              <span className="text-xs text-[#cfcac0]">11,400 sq ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Anchor */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#9b9ca1]">Scroll to uncover</span>
        <div className="w-5 h-8 rounded-full border border-[#9b9ca1]/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#c5a059] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
