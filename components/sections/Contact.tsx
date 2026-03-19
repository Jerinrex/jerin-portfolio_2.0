"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Download, Github, Linkedin, Instagram, Award, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/jerinrex",
        icon: Github,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/jerin-rex-b02535249/",
        icon: Linkedin,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/jerin_rex",
        icon: Instagram,
    },
];

const certifications = [
    {
        name: "Technologies for Data Science",
        issuer: "Sacred Heart College (DBCSD)",
        type: "Certificate of Merit",
        date: "Dec 2023 – Apr 2024",
    },
    {
        name: "Mobile Applications Development",
        issuer: "Sacred Heart College (DBCSD)",
        type: "Certificate of Merit",
        date: "Aug 2023 – Nov 2023",
    },
    {
        name: "National Level Workshop on ReactJS",
        issuer: "Sacred Heart College — PG Dept. of Computer Science",
        type: "Certificate of Participation",
        date: "Feb 8, 2024",
    },
    {
        name: "National Level Workshop on Flask",
        issuer: "Sacred Heart College — Dept. of Computer Applications",
        type: "Certificate of Participation",
        date: "Sep 6, 2024",
    },
];

export function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatus("error");
            setErrorMsg("Please fill in all fields.");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
            } else {
                const data = await res.json();
                setStatus("error");
                setErrorMsg(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setErrorMsg("Network error. Please try again.");
        }
    };

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
                        Get In Touch
                    </h2>
                    <p className="text-center text-muted-foreground mb-12 text-lg">
                        Have a project in mind or want to collaborate? Drop me a message!
                    </p>

                    {/* Contact Form */}
                    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-10 shadow-lg shadow-primary/5">
                        <div className="space-y-5">
                            {/* Name & Email Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground" htmlFor="name">
                                        Your Name
                                    </label>
                                    <input
                                        suppressHydrationWarning
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground" htmlFor="email">
                                        Your Email
                                    </label>
                                    <input
                                        suppressHydrationWarning
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    suppressHydrationWarning
                                    id="message"
                                    name="message"
                                    rows={5}
                                    placeholder="Hi Jerin, I'd love to work with you on..."
                                    value={form.message}
                                    onChange={handleChange}
                                    disabled={status === "loading"}
                                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 text-sm resize-none"
                                />
                            </div>

                            {/* Status Messages */}
                            {status === "success" && (
                                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3 text-sm">
                                    <CheckCircle className="h-4 w-4 shrink-0" />
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3 text-sm">
                                    <AlertCircle className="h-4 w-4 shrink-0" />
                                    {errorMsg}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                onClick={handleSubmit}
                                disabled={status === "loading" || status === "success"}
                                size="lg"
                                className="w-full min-h-[48px] text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-blue-600/20"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : status === "success" ? (
                                    <>
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        Message Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center mb-8">
                        <p className="text-lg text-muted-foreground mb-2">
                            <a href="tel:+918925212131" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                                +91 8925212131
                            </a>
                        </p>
                        <p className="text-lg text-muted-foreground mb-2">
                            <a href="mailto:jerinrx@gmail.com" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
                                jerinrx@gmail.com
                            </a>
                        </p>
                        <p className="text-lg text-muted-foreground">Tamil Nadu, India</p>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                        {socialLinks.map(({ name, href, icon: Icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="min-h-[44px] px-4 py-2 flex items-center gap-2 rounded-lg bg-accent hover:bg-primary/20 transition-colors text-sm font-medium"
                                aria-label={name}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="hidden sm:inline">{name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Certifications */}
                    <div className="mb-10">
                        <h3 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
                            <Award className="h-6 w-6 text-primary" />
                            Certifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {certifications.map(({ name, issuer, type, date }) => (
                                <div
                                    key={name}
                                    className="px-4 py-4 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors"
                                >
                                    <span className="font-semibold text-sm text-foreground block mb-1">{name}</span>
                                    <span className="text-xs text-primary block mb-1">{type}</span>
                                    <span className="text-xs text-muted-foreground block">{issuer}</span>
                                    <span className="text-xs text-muted-foreground">{date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resume Download */}
                    <div className="text-center">
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="min-h-[44px] px-8 text-base font-semibold"
                        >
                            <a href="/resume/JerinRexG.pdf" download="JerinRexG_Resume.pdf">
                                <Download className="mr-2 h-5 w-5" />
                                Download Resume
                            </a>
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                        <p>© 2026 JERIN REX G. Built with Next.js, TypeScript, and Tailwind CSS.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}