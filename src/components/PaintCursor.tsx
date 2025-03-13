
import React, { useEffect, useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  color: string;
  timestamp: number;
}

const PaintCursor = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInitialRender = useRef(true);

  // Artistic color palette
  const colors = [
    '#D3E4FD', // Soft Blue
    '#FDE1D3', // Soft Peach
    '#FFDEE2', // Soft Pink
    '#E5DEFF', // Soft Purple
    '#FEC6A1', // Soft Orange
    '#FEF7CD', // Soft Yellow
    '#F2FCE2', // Soft Green
    '#F1F0FB', // Soft Gray
  ];

  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    // Skip initial render to prevent initial animation
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        color: getRandomColor(),
        timestamp: Date.now()
      };

      setPoints(prevPoints => [...prevPoints, newPoint]);
    };

    // Cleanup old points periodically
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      // Remove points older than 1 second
      setPoints(prevPoints => prevPoints.filter(point => now - point.timestamp < 1000));
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
        const opacity = Math.max(0, 1 - age / 1000); // Fade out over 1 second

        if (opacity > 0) {
          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          
          // Create a natural, slightly curved line instead of straight
          const controlX = (prevPoint.x + currentPoint.x) / 2 + (Math.random() * 10 - 5);
          const controlY = (prevPoint.y + currentPoint.y) / 2 + (Math.random() * 10 - 5);
          
          ctx.quadraticCurveTo(controlX, controlY, currentPoint.x, currentPoint.y);
          
          // Set line style
          ctx.strokeStyle = `${currentPoint.color}`;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = Math.max(2, 10 * opacity); // Line gets thinner as it fades
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          ctx.stroke();
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
