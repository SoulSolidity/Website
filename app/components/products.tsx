"use client";

import { Button } from "@/components/ui/button";
import { Zap, ArrowUp, Bolt, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

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

            <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto [&>*:last-child:nth-child(3n-1)]:lg:col-span-3 [&>*:last-child:nth-child(3n-2)]:lg:col-span-3">
                {[
                    {
                        icon: <Zap className="size-6" />,
                        title: "Zap",
                        description: "Enhance user experience with our zap solution. Consolidate multiple transactions into one, reduce the number of clicks, and keep your users coming back for more with a smoother, faster process.",
                        link: "/zap"
                    },
                    {
                        icon: <LineChart className="size-6" />,
                        title: "Price API",
                        description: "Developer-friendly API for real-time token and LP pricing, with automatic new token support.",
                        link: "/pricing"
                    },
                    {
                        icon: <ArrowUp className="size-6" />,
                        title: "UpTickr",
                        description: "Maximize your DeFi returns with our intelligent liquidity management protocol. UpTickr automatically optimizes Uniswap V3 positions, ensuring efficient market-making, rising price floors, and enhanced returns for liquidity providers.",
                        link: "/uptickr"
                    },
                    {
                        icon: <Bolt className="size-6" />,
                        title: "Custom Software",
                        description: "Tailored blockchain solutions built to your specifications. From smart contracts to full-stack dApps, we bring your vision to life with security and efficiency.",
                        link: "/hire-us"
                    }
                ].map((product, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="relative group rounded-xl bg-card p-8 shadow-sm flex flex-col h-full hover:scale-[1.02] transition-all duration-300 hover:shadow-lg cursor-pointer"
                    >
                        {product.link && (
                            <>
                                <Link href={product.link} className="absolute inset-0" aria-label={`Learn more about ${product.title}`} />
                                <div className="absolute bottom-8 right-8">
                                    <span 
                                        className="pointer-events-none text-sm font-medium text-muted-foreground group-hover:text-primary flex items-center group-hover:translate-x-1 transition-all"
                                    >
                                        Learn more <ArrowUp className="ml-2 h-4 w-4 rotate-45" />
                                    </span>
                                </div>
                            </>
                        )}
                        <div className="mb-8 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3 self-start group-hover:bg-primary/20 transition-colors">
                            <div className="text-primary">{product.icon}</div>
                        </div>
                        <h3 className="mb-3 text-xl font-semibold group-hover:text-primary transition-colors">{product.title}</h3>
                        <p className="text-muted-foreground mb-12 group-hover:text-foreground transition-colors">
                            {product.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Products;
