"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { fadeInUp } from "../lib/constants";
import { useChainData } from "../hooks/use-chain-data";

export default function SupportedChainsSection() {
    const { chainData, isLoading, error } = useChainData();

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="py-20 bg-accent/10"
        >
            <div className="container">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold">Supported Chains</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {chainData.map((chain) => (
                        <motion.div
                            key={chain.name}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="p-4 flex items-center justify-center space-x-3 transition-colors bg-background/80 backdrop-blur-sm">
                                <img 
                                    src={`https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/chains/${chain.image}`}
                                    alt={chain.name} 
                                    className="w-6 h-6"
                                    onError={(e) => {
                                        e.currentTarget.src = '/logos/generic-chain.svg';
                                    }}
                                />
                                <span className="font-medium">{chain.name}</span>
                            </Card>
                        </motion.div>
                    ))}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <a 
                            href="https://t.me/doublo" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Card className="p-4 h-full flex items-center justify-center space-x-3 transition-colors bg-primary/10 hover:bg-primary/20 backdrop-blur-sm cursor-pointer">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    className="w-6 h-6"
                                >
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                                <span className="font-medium">Request Chain</span>
                            </Card>
                        </a>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
} 