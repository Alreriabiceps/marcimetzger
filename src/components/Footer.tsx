import React from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { ArrowUp, Compass, Shield, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="bg-[#070809] text-[#cfcac0] border-t border-[#181a1e] py-16 sm:py-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#1b1e24]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                  <span className="font-display text-xs tracking-widest font-semibold">L</span>
                </span>
                <span className="font-display text-xl tracking-[0.2em] font-medium text-[#f2ede4] uppercase">
                  L’Arche
                </span>
              </div>
              <p className="text-xs text-[#8e929b] font-light leading-relaxed max-w-sm">
                A private international architectural advisory representing signature modernist,
                brutalist, and high-alpine residences constructed by world-renowned laureates.
              </p>
            </div>

            <div className="mt-8 text-[11px] text-[#555a64] font-mono">
              Zurich • Manhattan • Kyoto • London • Cap d’Antibes
            </div>
          </div>

          {/* Ateliers */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-4">
              Design Ateliers
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9b9ca1]">
              <li className="hover:text-[#f2ede4] transition-colors">Zurich: Bahnhofstrasse 24</li>
              <li className="hover:text-[#f2ede4] transition-colors">New York: 57th &amp; Park Ave</li>
              <li className="hover:text-[#f2ede4] transition-colors">Tokyo: Minami-Aoyama 5-Chome</li>
              <li className="hover:text-[#f2ede4] transition-colors">London: Mayfair Curzon St</li>
            </ul>
          </div>

          {/* Quick Nav & Back to Top */}
          <div className="md:col-span-4 flex flex-col justify-between md:items-end">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-4 md:text-right">
                Curated Navigation
              </h4>
              <div className="flex flex-wrap gap-4 md:justify-end text-xs text-[#9b9ca1]">
                <button onClick={() => scrollTo('#estates')} className="hover:text-[#f2ede4]">
                  Estates
                </button>
                <button onClick={() => scrollTo('#philosophy')} className="hover:text-[#f2ede4]">
                  Philosophy
                </button>
                <button onClick={() => scrollTo('#gallery')} className="hover:text-[#f2ede4]">
                  Gallery
                </button>
                <button onClick={() => scrollTo('#inquire')} className="hover:text-[#f2ede4]">
                  Advisory
                </button>
              </div>
            </div>

            {/* Back to top button using Lenis */}
            <button
              id="footer-back-to-top"
              onClick={() => scrollTo('#hero', { duration: 1.5 })}
              className="mt-8 md:mt-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#262931] hover:border-[#c5a059] text-xs uppercase tracking-widest text-[#cfcac0] hover:text-[#f2ede4] transition-colors"
            >
              <span>Return to Summit</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#c5a059]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#616670]">
          <p>© {new Date().getFullYear()} L’Arche Architecture &amp; Luxury Estates S.A. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#9b9ca1] cursor-pointer">Fiduciary Discretion Charter</span>
            <span className="hover:text-[#9b9ca1] cursor-pointer">Privacy &amp; Encryption</span>
            <span className="hover:text-[#9b9ca1] cursor-pointer">Architectural Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
