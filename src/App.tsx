import React from 'react';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { GetItSoldSection } from './components/GetItSoldSection';
import { SearchListingsSection } from './components/SearchListingsSection';
import { AffiliationsSection } from './components/AffiliationsSection';
import { EditorialStory } from './components/EditorialStory';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#0c0d0e] text-[#f2ede4] font-sans selection:bg-[#c5a059] selection:text-[#0c0d0e]">
        <Navbar />

        <main>
          <Hero />
          <IntroSection />
          <GetItSoldSection />
          <SearchListingsSection />
          <AffiliationsSection />
          <EditorialStory />
          <GallerySection />
          <ContactSection />
        </main>

        <MapSection />
        <Footer />
        <FloatingCTA />
      </div>
    </SmoothScrollProvider>
  );
}
