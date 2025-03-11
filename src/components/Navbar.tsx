
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:py-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">Dobney's</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <a href="#platform-features" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Summary
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Registration Flow
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#technology" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#who-we-serve" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                    Who We Serve
                  </a>
                </li>
              </ul>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="transition-all duration-300 hover:border-primary hover:text-primary">
                Sign In
              </Button>
              <Button className="bg-primary text-white hover:bg-primary/90 transition-all duration-300">
                Get Started
              </Button>
            </div>
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
                  >
                    Summary
                  </a>
                  <a
                    href="#how-it-works"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Registration Flow
                  </a>
                  <a
                    href="#benefits"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Benefits
                  </a>
                  <a
                    href="#technology"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Security
                  </a>
                  <a
                    href="#who-we-serve"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Who We Serve
                  </a>
                </div>
                <div className="py-6 space-y-4">
                  <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Button>
                  <Button className="w-full bg-primary text-white" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Button>
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
