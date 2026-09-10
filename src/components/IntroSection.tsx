import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Phone, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { softReveal } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const IntroSection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitWrapRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Play-once (not scrubbed) so jumping past / scrolling back can't re-hide copy
      softReveal(portraitWrapRef.current, sectionRef.current, {
        y: 20,
        fromOpacity: 0.4,
        duration: 0.65,
      });

      if (portraitImgRef.current) {
        gsap.fromTo(
          portraitImgRef.current,
          { scale: 1.06 },
          {
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 92%',
              toggleActions: 'play none none none',
              onRefresh: (self) => {
                if (self.scroll() >= self.start) self.animation?.progress(1);
              },
            },
          }
        );
      }

      softReveal('.intro-line', copyRef.current, { y: 16, stagger: 0.05 });

      gsap.to(portraitWrapRef.current, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[#0c0d0e] scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_45%,rgba(197,160,89,0.06),transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div ref={portraitWrapRef} className="relative will-change-transform">
              <div className="absolute -inset-3 rounded-full border border-[#c5a059]/20" />
              <div className="absolute -inset-6 rounded-full border border-[#2a2d32]/70" />

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-[#15171b] shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <img
                  ref={portraitImgRef}
                  src="/marci-metzger.jpg"
                  alt="Marci Metzger, Pahrump realtor with The Ridge Realty Group"
                  className="w-full h-full object-cover object-center will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full" />
              </div>
            </div>
          </div>

          <div ref={copyRef} className="lg:col-span-7 text-center lg:text-left">
            <p className="intro-line text-xs uppercase tracking-[0.28em] text-[#c5a059] font-medium mb-5">
              The Ridge Realty Group
            </p>

            <h2 className="intro-line font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-[0.06em] text-[#f2ede4] uppercase leading-none mb-6">
              Marci Metzger
            </h2>

            <p className="intro-line text-sm sm:text-base uppercase tracking-[0.22em] text-[#cfcac0] font-light mb-6">
              Realtor for Nearly 3 Decades
            </p>

            <p className="intro-line text-sm sm:text-base text-[#9b9ca1] font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Serving buyers and sellers across Pahrump with local market expertise, hands-on
              guidance, and a simple promise — don&apos;t just list it, get it sold.
            </p>

            <div className="intro-line flex flex-col sm:flex-row items-stretch sm:items-center lg:items-stretch gap-4 sm:gap-5 w-full sm:w-auto">
              <a
                href="tel:2069196886"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#c5a059] text-[#0c0d0e] font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#e4caa0]"
              >
                <Phone className="w-4 h-4" />
                <span>206-919-6886</span>
              </a>

              <div className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-4 rounded-full border border-[#2a2d32] text-xs tracking-[0.15em] uppercase text-[#9b9ca1]">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Pahrump, Nevada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
