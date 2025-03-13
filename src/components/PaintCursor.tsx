import React, { useEffect, useRef } from 'react';

const PaintCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  function getRandomColor() {
    return classicalColors[Math.floor(Math.random() * classicalColors.length)];
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize vars
    let lastPoint: {x: number, y: number} | null = null;
    let lastMoveTime = Date.now();
    let lastColorChangeTime = Date.now();
    let currentColor = getRandomColor();
    let points: Array<{x: number, y: number, color: string, timestamp: number}> = [];

    // Calculate velocity between points
    const calculateVelocity = (x1: number, y1: number, x2: number, y2: number, timeDiff: number) => {
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return distance / Math.max(timeDiff, 1); // Avoid division by zero
    };

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let velocity = 0;
      if (lastPoint) {
        velocity = calculateVelocity(
          lastPoint.x, 
          lastPoint.y, 
          x, 
          y,
          now - lastMoveTime
        );
      }
      
      // Change color less frequently for slow movements
      // Only change color after a certain time threshold or if moving faster
      const isMovingSlow = velocity < 0.3;
      const colorChangeDelay = isMovingSlow ? 800 : 300; // Longer delay for slow movements
      
      if (now - lastColorChangeTime > colorChangeDelay) {
        currentColor = getRandomColor();
        lastColorChangeTime = now;
      }

      points.push({
        x,
        y,
        color: currentColor,
        timestamp: now
      });

      lastPoint = { x, y };
      lastMoveTime = now;
    };

    // Animation loop
    function animate() {
      // Fade existing content slightly
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw trail
      const now = Date.now();
      
      // Keep only points less than 3 seconds old
      points = points.filter(point => now - point.timestamp < 3000);

      // Draw connections between points if we have at least 2
      for (let i = 1; i < points.length; i++) {
        const current = points[i];
        const previous = points[i - 1];
        
        // Calculate age-based opacity (slower fadeout - 3 seconds)
        const age = now - current.timestamp;
        const opacity = Math.max(0, 1 - age / 3000);
        
        if (opacity > 0) {
          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          
          // Create a more natural, slightly curved line
          const controlX = (previous.x + current.x) / 2 + (Math.random() * 7 - 3.5);
          const controlY = (previous.y + current.y) / 2 + (Math.random() * 7 - 3.5);
          
          ctx.quadraticCurveTo(controlX, controlY, current.x, current.y);
          
          // Set line style with fixed width
          ctx.strokeStyle = current.color;
          ctx.globalAlpha = opacity;
          
          // Fixed line width for the trail
          const baseWidth = 5;
          ctx.lineWidth = baseWidth;
          
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          ctx.stroke();
          
          // Add a subtle glow effect at certain points
          if (i % 3 === 0 && opacity > 0.5) {
            ctx.beginPath();
            // Fixed glow radius
            const glowRadius = baseWidth * 2;
            ctx.arc(current.x, current.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = current.color;
            ctx.globalAlpha = opacity * 0.3;
            ctx.fill();
          }
        }
      }
      
      // Clean up old points periodically to prevent memory issues
      if (points.length > 1000) {
        points = points.slice(-1000);
      }
      
      requestAnimationFrame(animate);
    }

    // Start animation
    animate();
    
    // Add mouse event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
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
