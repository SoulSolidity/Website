"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BackgroundRed = () => {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <motion.div
                className={cn(
                    "absolute bottom-[-50px] right-[-50px] w-72 h-72 rounded-full bg-red-500 opacity-50",
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

export default BackgroundRed;
