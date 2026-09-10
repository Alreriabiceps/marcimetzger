import React, { useState, useRef, useEffect } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Lock, Sparkles, Building2, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const { isReducedMotion } = useSmoothScroll();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    entity: '',
    interest: 'Big Sur Cliff Residence ($28.5M)',
    message: '',
  });

  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(formCardRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
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
      className="py-28 sm:py-36 bg-[#08090a] text-[#f2ede4] border-t border-[#1a1d22] relative z-20"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div
          ref={formCardRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 bg-[#111316] border border-[#23272e] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Context & Discretion Guarantee */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-4">
                <Lock className="w-3.5 h-3.5" />
                <span>Strict Non-Disclosure Protocol</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#f2ede4] tracking-tight leading-tight mb-6">
                Private Advisory &amp; Off-Market Dossiers.
              </h2>

              <p className="text-sm text-[#9b9ca1] leading-relaxed font-light mb-8">
                Due to the international stature of our patrons and architectural assets, viewing appointments
                require verified credentialing under strict confidentiality standards.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-[#1f2228]">
              <div className="flex items-center gap-3 text-xs text-[#cfcac0]">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Fiduciary privacy agreements enforced worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#cfcac0]">
                <Building2 className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Direct consultation with Pritzker-associated ateliers</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#cfcac0]">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Bespoke encrypted communications channels</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-[#16181c] border border-[#272b34] rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-[#c5a059]/15 border border-[#c5a059] flex items-center justify-center text-[#c5a059] mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl text-[#f2ede4] font-medium mb-2">
                  Inquiry Encrypted &amp; Dispatched
                </h3>
                <p className="text-sm text-[#9b9ca1] max-w-md font-light leading-relaxed mb-6">
                  Thank you, {formData.name || 'esteemed patron'}. A senior fiduciary partner from our Zurich or New York atelier
                  will reach out under confidential cover within 6 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full border border-[#2d313b] text-xs uppercase tracking-wider text-[#cfcac0] hover:text-white"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                      Patron Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady / Dr. / Mr."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                      Confidential Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="office@family-office.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                      Represented Entity / Family Office
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Geneva Trust, Private Principal"
                      value={formData.entity}
                      onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                      className="w-full px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                      Primary Estate of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-sm text-[#f2ede4] focus:outline-none focus:border-[#c5a059] transition-colors"
                    >
                      <option value="Big Sur Cliff Residence ($28.5M)">The Solarium Cliff Residence, Big Sur ($28.5M)</option>
                      <option value="Engadin Glass Pavilion ($34M)">The Glass Pavilion, St. Moritz ($34.0M)</option>
                      <option value="Penthouse Aurelia Manhattan ($45M)">Penthouse Aurelia, Manhattan ($45.0M)</option>
                      <option value="Obsidian Ocotillo Arizona ($21.8M)">The Obsidian Ocotillo Sanctuary, AZ ($21.8M)</option>
                      <option value="Villa Mare French Riviera ($39.5M)">Villa Mare Tranquillitas, French Riviera ($39.5M)</option>
                      <option value="Kyoto Pavilion Estate ($24.2M)">The Kyōto Pavilion Estate, Japan ($24.2M)</option>
                      <option value="Unlisted Private Portfolios">General Off-Market Portfolio Commission</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9b9ca1] mb-2 font-medium">
                    Private Notes &amp; Architectural Preferences
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Specific architectural requirements, acquisition timeline, or helipad specifications..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#181a1f] border border-[#272a32] rounded-xl text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors resize-none"
                  />
                </div>

                {/* Submit button with micro-interactions */}
                <button
                  ref={submitBtnRef}
                  id="inquire-submit-btn"
                  type="submit"
                  className="group w-full py-4 px-8 rounded-xl bg-[#c5a059] text-[#0c0d0e] font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#e4caa0] hover:shadow-xl hover:shadow-[#c5a059]/20 flex items-center justify-center gap-3"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Request Confidential Advisory Dossier
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
