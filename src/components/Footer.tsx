
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200" id="signup-form">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="glass-card p-8 rounded-xl border border-gray-100 bg-white/60 backdrop-blur-md shadow-sm">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Transform Your Fine Art into Digital Legacy
            </h2>
            <p className="text-gray-500 mb-8">
              Bridge the physical and digital realms of art collection through blockchain technology. Your masterpiece, your legacy, reimagined.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="py-6 bg-gray-50/50"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="py-6 bg-gray-50/50"
                />
                <Button className="px-8 py-6 bg-primary text-white hover:bg-primary/90 text-base transition-all duration-300">
                  Join Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            &copy; 2025 Dobney's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
