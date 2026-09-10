import React, { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { Search } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomSelect } from './CustomSelect';
import { viewportReveals, parallaxImage, VIEWPORT } from '../lib/scrollAnimations';

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  'Any',
  'Alamo',
  'Alton',
  'Amargosa Valley',
  'Beatty',
  'Beryl',
  'Blue Diamond',
  'Boulder City',
  'Brian Head',
  'Cal-Nev-Ari',
  'Caliente',
  'Cold Creek',
  'Crystal',
  'Duck Creek Village',
  'Dyer',
  'Elko',
  'Ely',
  'Goldfield',
  'Goodsprings',
  'Hatch',
  'Henderson',
  'Las Vegas',
  'Manhattan',
  'Mesquite',
  'Moapa',
  'Mount Charleston',
  'North Las Vegas',
  'Overton',
  'Pahrump',
  'Palm Gardens',
];

const PROPERTY_TYPES = ['Any', 'Land', 'Residential Lease', 'High Rise', 'Residential'];

const SORT_OPTIONS = [
  'Newest',
  'Oldest',
  'Least Expensive to Most',
  'Most Expensive to Least',
  'Bedrooms (Low to High)',
  'Bedrooms (High to Low)',
  'Bathrooms (Low to High)',
  'Bathrooms (High to Low)',
];

const BED_OPTIONS = ['Any Number', 'Studio', '1+', '2+', '3+', '4+', '5+', '6+'];
const BATH_OPTIONS = ['Any Number', '1+', '2+', '3+', '4+', '5+', '6+'];

export type ListingSearchFilters = {
  location: string;
  type: string;
  sortBy: string;
  bedrooms: string;
  baths: string;
  minPrice: string;
  maxPrice: string;
};

const DEFAULT_FILTERS: ListingSearchFilters = {
  location: 'Any',
  type: 'Any',
  sortBy: 'Newest',
  bedrooms: 'Any Number',
  baths: 'Any Number',
  minPrice: '',
  maxPrice: '',
};

interface SearchListingsSectionProps {
  onSearch?: (filters: ListingSearchFilters) => void;
}

