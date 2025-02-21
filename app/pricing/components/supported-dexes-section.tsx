"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "../lib/constants";
import { useDexData } from "../hooks/use-dex-data";
import { DexCard } from "./dex-card";

export default function SupportedDexesSection() {
    const { isLoading, getUniqueDexes } = useDexData();
    const dexes = getUniqueDexes();

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
                    <h2 className="text-3xl font-bold">Supported DEX Protocols</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from(dexes).map((dexName) => (
                        <motion.div
                            key={dexName}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <DexCard name={dexName} />
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
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 backdrop-blur-sm flex items-center justify-center">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="w-8 h-8"
                                    >
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </div>
                                <span className="font-medium text-sm">Request Integration</span>
                            </div>
                        </a>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
} 