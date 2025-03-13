import React, { useEffect, useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  color: string;
  timestamp: number;
  velocity: number;
}

const PaintCursor = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInitialRender = useRef(true);
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(Date.now());

  // Colors inspired by classical paintings
  const classicalColors = [
    // Vermeer blues
    '#2C5985', '#7899BA', '#B7D0E1',
    // Van Gogh yellows
    '#F4D03F', '#E9B44C', '#EDD382',
    // Rembrandt browns
    '#8C593B', '#A9784F', '#C4A484',
    // Monet greens
    '#87A96B', '#BDECB6', '#C9E4C5',
    // Renoir pinks
    '#FADDE1', '#FFC0CB', '#E8B4BC',
    // Turner oranges
    '#F18D32', '#F4A460', '#FAAD63',
    // Soft muted colors
    '#D3E4FD', '#FDE1D3', '#FFDEE2', '#E5DEFF', '#FEC6A1', '#FEF7CD', '#F2FCE2'
  ];

  const getRandomColor = () => {
    return classicalColors[Math.floor(Math.random() * classicalColors.length)];
  };

  // Calculate velocity between points
  const calculateVelocity = (x1: number, y1: number, x2: number, y2: number, timeDiff: number) => {
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance / Math.max(timeDiff, 1); // Avoid division by zero
  };

  useEffect(() => {
    // Skip initial render to prevent initial animation
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const velocity = calculateVelocity(
        prevMousePosition.current.x, 
        prevMousePosition.current.y, 
        e.clientX, 
        e.clientY,
        now - lastMoveTime.current
      );
      
      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        color: getRandomColor(),
        timestamp: now,
        velocity: velocity
      };

      setPoints(prevPoints => [...prevPoints, newPoint]);
      
      prevMousePosition.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = now;
    };

    // Cleanup old points periodically
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      // Keep points longer (3 seconds instead of 1)
      setPoints(prevPoints => prevPoints.filter(point => now - point.timestamp < 3000));
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
    };
  }, []);

  useEffect(() => {
    // Render the trail
    if (canvasRef.current && points.length > 1) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw trail segments
      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1];
        const currentPoint = points[i];
        const age = Date.now() - currentPoint.timestamp;
        
        // Slower fadeout - 3 seconds instead of 1
        const opacity = Math.max(0, 1 - age / 3000); 
        
        if (opacity > 0) {
          // Only draw if there's visible opacity
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          
          // Create a more natural, slightly curved line
          const controlX = (prevPoint.x + currentPoint.x) / 2 + (Math.random() * 7 - 3.5);
          const controlY = (prevPoint.y + currentPoint.y) / 2 + (Math.random() * 7 - 3.5);
          
          ctx.quadraticCurveTo(controlX, controlY, currentPoint.x, currentPoint.y);
          
          // Line width based on velocity - thinner when moving faster, thicker when slow
          // This creates a more natural brush effect
          const velocityFactor = Math.max(0.1, Math.min(1.0, 1.0 / currentPoint.velocity));
          const baseWidth = 12 * velocityFactor;
          
          // Set line style
          ctx.strokeStyle = `${currentPoint.color}`;
          ctx.globalAlpha = opacity;
          
          // Line gets thinner as it fades, but remains thicker for slower movements
          const width = Math.max(1, baseWidth * opacity);
          ctx.lineWidth = width;
          
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          ctx.stroke();
          
          // Add a subtle glow effect at slow points
          if (currentPoint.velocity < 0.3 && opacity > 0.5) {
            ctx.beginPath();
            ctx.arc(currentPoint.x, currentPoint.y, width * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = currentPoint.color;
            ctx.globalAlpha = opacity * 0.3;
            ctx.fill();
          }
        }
      }
    }
  }, [points]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default PaintCursor;
