"use client"

import { useCallback, useEffect, useRef } from 'react';
import { createLightningBolt, updateLightningBolt, drawLightningBolt, type LightningBoltState } from './lightning-bolt';

const MAX_BOLTS = 6;

export function BackgroundLightning() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();
    const lightningBoltsRef = useRef<LightningBoltState[]>([]);

    const addNewBolt = useCallback((x?: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        if (lightningBoltsRef.current.length < MAX_BOLTS) {
            const bolt = createLightningBolt({
                canvasWidth: canvas.width,
                canvasHeight: canvas.height,
                clickX: x
            });
            lightningBoltsRef.current.push(bolt);
        }
    }, []);

    const handleClick = useCallback((e: MouseEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Get click position relative to canvas
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        
        // Add 2-3 bolts around click position
        const numBolts = 2 + Math.floor(Math.random());
        for (let i = 0; i < numBolts; i++) {
            const offset = (Math.random() - 0.5) * 200; // Random offset within 200px
            addNewBolt(x + offset);
        }
    }, [addNewBolt]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Add click event listener
        window.addEventListener('click', handleClick);

        const animate = (currentTime: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            lightningBoltsRef.current = lightningBoltsRef.current.filter(bolt => {
                const updatedBolt = updateLightningBolt(bolt, currentTime);
                if (updatedBolt.opacity > 0.01) {
                    drawLightningBolt(ctx, updatedBolt);
                    Object.assign(bolt, updatedBolt);
                    return true;
                }
                return false;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate(performance.now());

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('click', handleClick);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [handleClick]);

    return (
        <div className="absolute inset-0 z-0">
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                style={{ mixBlendMode: 'screen', opacity: 0.8 }}
            />
        </div>
    );
} 