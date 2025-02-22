"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "../lib/constants";
import { Card } from "@/components/ui/card";
import {
    TrendingUp,
    ShieldCheck,
    Wallet,
    Sparkles,
    ArrowRightLeft,
    Clock,
    Puzzle,
    ShieldAlert,
    MousePointer2,
    Gauge
} from "lucide-react";

const benefits = [
    {
        icon: Puzzle,
        title: "Overcoming DeFi Complexity",
        description: "Address the challenge of complex, multi-step transactions by consolidating them into single-click actions, simplifying the user experience."
    },
    {
        icon: MousePointer2,
        title: "Boosting User Engagement",
        description: "Transform tedious multi-click processes into seamless single-click actions, significantly enhancing user engagement and platform interaction."
    },
    {
        icon: ShieldAlert,
        title: "Eliminating User Error",
        description: "Reduce the risk of costly user errors by automating multi-step processes. With zap, the system handles the complexities, ensuring accurate transactions."
    },
];

export default function BenefitsSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="container"
        >
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                    Why Integrate Zap?
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                        <motion.div
                            key={benefit.title}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: index * 0.1
                                    }
                                }
                            }}
                        >
                            <Card className="p-6 h-full bg-card hover:bg-accent/5 transition-colors">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{benefit.title}</h3>
                                </div>
                                <p className="text-muted-foreground">
                                    {benefit.description}
                                </p>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
} 