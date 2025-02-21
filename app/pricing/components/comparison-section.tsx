"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { fadeInUp, comparisonFeatures } from "../lib/constants";

export default function ComparisonSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="py-20 container"
        >
            <h2 className="text-3xl font-bold text-center mb-12">Feature Comparison</h2>
            <div className="overflow-x-auto rounded-xl border bg-card">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b bg-muted/50">
                            <th className="py-4 px-6 text-left font-semibold">Feature</th>
                            <th className="py-4 px-6 text-center font-semibold">SoulSolidity</th>
                            <th className="py-4 px-6 text-center font-semibold">CoinGecko</th>
                            <th className="py-4 px-6 text-center font-semibold">DexScreener</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFeatures.map((item, index) => (
                            <tr key={item.feature} className={`border-b ${index % 2 === 0 ? 'bg-muted/20' : ''}`}>
                                <td className="py-4 px-6">{item.feature}</td>
                                <td className="py-4 px-6 text-center">
                                    {item.soulSolidity ? (
                                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-500 mx-auto" />
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {item.coingecko ? (
                                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-500 mx-auto" />
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {item.dexscreener ? (
                                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-500 mx-auto" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.section>
    );
} 