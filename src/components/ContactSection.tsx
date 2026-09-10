import React, { useState, useRef, useEffect } from 'react';
import Select, { type StylesConfig, type SingleValue } from 'react-select';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowUpRight, CheckCircle2, MapPin, Phone, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { softReveal } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

type InterestOption = { value: string; label: string };

const INTEREST_OPTIONS: InterestOption[] = [
  { value: 'Buying a Home', label: 'Buying a Home' },
  { value: 'Selling a Home', label: 'Selling a Home' },
  { value: 'Investment Property', label: 'Investment Property' },
  { value: 'Land / Acreage', label: 'Land / Acreage' },
  { value: 'Market Consultation', label: 'Market Consultation' },
];

const selectStyles: StylesConfig<InterestOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    backgroundColor: '#181a1f',
    borderColor: state.isFocused ? '#c5a059' : '#272a32',
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: 'none',
    paddingLeft: 4,
    paddingRight: 4,
    cursor: 'pointer',
    transition: 'border-color 150ms ease',
    '&:hover': {
      borderColor: state.isFocused ? '#c5a059' : '#3a3e48',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '2px 12px',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f2ede4',
    fontSize: 14,
  }),
  placeholder: (base) => ({
    ...base,
    color: '#555a64',
    fontSize: 14,
  }),
  input: (base) => ({
    ...base,
    color: '#f2ede4',
    fontSize: 14,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? '#c5a059' : '#9b9ca1',
    padding: '8px 12px',
    transition: 'color 150ms ease, transform 150ms ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    '&:hover': {
      color: '#c5a059',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#181a1f',
    border: '1px solid #272a32',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
    zIndex: 30,
  }),
  menuList: (base) => ({
    ...base,
    padding: 6,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#c5a059'
      : state.isFocused
        ? '#22252c'
        : 'transparent',
    color: state.isSelected ? '#0c0d0e' : '#f2ede4',
    fontSize: 14,
    borderRadius: 8,
    cursor: 'pointer',
    padding: '10px 12px',
    '&:active': {
      backgroundColor: state.isSelected ? '#c5a059' : '#2a2d32',
    },
  }),
};

export const ContactSection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Buying a Home',
    message: '',
  });

  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      softReveal(formCardRef.current, sectionRef.current, {
        y: 24,
        fromOpacity: 0.35,
        duration: 0.6,
      });
      softReveal(copyRef.current, sectionRef.current, {
        y: 14,
        delay: 0.08,
      });
      softReveal(formColRef.current, sectionRef.current, {
        y: 14,
        delay: 0.12,
      });
      softReveal('.contact-field', formColRef.current, {
        y: 10,
        fromOpacity: 0.45,
        stagger: 0.04,
        duration: 0.4,
        delay: 0.16,
        start: 'top 95%',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="inquire"
      ref={sectionRef}
      className="py-28 sm:py-36 bg-[#08090a] text-[#f2ede4] border-t border-[#1a1d22] relative z-20 scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          ref={formCardRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 bg-[#111316] border border-[#23272e] rounded-2xl sm:rounded-3xl p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-visible"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

          <div ref={copyRef} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-4">
                <Phone className="w-3.5 h-3.5" />
                <span>Call or Visit</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#f2ede4] tracking-tight leading-tight mb-6">
                Send a Message
              </h2>

              <p className="text-sm text-[#9b9ca1] leading-relaxed font-light mb-8">
                Ready to buy, sell, or learn more about the Pahrump market? Reach out — appointments
                outside office hours are available upon request. Just call!
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#1f2228]">
              <div className="flex items-start gap-3 text-xs text-[#cfcac0]">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>
                  Marci Metzger — The Ridge Realty Group
                  <br />
                  3190 HW-160, Suite F, Pahrump, Nevada 89048
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#cfcac0]">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <a href="tel:2069196886" className="hover:text-[#c5a059] transition-colors">
                  (206) 919-6886
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#cfcac0]">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Open daily 8:00 am – 7:00 pm</span>
              </div>
            </div>
          </div>

          <div ref={formColRef} className="lg:col-span-7">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#16181c] border border-[#272b34] rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059] flex items-center justify-center text-[#c5a059] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl text-[#f2ede4] font-medium mb-2">
                  Message Received
                </h3>
                <p className="text-sm text-[#9b9ca1] max-w-md font-light leading-relaxed mb-6">
                  Thank you{formData.name ? `, ${formData.name}` : ''}. Marci or a member of The Ridge
                  Realty Group will get back to you soon. Prefer to talk now? Call{' '}
                  <a href="tel:2069196886" className="text-[#c5a059]">
                    (206) 919-6886
                  </a>
                  .
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 border border-[#2d313b] text-xs uppercase tracking-wider text-[#cfcac0] hover:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="contact-field">
                    <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full min-h-11 px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-base sm:text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  <div className="contact-field">
                    <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full min-h-11 px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-base sm:text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label
                    htmlFor="interest-select"
                    className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium"
                  >
                    I&apos;m Interested In
                  </label>
                  <Select<InterestOption, false>
                    inputId="interest-select"
                    options={INTEREST_OPTIONS}
                    value={INTEREST_OPTIONS.find((o) => o.value === formData.interest) ?? null}
                    onChange={(option: SingleValue<InterestOption>) => {
                      if (option) {
                        setFormData({ ...formData, interest: option.value });
                      }
                    }}
                    styles={{
                      ...selectStyles,
                      menuPortal: (base) => ({ ...base, zIndex: 80 }),
                    }}
                    isSearchable={false}
                    menuPlacement="auto"
                    menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                    classNamePrefix="interest-select"
                  />
                </div>

                <div className="contact-field">
                  <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your move, timeline, or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-base sm:text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors resize-none"
                  />
                </div>

                <button
                  id="inquire-submit-btn"
                  type="submit"
                  className="contact-field group w-full min-h-11 py-4 px-8 bg-[#c5a059] text-[#0c0d0e] font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#e4caa0] hover:shadow-xl hover:shadow-[#c5a059]/20 flex items-center justify-center gap-3"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Send Message
                  </span>
                  <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
