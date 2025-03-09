"use client";

import Contact from "@/app/components/contact";
import Products from "@/app/components/products";
import { Companies } from "@/components/social-proof";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import HackerBackground from "@/app/components/HackerBackground";
import { LogoWithTheme } from "./components/LogoWithTheme";

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
            <div className="w-full max-w-[500px] mx-auto">
              <LogoWithTheme />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                Developer Lab with a{" "}
                <span className="text-primary relative inline-block">
                  Passion for Solidity
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
        className="py-32 bg-background"
      >
        <Products />
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-accent/10"
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

      {/* About Section */}
      <motion.section
        id="about"
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
              About Soul Solidity
            </h2>
            <p className="text-xl text-muted-foreground">
              Our journey, mission, and the team behind our blockchain innovations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    At Soul Solidity, we're dedicated to building the future of decentralized finance through innovative, secure, and efficient blockchain solutions. Our mission is to accelerate the adoption of blockchain technology by creating robust tools and services that solve real-world problems.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Our Expertise</h3>
                  <p className="text-muted-foreground">
                    With over 5 years of experience in blockchain development, our team specializes in Solidity smart contracts, DeFi protocols, and custom blockchain solutions. We've helped numerous projects launch securely and scale effectively in the ever-evolving crypto landscape.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl overflow-hidden border bg-card/50 backdrop-blur-sm p-6"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Our Values</h3>
                  <ul className="space-y-3">
                    {[
                      { title: "Security First", description: "We prioritize security in every line of code we write." },
                      { title: "Transparency", description: "We believe in open communication and clear documentation." },
                      { title: "Innovation", description: "We constantly explore new technologies and approaches." },
                      { title: "Quality", description: "We deliver well-tested, robust solutions that stand the test of time." }
                    ].map((value, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <div className="h-3 w-3 rounded-full bg-primary" />
                        </div>
                        <div>
                          <span className="font-medium">{value.title}:</span> {value.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
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
        className="bg-background"
      >
        <Contact />
      </motion.section>
    </>
  );
}

export default HeroPage;