export const SearchListingsSection: React.FC<SearchListingsSectionProps> = ({ onSearch }) => {
  const { isReducedMotion, scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const panelRef = useRef<HTMLFormElement>(null);
  const [filters, setFilters] = useState<ListingSearchFilters>(DEFAULT_FILTERS);
  const [openSelectId, setOpenSelectId] = useState<string | null>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const bgMm = gsap.matchMedia();
      bgMm.add(VIEWPORT.mobile, () => {
        parallaxImage(bgRef.current, sectionRef.current, {
          fromScale: 1.16,
          yFrom: -6,
          yTo: 8,
        });
      });
      bgMm.add(VIEWPORT.desktop, () => {
        parallaxImage(bgRef.current, sectionRef.current, {
          fromScale: 1.22,
          yFrom: -10,
          yTo: 14,
          scrub: 0.6,
        });
      });

      viewportReveals(({ mobile, desktop }) => {
        mobile('.search-title', sectionRef.current, { y: 18 });
        desktop('.search-title', sectionRef.current, {
          y: 44,
          filterBlur: 4,
          fromOpacity: 0.15,
          duration: 0.95,
        });

        mobile(panelRef.current, panelRef.current, { y: 24, fromOpacity: 0.35, duration: 0.6 });
        desktop(panelRef.current, panelRef.current, {
          y: 40,
          scale: 0.96,
          fromOpacity: 0.2,
          duration: 0.9,
          ease: 'power3.out',
        });

        mobile('.search-field', panelRef.current, {
          y: 12,
          stagger: 0.04,
          duration: 0.45,
          start: 'top 88%',
        });
        desktop('.search-field', panelRef.current, {
          y: 20,
          stagger: 0.07,
          duration: 0.6,
          fromOpacity: 0.25,
          start: 'top 86%',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSelectId(null);
    onSearch?.(filters);
    scrollTo('#inquire');
  };

  const inputClass =
    'w-full bg-[#181a1f] border border-[#2a2d32] rounded-lg px-3.5 py-3 text-base sm:text-sm text-[#f2ede4] placeholder-[#555a64] focus:outline-none focus:border-[#c5a059] transition-colors min-h-11';
  const labelClass = 'block text-[11px] uppercase tracking-[0.18em] text-[#c5a059] mb-2 font-medium';

  return (
    <section
      id="search-listings"
      ref={sectionRef}
      className="relative z-20 overflow-visible scroll-mt-28"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={bgRef}
          src="/search-dream-home.jpg"
          alt="Modern luxury home with pool at sunset"
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0c0d0e]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d0e]/70 via-[#0c0d0e]/35 to-[#0c0d0e]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-24 sm:py-32 lg:py-36">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="search-title font-display text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-[0.06em] sm:tracking-[0.12em] text-[#f2ede4]">
            Find Your Dream Home
          </h2>
        </div>

        <form
          ref={panelRef}
          onSubmit={handleSubmit}
          className="relative z-30 bg-[#111316]/92 backdrop-blur-xl border border-[#2a2d32] p-5 sm:p-8 lg:p-10 shadow-2xl overflow-visible"
        >
          <h3 className="search-field font-display text-lg sm:text-2xl tracking-[0.1em] sm:tracking-[0.14em] uppercase text-[#c5a059] text-center mb-6 sm:mb-8">
            Search Listings
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-5">
            <div className="search-field">
            <CustomSelect
              id="search-location"
              label="Location"
              value={filters.location}
              options={LOCATIONS}
              onChange={(location) => setFilters({ ...filters, location })}
              openId={openSelectId}
              setOpenId={setOpenSelectId}
            />
            </div>
            <div className="search-field">
            <CustomSelect
              id="search-type"
              label="Type"
              value={filters.type}
              options={PROPERTY_TYPES}
              onChange={(type) => setFilters({ ...filters, type })}
              openId={openSelectId}
              setOpenId={setOpenSelectId}
            />
            </div>
            <div className="search-field">
            <CustomSelect
              id="search-sort"
              label="Sort By"
              value={filters.sortBy}
              options={SORT_OPTIONS}
              onChange={(sortBy) => setFilters({ ...filters, sortBy })}
              openId={openSelectId}
              setOpenId={setOpenSelectId}
            />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-end">
            <div className="search-field">
            <CustomSelect
              id="search-beds"
              label="Bedrooms"
              value={filters.bedrooms}
              options={BED_OPTIONS}
              onChange={(bedrooms) => setFilters({ ...filters, bedrooms })}
              openId={openSelectId}
              setOpenId={setOpenSelectId}
            />
            </div>
            <div className="search-field">
            <CustomSelect
              id="search-baths"
              label="Baths"
              value={filters.baths}
              options={BATH_OPTIONS}
              onChange={(baths) => setFilters({ ...filters, baths })}
              openId={openSelectId}
              setOpenId={setOpenSelectId}
            />
            </div>

            <div className="search-field">
              <label className={labelClass} htmlFor="search-min">
                Min Price
              </label>
              <input
                id="search-min"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 250000"
                className={inputClass}
                value={filters.minPrice}
                onFocus={() => setOpenSelectId(null)}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
            </div>

            <div className="search-field">
              <label className={labelClass} htmlFor="search-max">
                Max Price
              </label>
              <input
                id="search-max"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 750000"
                className={inputClass}
                value={filters.maxPrice}
                onFocus={() => setOpenSelectId(null)}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="search-field w-full min-h-11 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#f2ede4] text-[#0c0d0e] hover:bg-[#c5a059] font-semibold text-xs uppercase tracking-[0.2em] transition-colors duration-300"
            >
              <Search className="w-4 h-4" />
              <span>Search Now</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
