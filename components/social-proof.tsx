"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const companies = [
  {
    name: "ApeBond",
    logo: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/ApeBond.jpg",
    description: "On-Chain OTC Marketplace",
    website: "https://ape.bond"
  },
  {
    name: "Lynex",
    logo: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Lynex.jpg",
    description: "The Native Liquidity Engine and ALM marketplace of Linea",
    website: "https://lynex.fi"
  },
  {
    name: "Ocelex",
    logo: "https://raw.githubusercontent.com/SoulSolidity/registry/refs/heads/main/src/assets/projects/Ocelex.svg",
    description: "The Native Liquidity Engine and ALM marketplace of Zircuit",
    website: "https://ocelex.fi"
  },
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

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
          {companies.map((company, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpDelayed(0.1 + idx * 0.1)}
              className="group relative w-full max-w-[280px]"
            >
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 text-center rounded-lg border bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
                  <div className="h-24 flex items-center justify-center mb-4">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-center min-h-[60px]">
                    <h3 className="font-medium text-sm">{company.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {company.description}
                    </p>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
