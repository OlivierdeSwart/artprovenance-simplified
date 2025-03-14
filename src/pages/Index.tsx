
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CarouselFeature from '@/components/carousel/CarouselFeature';
import OnboardingFlow from '@/components/OnboardingFlow';
import FeatureSection from '@/components/FeatureSection';
import VerificationSection from '@/components/VerificationSection';
import AudienceSection from '@/components/AudienceSection';
import Footer from '@/components/Footer';
import PaintCursor from '@/components/PaintCursor';

const Index = () => {
  useEffect(() => {
    // Smooth scroll function for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for the fixed header
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#fffdf5] to-[#fbf9f3]">
      <PaintCursor />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CarouselFeature />
        <OnboardingFlow />
        <FeatureSection />
        <VerificationSection />
        <AudienceSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
