import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  // Sync reduced motion media query changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize or destroy Lenis based on reduced motion
  useEffect(() => {
    if (isReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }
      return;
    }

    // Initialize Lenis with refined architectural deceleration
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    // Connect Lenis to GSAP ticker for frame-perfect animation alignment
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM has settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [isReducedMotion]);

  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion((prev) => !prev);
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (lenisRef.current && !isReducedMotion) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -80,
        duration: options?.duration ?? 1.2,
      });
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset + (options?.offset ?? -80);
        window.scrollTo({ top, behavior: isReducedMotion ? 'auto' : 'smooth' });
      }
    }
  }, [isReducedMotion]);

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
