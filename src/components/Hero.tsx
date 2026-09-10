import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Phone, MapPin } from 'lucide-react';
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
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isReducedMotion) {
      gsap.set(heroImageContainerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });
      gsap.set(
        [
          heroImageRef.current,
          headlineRef.current,
          subtextRef.current,
          ctaContainerRef.current,
          floatingCardRef.current,
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(heroImageContainerRef.current, {
        clipPath: 'polygon(0% 12%, 100% 12%, 100% 88%, 0% 88%)',
      });
      gsap.set(heroImageRef.current, { scale: 1.15, opacity: 0.2 });
      gsap.set(headlineRef.current, { opacity: 0, y: isMobile ? 25 : 50 });
      gsap.set(subtextRef.current, { opacity: 0, y: isMobile ? 15 : 30 });
      gsap.set(ctaContainerRef.current, { opacity: 0, y: 20 });
      gsap.set(floatingCardRef.current, { opacity: 0, y: 30, scale: 0.95 });

      tl.to(
        heroImageContainerRef.current,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.4,
          ease: 'power4.inOut',
          delay: 0.2,
        }
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
        .to(
          subtextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .to(
          ctaContainerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          '-=0.4'
        )
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

      // Attach scroll parallax only after the load-in finishes so scrub tweens
      // don't capture the hidden (opacity: 0) starting state on desktop.
      tl.call(() => {
        gsap.fromTo(
          heroImageRef.current,
          { yPercent: 0, scale: 1 },
          {
            yPercent: isMobile ? 8 : 22,
            scale: isMobile ? 1 : 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: isMobile ? 0.5 : 0.65,
            },
          }
        );

        gsap.fromTo(
          [headlineRef.current, subtextRef.current, ctaContainerRef.current, floatingCardRef.current],
          { y: 0, opacity: 1 },
          {
            y: isMobile ? -24 : -64,
            opacity: isMobile ? 0.15 : 0.12,
            ease: 'none',
            scrollTrigger: {
              trigger: heroSectionRef.current,
              start: 'center top',
              end: 'bottom top',
              scrub: isMobile ? 0.6 : 0.75,
            },
          }
        );
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden bg-[#0c0d0e]"
    >
      <div ref={heroImageContainerRef} className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={heroImageRef}
          src="/hero-bg.jpg"
          alt="Pahrump golf course with mountain views"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/40 to-[#0c0d0e]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e]/90 via-transparent to-[#0c0d0e]/80" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="max-w-3xl">
          <p className="text-[10px] sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.3em] text-[#c5a059] font-medium mb-4">
            <span className="sm:hidden">Marci Metzger · Ridge Realty</span>
            <span className="hidden sm:inline">Marci Metzger — The Ridge Realty Group</span>
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#f2ede4] leading-[1.08] mb-6"
          >
            Pahrump{' '}
            <span className="italic font-normal text-[#e8c88f]">Realtor</span>
          </h1>

          <p
            ref={subtextRef}
            className="text-sm sm:text-lg text-[#cfcac0] leading-relaxed max-w-2xl font-light mb-8 sm:mb-10"
          >
            Realtor for nearly three decades. Whether you are buying, selling, or investing in
            Pahrump — don’t just list it… get it sold.
          </p>

          <div
            ref={ctaContainerRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5"
          >
            <a
              id="hero-cta-call"
              href="tel:2069196886"
              className="group relative inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-3 px-7 py-3.5 sm:py-4 bg-[#c5a059] text-[#0c0d0e] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#e4caa0] hover:shadow-lg hover:shadow-[#c5a059]/20"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            <button
              id="hero-cta-listings"
              onClick={() => scrollTo('#search-listings')}
              className="group inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-3 px-7 py-3.5 sm:py-4 bg-[#16181b]/70 backdrop-blur-md border border-[#2a2d32] text-[#f2ede4] text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#c5a059]/60 hover:bg-[#1f2227]"
            >
              <span>Find Your Dream Home</span>
            </button>
          </div>
        </div>

        <div
          ref={floatingCardRef}
          className="hidden lg:block lg:absolute lg:right-8 lg:bottom-12 max-w-sm w-full bg-[#14161a]/85 backdrop-blur-xl border border-[#2a2d32] p-6 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#25282f] mb-4">
            <div className="flex items-center gap-2 text-xs text-[#c5a059] font-mono tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>Pahrump, NV</span>
            </div>
            <span className="text-[10px] tracking-widest uppercase bg-[#22262d] text-[#9b9ca1] px-2 py-0.5 rounded">
              Local Expert
            </span>
          </div>

          <h4 className="font-display text-lg text-[#f2ede4] font-medium leading-snug mb-1">
            Marci Metzger
          </h4>
          <p className="text-xs text-[#9b9ca1] mb-4">
            Realtor for nearly 3 decades · The Ridge Realty Group
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#25282f]">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#6e727a]">Call</span>
              <a href="tel:2069196886" className="font-display text-sm text-[#c5a059] font-medium hover:text-[#e4caa0]">
                (206) 919-6886
              </a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#6e727a]">Hours</span>
              <span className="text-xs text-[#cfcac0]">8am – 7pm Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
