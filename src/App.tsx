import React from 'react';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { FeaturedEstates } from './components/FeaturedEstates';
import { EditorialStory } from './components/EditorialStory';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#0c0d0e] text-[#f2ede4] font-sans selection:bg-[#c5a059] selection:text-[#0c0d0e]">
        {/* Fixed Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* Section 1: Hero with 6-step GSAP Sequence and Parallax */}
          <Hero />

          {/* Section 2: GSAP Animated Statistics Counters */}
          <StatsSection />

          {/* Section 3: Curated Architectural Estates & Zoom Micro-interactions */}
          <FeaturedEstates />

          {/* Section 4: Architectural Manifesto, Staggered Headline Mask & Parallax */}
          <EditorialStory />

          {/* Section 5: Asymmetric Editorial Gallery + Fullscreen GSAP Lightbox */}
          <GallerySection />

          {/* Section 6: Private Advisory Consultation & Discretion Protocol */}
          <ContactSection />
        </main>

        {/* Footer with Lenis Smooth Back to Summit */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
