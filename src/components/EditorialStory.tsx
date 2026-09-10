import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES } from '../data/servicesData';
import { softReveal } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

export const EditorialStory: React.FC = () => {
  const { isReducedMotion, scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      softReveal('.svc-header > *', headerRef.current, { stagger: 0.08 });

      // Mobile / tablet: simple reveal cards (no sticky stack)
      const mm = gsap.matchMedia();

      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('.svc-panel').forEach((panel) => {
          softReveal(panel.querySelectorAll('.svc-mobile-reveal'), panel, {
            y: 16,
            stagger: 0.06,
            start: 'top 92%',
          });
        });
      });

      // Desktop: cinematic sticky stack
      mm.add('(min-width: 1024px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>('.svc-panel');
        const markers = gsap.utils.toArray<HTMLElement>('.svc-marker');

        const activateMarker = (index: number) => {
          markers.forEach((marker, mi) => {
            gsap.to(marker, {
              backgroundColor: mi === index ? '#c5a059' : 'transparent',
              borderColor: mi === index ? '#c5a059' : '#2a2d32',
              color: mi === index ? '#0c0d0e' : '#9b9ca1',
              duration: 0.35,
              ease: 'power2.out',
            });
          });
          if (counterRef.current) {
            counterRef.current.textContent = SERVICES[index].index;
          }
        };

        panels.forEach((panel, i) => {
          const img = panel.querySelector('.svc-img') as HTMLElement | null;
          const copy = panel.querySelectorAll('.svc-copy-item');
          const veil = panel.querySelector('.svc-veil') as HTMLElement | null;
          const isLast = i === panels.length - 1;

          if (veil) {
            gsap.set(veil, { opacity: 0.22 });
          }

          if (!isLast) {
            gsap.fromTo(
              panel,
              { scale: 1 },
              {
                scale: 0.92,
                ease: 'none',
                scrollTrigger: {
                  trigger: panels[i + 1],
                  start: 'top bottom',
                  end: 'top top',
                  scrub: true,
                },
              }
            );

            if (veil) {
              gsap.fromTo(
                veil,
                { opacity: 0.22 },
                {
                  opacity: 0.7,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: panels[i + 1],
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                  },
                }
              );
            }
          }

          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.12, yPercent: -3 },
              {
                scale: 1,
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          }

          // Play-once so scrolling back up does not re-hide service copy
          softReveal(copy, panel, {
            y: 18,
            fromOpacity: 0.45,
            stagger: 0.05,
            start: 'top 75%',
          });

          ScrollTrigger.create({
            trigger: panel,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => activateMarker(i),
            onEnterBack: () => activateMarker(i),
          });
        });

        const rail = sectionRef.current?.querySelector('.svc-rail') as HTMLElement | null;
        if (rail) {
          gsap.set(rail, { autoAlpha: 0 });
          ScrollTrigger.create({
            trigger: stackRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => gsap.to(rail, { autoAlpha: 1, duration: 0.35 }),
            onLeave: () => gsap.to(rail, { autoAlpha: 0, duration: 0.25 }),
            onEnterBack: () => gsap.to(rail, { autoAlpha: 1, duration: 0.35 }),
            onLeaveBack: () => gsap.to(rail, { autoAlpha: 0, duration: 0.25 }),
          });
        }

        gsap.to('.svc-giant-index', {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: stackRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-20 bg-[#090a0b] text-[#f2ede4] scroll-mt-28"
    >
      <div
        ref={headerRef}
        className="svc-header max-w-7xl mx-auto px-6 sm:px-8 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20"
      >
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#c5a059] mb-4 sm:mb-5">
          Our Services
        </p>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-7xl font-light tracking-tight leading-[1.08] max-w-4xl">
          Real estate guidance for{' '}
          <span className="italic text-[#e8c88f]">every step</span> of the move.
        </h2>
        <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base text-[#9b9ca1] font-light leading-relaxed">
          Three promises. One trusted advisor.
        </p>
      </div>

      <div className="svc-rail pointer-events-none hidden lg:flex fixed left-6 xl:left-10 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
        <span
          ref={counterRef}
          className="font-mono text-xs tracking-[0.3em] text-[#c5a059] mb-2"
        >
          01
        </span>
        {SERVICES.map((service, i) => (
          <button
            key={service.id}
            type="button"
            aria-label={service.title}
            onClick={() => scrollTo(`#${service.id}`)}
            className="svc-marker pointer-events-auto w-11 h-11 border border-[#2a2d32] text-[10px] font-mono text-[#9b9ca1] transition-colors hover:border-[#c5a059]"
            style={
              i === 0
                ? { backgroundColor: '#c5a059', borderColor: '#c5a059', color: '#0c0d0e' }
                : undefined
            }
          >
            {service.index}
          </button>
        ))}
      </div>

      <div ref={stackRef} className="relative space-y-10 lg:space-y-0 pb-16 lg:pb-0">
        {SERVICES.map((service, i) => (
          <article
            key={service.id}
            id={service.id}
            className="svc-panel relative lg:sticky lg:top-0 lg:h-[100svh] w-full lg:overflow-hidden origin-center bg-[#090a0b] will-change-transform scroll-mt-28"
            style={{ zIndex: i + 1 }}
          >
            {/* Desktop full-bleed media */}
            <div className="svc-media absolute inset-0 hidden lg:block overflow-hidden">
              <img
                src={service.image}
                alt={service.imageAlt}
                className="svc-img absolute inset-0 w-full h-full object-cover will-change-transform"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div className="svc-veil absolute inset-0 bg-[#0c0d0e] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e]/95 via-[#0c0d0e]/55 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/80 via-transparent to-[#0c0d0e]/30 pointer-events-none" />
            </div>

            <div
              className="svc-giant-index pointer-events-none absolute -right-4 sm:right-6 top-1/2 -translate-y-1/2 font-display text-[18vw] leading-none text-white/[0.04] select-none hidden lg:block"
              aria-hidden
            >
              {service.index}
            </div>

            {/* Mobile card layout */}
            <div className="lg:hidden px-6 sm:px-8">
              <div className="svc-mobile-reveal relative aspect-[16/11] overflow-hidden bg-[#15171b]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/70 via-transparent to-transparent" />
              </div>
              <div className="svc-mobile-reveal pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs tracking-[0.3em] text-[#c5a059]">
                    {service.index}
                  </span>
                  <span className="w-8 h-px bg-[#c5a059]/60" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#9b9ca1]">
                    {service.eyebrow}
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-light text-[#f2ede4] leading-[1.12] tracking-tight mb-4">
                  {service.title}
                </h3>
                <p className="text-sm text-[#cfcac0] font-light leading-relaxed mb-6">
                  {service.body}
                </p>
                <button
                  type="button"
                  onClick={() => scrollTo('#inquire')}
                  className="group inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-[#0c0d0e] bg-[#c5a059] hover:bg-[#e4caa0] px-5 py-3.5 transition-colors"
                >
                  Talk with Marci
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Desktop overlay copy */}
            <div className="relative z-10 hidden lg:flex h-full max-w-7xl mx-auto px-8 items-center">
              <div className="max-w-xl">
                <div className="svc-copy-item flex items-center gap-3 mb-5">
                  <span className="font-mono text-xs tracking-[0.3em] text-[#c5a059]">
                    {service.index}
                  </span>
                  <span className="w-10 h-px bg-[#c5a059]/60" />
                  <span className="text-xs uppercase tracking-[0.28em] text-[#9b9ca1]">
                    {service.eyebrow}
                  </span>
                </div>

                <h3 className="svc-copy-item font-display text-5xl lg:text-6xl font-light text-[#f2ede4] leading-[1.08] tracking-tight mb-5">
                  {service.title}
                </h3>

                <p className="svc-copy-item text-base text-[#cfcac0] font-light leading-relaxed mb-8 max-w-md">
                  {service.body}
                </p>

                <button
                  type="button"
                  onClick={() => scrollTo('#inquire')}
                  className="svc-copy-item group inline-flex min-h-11 items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-[#0c0d0e] bg-[#c5a059] hover:bg-[#e4caa0] px-5 py-3.5 transition-colors"
                >
                  Talk with Marci
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 px-8 hidden lg:block">
              <div className="max-w-7xl mx-auto flex gap-2">
                {SERVICES.map((s, si) => (
                  <div
                    key={s.id}
                    className={`h-[2px] flex-1 ${si <= i ? 'bg-[#c5a059]' : 'bg-[#2a2d32]'}`}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
