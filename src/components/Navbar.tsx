import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Phone, Menu, X, Facebook, Instagram, Linkedin, ChevronDown, MapPin, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { Logo } from './Logo';
import { SERVICES } from '../data/servicesData';

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

const navLinks = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Get It Sold', target: '#get-it-sold' },
  { label: 'Listings', target: '#search-listings' },
  { label: 'Services', target: '#services', hasDropdown: true },
  { label: 'Gallery', target: '#gallery' },
  { label: 'Contact', target: '#inquire' },
] as const;

export const Navbar: React.FC = () => {
  const { scrollTo, isReducedMotion, pauseScroll, resumeScroll } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linkListRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);
  const scrollLockYRef = useRef(0);
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn || isReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReducedMotion]);

  const closeMobileMenu = useCallback((afterClose?: () => void) => {
    if (!drawerMounted || isClosingRef.current) return;
    isClosingRef.current = true;
    setMobileServicesOpen(false);

    const unlockScroll = () => {
      setMobileMenuOpen(false);
      setDrawerMounted(false);
      resumeScroll();
      isClosingRef.current = false;

      if (afterClose) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => afterClose());
        });
      } else {
        window.scrollTo(0, scrollLockYRef.current);
      }
    };

    if (isReducedMotion) {
      unlockScroll();
      return;
    }

    const tl = gsap.timeline({
      onComplete: unlockScroll,
    });

    tl.to(linkListRef.current?.querySelectorAll('.mobile-nav-item') || [], {
      opacity: 0,
      x: 16,
      stagger: 0.02,
      duration: 0.18,
      ease: 'power2.in',
    })
      .to(
        drawerRef.current,
        {
          x: '100%',
          duration: 0.35,
          ease: 'power3.in',
        },
        0.05
      )
      .to(
        backdropRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        0
      );
  }, [drawerMounted, isReducedMotion, resumeScroll]);

  const openMobileMenu = useCallback(() => {
    isClosingRef.current = false;
    scrollLockYRef.current = window.scrollY || window.pageYOffset || 0;
    setDrawerMounted(true);
    setMobileMenuOpen(true);
    pauseScroll();
    window.scrollTo(0, scrollLockYRef.current);
  }, [pauseScroll]);

  useEffect(() => {
    if (!drawerMounted || !mobileMenuOpen) return;

    if (isReducedMotion) {
      if (backdropRef.current) backdropRef.current.style.opacity = '1';
      if (drawerRef.current) drawerRef.current.style.transform = 'translateX(0)';
      return;
    }

    const items = drawerRef.current?.querySelectorAll('.mobile-nav-item') || [];

    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(drawerRef.current, { x: '100%' });
    gsap.set(items, { opacity: 0, x: 24 });

    const tl = gsap.timeline();
    tl.to(backdropRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    })
      .to(
        drawerRef.current,
        {
          x: 0,
          duration: 0.45,
          ease: 'power3.out',
        },
        0.05
      )
      .to(
        items,
        {
          opacity: 1,
          x: 0,
          stagger: 0.045,
          duration: 0.35,
          ease: 'power2.out',
        },
        0.2
      );
  }, [drawerMounted, mobileMenuOpen, isReducedMotion]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    closeMobileMenu(() => scrollTo(target));
  };

  return (
    <header
      id="main-navbar"
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0d0e]/90 backdrop-blur-md border-b border-[#2a2d32]/60 shadow-xl'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div
        className={`hidden sm:block border-b transition-colors duration-500 ${
          isScrolled ? 'border-[#2a2d32]/50' : 'border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-9 flex items-center justify-end gap-1.5">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-w-9 min-h-9 text-[#cfcac0] hover:text-[#c5a059] transition-colors duration-300"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>

      <div
        className={`max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="group flex items-center text-[#f2ede4] hover:text-[#c5a059] transition-colors duration-300 focus:outline-none"
        >
          <Logo className="h-8 sm:h-10 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            'hasDropdown' in link && link.hasDropdown ? (
              <div key={link.label} className="relative group/services">
                <a
                  href={link.target}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.target);
                  }}
                  className="relative inline-flex items-center gap-1 py-1 text-xs tracking-[0.15em] uppercase text-[#cfcac0] group-hover/services:text-white transition-colors duration-300"
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover/services:rotate-180" />
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a059] transition-all duration-300 ease-out group-hover/services:w-full" />
                </a>

                <div className="pointer-events-none absolute left-1/2 top-full z-50 pt-3 -translate-x-1/2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover/services:pointer-events-auto group-hover/services:opacity-100 group-hover/services:visible group-hover/services:translate-y-0">
                  <div className="min-w-[240px] border border-[#2a2d32] bg-[#111316]/98 backdrop-blur-xl shadow-2xl py-2">
                    {SERVICES.map((service) => (
                      <a
                        key={service.id}
                        href={`#${service.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(`#${service.id}`);
                        }}
                        className="block px-4 py-3 text-[11px] tracking-[0.12em] uppercase text-[#cfcac0] hover:text-[#c5a059] hover:bg-[#1a1d22] transition-colors"
                      >
                        {service.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.target);
                }}
                className="relative py-1 text-xs tracking-[0.15em] uppercase text-[#cfcac0] hover:text-[#ffffff] transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a059] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            )
          )}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <a
            ref={ctaBtnRef}
            id="nav-cta-call"
            href="tel:2069196886"
            className="group relative inline-flex items-center gap-2 px-4 py-2 bg-[#f2ede4] text-[#0c0d0e] hover:bg-[#c5a059] transition-colors duration-300 shadow-md overflow-hidden text-xs uppercase tracking-widest font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Now</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="tel:2069196886"
            aria-label="Call Marci Metzger"
            className="inline-flex items-center justify-center min-w-11 min-h-11 text-[#f2ede4] border border-[#2a2d32] hover:border-[#c5a059]/60 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => (mobileMenuOpen ? closeMobileMenu() : openMobileMenu())}
            className="inline-flex items-center justify-center min-w-11 min-h-11 text-[#f2ede4] border border-[#2a2d32] hover:border-[#c5a059]/60 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {portalReady &&
        drawerMounted &&
        createPortal(
          <div className="lg:hidden fixed inset-0 z-[70]" style={{ height: '100dvh' }}>
            <button
              ref={backdropRef}
              type="button"
              aria-label="Close menu"
              onClick={() => closeMobileMenu()}
              className="absolute inset-0 bg-[#070809]/80 backdrop-blur-sm"
            />

            <div
              ref={drawerRef}
              className="absolute top-0 right-0 h-full w-[min(100%,22rem)] max-w-full bg-[#0c0d0e] border-l border-[#2a2d32] shadow-2xl flex flex-col"
              style={{ height: '100dvh' }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1c1e22] shrink-0">
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#c5a059]">Menu</span>
                <button
                  type="button"
                  onClick={() => closeMobileMenu()}
                  className="inline-flex items-center justify-center min-w-11 min-h-11 text-[#f2ede4] border border-[#2a2d32] hover:border-[#c5a059]/60 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div ref={linkListRef} className="flex-1 min-h-0 overflow-y-auto px-5 py-4" data-lenis-prevent>
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) =>
                    'hasDropdown' in link && link.hasDropdown ? (
                      <div key={link.label} className="mobile-nav-item border-b border-[#1c1e22]">
                        <div className="flex items-center justify-between">
                          <a
                            href={link.target}
                            onClick={(e) => handleNavClick(e, link.target)}
                            className="flex-1 text-sm uppercase tracking-widest text-[#cfcac0] hover:text-[#c5a059] py-3"
                          >
                            {link.label}
                          </a>
                          <button
                            type="button"
                            aria-label="Toggle services submenu"
                            aria-expanded={mobileServicesOpen}
                            onClick={() => setMobileServicesOpen((open) => !open)}
                            className="inline-flex items-center justify-center min-w-11 min-h-11 text-[#9b9ca1] hover:text-[#c5a059]"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                mobileServicesOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        </div>
                        {mobileServicesOpen && (
                          <div className="pb-3 pl-3 space-y-1">
                            {SERVICES.map((service) => (
                              <a
                                key={service.id}
                                href={`#${service.id}`}
                                onClick={(e) => handleNavClick(e, `#${service.id}`)}
                                className="flex items-center min-h-11 py-2 text-xs uppercase tracking-[0.14em] text-[#9b9ca1] hover:text-[#c5a059]"
                              >
                                {service.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        key={link.label}
                        href={link.target}
                        onClick={(e) => handleNavClick(e, link.target)}
                        className="mobile-nav-item text-sm uppercase tracking-widest text-[#cfcac0] hover:text-[#c5a059] py-3 border-b border-[#1c1e22]"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </div>
              </div>

              <div className="mobile-nav-item shrink-0 border-t border-[#1c1e22] px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-4 bg-[#0a0b0c]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#c5a059]">Contact</p>

                <div className="space-y-3 text-xs text-[#9b9ca1]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>
                      Marci Metzger — The Ridge Realty Group
                      <br />
                      3190 HW-160, Suite F
                      <br />
                      Pahrump, Nevada 89048
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>Daily 8:00 am – 7:00 pm</span>
                  </div>
                </div>

                <a
                  href="tel:2069196886"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#c5a059] text-[#0c0d0e] font-medium text-xs uppercase tracking-widest hover:bg-[#e4caa0] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (206) 919-6886</span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};
