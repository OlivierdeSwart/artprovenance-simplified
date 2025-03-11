import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / 40;
      const moveY = (clientY - innerHeight / 2) / 40;
      
      imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSignup = () => {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-24 md:py-32 px-6 sm:px-8 xl:px-0">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight leading-tight"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              Digital Fine Art: <br />
              <span className="text-primary">Own, Trade, and Verify</span> <br /> with Ease and Security
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              Seamless access to authenticated fine art. Provenance you can trust. Instant, secure global transactions.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              <Button 
                className="text-base px-8 py-6 bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={scrollToSignup}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="pointer-events-none absolute top-40 -left-20 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
      
      {/* Scroll arrow indicator */}
      <motion.a 
        href="#platform-features"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown className="h-8 w-8 text-primary" />
      </motion.a>
    </div>
  );
};

export default Hero;
