"use client";

import Contact from "@/app/components/contact";
import Products from "@/app/components/products";
import { Companies } from "@/components/social-proof";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import HackerBackground from "@/app/components/HackerBackground";

function HeroPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <HackerBackground />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-[64rem] mx-auto text-center space-y-8"
          >
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full blur opacity-75 animate-gradient-xy"></div>
              <div className="relative px-6 py-3 bg-black rounded-full ring-1 ring-gray-900/5 leading-none">
                <span className="text-sm md:text-base font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent flex items-center gap-2">
                  <span className="animate-pulse">✨</span>
                  Welcome to Soul Solidity
                  <span className="animate-pulse">✨</span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                Developer Lab with a{" "}
                <span className="text-primary relative inline-block">
                  Passion for Solidity
                  <div className="absolute -inset-1 bg-primary/10 blur-xl rounded-lg -z-10" />
                </span>
              </h1>
              <p className="max-w-[42rem] mx-auto text-xl text-muted-foreground">
                We build simple, secure, and robust decentralized systems. Our focus on innovation, transparency, and efficiency delivers trusted solutions for the blockchain ecosystem.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="relative">
                <Link href="/#contact">
                  Contact us
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#products">
                  Explore products
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <motion.section
        id="products"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-accent/10"
      >
        <Products />
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-background"
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-muted-foreground">
              Building trust through consistent delivery and proven results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: "Secured transactions", value: "$22B+", description: "Total value secured through our smart contracts" },
              { label: "Smart Contracts", value: "500+", description: "Deployed securely" },
              { label: "Hacked or exploited", value: "$0", description: "Perfect security track record" },
              { label: "Years Experience", value: "5+", description: "Building secure DeFi solutions" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="text-center p-6 rounded-xl border bg-card/50 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm font-medium mb-1">{stat.label}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Trusted By Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-accent/10 overflow-hidden"
      >
        <Companies />
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-background"
      >
        <Contact />
      </motion.section>
    </>
  );
}

export default HeroPage;
