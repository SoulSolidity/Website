"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUpDelayed } from "../lib/constants";
import { DexCard } from "./dex-card";

export default function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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
                                Real-Time
                            </motion.span>{" "}
                            <motion.span
                                className="text-primary relative inline-block"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Token Pricing
                                <div className="absolute -inset-x-4 -inset-y-2 bg-primary/10 blur-2xl rounded-lg -z-10 animate-pulse" />
                                <div className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10" />
                            </motion.span>
                        </h1>
                        <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                            Access real-time on-chain token and LP prices with our reliable, high-performance API.
                            Built for developers, by developers.
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUpDelayed(0.4)}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
                    >
                        <Button asChild size="lg" className="group relative overflow-hidden hover:scale-105 transition-transform">
                            <Link href="/docs">
                                <motion.span
                                    className="relative z-10"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Documentation
                                </motion.span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 