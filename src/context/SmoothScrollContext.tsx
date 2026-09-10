import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { flushPassedScrollTriggers } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  pauseScroll: () => void;
  resumeScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  isReducedMotion: false,
  toggleReducedMotion: () => {},
  scrollTo: () => {},
  pauseScroll: () => {},
  resumeScroll: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
      autoResize: true,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let flushRaf = 0;
    const onScroll = () => {
      ScrollTrigger.update();
      // Catch reveals skipped by fast / programmatic scrolls (mobile navbar jumps)
      if (!flushRaf) {
        flushRaf = requestAnimationFrame(() => {
          flushRaf = 0;
          flushPassedScrollTriggers();
        });
      }
    };
    lenis.on('scroll', onScroll);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => {
      ScrollTrigger.refresh();
    };

    const timeout = window.setTimeout(refresh, 120);
    const onLoad = () => refresh();
    const onResize = () => {
      lenis.resize();
      refresh();
    };

    window.addEventListener('load', onLoad);
    window.addEventListener('resize', onResize);

    // Images can change layout height after load — refresh ST once they settle
    const imgs = Array.from(document.images);
    let pending = imgs.filter((img) => !img.complete).length;
    if (pending === 0) {
      window.setTimeout(refresh, 250);
    } else {
      imgs.forEach((img) => {
        if (img.complete) return;
        const done = () => {
          pending -= 1;
          if (pending <= 0) refresh();
        };
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
    }

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('resize', onResize);
      lenis.off('scroll', onScroll);
      if (flushRaf) cancelAnimationFrame(flushRaf);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [isReducedMotion]);

  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion((prev) => !prev);
  }, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
      const offset = options?.offset ?? -96;
      const duration = options?.duration ?? 1.25;

      const afterScroll = () => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          flushPassedScrollTriggers();
          window.setTimeout(() => flushPassedScrollTriggers(), 100);
        });
      };

      if (lenisRef.current && !isReducedMotion) {
        lenisRef.current.scrollTo(target, {
          offset,
          duration,
          onComplete: afterScroll,
        });
        return;
      }

      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el instanceof HTMLElement) {
        const top = el.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top, behavior: isReducedMotion ? 'auto' : 'smooth' });
        window.setTimeout(afterScroll, isReducedMotion ? 50 : Math.min(duration * 1000, 1400));
      }
    },
    [isReducedMotion]
  );

  const pauseScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    document.body.style.overflow = 'hidden';
  }, []);

  const resumeScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
    document.body.style.overflow = '';
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        isReducedMotion,
        toggleReducedMotion,
        scrollTo,
        pauseScroll,
        resumeScroll,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
