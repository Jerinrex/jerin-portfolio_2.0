"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Download, Github, Linkedin, Instagram, Award } from "lucide-react";
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
    }
    
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

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center">
                        Get In Touch
                    </h2>

                    {/* Contact Info */}
                    <div className="text-center mb-8">
                        <p className="text-lg text-muted-foreground mb-2">
                            <a
                                href="tel:+918925212131"
                                className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                            >
                                +91 8925212131
                            </a>
                        </p>
                        <p className="text-lg text-muted-foreground mb-2">
                            <a
                                href="mailto:jerinrx@gmail.com"
                                className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                            >
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
                            <a href="/resume/Jerin_Rex_G_Resume.pdf" download="JerinRexG_Resume.pdf">
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