import React, { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Phone, X, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FloatingCTA: React.FC = () => {
  const { scrollTo, isReducedMotion } = useSmoothScroll();
  const [isOpen, setIsOpen] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion || !wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { y: 16, opacity: 0.5, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isReducedMotion, isOpen]);

  if (!isOpen) {
    return (
      <div ref={wrapRef} className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pb-[env(safe-area-inset-bottom)]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open contact options"
          className="group flex items-center gap-2.5 rounded-full bg-[#c5a059] text-[#0c0d0e] pl-4 pr-5 py-3 min-h-11 shadow-lg shadow-black/40 hover:bg-[#e4caa0] transition-colors duration-300"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs uppercase tracking-[0.18em] font-medium">Let&apos;s Talk</span>
        </button>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-[min(100vw-2.5rem,20rem)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="relative bg-[#12141a]/95 backdrop-blur-md border border-[#2a2d35] shadow-2xl shadow-black/50 rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Collapse contact panel"
          className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full flex items-center justify-center text-[#9b9ca1] hover:text-[#f2ede4] hover:bg-[#1c1f26] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 pr-12">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] mb-2">
            Ready to move?
          </p>
          <p className="font-display text-lg text-[#f2ede4] leading-snug mb-1">
            Don&apos;t just list it… get it sold.
          </p>
          <p className="text-xs text-[#9b9ca1] font-light mb-5">
            Call Marci or send a message — responses daily 8am–7pm.
          </p>

          <div className="flex flex-col gap-2.5">
            <a
              href="tel:2069196886"
              className="inline-flex items-center justify-center gap-2 w-full min-h-11 rounded-full bg-[#c5a059] text-[#0c0d0e] py-3 text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#e4caa0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call (206) 919-6886</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                scrollTo('#inquire');
              }}
              className="inline-flex items-center justify-center w-full min-h-11 rounded-full border border-[#3a3e48] text-[#cfcac0] py-3 text-xs uppercase tracking-[0.18em] hover:border-[#c5a059]/60 hover:text-[#f2ede4] transition-colors"
            >
              Send a Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
