"use client";

import { Button } from "@/components/ui/button";
import { Zap, ArrowUp, Bolt } from "lucide-react";
import { motion } from "framer-motion";

const Products = () => {
    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl mx-auto mb-16"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Products</h2>
                <p className="text-xl text-muted-foreground">
                    Innovative solutions powering the future of blockchain technology
                </p>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
                {[
                    {
                        icon: <Zap className="size-6" />,
                        title: "Zap",
                        description: "Enhance user experience with our zap solution. Consolidate multiple transactions into one, reduce the number of clicks, and keep your users coming back for more with a smoother, faster process."
                    },
                    {
                        icon: <ArrowUp className="size-6" />,
                        title: "UpTickr",
                        description: "Advanced DeFi analytics and tracking platform. Real-time monitoring, custom alerts, and comprehensive reporting tools for your blockchain investments."
                    },
                    {
                        icon: <Bolt className="size-6" />,
                        title: "Custom Software",
                        description: "Tailored blockchain solutions built to your specifications. From smart contracts to full-stack dApps, we bring your vision to life with security and efficiency."
                    }
                ].map((product, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="relative group rounded-xl bg-card p-8 shadow-sm"
                    >
                        <div className="mb-8 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                            <div className="text-primary">{product.icon}</div>
                        </div>
                        <h3 className="mb-3 text-xl font-semibold">{product.title}</h3>
                        <p className="mb-8 text-muted-foreground">
                            {product.description}
                        </p>
                        <Button variant="outline" className="w-full">
                            Learn More
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Products;
