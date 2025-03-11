
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="pb-8 mb-8 border-b border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Improve the Way You Art Today
            </h2>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="py-6"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="py-6"
                />
                <Button className="px-8 py-6 bg-primary text-white hover:bg-primary/90 text-base transition-all duration-300">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">
            &copy; 2025 Dobney's. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
