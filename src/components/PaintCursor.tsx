
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
  size?: number;
}

const PaintCursor = () => {
  const [cursor, setCursor] = useState<Point>({ x: 0, y: 0 });
  const [isPainting, setIsPainting] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [brushColor, setBrushColor] = useState('#3A414A');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPointRef = useRef<Point | null>(null);
  
  // Paint colors - artistic palette
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
  
  // Set up the canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Set initial canvas style
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'multiply';
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Draw the paint on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // If not painting or no points, do nothing
    if (!isPainting || points.length < 2) return;
    
    // Get current point and last point
    const currentPoint = points[points.length - 1];
    const lastPoint = points[points.length - 2];
    
    // Draw line between points
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = currentPoint.size || 10;
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(currentPoint.x, currentPoint.y);
    ctx.stroke();
    
    // Draw connecting curve for smoother stroke
    if (points.length > 2) {
      const prevPoint = points[points.length - 3];
      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.quadraticCurveTo(
        lastPoint.x, lastPoint.y,
        currentPoint.x, currentPoint.y
      );
      ctx.stroke();
    }
  }, [points, isPainting, brushColor]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      
      if (isPainting) {
        const currentPoint = { 
          x: e.clientX, 
          y: e.clientY,
          size: Math.random() * 10 + 5 // Random brush thickness between 5-15px
        };
        
        // Add point only if mouse has moved a minimum distance
        if (lastPointRef.current) {
          const dx = currentPoint.x - lastPointRef.current.x;
          const dy = currentPoint.y - lastPointRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 5) {
            setPoints(prev => [...prev, currentPoint]);
            lastPointRef.current = currentPoint;
          }
        } else {
          setPoints(prev => [...prev, currentPoint]);
          lastPointRef.current = currentPoint;
        }
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) { // Left mouse button
        setIsPainting(true);
        
        // Choose random color from palette
        const newColor = paintColors[Math.floor(Math.random() * paintColors.length)];
        setBrushColor(newColor);
        
        // Add first point
        const currentPoint = { 
          x: e.clientX, 
          y: e.clientY,
          size: Math.random() * 10 + 5
        };
        setPoints(prev => [...prev, currentPoint]);
        lastPointRef.current = currentPoint;
        
        // Add splatter effect
        createSplatterEffect(e.clientX, e.clientY, newColor);
      }
    };
    
    const handleMouseUp = () => {
      setIsPainting(false);
      lastPointRef.current = null;
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isPainting, paintColors]);

  // Create paint splatter effect
  const createSplatterEffect = (x: number, y: number, color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create 8-12 splatter dots
    const numSplatters = Math.floor(Math.random() * 5) + 8;
    
    for (let i = 0; i < numSplatters; i++) {
      // Random angle and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 40 + 10;
      
      // Calculate position
      const splatterX = x + Math.cos(angle) * distance;
      const splatterY = y + Math.sin(angle) * distance;
      
      // Random size for splatter dot
      const size = Math.random() * 5 + 2;
      
      // Draw splatter dot
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.random() * 0.5 + 0.2; // Random opacity
      ctx.beginPath();
      ctx.arc(splatterX, splatterY, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0; // Reset opacity
    }
  };

  return (
    <>
      {/* Canvas for painting */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-40"
      />
      
      {/* Custom brush cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: 0,
          top: 0,
          x: cursor.x,
          y: cursor.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="relative"
          style={{
            transformOrigin: 'center bottom',
            transform: isPainting ? 'rotate(45deg) translateY(-5px)' : 'rotate(0deg)',
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Brush handle */}
          <div 
            className="absolute" 
            style={{
              width: '3px',
              height: '18px',
              backgroundColor: '#555',
              bottom: '0px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '1px',
            }}
          />
          
          {/* Brush head */}
          <div 
            className="rounded-full blur-[0.5px]"
            style={{
              width: isPainting ? '12px' : '16px',
              height: isPainting ? '16px' : '20px',
              backgroundColor: brushColor,
              borderRadius: '50% 50% 40% 40%',
              boxShadow: '0 0 6px rgba(0,0,0,0.2)',
              transition: 'all 0.1s ease-out',
            }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default PaintCursor;
