
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

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
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-secondary/30 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 py-24 md:py-32 px-6 sm:px-8 xl:px-0">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="inline-block px-3 py-1 mb-6 rounded-full text-xs font-medium bg-primary/10 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              EXCLUSIVE DIGITAL PROVENANCE
            </motion.div>
            
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
              className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed"
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
              <Button className="text-base px-8 py-6 bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-base px-8 py-6 border-gray-300 hover:border-primary hover:text-primary transition-all duration-300">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="pointer-events-none absolute top-40 -left-20 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-secondary/50 to-transparent"></div>
      
      <div className="hidden lg:block absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl">
        <div className="relative">
          <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
          <img 
            ref={imageRef}
            src="/lovable-uploads/b6823b88-a286-449e-85b2-52c81994ab78.png" 
            className="w-full h-auto rounded-t-3xl shadow-2xl shadow-black/5 transition-transform duration-500 ease-out" 
            alt="Fine art gallery" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
