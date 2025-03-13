
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
  const [isClicking, setIsClicking] = useState(false);
  const [splashes, setSplashes] = useState<SplashParticle[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [trail, setTrail] = useState<CursorPosition[]>([]);

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
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Add to trail with throttling (every other position)
      setTrail(prev => {
        const newTrail = [...prev, newPosition];
        return newTrail.slice(-10); // Keep only last 10 positions for performance
      });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      createSplashEffect(position);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const createSplashEffect = (pos: CursorPosition) => {
      // Create splash effect
      const newSplashes = [];
      const particleCount = Math.floor(Math.random() * 8) + 18; // 18-26 particles
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const distance = Math.random() * 120 + 30; // Random distance between 30-150px
        const size = Math.random() * 25 + 8; // Random size between 8-33px
        const scale = Math.random() * 0.7 + 0.5; // Random scale between 0.5-1.2
        
        newSplashes.push({
          id: Date.now() + i,
          position: { x: pos.x, y: pos.y },
          size,
          angle,
          distance,
          color: getRandomColor(),
          scale,
        });
      }
      
      setSplashes(prevSplashes => [...prevSplashes, ...newSplashes]);
      
      // Clean up old splashes after a delay
      setTimeout(() => {
        setSplashes(prevSplashes => 
          prevSplashes.filter(splash => !newSplashes.includes(splash))
        );
      }, 1500); // Increased duration for more visible effect
    };

    // Handle cursor visibility when leaving/entering window
    const handleMouseLeave = () => setShowCursor(false);
    const handleMouseEnter = () => setShowCursor(true);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Add click listener for mobile
    window.addEventListener('click', () => {
      createSplashEffect(position);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', () => {});
    };
  }, [position]);

  return (
    <>
      {/* Trail effect */}
      <AnimatePresence>
        {trail.map((pos, index) => (
          <motion.div
            key={`trail-${index}`}
            className="fixed rounded-full pointer-events-none z-40 mix-blend-multiply"
            style={{
              backgroundColor: getRandomColor(),
              width: Math.max(6, 15 - index * 1.5),
              height: Math.max(6, 15 - index * 1.5),
              x: pos.x - (Math.max(6, 15 - index * 1.5) / 2),
              y: pos.y - (Math.max(6, 15 - index * 1.5) / 2),
              opacity: 1 - (index * 0.1),
            }}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 0.5 - (index * 0.05) }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </AnimatePresence>

      {/* Custom cursor */}
      {showCursor && (
        <motion.div
          className="fixed pointer-events-none z-50 mix-blend-multiply"
          style={{
            backgroundColor: isClicking ? classicalColors[2] : classicalColors[0],
            width: isClicking ? 18 : 12,
            height: isClicking ? 18 : 12,
            borderRadius: '50%',
            x: position.x - (isClicking ? 9 : 6),
            y: position.y - (isClicking ? 9 : 6),
            boxShadow: isClicking 
              ? '0 0 15px rgba(0,0,0,0.3)' 
              : '0 0 10px rgba(0,0,0,0.15)'
          }}
          animate={{
            scale: isClicking ? [1, 1.4, 1] : [1, 1.2, 1],
          }}
          transition={{
            duration: isClicking ? 0.2 : 0.3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: isClicking ? 0.1 : 0.5
          }}
        />
      )}

      {/* Splash particles */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="fixed rounded-full pointer-events-none z-40 mix-blend-multiply"
            style={{
              backgroundColor: splash.color,
              width: splash.size,
              height: splash.size,
              x: splash.position.x - (splash.size / 2),
              y: splash.position.y - (splash.size / 2),
              boxShadow: '0 0 8px rgba(0,0,0,0.1)',
            }}
            initial={{ 
              opacity: 0.8,
              scale: 0
            }}
            animate={{ 
              opacity: [0.8, 0.4, 0],
              scale: splash.scale,
              x: splash.position.x - (splash.size / 2) + Math.cos(splash.angle) * splash.distance,
              y: splash.position.y - (splash.size / 2) + Math.sin(splash.angle) * splash.distance,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              times: [0, 0.7, 1]
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default PaintCursor;
