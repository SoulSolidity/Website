"use client";

import { motion, Variants } from 'framer-motion';

const stats = [
  {
    value: '$22B+',
    label: 'Secured transactions',
    description: 'Total value secured through our smart contracts',
  },
  {
    value: '1000+',
    label: 'Smart Contracts',
    description: 'Successfully deployed and audited',
  },
  {
    value: '$0',
    label: 'Hacked or exploited',
    description: 'Perfect security track record',
  },
  {
    value: '5+',
    label: 'Years of experience',
    description: 'Building secure DeFi solutions',
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

const Stats = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 pointer-events-none" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="container relative"
      >
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpDelayed(0.2)}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            Trusted by Leading DeFi Protocols
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpDelayed(0.3)}
            className="text-xl text-muted-foreground"
          >
            Our track record speaks for itself
          </motion.p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpDelayed(0.2 + index * 0.1)}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 rounded-lg -z-10 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors duration-500" />
              <div className="p-8 text-center rounded-lg border bg-background/50 backdrop-blur-sm space-y-4 hover:border-primary/50 transition-colors duration-300">
                <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {stat.value}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
