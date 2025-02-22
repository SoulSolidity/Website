"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { fadeInUp } from "../lib/constants";
import { useEffect, useRef, useState } from "react";

const swapSteps = [
    {
        number: "2",
        title: "First Token Swap",
        description: "Swap your input token to first token"
    },
    {
        number: "3",
        title: "Second Token Swap",
        description: "Swap your input token to second token"
    }
];

export default function HowItWorksSection() {
    const secondStepRef = useRef<HTMLDivElement>(null);
    const lastStepRef = useRef<HTMLDivElement>(null);
    const [borderStyle, setBorderStyle] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

    useEffect(() => {
        const updateBorderPosition = () => {
            if (secondStepRef.current && lastStepRef.current) {
                const secondStepRect = secondStepRef.current.getBoundingClientRect();
                const lastStepRect = lastStepRef.current.getBoundingClientRect();
                const parentRect = secondStepRef.current.parentElement?.getBoundingClientRect();

                if (parentRect) {
                    const isDesktop = window.innerWidth >= 1024;
                    
                    // For both desktop and mobile, calculate exact positions
                    const leftOffset = secondStepRect.left - parentRect.left;
                    const rightOffset = parentRect.right - lastStepRect.right;
                    const topOffset = secondStepRect.top - parentRect.top;
                    const bottomOffset = parentRect.bottom - lastStepRect.bottom;

                    setBorderStyle({
                        left: isDesktop ? leftOffset - 16 : -16,
                        right: isDesktop ? rightOffset - 16 : -16,
                        top: topOffset - 32,
                        bottom: bottomOffset - 16
                    });
                }
            }
        };

        updateBorderPosition();
        window.addEventListener('resize', updateBorderPosition);
        return () => window.removeEventListener('resize', updateBorderPosition);
    }, []);

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="container"
        >
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">
                    How It Works
                </h2>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 lg:gap-0">
                        {/* First Step */}
                        <div className="relative flex items-center">
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ delay: 0.2 }}
                                className="text-center p-4 lg:p-4 p-3 rounded-lg border bg-card w-full"
                            >
                                <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 text-primary font-bold mb-2 lg:mb-4">
                                    1
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">Approve Token</h3>
                                <p className="text-sm lg:text-base text-muted-foreground">Approve your input token (Not required for native tokens)</p>
                            </motion.div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center px-1">
                            <ArrowDown className="w-6 h-6 text-muted-foreground/30 block lg:hidden" />
                            <ArrowRight className="w-6 h-6 text-muted-foreground/30 hidden lg:block" />
                        </div>

                        {/* Token Swaps */}
                        <div ref={secondStepRef} className="relative">
                            <div className="grid grid-cols-1 gap-0">
                                {swapSteps.map((step, index) => (
                                    <motion.div
                                        key={step.number}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        transition={{ delay: 0.4 }}
                                        className={`text-center p-4 lg:p-4 p-3 rounded-lg border bg-card ${index === 0 ? 'rounded-b-none border-b-0 mb-0 pb-2' : 'rounded-t-none pt-2'}`}
                                    >
                                        <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 text-primary font-bold mb-2 lg:mb-4">
                                            {step.number}
                                        </div>
                                        <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">{step.title}</h3>
                                        <p className="text-sm lg:text-base text-muted-foreground">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center px-1">
                            <ArrowDown className="w-6 h-6 text-muted-foreground/30 block lg:hidden" />
                            <ArrowRight className="w-6 h-6 text-muted-foreground/30 hidden lg:block" />
                        </div>

                        {/* Add Liquidity */}
                        <div className="relative flex items-center">
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ delay: 0.6 }}
                                className="text-center p-4 lg:p-4 p-3 rounded-lg border bg-card w-full"
                            >
                                <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 text-primary font-bold mb-2 lg:mb-4">
                                    4
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">Add Liquidity</h3>
                                <p className="text-sm lg:text-base text-muted-foreground">Add tokens to a liquidity pool</p>
                            </motion.div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center px-1">
                            <ArrowDown className="w-6 h-6 text-muted-foreground/30 block lg:hidden" />
                            <ArrowRight className="w-6 h-6 text-muted-foreground/30 hidden lg:block" />
                        </div>

                        {/* Stake LP */}
                        <div ref={lastStepRef} className="relative flex items-center">
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                transition={{ delay: 0.8 }}
                                className="text-center p-4 lg:p-4 p-3 rounded-lg border bg-card w-full"
                            >
                                <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 text-primary font-bold mb-2 lg:mb-4">
                                    5
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold mb-2 lg:mb-3">Deposit LP Tokens</h3>
                                <p className="text-sm lg:text-base text-muted-foreground">Deposit LP tokens in your protocol</p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Zap border container */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div
                            className="hidden lg:block absolute top-[-1rem] bottom-[-1rem] border-2 border-primary rounded-lg border-dashed"
                            style={{
                                left: `${borderStyle.left}px`,
                                right: `${borderStyle.right}px`
                            }}
                        >
                            <div className="absolute -top-4 left-4 bg-background px-4 text-primary font-semibold">
                                Zap Combines These Steps Into 1 Transaction
                            </div>
                        </div>
                        {/* Mobile version of the border */}
                        <div className="block lg:hidden absolute border-2 border-primary rounded-lg border-dashed"
                            style={{
                                left: `${borderStyle.left}px`,
                                right: `${borderStyle.right}px`,
                                top: `${borderStyle.top}px`,
                                bottom: `${borderStyle.bottom}px`
                            }}
                        >
                            <div className="absolute -top-4 left-4 bg-background px-4 text-primary font-semibold text-sm">
                                Zap Combines These Steps Into 1 Transaction
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
} 