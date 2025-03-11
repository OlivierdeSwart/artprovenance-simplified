
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "Create",
    description: "Register artwork with verified digital certificates and establish provenance from the start",
    image: "/lovable-uploads/34e0768b-6391-47e4-a78a-93830d429f1d.png"
  },
  {
    id: 2,
    title: "Sell",
    description: "List your artwork with transparent pricing and fractional ownership options",
    image: "/lovable-uploads/df11e6ff-05e3-4d60-9a89-aa92a74b299b.png"
  },
  {
    id: 3,
    title: "Buy",
    description: "Browse authenticated fine art from verified collections with secure transactions",
    image: "/lovable-uploads/740c62d2-8a65-4f8d-8b34-7d8e806a134e.png"
  },
  {
    id: 4,
    title: "Manage",
    description: "Track your digital collection and monitor value appreciation in real-time",
    image: "/lovable-uploads/db820f00-37b3-4e6b-952c-57f05d6a638f.png"
  }
];

const CarouselFeature = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const length = features.length;

  // Autoplay with pause on hover or interaction
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index: number) => {
    setAutoplay(false);
    setCurrent(index);
  };

  // Handle mouse events for autoplay control
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    }),
  };

  const [direction, setDirection] = useState(1);

  const handleNextSlide = () => {
    setDirection(1);
    nextSlide();
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    prevSlide();
  };

  return (
    <section className="w-full py-16 bg-white relative overflow-hidden" id="platform-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            PLATFORM FEATURES
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            How Our Platform Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our intuitive platform makes it easy to create, sell, buy, and manage verified digital fine art
          </p>
        </div>

        <div 
          className="relative w-full h-[600px] md:h-[650px] mx-auto overflow-hidden rounded-xl shadow-xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <div className="relative w-full h-full flex flex-col">
                <div className="relative w-full h-[500px] overflow-hidden bg-gray-900">
                  <img
                    src={features[current].image}
                    alt={features[current].title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center bg-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 font-serif">
                    {features[current].title}
                  </h3>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {features[current].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-12 w-12 shadow-md"
            onClick={handlePrevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-12 w-12 shadow-md"
            onClick={handleNextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-24 left-0 right-0 flex justify-center space-x-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  index === current ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselFeature;
