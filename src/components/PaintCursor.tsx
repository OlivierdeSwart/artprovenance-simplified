
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface SplashParticle {
  id: number;
  position: CursorPosition;
  size: number;
  angle: number;
  distance: number;
  color: string;
  scale: number;
}

const PaintCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [splashes, setSplashes] = useState<SplashParticle[]>([]);
  const [showCursor, setShowCursor] = useState(true);

  // Classical painting inspired colors
  const classicalColors = [
    '#8A3324', // Burnt Sienna
    '#D5A021', // Yellow Ochre
    '#3A414A', // Payne's Gray
    '#704F4F', // Venetian Red
    '#254052', // Prussian Blue
    '#3F5E5A', // Viridian
    '#8B3B2B', // Terra Rosa
    '#BFA372', // Naples Yellow
  ];

  const getRandomColor = () => {
    return classicalColors[Math.floor(Math.random() * classicalColors.length)];
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseClick = (e: MouseEvent) => {
      // Create splash effect
      const newSplashes = [];
      const particleCount = Math.floor(Math.random() * 8) + 12; // 12-20 particles
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const distance = Math.random() * 100 + 20; // Random distance between 20-120px
        const size = Math.random() * 20 + 5; // Random size between 5-25px
        const scale = Math.random() * 0.5 + 0.5; // Random scale between 0.5-1.0
        
        newSplashes.push({
          id: Date.now() + i,
          position: { x: e.clientX, y: e.clientY },
          size,
          angle,
          distance,
          color: getRandomColor(),
          scale,
        });
      }
      
      setSplashes((prevSplashes) => [...prevSplashes, ...newSplashes]);
      
      // Clean up old splashes after a delay
      setTimeout(() => {
        setSplashes((prevSplashes) => 
          prevSplashes.filter(splash => !newSplashes.includes(splash))
        );
      }, 1000);
    };

    // Handle cursor visibility when leaving/entering window
    const handleMouseLeave = () => setShowCursor(false);
    const handleMouseEnter = () => setShowCursor(true);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      {showCursor && (
        <motion.div
          className="fixed w-5 h-5 rounded-full pointer-events-none z-50 mix-blend-multiply"
          style={{
            backgroundColor: classicalColors[0],
            x: position.x - 10,
            y: position.y - 10,
            boxShadow: '0 0 10px rgba(0,0,0,0.15)'
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      )}

      {/* Splash particles */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="fixed rounded-full pointer-events-none z-40"
            style={{
              backgroundColor: splash.color,
              width: splash.size,
              height: splash.size,
              x: splash.position.x,
              y: splash.position.y,
            }}
            initial={{ 
              opacity: 0.8,
              scale: 0
            }}
            animate={{ 
              opacity: 0,
              scale: splash.scale,
              x: splash.position.x + Math.cos(splash.angle) * splash.distance,
              y: splash.position.y + Math.sin(splash.angle) * splash.distance,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default PaintCursor;
