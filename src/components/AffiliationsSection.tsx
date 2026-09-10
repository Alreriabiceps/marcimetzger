import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Phone, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { softReveal } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  {
    src: '/logo-ridge-realty.png',
    alt: 'The Ridge Realty Group',
    label: 'The Ridge Realty Group',
    className: 'h-20 sm:h-24 w-auto',
  },
  {
    src: '/logo-equal-housing.png',
    alt: 'Equal Housing Opportunity',
    label: 'Equal Housing Opportunity',
    className: 'h-14 sm:h-16 w-auto',
  },
  {
    src: '/logo-realtor.png',
    alt: 'REALTOR® member',
    label: 'REALTOR® Member',
    className: 'h-12 sm:h-14 w-auto',
  },
  {
    src: '/logo-chamber.png',
    alt: 'Pahrump Valley Chamber of Commerce',
    label: 'Pahrump Valley Chamber',
    className: 'h-20 sm:h-24 w-auto',
  },
];

export const AffiliationsSection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      softReveal('.affil-header > *', sectionRef.current, { stagger: 0.05 });
      softReveal('.affil-card', sectionRef.current, { y: 18, stagger: 0.06 });
      softReveal('.affil-cta', sectionRef.current, { y: 12 });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="affiliations"
      ref={sectionRef}
      className="relative z-20 overflow-hidden bg-[#faf8f4] scroll-mt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,160,89,0.12),transparent 55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/35 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="affil-header text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#8a6d2f] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Credentials & Community</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-[#1a1c1f] tracking-tight mb-3">
            Backed by trust across Pahrump
          </h2>
          <p className="text-sm text-[#6a6e76] font-light leading-relaxed">
            Proudly affiliated with The Ridge Realty Group, local chamber partners, and the
            professional standards that protect every buyer and seller.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-14">
          {LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="affil-card group flex flex-col items-center justify-center text-center px-4 py-6 sm:py-8 rounded-2xl bg-white/80 border border-[#ebe6dc] shadow-[0_10px_40px_rgba(26,28,31,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a059]/45 hover:shadow-[0_18px_50px_rgba(197,160,89,0.12)]"
            >
              <div className="min-h-[6.5rem] flex items-center justify-center mb-4">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`affil-logo-img ${logo.className} object-contain transition-transform duration-500 group-hover:scale-105`}
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#7a7e86]">
                {logo.label}
              </span>
            </div>
          ))}
        </div>

        <div className="affil-cta flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 text-center w-full">
          <p className="text-sm text-[#5c6068] font-light">
            Ready to buy or sell with a trusted local realtor?
          </p>
          <a
            href="tel:2069196886"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1a1c1f] text-[#faf8f4] text-xs uppercase tracking-[0.2em] hover:bg-[#c5a059] hover:text-[#1a1c1f] transition-colors duration-300"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>206-919-6886</span>
          </a>
        </div>
      </div>
    </section>
  );
};
