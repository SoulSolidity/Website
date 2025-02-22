"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUpDelayed } from "../lib/constants";
import { BackgroundLightning } from "@/app/zap/components/lightning/background-lightning";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

function StormBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background/80">
            {/* Base storm atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background opacity-80" />
            
            {/* Animated storm clouds */}
            <div className="absolute inset-0">
                {/* Top right cloud mass */}
                <div className="absolute -right-1/4 -top-1/4 w-3/4 h-3/4 animate-slow-drift">
                    <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
                </div>
                
                {/* Top left cloud mass */}
                <div className="absolute -left-1/4 -top-1/3 w-2/3 h-2/3 animate-slow-drift-delay">
                    <div className="absolute inset-0 bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl" />
                </div>
                
                {/* Center cloud mass */}
                <div className="absolute left-1/4 -top-1/4 w-2/3 h-2/3 animate-slow-drift-alt">
                    <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl" />
                </div>
            </div>
            
            {/* Sparkle effect layer */}
            <div className="absolute inset-0 opacity-80">
                <div className="absolute h-full w-full">
                    {[...Array(24)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full animate-sparkle-fade"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${1.5 + Math.random() * 3}px`,
                                height: `${1.5 + Math.random() * 3}px`,
                                background: 'linear-gradient(180deg, rgba(255, 240, 50, 0.4), rgba(255, 220, 100, 0.2))',
                                boxShadow: '0 0 4px rgba(255, 220, 100, 0.4), 0 0 10px rgba(255, 230, 0, 0.6)',
                                animationDelay: `${i * 0.2}s`
                            }}
                        />
                    ))}
                </div>
            </div>
            
            {/* Ambient glow */}
            <div className="absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/5 to-transparent" />
            </div>
            
            {/* Subtle energy waves */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-primary/5 animate-pulse-subtle" />
            </div>
            
            {/* Noise texture overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-soft-light" />
        </div>
    );
}

export default function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
            <StormBackground />
            <BackgroundLightning />
            <div className="container relative">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mx-auto text-center max-w-3xl"
                >
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text">
                        Simplify Your
                    </h1>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text">
                        Crypto Transactions
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Enhance user experience with our zap solution. Consolidate multiple transactions into one, reduce the number of clicks, and keep your users coming back for more with a smoother, faster process.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/docs">
                            <Button size="lg" className="group relative overflow-hidden">
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 