import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { viewportReveals, parallaxImage, VIEWPORT } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    id: 'sales',
    index: '01',
    eyebrow: 'Results',
    title: 'Top Residential Sales Last 5 Years',
    body: 'We helped nearly 90 clients in 2021, and closed 28.5 million in sales! Our team works hard everyday to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, & we want to make sure our best is better every year.',
    image: '/get-it-sold-kitchen.jpg',
    imageAlt: 'Bright open-concept kitchen and living space',
    side: 'left' as const,
    stats: [
      { value: '90+', label: 'Clients in 2021' },
      { value: '$28.5M', label: 'Closed Sales' },
    ],
  },
  {
    id: 'sold',
    index: '02',
    eyebrow: 'Sellers',
    title: "Don't Just List it…",
    body: 'Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.',
    image: '/get-it-sold-villa.jpg',
    imageAlt: 'Mediterranean villa courtyard with pool at dusk',
    side: 'right' as const,
    accent: 'Get it SOLD!',
  },
  {
    id: 'buyers',
    index: '03',
    eyebrow: 'Buyers',
    title: 'Guide to Buyers',
    body: 'Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrades lists, contractors on speed dial, & more!',
    image: '/get-it-sold-keys.jpg',
    imageAlt: 'House keys on a wooden table',
    side: 'left' as const,
  },
] as const;

export const GetItSoldSection: React.FC = () => {
  const { isReducedMotion, scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      viewportReveals(({ mobile, desktop }) => {
        mobile('.gis-header > *', headerRef.current, { stagger: 0.08 });
        desktop('.gis-header > *', headerRef.current, {
          y: 40,
          stagger: 0.12,
          duration: 0.9,
          fromOpacity: 0.15,
        });
      });

      gsap.utils.toArray<HTMLElement>('.gis-row').forEach((row) => {
        const media = row.querySelector('.gis-media') as HTMLElement | null;
        const img = row.querySelector('.gis-img') as HTMLElement | null;
        const copy = row.querySelector('.gis-copy') as HTMLElement | null;
        const fromLeft = row.dataset.side === 'left';

        if (media) {
          viewportReveals(({ mobile, desktop }) => {
            mobile(media, row, {
              x: fromLeft ? -28 : 28,
              y: 0,
              fromOpacity: 0.35,
              duration: 0.7,
              start: 'top 88%',
            });
            desktop(media, row, {
              x: fromLeft ? -56 : 56,
              y: 24,
              scale: 0.94,
              filterBlur: 4,
              fromOpacity: 0.2,
              duration: 0.95,
              start: 'top 85%',
            });
          });
        }

        if (img) {
          const imgMm = gsap.matchMedia();
          imgMm.add(VIEWPORT.mobile, () => {
            parallaxImage(img, row, { fromScale: 1.08 });
          });
          imgMm.add(VIEWPORT.desktop, () => {
            parallaxImage(img, row, { fromScale: 1.16, yFrom: -6, yTo: 10, scrub: 0.6 });
          });
        }

        if (copy) {
          viewportReveals(({ mobile, desktop }) => {
            mobile(copy.querySelectorAll('.gis-item'), copy, {
              x: fromLeft ? 18 : -18,
              y: 10,
              stagger: 0.06,
              start: 'top 90%',
            });
            desktop(copy.querySelectorAll('.gis-item'), copy, {
              x: fromLeft ? 36 : -36,
              y: 20,
              stagger: 0.1,
              duration: 0.8,
              fromOpacity: 0.2,
              start: 'top 88%',
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="get-it-sold"
      ref={sectionRef}
      className="relative z-20 bg-[#0c0d0e] overflow-hidden scroll-mt-28"
    >
      <div
        ref={headerRef}
        className="gis-header max-w-7xl mx-auto px-6 sm:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 text-center"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-[#c5a059] mb-5">
          The Promise
        </p>
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light uppercase tracking-[0.14em] text-[#f2ede4] leading-none mb-5">
          Get It Sold
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#9b9ca1] font-light leading-relaxed">
          Results for sellers. Guidance for buyers. Real estate done with care in Pahrump.
        </p>
      </div>

      <div className="space-y-20 sm:space-y-28 lg:space-y-36 pb-24 sm:pb-32">
        {CHAPTERS.map((chapter) => {
          const imageFirst = chapter.side === 'left';

          return (
            <article
              key={chapter.id}
              data-side={chapter.side}
              className="gis-row max-w-7xl mx-auto px-6 sm:px-8"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  imageFirst ? '' : 'lg:[&>*:first-child]:order-2'
                }`}
              >
                <div className="lg:col-span-7">
                  <div className="gis-media relative aspect-[16/11] overflow-hidden bg-[#15171b]">
                    <img
                      className="gis-img absolute inset-0 w-full h-full object-cover will-change-transform"
                      src={chapter.image}
                      alt={chapter.imageAlt}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/50 via-transparent to-transparent pointer-events-none" />

                    {'stats' in chapter && chapter.stats && (
                      <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto flex gap-3">
                        {chapter.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="px-4 py-3 sm:px-5 sm:py-4 bg-[#0c0d0e]/80 backdrop-blur-md border border-[#2a2d32]/80"
                          >
                            <div className="font-display text-2xl sm:text-3xl text-[#c5a059] leading-none mb-1">
                              {stat.value}
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.2em] text-[#9b9ca1]">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="gis-copy lg:col-span-5">
                  <div className="gis-item flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs tracking-widest text-[#c5a059]">
                      {chapter.index}
                    </span>
                    <span className="w-8 h-px bg-[#c5a059]/50" />
                    <span className="text-xs uppercase tracking-[0.28em] text-[#9b9ca1]">
                      {chapter.eyebrow}
                    </span>
                  </div>

                  <h3 className="gis-item font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-light text-[#f2ede4] leading-[1.15] tracking-tight mb-4">
                    {chapter.title}
                  </h3>

                  {'accent' in chapter && chapter.accent && (
                    <p className="gis-item font-display text-xl sm:text-2xl italic text-[#e8c88f] mb-4">
                      {chapter.accent}
                    </p>
                  )}

                  <p className="gis-item text-sm sm:text-base text-[#9b9ca1] font-light leading-relaxed mb-8">
                    {chapter.body}
                  </p>

                  <button
                    type="button"
                    onClick={() => scrollTo('#inquire')}
                    className="gis-item inline-flex w-full sm:w-auto items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-[#0c0d0e] bg-[#c5a059] hover:bg-[#e4caa0] px-5 py-3 transition-colors"
                  >
                    Talk with Marci
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
