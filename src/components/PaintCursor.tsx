
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface TrailDot {
  id: number;
  position: CursorPosition;
  color: string;
}

const PaintCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isActive, setIsActive] = useState(false);

  // Classical painting inspired colors
  const classicalColors = [
    '#E5DEFF', // Soft purple
    '#FEF7CD', // Soft yellow
    '#FDE1D3', // Soft peach
    '#D3E4FD', // Soft blue
    '#FFDEE2', // Soft pink
    '#F2FCE2', // Soft green
    '#FEC6A1', // Soft orange
    '#F1F0FB', // Soft gray
  ];

  const getRandomColor = () => {
    return classicalColors[Math.floor(Math.random() * classicalColors.length)];
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (isActive) {
        // Add a new dot to the trail
        setTrail((prevTrail) => [
          ...prevTrail.slice(-25), // Keep only the last 25 dots for performance
          {
            id: Date.now(),
            position: { x: e.clientX, y: e.clientY },
            color: getRandomColor(),
          },
        ]);
      }
    };

    const handleMouseDown = () => {
      setIsActive(true);
    };

    const handleMouseUp = () => {
      setIsActive(false);
      // Clear the trail after lifting the mouse
      setTimeout(() => setTrail([]), 1000);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isActive]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-multiply"
        style={{
          backgroundColor: getRandomColor(),
          x: position.x - 12,
          y: position.y - 12,
        }}
        animate={{
          scale: isActive ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      />

      {/* Paint trail */}
      {trail.map((dot, index) => (
        <motion.div
          key={dot.id}
          className="fixed rounded-full pointer-events-none z-40 mix-blend-multiply opacity-80"
          style={{
            backgroundColor: dot.color,
            x: dot.position.x - 8,
            y: dot.position.y - 8,
            width: `${16 - index * 0.2}px`,
            height: `${16 - index * 0.2}px`,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </>
  );
};

export default PaintCursor;
