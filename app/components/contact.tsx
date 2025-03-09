"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, FormEvent } from "react";

interface SocialLink {
    href: string;
    icon: JSX.Element;
    label: string;
}

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validateForm = () => {
        const newErrors: Partial<FormData> = {};
        if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        if (!formData.email.includes("@")) {
            newErrors.email = "Please enter a valid email";
        }
        if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Here you would typically send the form data to your backend
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" });
        // Add toast notification here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const socialLinks: SocialLink[] = [
        {
            href: "https://t.me/doublo",
            icon: <Icons.telegram className="h-7 w-7 text-foreground/80 group-hover:text-foreground" />,
            label: "Telegram"
        },
        {
            href: "https://twitter.com/soulsolidity",
            icon: <Icons.twitter className="h-7 w-7 fill-foreground/80 group-hover:fill-foreground" />,
            label: "Twitter"
        }
    ];

    return (
        <div className="container py-16 min-h-screen flex items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto w-full bg-card rounded-xl shadow-lg p-8"
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Get in Touch</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Have a question or want to work together? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className={`h-12 ${errors.email ? "border-red-500" : ""}`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <Textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className={`min-h-[160px] resize-none ${errors.message ? "border-red-500" : ""}`}
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-2">{errors.message}</p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-medium"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>

                    <div className="lg:border-l lg:pl-12">
                        <h3 className="text-2xl font-semibold mb-6">Connect with us</h3>
                        <div className="flex gap-4 items-center">
                            {socialLinks.map((link, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-11 w-11 p-1 rounded-full group hover:bg-muted hover:scale-110 transition-all duration-300"
                                        >
                                            {link.icon}
                                        </Button>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
