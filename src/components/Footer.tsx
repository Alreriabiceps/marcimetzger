import React, { useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Phone, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Logo } from './Logo';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { viewportReveals } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

const YelpIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.12 13.5c-.55.1-1.04-.34-1.04-.9V3.96c0-.62.5-1.12 1.12-1.12.55 0 1.02.4 1.1.94l1.3 8.24c.1.66-.42 1.26-1.08 1.38l-.4.1Zm3.3-1.62c-.48.28-1.1.08-1.32-.44l-3.1-7.1c-.24-.56.02-1.2.58-1.44.5-.22 1.1.02 1.34.5l3.1 7.1c.24.56-.02 1.2-.58 1.38h-.02Zm1.58 2.34c-.3.48-.94.6-1.42.28l-6.3-4.2c-.5-.34-.62-1-.3-1.5.3-.46.9-.58 1.36-.3l6.3 4.2c.5.34.62 1 .3 1.5l.06.02Zm-2.2 2.86c.16.54-.2 1.1-.74 1.2l-7.5 1.48c-.56.1-1.1-.26-1.2-.82-.1-.54.26-1.08.8-1.18l7.5-1.48c.56-.1 1.1.26 1.2.8l-.06 0Zm-5.66-.2c.5.28.66.92.36 1.4L5.9 21.9c-.32.5-.96.64-1.46.32-.5-.32-.64-.96-.32-1.46l3.6-5.62c.3-.48.94-.64 1.42-.36Z" />
  </svg>
);

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/MarciHomes/', Icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/marcimetzger_theridge/', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/marci-metzger-30642496/', Icon: Linkedin },
  { label: 'Yelp', href: 'https://www.yelp.com/biz/marci-metzger-the-ridge-realty-pahrump', Icon: YelpIcon },
];

export const Footer: React.FC = () => {
  const { scrollTo, isReducedMotion } = useSmoothScroll();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      viewportReveals(({ mobile, desktop }) => {
        mobile('.footer-reveal', footerRef.current, { stagger: 0.08, start: 'top 95%' });
        desktop('.footer-reveal', footerRef.current, {
          y: 28,
          stagger: 0.1,
          duration: 0.8,
          fromOpacity: 0.2,
          start: 'top 92%',
        });

        mobile('.footer-link', footerRef.current, {
          y: 8,
          fromOpacity: 0.5,
          stagger: 0.03,
          duration: 0.4,
          start: 'top 92%',
        });
        desktop('.footer-link', footerRef.current, {
          y: 16,
          fromOpacity: 0.35,
          stagger: 0.05,
          duration: 0.55,
          start: 'top 90%',
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <footer
      ref={footerRef}
      className="bg-[#070809] text-[#cfcac0] border-t border-[#181a1e] py-10 sm:py-12 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 border-b border-[#1b1e24]">
          <div className="footer-reveal md:col-span-5">
            <div className="mb-3 text-[#f2ede4]">
              <Logo className="h-9 sm:h-10 w-auto" />
            </div>
            <p className="text-xs text-[#8e929b] font-light leading-relaxed max-w-sm">
              The Ridge Realty Group — your Pahrump realtor for nearly three decades. Don&apos;t just
              list it… get it sold.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 text-[#8e929b] hover:text-[#c5a059] transition-colors duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-5 text-[11px] text-[#555a64] font-mono">
              Pahrump, Nevada
            </div>
          </div>

          <div className="footer-reveal md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3">
              Office
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9b9ca1]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                <span>3190 HW-160, Suite F<br />Pahrump, Nevada 89048</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <a href="tel:2069196886" className="hover:text-[#f2ede4] transition-colors">
                  (206) 919-6886
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                <span>Daily 8:00 am – 7:00 pm</span>
              </li>
            </ul>
          </div>

          <div className="footer-reveal md:col-span-4 flex flex-col md:items-end">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-3 md:text-right">
                Navigate
              </h4>
              <div className="flex flex-col gap-0.5 md:items-end text-xs text-[#9b9ca1]">
                <button onClick={() => scrollTo('#about')} className="footer-link hover:text-[#f2ede4] text-left md:text-right py-1.5">
                  About
                </button>
                <button onClick={() => scrollTo('#get-it-sold')} className="footer-link hover:text-[#f2ede4] text-left md:text-right py-1.5">
                  Get It Sold
                </button>
                <button onClick={() => scrollTo('#search-listings')} className="footer-link hover:text-[#f2ede4] text-left md:text-right py-1.5">
                  Listings
                </button>
                <button onClick={() => scrollTo('#services')} className="footer-link hover:text-[#f2ede4] text-left md:text-right py-1.5">
                  Services
                </button>
                <button onClick={() => scrollTo('#gallery')} className="footer-link hover:text-[#f2ede4] text-left md:text-right py-1.5">
                  Gallery
                </button>
                <button onClick={() => scrollTo('#inquire')} className="footer-link hover:text-[#f2ede4] text-left md:text-right py-1.5">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-reveal pt-5 flex justify-center text-[11px] text-[#616670] text-center">
          <p>© {new Date().getFullYear()} Marci Metzger — The Ridge Realty Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
