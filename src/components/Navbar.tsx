import React, { useState, useEffect, useRef } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowUpRight, Menu, X, Sparkles, Activity } from 'lucide-react';
import { gsap } from 'gsap';

export const Navbar: React.FC = () => {
  const { scrollTo, isReducedMotion, toggleReducedMotion } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle magnetic effect on the primary CTA button
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

  const navLinks = [
    { label: 'Estates', target: '#estates' },
    { label: 'Philosophy', target: '#philosophy' },
    { label: 'Editorial Gallery', target: '#gallery' },
    { label: 'Key Metrics', target: '#metrics' },
    { label: 'Private Advisory', target: '#inquire' },
  ];

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(target);
  };

  return (
    <header
      id="main-navbar"
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-[#0c0d0e]/85 backdrop-blur-md border-b border-[#2a2d32]/60 shadow-xl'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <span className="w-8 h-8 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] group-hover:border-[#c5a059] group-hover:bg-[#c5a059]/10 transition-all duration-300">
            <span className="font-display text-xs tracking-widest font-semibold">L</span>
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-[0.2em] font-medium text-[#f2ede4] uppercase group-hover:text-[#c5a059] transition-colors duration-300">
              L’Arche
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#9b9ca1]">
              Architectural Estates
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className="relative py-1 text-xs tracking-[0.15em] uppercase text-[#cfcac0] hover:text-[#ffffff] transition-colors duration-300 group"
            >
              {link.label}
              {/* Elegant hover underline reveal */}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a059] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Controls: Reduced Motion Toggle + Private Inquiry CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Motion Status / Toggle */}
          <button
            id="reduced-motion-toggle"
            onClick={toggleReducedMotion}
            title={isReducedMotion ? 'Enable Lenis Smooth Scroll' : 'Disable Smooth Scroll (Reduced Motion)'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] tracking-wide transition-all duration-300 ${
              isReducedMotion
                ? 'border-[#4a4e57] text-[#9b9ca1] bg-[#16181b]'
                : 'border-[#c5a059]/30 text-[#e4caa0] bg-[#c5a059]/5 hover:border-[#c5a059]/60'
            }`}
          >
            <Activity className={`w-3.5 h-3.5 ${!isReducedMotion ? 'text-[#c5a059] animate-pulse' : 'text-[#6b7280]'}`} />
            <span>{isReducedMotion ? 'Motion: Reduced' : 'Motion: Lenis 60fps'}</span>
          </button>

          {/* Magnetic CTA Button */}
          <button
            ref={ctaBtnRef}
            id="nav-cta-inquire"
            onClick={(e) => handleNavClick(e, '#inquire')}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f2ede4] text-[#0c0d0e] hover:bg-[#c5a059] transition-colors duration-300 shadow-md overflow-hidden text-xs uppercase tracking-widest font-medium"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#f2ede4] border border-[#2a2d32] rounded-lg hover:border-[#c5a059]/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#0c0d0e]/95 backdrop-blur-xl border-b border-[#2a2d32] space-y-4">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.target}
                onClick={(e) => handleNavClick(e, link.target)}
                className="text-sm uppercase tracking-widest text-[#cfcac0] hover:text-[#c5a059] py-2 border-b border-[#1c1e22]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-3">
            <button
              onClick={toggleReducedMotion}
              className="w-full flex items-center justify-between px-3 py-2 text-xs border border-[#2a2d32] rounded-lg text-[#cfcac0]"
            >
              <span>Scroll Animation</span>
              <span className={!isReducedMotion ? 'text-[#c5a059]' : 'text-gray-400'}>
                {!isReducedMotion ? 'Lenis Fluid' : 'Reduced Motion'}
              </span>
            </button>

            <button
              onClick={(e) => handleNavClick(e, '#inquire')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#c5a059] text-[#0c0d0e] rounded-lg font-medium text-xs uppercase tracking-widest"
            >
              <span>Private Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
