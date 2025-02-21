"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-2xl mx-auto mb-16"
            >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Get in Touch</h2>
                <p className="text-xl text-muted-foreground">
                    Have a project in mind? We'd love to hear about it.
                </p>
            </motion.div>

            <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-12 items-start">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="lg:col-span-2 space-y-8"
                >
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Let's Build Together</h3>
                        <p className="text-muted-foreground">
                            Whether you're looking to implement new features, audit your smart contracts,
                            or build a complete blockchain solution, we're here to help turn your vision into reality.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-medium">What we offer:</h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>• Smart Contract Development</li>
                            <li>• Security Audits</li>
                            <li>• DApp Development</li>
                            <li>• Technical Consulting</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-3"
                >
                    <div className="rounded-xl border bg-card p-8">
                        <form className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" placeholder="Enter your first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" placeholder="Enter your last name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your project"
                                    className="min-h-[150px] resize-none"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
