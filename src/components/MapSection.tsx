import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { softReveal } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8981.290985053463!2d-116.02576089423701!3d36.21521746208774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c637c1f4d7bcb3%3A0xa8d2ba43a3401d7!2sDesert%20View%20Hospital!5e1!3m2!1sen!2sph!4v1789061806505!5m2!1sen!2sph';

export const MapSection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      softReveal(frameRef.current, sectionRef.current, { y: 20, duration: 0.6 });

      gsap.fromTo(
        veilRef.current,
        { opacity: 0.4 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="map"
      ref={sectionRef}
      aria-label="Office location map"
      className="relative z-20 w-full border-t border-[#181a1e] bg-[#070809] scroll-mt-28"
    >
      <div
        ref={frameRef}
        className="relative w-full h-[280px] sm:h-[400px] lg:h-[450px] overflow-hidden"
      >
        <iframe
          title="Marci Metzger office location map"
          src={MAP_EMBED_SRC}
          className="absolute inset-0 w-full h-full border-0 grayscale-[30%] contrast-[1.05]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div
          ref={veilRef}
          className="pointer-events-none absolute inset-0 bg-[#0c0d0e]"
          aria-hidden
        />
      </div>
    </section>
  );
};

