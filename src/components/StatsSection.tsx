import React, { useEffect, useRef } from 'react';
import { STATS_DATA } from '../data/estateData';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StatsSection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (isReducedMotion) {
      // Just render final numbers without counting animation
      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const stat = STATS_DATA[index];
        el.textContent = `${stat.prefix || ''}${stat.targetValue.toFixed(stat.decimals || 0)}${stat.suffix || ''}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      STATS_DATA.forEach((stat, index) => {
        const el = numberRefs.current[index];
        if (!el) return;

        const counter = { val: 0 };

        gsap.to(counter, {
          val: stat.targetValue,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            const formatted = counter.val.toFixed(stat.decimals || 0);
            el.textContent = `${stat.prefix || ''}${formatted}${stat.suffix || ''}`;
          },
        });
      });

      // Card reveal animation
      gsap.from('.stat-card', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[#0e1012] border-y border-[#1d2025] relative z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={stat.id}
              className="stat-card p-6 rounded-xl bg-[#14161a]/60 border border-[#23272e] hover:border-[#c5a059]/40 transition-colors duration-300"
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  ref={(el) => {
                    numberRefs.current[idx] = el;
                  }}
                  className="font-display text-4xl sm:text-5xl font-light text-[#f2ede4] tracking-tight"
                >
                  {stat.prefix || ''}0{stat.suffix || ''}
                </span>
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#c5a059] mb-2">
                {stat.label}
              </h3>
              <p className="text-xs text-[#9b9ca1] leading-relaxed font-light">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
