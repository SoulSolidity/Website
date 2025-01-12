"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BackgroundBlue = () => {
    return (
        <div className="relative w-full h-full">
            <motion.div
                className={cn(
                    "absolute top-[-50px] left-[-50px] w-72 h-72 rounded-full bg-blue-500 opacity-50",
                    "animate-pulse"
                )}
                style={{ filter: "blur(100px)" }}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
        </div>
    );
};

export default BackgroundBlue;
