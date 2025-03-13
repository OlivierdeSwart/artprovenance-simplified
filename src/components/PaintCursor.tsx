
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

interface BrushStroke {
  id: number;
  path: CursorPosition[];
  color: string;
  width: number;
  opacity: number;
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
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushStrokes, setBrushStrokes] = useState<BrushStroke[]>([]);
  const [activeBrushStroke, setActiveBrushStroke] = useState<BrushStroke | null>(null);
  const [splashes, setSplashes] = useState<SplashParticle[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const lastPositionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const requestRef = useRef<number>();
  const brushSizeRef = useRef(Math.random() * 8 + 12); // Random brush size between 12-20px

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
        color: activeBrushStroke?.color || getRandomColor(),
        scale,
      });
    }
    
    setSplashes(prevSplashes => [...prevSplashes, ...newSplashes]);
    
    // Clean up old splashes after a delay
    setTimeout(() => {
      setSplashes(prevSplashes => 
        prevSplashes.filter(splash => !newSplashes.includes(splash))
      );
    }, 1800);
  };

  const smoothPosition = (prevPos: CursorPosition, currPos: CursorPosition): CursorPosition[] => {
    const points: CursorPosition[] = [];
    const segments = 5; // Number of segments to create between points
    
    for (let i = 0; i <= segments; i++) {
      const ratio = i / segments;
      points.push({
        x: prevPos.x + (currPos.x - prevPos.x) * ratio,
        y: prevPos.y + (currPos.y - prevPos.y) * ratio,
      });
    }
    
    return points;
  };

  // Animation frame callback
  const updateBrushStroke = () => {
    if (isDrawing && activeBrushStroke) {
      // Only add points if moved more than a threshold to avoid too many points when still
      const distance = Math.sqrt(
        Math.pow(position.x - lastPositionRef.current.x, 2) + 
        Math.pow(position.y - lastPositionRef.current.y, 2)
      );

      if (distance > 2) {
        // Generate intermediate points for smoother lines
        const interpolatedPoints = smoothPosition(lastPositionRef.current, position);
        
        setActiveBrushStroke(prev => {
          if (!prev) return null;
          return {
            ...prev,
            path: [...prev.path, ...interpolatedPoints]
          };
        });
        
        lastPositionRef.current = position;
      }
    }
    
    requestRef.current = requestAnimationFrame(updateBrushStroke);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsDrawing(true);
        const newColor = getRandomColor();
        const newWidth = Math.random() * 8 + 12; // Random width between 12-20px
        brushSizeRef.current = newWidth;
        
        const newStroke: BrushStroke = {
          id: Date.now(),
          path: [{ x: e.clientX, y: e.clientY }],
          color: newColor,
          width: newWidth,
          opacity: Math.random() * 0.3 + 0.7, // Random opacity between 0.7-1.0
        };
        
        setActiveBrushStroke(newStroke);
        setBrushStrokes(prev => [...prev, newStroke]);
        lastPositionRef.current = { x: e.clientX, y: e.clientY };
        createSplashEffect({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      if (isDrawing) {
        setIsDrawing(false);
        setActiveBrushStroke(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // For single clicks without dragging
      if (!isDrawing) {
        createSplashEffect({ x: e.clientX, y: e.clientY });
      }
    };

    // Handle cursor visibility when leaving/entering window
    const handleMouseLeave = () => setShowCursor(false);
    const handleMouseEnter = () => setShowCursor(true);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Start animation frame
    requestRef.current = requestAnimationFrame(updateBrushStroke);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isDrawing, position]);

  // SVG path generator for the brush strokes
  const generateSvgPath = (points: CursorPosition[]): string => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    // Use quadratic curves for smooth path
    for (let i = 1; i < points.length - 1; i++) {
      const controlPoint = points[i];
      const endPoint = {
        x: (points[i].x + points[i + 1].x) / 2,
        y: (points[i].y + points[i + 1].y) / 2
      };
      path += ` Q ${controlPoint.x} ${controlPoint.y}, ${endPoint.x} ${endPoint.y}`;
    }
    
    // Add the last point
    if (points.length > 2) {
      const last = points.length - 1;
      path += ` L ${points[last].x} ${points[last].y}`;
    }
    
    return path;
  };

  // Render the brush tip effect
  const renderBrushTip = () => {
    if (!showCursor) return null;
    
    const brushSize = isDrawing ? brushSizeRef.current * 1.2 : brushSizeRef.current;
    const brushColor = activeBrushStroke?.color || classicalColors[0];
    
    return (
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-multiply"
        style={{
          width: brushSize,
          height: brushSize * 1.5, // Slightly elongated for brush feel
          borderRadius: '50% 50% 40% 40%', // More oval at the bottom
          backgroundColor: brushColor,
          filter: 'blur(1px)',
          opacity: 0.8,
          x: position.x - (brushSize / 2),
          y: position.y - (brushSize / 2),
          boxShadow: `0 0 6px rgba(0,0,0,0.2)`,
          transform: `rotate(${isDrawing ? '45deg' : '0deg'})`,
        }}
        animate={{
          scale: isDrawing ? [1, 1.2, 1] : [1, 1.1, 1],
          rotate: isDrawing ? 45 : 0,
        }}
        transition={{
          duration: isDrawing ? 0.2 : 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: isDrawing ? 0.1 : 0.7
        }}
      />
    );
  };

  return (
    <>
      {/* Brush strokes as SVG paths */}
      <svg 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
        style={{ mixBlendMode: 'multiply' }}
      >
        {brushStrokes.map((stroke) => (
          <path
            key={stroke.id}
            d={generateSvgPath(stroke.path)}
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

      {/* Brush tip */}
      {renderBrushTip()}

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
              filter: 'blur(0.5px)',
              boxShadow: '0 0 8px rgba(0,0,0,0.1)',
            }}
            initial={{ 
              opacity: 0.8,
              scale: 0
            }}
            animate={{ 
              opacity: [0.8, 0.5, 0],
              scale: splash.scale,
              x: splash.position.x - (splash.size / 2) + Math.cos(splash.angle) * splash.distance,
              y: splash.position.y - (splash.size / 2) + Math.sin(splash.angle) * splash.distance,
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.5, 
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
