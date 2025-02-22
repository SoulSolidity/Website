"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "../lib/constants";

export default function CTASection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="container"
        >
            <div className="max-w-3xl mx-auto text-center space-y-12">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">
                        Ready to Integrate Zap?
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Explore our documentation to seamlessly integrate Zap into your project
                    </p>
                    <Button size="lg" asChild className="min-w-40">
                        <Link href="/docs">
                            Integration Guide
                        </Link>
                    </Button>
                </div>

                <div className="border-t pt-12">
                    <p className="text-muted-foreground mb-6">
                        Need custom Zap solutions for your specific use case? Let's build something amazing together!
                    </p>
                    
                    <Button onClick={() => window.open("https://t.me/doublo", "_blank")} size="lg" variant="outline" className="min-w-40" >
                        Request Custom Solution
                    </Button>
                </div>
            </div>
        </motion.section>
    );
} 