
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  
  // Colors inspired by classical paintings (copied from PaintCursor for consistency)
  const classicalColors = [
    '#2C5985', '#7899BA', '#B7D0E1', // Vermeer blues
    '#F4D03F', '#E9B44C', '#EDD382', // Van Gogh yellows
    '#8C593B', '#A9784F', '#C4A484', // Rembrandt browns
    '#87A96B', '#BDECB6', '#C9E4C5', // Monet greens
    '#FADDE1', '#FFC0CB', '#E8B4BC', // Renoir pinks
    '#F18D32', '#F4A460', '#FAAD63', // Turner oranges
    '#D3E4FD', '#FDE1D3', '#FFDEE2', '#E5DEFF', '#FEC6A1', '#FEF7CD', '#F2FCE2' // Soft muted colors
  ];
  
  // Assign specific colors to each section with improved contrast for "benefits"
  const sectionColors = {
    'platform-features': classicalColors[3], // Van Gogh yellow
    'how-it-works': classicalColors[9],      // Monet green
    'benefits': '#8B5CF6',                   // Using vivid purple for benefits (from color palette)
    'technology': classicalColors[15],       // Turner orange
    'who-we-serve': classicalColors[0],      // Vermeer blue
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Get all sections
      const sections = [
        'platform-features',
        'how-it-works',
        'benefits',
        'technology',
        'who-we-serve'
      ];
      
      // Check which section is in view
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Consider a section in view when its top is less than 1/3 of the viewport height
          return rect.top <= window.innerHeight / 3 && rect.bottom >= 0;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 100) {
        // At the very top, no section is active
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Helper to get the appropriate style for a nav item
  const getNavItemStyle = (sectionId: string) => {
    if (activeSection === sectionId) {
      return {
        color: sectionColors[sectionId as keyof typeof sectionColors] || '#000',
        position: 'relative',
        // Add a paint brush effect using a pseudo-element
        backgroundImage: activeSection ? `linear-gradient(to right, ${sectionColors[sectionId as keyof typeof sectionColors] || '#000'}20, ${sectionColors[sectionId as keyof typeof sectionColors] || '#000'}70, ${sectionColors[sectionId as keyof typeof sectionColors] || '#000'}20)` : 'none',
        backgroundSize: '100% 3px',
        backgroundPosition: '0 100%',
        backgroundRepeat: 'no-repeat',
        transition: 'all 0.3s ease'
      } as React.CSSProperties;
    }
    return {};
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">Dobney's</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center justify-center flex-grow">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <a 
                    href="#platform-features" 
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors pb-1"
                    style={getNavItemStyle('platform-features')}
                  >
                    Summary
                  </a>
                </li>
                <li>
                  <a 
                    href="#how-it-works" 
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors pb-1"
                    style={getNavItemStyle('how-it-works')}
                  >
                    Registration Flow
                  </a>
                </li>
                <li>
                  <a 
                    href="#benefits" 
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors pb-1"
                    style={getNavItemStyle('benefits')}
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a 
                    href="#technology" 
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors pb-1"
                    style={getNavItemStyle('technology')}
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a 
                    href="#who-we-serve" 
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors pb-1"
                    style={getNavItemStyle('who-we-serve')}
                  >
                    Who We Serve
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white px-6 py-6 overflow-y-auto animate-slide-left">
            <div className="flex items-center justify-between mb-6">
              <a href="/" className="flex-shrink-0">
                <span className="font-serif text-2xl font-bold tracking-tight text-primary">Dobney's</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-2 py-6">
                  <a
                    href="#platform-features"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={getNavItemStyle('platform-features')}
                  >
                    Summary
                  </a>
                  <a
                    href="#how-it-works"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={getNavItemStyle('how-it-works')}
                  >
                    Registration Flow
                  </a>
                  <a
                    href="#benefits"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={getNavItemStyle('benefits')}
                  >
                    Benefits
                  </a>
                  <a
                    href="#technology"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={getNavItemStyle('technology')}
                  >
                    Security
                  </a>
                  <a
                    href="#who-we-serve"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={getNavItemStyle('who-we-serve')}
                  >
                    Who We Serve
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
