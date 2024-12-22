import React, { useEffect, useRef } from 'react';

export function QuantumVisuals({ bondStrength = 0 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      color: string;
    }> = [];

    const colors = [
      'rgba(147, 51, 234, 0.5)',  // Purple
      'rgba(59, 130, 246, 0.5)',  // Blue
      'rgba(236, 72, 153, 0.5)',  // Pink
    ];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      particles = Array(50).fill(null).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        angle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Quantum wave effect
        const wave = Math.sin(Date.now() * 0.001 + p.x * 0.01) * 2;
        
        // Update position with quantum uncertainty
        p.x += Math.cos(p.angle) * p.speed * (1 + bondStrength);
        p.y += Math.sin(p.angle) * p.speed * (1 + bondStrength) + wave;

        // Add quantum entanglement effect
        if (bondStrength > 0.5) {
          p.angle += (Math.random() - 0.5) * 0.1 * bondStrength;
        }

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw quantum connections
        if (bondStrength > 0.25) {
          particles.forEach(p2 => {
            const dx = p2.x - p.x;
            const dy = p2.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(147, 51, 234, ${(1 - dist/100) * 0.2 * bondStrength})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        }
      });

      frame = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [bondStrength]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
}