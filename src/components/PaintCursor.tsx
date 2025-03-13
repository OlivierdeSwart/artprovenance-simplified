
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

interface BrushStroke {
  id: string;
  points: Point[];
  color: string;
  width: number;
  opacity: number;
}

interface SplashParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  distance: number;
}

const PaintCursor = () => {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushStrokes, setBrushStrokes] = useState<BrushStroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<BrushStroke | null>(null);
  const [splashes, setSplashes] = useState<SplashParticle[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Paint colors - nice artistic palette
  const paintColors = [
    '#D5A021', // Yellow Ochre
    '#8A3324', // Burnt Sienna
    '#3A414A', // Payne's Gray
    '#254052', // Prussian Blue
    '#704F4F', // Venetian Red
    '#3F5E5A', // Viridian
    '#8B3B2B', // Terra Rosa
    '#BFA372', // Naples Yellow
  ];

  const getRandomColor = () => paintColors[Math.floor(Math.random() * paintColors.length)];
  
  // Convert points to SVG path string
  const pointsToPath = (points: Point[]): string => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      // Use quadratic curves for smoother lines
      if (i < points.length - 1) {
        // Control point is the current point
        const cp = points[i];
        // End point is midway between current and next point for smoother transitions
        const endPoint = {
          x: (points[i].x + points[i+1].x) / 2,
          y: (points[i].y + points[i+1].y) / 2
        };
        path += ` Q ${cp.x} ${cp.y}, ${endPoint.x} ${endPoint.y}`;
      } else {
        // For the last point, just draw a line
        path += ` L ${points[i].x} ${points[i].y}`;
      }
    }
    
    return path;
  };
  
  // Create splash effect
  const createSplashEffect = (x: number, y: number, color: string) => {
    const newSplashes: SplashParticle[] = [];
    const particleCount = Math.floor(Math.random() * 8) + 12; // 12-20 particles
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const distance = Math.random() * 100 + 30; // Random distance 30-130px
      const size = Math.random() * 15 + 5; // Random size 5-20px
      
      newSplashes.push({
        id: `splash-${Date.now()}-${i}`,
        x, y,
        size,
        color,
        angle,
        distance
      });
    }
    
    setSplashes(prev => [...prev, ...newSplashes]);
    
    // Clean up splashes after animation
    setTimeout(() => {
      setSplashes(prev => prev.filter(splash => !newSplashes.includes(splash)));
    }, 1000);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      if (isDrawing && currentStroke) {
        // Add point to current stroke with distance check to avoid too many points
        const lastPoint = currentStroke.points[currentStroke.points.length - 1];
        const distance = Math.sqrt(
          Math.pow(newPosition.x - lastPoint.x, 2) + 
          Math.pow(newPosition.y - lastPoint.y, 2)
        );
        
        if (distance > 5) { // Only add points if moved significantly
          setCurrentStroke(prev => {
            if (!prev) return null;
            return {
              ...prev,
              points: [...prev.points, newPosition]
            };
          });
        }
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsDrawing(true);
        const newStrokeColor = getRandomColor();
        const newStroke: BrushStroke = {
          id: `stroke-${Date.now()}`,
          points: [{ x: e.clientX, y: e.clientY }],
          color: newStrokeColor,
          width: Math.random() * 8 + 8, // Random width 8-16px
          opacity: Math.random() * 0.4 + 0.6 // Random opacity 0.6-1.0
        };
        
        setCurrentStroke(newStroke);
        setBrushStrokes(prev => [...prev, newStroke]);
        createSplashEffect(e.clientX, e.clientY, newStrokeColor);
      }
    };
    
    const handleMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
        setCurrentStroke(null);
      }
    };
    
    const handleClick = (e: MouseEvent) => {
      if (!isDrawing) {
        createSplashEffect(e.clientX, e.clientY, getRandomColor());
      }
    };
    
    // Show/hide cursor when leaving/entering window
    const handleMouseLeave = () => setShowCursor(false);
    const handleMouseEnter = () => setShowCursor(true);
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isDrawing, currentStroke]);

  // Update brushStrokes when currentStroke changes
  useEffect(() => {
    if (currentStroke) {
      setBrushStrokes(prev => 
        prev.map(stroke => 
          stroke.id === currentStroke.id ? currentStroke : stroke
        )
      );
    }
  }, [currentStroke]);

  return (
    <>
      {/* SVG for brush strokes */}
      <svg 
        ref={svgRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-40"
        style={{ mixBlendMode: 'multiply' }}
      >
        {brushStrokes.map((stroke) => (
          <path
            key={stroke.id}
            d={pointsToPath(stroke.points)}
            stroke={stroke.color}
            strokeWidth={stroke.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity={stroke.opacity}
            style={{ filter: 'blur(0.5px)' }}
          />
        ))}
      </svg>

      {/* Brush tip cursor */}
      {showCursor && (
        <motion.div
          className="fixed pointer-events-none z-50 rounded-full"
          style={{
            width: isDrawing ? 14 : 20,
            height: isDrawing ? 18 : 24,
            backgroundColor: currentStroke?.color || getRandomColor(),
            filter: 'blur(1px)',
            opacity: 0.8,
            x: position.x - (isDrawing ? 7 : 10),
            y: position.y - (isDrawing ? 9 : 12),
            borderRadius: '50% 50% 40% 40%', // Brush tip shape
            transform: `rotate(${isDrawing ? '45deg' : '0deg'})`,
            boxShadow: '0 0 6px rgba(0,0,0,0.2)',
          }}
          animate={{
            scale: isDrawing ? [1, 0.9, 1] : [1, 1.1, 1],
            rotate: isDrawing ? 45 : 0,
          }}
          transition={{
            duration: isDrawing ? 0.2 : 0.5,
            repeat: Infinity,
            repeatType: "reverse",
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
              filter: 'blur(0.5px)',
              x: splash.x - (splash.size / 2),
              y: splash.y - (splash.size / 2),
            }}
            initial={{ opacity: 0.9, scale: 0 }}
            animate={{ 
              opacity: [0.9, 0.7, 0],
              scale: 1,
              x: splash.x - (splash.size / 2) + Math.cos(splash.angle) * splash.distance,
              y: splash.y - (splash.size / 2) + Math.sin(splash.angle) * splash.distance,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default PaintCursor;
