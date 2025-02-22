"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

const PriceBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme !== 'light';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      drawBackground();
    };

    const generatePriceLine = () => {
      const points = [];
      const numPoints = window.innerWidth < 640 ? 8 : 
                       window.innerWidth < 768 ? 10 : 12;
      
      for (let i = 0; i < numPoints; i++) {
        const x = (canvas.width * i) / (numPoints - 1) / (window.devicePixelRatio || 1);
        const progress = i / (numPoints - 1);
        
        // Base height calculation with steeper end
        let baseY;
        if (progress > 0.8) {
          // Sharp upward trend for the last 20%
          const endProgress = (progress - 0.8) / 0.2; // 0 to 1 in last 20%
          baseY = canvas.height * (0.4 - endProgress * 0.25) / (window.devicePixelRatio || 1); // Extra high at the end
        } else {
          baseY = canvas.height * (0.7 - progress * 0.3) / (window.devicePixelRatio || 1);
        }

        // Adjust wave amplitude based on screen size
        const amplitude = (canvas.height * (window.innerWidth < 640 ? 0.1 : 0.15)) / (window.devicePixelRatio || 1);
        
        // Reduce wave effect near the end for cleaner peak
        const waveReduction = progress > 0.8 ? 1 - ((progress - 0.8) / 0.2) : 1;
        
        // Multiple overlapping waves with different frequencies
        const wave1 = Math.sin(i * 0.8) * amplitude * waveReduction;
        const wave2 = Math.sin(i * 1.2) * amplitude * 0.7 * waveReduction;
        const wave3 = Math.sin(i * 0.3) * amplitude * 0.5 * waveReduction;
        
        const y = baseY + wave1 + wave2 + wave3;
        points.push({ x, y, progress });
      }

      // Ensure the last point is a peak
      const lastPoint = points[points.length - 1];
      lastPoint.y = (canvas.height * 0.15) / (window.devicePixelRatio || 1); // Force high endpoint
      
      return points;
    };

    const drawPriceLine = (points: { x: number; y: number; progress: number }[]) => {
      // Draw the gradient background for the line
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      if (isDark) {
        gradient.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
        gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.2)');
        gradient.addColorStop(1, 'rgba(56, 189, 248, 0.1)');
      } else {
        gradient.addColorStop(0, 'rgba(2, 132, 199, 0.1)');
        gradient.addColorStop(0.5, 'rgba(2, 132, 199, 0.2)');
        gradient.addColorStop(1, 'rgba(2, 132, 199, 0.1)');
      }

      // Draw the smooth curve
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let i = 1; i < points.length - 2; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      
      // Curve through the last two points
      ctx.quadraticCurveTo(
        points[points.length - 2].x,
        points[points.length - 2].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );

      // Draw line
      ctx.lineWidth = 3;
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.5)' : 'rgba(2, 132, 199, 0.5)';
      ctx.stroke();

      // Fill area below line
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawPriceCard = (x: number, y: number, price: string) => {
      const fontSize = window.innerWidth < 640 ? 10 : 
                      window.innerWidth < 768 ? 12 : 14;
      const padding = window.innerWidth < 640 ? 6 : 10;
      
      ctx.font = `${fontSize}px monospace`;
      const textWidth = ctx.measureText(price).width;
      const width = textWidth + padding * 2;
      const height = fontSize + padding * 2;
      const radius = window.innerWidth < 640 ? 4 : 6;

      // Draw card background with slight blur effect
      ctx.save();
      ctx.shadowColor = isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(2, 132, 199, 0.2)';
      ctx.shadowBlur = window.innerWidth < 640 ? 4 : 8;
      ctx.beginPath();
      ctx.roundRect(x - width / 2, y - height / 2, width, height, radius);
      ctx.fillStyle = isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      ctx.restore();

      // Draw subtle border
      ctx.beginPath();
      ctx.roundRect(x - width / 2, y - height / 2, width, height, radius);
      ctx.strokeStyle = isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.3)';
      ctx.lineWidth = window.innerWidth < 640 ? 0.5 : 1;
      ctx.stroke();

      // Draw price text
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.9)' : 'rgba(2, 132, 199, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(price, x, y);
    };

    const getPrice = (progress: number, height: number) => {
      // Base price now considers both progress and height
      let basePrice = 1000 + progress * 1500;
      
      // Extra price boost for the final peak
      if (progress > 0.8) {
        const endProgress = (progress - 0.8) / 0.2;
        basePrice += endProgress * 1000; // Additional increase at the end
      }
      
      // Add price variation based on height
      const heightFactor = (canvas.height - height) / canvas.height;
      const priceVariation = heightFactor * 1000;
      
      // Format with commas for better readability
      return `$${(basePrice + priceVariation).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    };

    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = generatePriceLine();
      drawPriceLine(points);

      // Draw price cards at peaks and significant points
      points.forEach((point, i) => {
        if (i % 3 === 1) { // Show more price points (changed from i % 4 === 2)
          const price = getPrice(point.progress, point.y);
          drawPriceCard(
            point.x,
            point.y - 25, // Slightly closer to the line
            price
          );
        }
      });
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  return (
    <div className="absolute inset-x-0 -top-20 h-[40vh] sm:h-[50vh] md:h-[500px] -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/10 to-background" />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default PriceBackground; 