"use client";

import Contact from "@/app/components/contact";
import Products from "@/app/components/products";
import { Icons } from "@/components/icons";
import { Companies } from "@/components/social-proof";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Stats from "@/app/components/stats";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ShineBorder from "@/components/magicui/shine-border";
import HackerBackground from "@/app/components/HackerBackground";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const fadeInUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay }
  }
});

function HeroPage() {
  return (
    <>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <HackerBackground />

        <div className="space-y-8 py-32 md:py-40 w-full relative">
          <div className="container flex max-w-[64rem] flex-col items-center gap-12 text-center z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                <div className="relative px-7 py-4 bg-black rounded-full leading-none flex items-center">
                  <span className="flex items-center space-x-3">
                    <span className="pr-3 text-gray-100">✨</span>
                    <motion.span 
                      className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent font-bold"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: "200% auto"
                      }}
                    >
                      Introducing Soul Solidity
                    </motion.span>
                    <span className="pl-3 text-gray-100">✨</span>
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpDelayed(0.2)}
              className="space-y-6"
            >
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <motion.span 
                  className="block mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Developer Lab with a
                </motion.span>{" "}
                <motion.span 
                  className="text-primary relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Passion for Solidity
                  <div className="absolute -inset-x-4 -inset-y-2 bg-primary/10 blur-2xl rounded-lg -z-10 animate-pulse" />
                  <div className="absolute -inset-x-4 -inset-y-2 bg-primary/5 rounded-lg -z-10" />
                </motion.span>
              </h1>
              <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                We are a developer lab dedicated to building simple, secure, and robust decentralized systems. 
                Our focus on innovation, transparency, and efficiency delivers trusted solutions for the blockchain ecosystem.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpDelayed(0.4)}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <Button asChild size="lg" className="group relative overflow-hidden hover:scale-105 transition-transform">
                <Link href="/#contact">
                  <motion.span 
                    className="relative z-10"
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact us
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="group hover:scale-105 transition-transform"
              >
                <Link href="/#products">
                  <motion.span
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore products
                    <motion.span 
                      className="ml-2 inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    >
                      →
                    </motion.span>
                  </motion.span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full max-w-[58rem] rounded-lg border bg-background/50 backdrop-blur-sm p-8 mt-12 hover:border-primary/50 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { label: "Security Audits", value: "100+" },
                  { label: "Smart Contracts", value: "500+" },
                  { label: "Client Satisfaction", value: "100%" },
                  { label: "Years Experience", value: "5+" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="space-y-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.h4 
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + (i * 0.1) }}
                    >
                      {stat.value}
                    </motion.h4>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-12 bg-muted/50"
      >
        <Companies />
      </motion.div>

      <Stats />

      <div id="products">
        <Products />
      </div>
      
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}

export default HeroPage;
