"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code2, Shield, Zap } from "lucide-react";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const ServiceCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <Card className="p-6 flex flex-col items-center text-center space-y-4 hover:border-primary transition-colors bg-background/80 backdrop-blur-sm">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
            {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
    </Card>
);

export default function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center overflow-hidden py-16">
            <div className="container relative">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="mx-auto text-center max-w-4xl"
                >
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text mb-6">
                        Custom Blockchain Solutions
                    </h1>
                    <p className="text-xl leading-8 text-muted-foreground mb-12">
                        Tailored blockchain solutions built to your specifications. From smart contracts to full-stack dApps, we bring your vision to life with security and efficiency.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <ServiceCard
                            icon={<Code2 className="w-6 h-6" />}
                            title="Custom Development"
                            description="Bespoke smart contracts and dApps tailored to your unique requirements"
                        />
                        <ServiceCard
                            icon={<Shield className="w-6 h-6" />}
                            title="Security First"
                            description="Battle-tested security practices and thorough auditing processes"
                        />
                        <ServiceCard
                            icon={<Zap className="w-6 h-6" />}
                            title="Efficient Delivery"
                            description="Optimized solutions with quick turnaround and ongoing support"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-x-6">
                        <Link href="#contact">
                            <Button onClick={() => window.open('https://t.me/doublo', '_blank')} size="lg" className="group relative overflow-hidden">
                                <span className="relative z-10">Get in Touch</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 