"use client";

import Contact from "@/app/(marketing)/hero/contact/page";
import Products from "@/app/(marketing)/hero/products/page";
import { Icons } from "@/components/icons";
import { Companies } from "@/components/social-proof";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Stats from "@/app/(marketing)/hero/stats";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ShineBorder from "@/components/magicui/shine-border";

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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Matrix-like raining code effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent"
              style={{
                left: `${(i + 1) * (100 / 20)}%`,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                y: [-1000, 1000],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="space-y-6 py-24 md:py-32 w-full relative">
          <div className="container flex max-w-[68rem] flex-col items-center gap-6 text-center z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShineBorder>
                Introducing Soul Solidity ✨
              </ShineBorder>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUpDelayed(0.2)}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
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
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUpDelayed(0.4)}
              className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              We are a developer lab dedicated to building simple, secure, and robust decentralized systems. 
              Our focus on innovation, transparency, and efficiency delivers trusted solutions for the blockchain ecosystem.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUpDelayed(0.6)}
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
              className="w-full max-w-[58rem] rounded-lg border bg-background/50 backdrop-blur-sm p-4 mt-12 hover:border-primary/50 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Security Audits", value: "100+" },
                  { label: "Smart Contracts", value: "500+" },
                  { label: "Client Satisfaction", value: "100%" },
                  { label: "Years Experience", value: "5+" },
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="space-y-1"
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
