"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Zap } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const fadeInUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay }
  }
});

class SpeedZap {
    x: number;
    progress: number;
    speed: number;
    size: number;
    opacity: number;
    points: { x: number; y: number }[];
    canvasHeight: number;
    canvasWidth: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.progress = 0;
        this.speed = 15 + Math.random() * 10;
        this.size = 2 + Math.random() * 2;
        this.opacity = 0.6 + Math.random() * 0.4;
        this.x = -50 + Math.random() * 100;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        
        // Generate zigzag points
        this.points = [];
        let currentX = this.x;
        const segments = 4 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i <= segments; i++) {
            this.points.push({
                x: currentX + (Math.random() - 0.5) * 30,
                y: (this.canvasHeight / segments) * i
            });
        }
    }

    update(isHovering: boolean) {
        if (isHovering) {
            this.progress = Math.min(1, this.progress + 0.1);
        } else {
            this.progress = Math.max(0, this.progress - 0.1);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.progress <= 0) return;

        ctx.save();
        ctx.translate(this.canvasWidth / 2, 0);

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(0, `rgba(255, 255, 100, ${this.opacity * this.progress})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 0, ${this.opacity * this.progress})`);
        gradient.addColorStop(1, `rgba(255, 200, 0, ${this.opacity * this.progress})`);

        // Draw glow
        ctx.shadowColor = 'rgba(255, 255, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw the zigzag path
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, 0);
        
        for (let i = 1; i < this.points.length; i++) {
            const progress = Math.min(1, this.progress * (this.points.length / (i + 0.5)));
            if (progress > 0) {
                ctx.lineTo(
                    this.points[i].x,
                    this.points[i].y * progress
                );
            }
        }
        ctx.stroke();

        // Draw core
        ctx.shadowBlur = 0;
        ctx.lineWidth = this.size / 2;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * this.progress})`;
        ctx.stroke();

        ctx.restore();
    }
}

const SpeedZaps = ({ isHovering }: { isHovering: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 400;
        canvas.height = 200;

        // Create multiple speed zaps
        const speedZaps = Array(6).fill(null).map(() => new SpeedZap(canvas.width, canvas.height));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            speedZaps.forEach(zap => {
                zap.update(isHovering);
                zap.draw(ctx);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isHovering]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
            width="400"
            height="200"
        />
    );
};

// Define LightningBolt class outside of the component
class LightningBolt {
    x: number;
    y: number;
    progress: number;
    size: number;
    opacity: number;
    points: { x: number; y: number }[];
    fadeSpeed: number;
    startTime: number;
    width: number;
    canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number, clickX?: number) {
        this.progress = 0;
        this.size = 200 + Math.random() * 400;
        this.opacity = 0.9 + Math.random() * 0.1;
        this.x = clickX ?? Math.random() * canvasWidth;
        this.y = -50;
        this.fadeSpeed = 0.01 + Math.random() * 0.01;
        this.startTime = performance.now();
        this.width = 4 + Math.random() * 3;
        this.canvasHeight = canvasHeight;
        
        this.points = [];
        let currentY = 0;
        const segments = 12 + Math.floor(Math.random() * 6);
        const height = canvasHeight * (0.5 + Math.random() * 0.5);
        const segmentSize = height / segments;
        
        for (let i = 0; i <= segments; i++) {
            const spread = Math.min(300, segmentSize);
            this.points.push({
                x: (Math.random() - 0.5) * spread,
                y: currentY
            });
            currentY += segmentSize * (0.7 + Math.random() * 0.6);
        }
    }

    update(currentTime: number) {
        if (currentTime < this.startTime) return false;

        if (this.progress < 1) {
            this.progress = Math.min(1, this.progress + 0.2);
        } else {
            this.opacity = Math.max(0, this.opacity - this.fadeSpeed);
        }

        return this.opacity > 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);

        const gradient = ctx.createLinearGradient(0, 0, 0, this.points[this.points.length - 1].y);
        gradient.addColorStop(0, `rgba(255, 255, 150, ${this.opacity * this.progress})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 0, ${this.opacity * this.progress})`);
        gradient.addColorStop(1, `rgba(255, 220, 0, ${this.opacity * this.progress})`);

        ctx.shadowColor = 'rgba(255, 255, 0, 0.8)';
        ctx.shadowBlur = 30;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        for (let i = 1; i < this.points.length; i++) {
            const progress = Math.min(1, this.progress * (this.points.length / (i + 0.5)));
            if (progress > 0) {
                ctx.lineTo(
                    this.points[i].x,
                    this.points[i].y * progress
                );
            }
        }
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.lineWidth = this.width * 0.6;
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * this.progress * 1.5})`;
        ctx.stroke();

        ctx.restore();
    }
}

const BackgroundLightning = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();
    const lightningBoltsRef = useRef<LightningBolt[]>([]);
    const maxBolts = 6;

    const addNewBolt = useCallback((x?: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        if (lightningBoltsRef.current.length < maxBolts) {
            const bolt = new LightningBolt(canvas.width, canvas.height, x);
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
                const isActive = bolt.update(currentTime);
                if (isActive) {
                    bolt.draw(ctx);
                }
                return isActive;
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
                className="absolute top-0 left-0 w-full h-full pointer-events-auto cursor-crosshair"
                style={{ mixBlendMode: 'screen', opacity: 0.8 }}
            />
        </div>
    );
};

function ZapPage() {
    return (
        <>
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                <BackgroundLightning />
                
                <div className="space-y-8 py-32 md:py-40 w-full relative">
                    <div className="container flex max-w-[64rem] flex-col items-center gap-12 text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUpDelayed(0.2)}
                            className="space-y-6"
                        >
                            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                                <motion.span
                                    className="block mb-4"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    Lightning Fast
                                </motion.span>{" "}
                                <motion.span
                                    className="text-primary relative inline-block"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    Token Swaps
                                    <div className="absolute -inset-x-4 -inset-y-2 bg-primary/10 blur-2xl rounded-lg -z-10 animate-pulse" />
                                    <div className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10" />
                                </motion.span>
                            </h1>
                            <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                                Experience seamless token swaps with our high-performance DEX aggregator.
                                Built for speed, security, and the best possible rates.
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUpDelayed(0.4)}
                            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                        >
                            <Button asChild size="lg" className="group relative overflow-hidden hover:scale-105 transition-transform">
                                <Link href="/docs/zap">
                                    <motion.span
                                        className="relative z-10"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Documentation
                                    </motion.span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </Button>
                            <Button 
                                asChild 
                                variant="outline" 
                                size="lg"
                                className="group hover:scale-105 transition-transform"
                            >
                                <Link href="#demo">
                                    Try Demo
                                    <Zap className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="w-full max-w-[58rem] rounded-lg border bg-background/50 backdrop-blur-sm p-8 mt-12 hover:border-primary/50 transition-colors duration-300"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                                {[
                                    { label: "Total Volume", value: "$100M+" },
                                    { label: "Supported DEXs", value: "10+" },
                                    { label: "Chains", value: "15+" },
                                    { label: "Daily Users", value: "1000+" },
                                ].map((stat, i) => (
                                    <motion.div 
                                        key={i}
                                        className="space-y-2"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <motion.h4 
                                            className="text-2xl font-bold"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + (i * 0.1) }}
                                        >
                                            {stat.value}
                                        </motion.h4>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ZapPage;
