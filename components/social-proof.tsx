"use client";

import { motion, Variants } from "framer-motion";

const companies = [
  {
    name: "Ethereum",
    logo: "/logos/ethereum.svg",
    description: "Leading Smart Contract Platform"
  },
  {
    name: "Polygon",
    logo: "/logos/polygon.svg",
    description: "Layer 2 Scaling Solution"
  },
  {
    name: "Arbitrum",
    logo: "/logos/arbitrum.svg",
    description: "Optimistic Rollup Solution"
  },
  {
    name: "Avalanche",
    logo: "/logos/avalanche.svg",
    description: "High-Performance Blockchain"
  },
  {
    name: "Binance",
    logo: "/logos/binance.svg",
    description: "Leading Crypto Exchange"
  }
];

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
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

export function Companies() {
  return (
    <section className="py-20 overflow-hidden bg-muted/30">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpDelayed(0)}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-2xl font-bold tracking-tight">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            We work with the most innovative platforms in the blockchain space
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
          {companies.map((company, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpDelayed(0.1 + idx * 0.1)}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-6 text-center rounded-lg border bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                <div className="h-12 flex items-center justify-center mb-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-8 w-auto object-contain dark:brightness-0 dark:invert transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">{company.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {company.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            And many more blockchain platforms trust our solutions
          </p>
        </motion.div>
      </div>
    </section>
  );
}
