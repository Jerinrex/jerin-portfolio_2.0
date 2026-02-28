"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

const projects = [
   
    
    {
        title: "FlexFit 360",
        description:
            "Fitness tracking Android mobile application built using Java in Android Studio. Features workout plans, progress tracking and fitness goal management.",
        tech: ["Java", "Android Studio", "XML", "SQLite"],
        github: "https://github.com/jerinrex",
        demo: null,
    },
    {
        title: "RR Bowl",
        description:
            "Biryani delivery Android application built using Java in Android Studio. Features menu browsing, cart management, and order tracking.",
        tech: ["Java", "Android Studio", "XML", "MySQL"],
        github: "https://github.com/jerinrex",
        demo: null,
    },
    {
        title: "Golden Hour Glow",
        description:
            "Professional website for a beauty parlour with service listings, appointment booking and gallery. Built with a clean and elegant UI.",
        tech: ["HTML", "CSS", "JavaScript", "PHP"],
        github: "https://github.com/jerinrex",
        demo: null,
    },
    {
        title: "Gymrats",
        description:
            "Website for a college gym featuring membership plans, workout schedules, trainer profiles and an online inquiry form.",
        tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "PHP"],
        github: "https://github.com/jerinrex",
        demo: null,
    },
    {
        title: "Advanced Notepad",
        description:
            "Feature-rich Notepad application for Windows with advanced text editing capabilities, built using C# and .NET Framework.",
        tech: ["C#", ".NET Framework", "Windows Forms"],
        github: "https://github.com/jerinrex",
        demo: null,
    },
    {
        title: "MyJarvis",
        description:
            "Personal AI Assistant built for self-use, powered by Grok API. Features a smooth conversational interface built with Flutter as the frontend. Handles personal queries, tasks and assistance on the go.",
        tech: ["Flutter", "Dart", "Grok API", "REST API"],
        github: "https://github.com/jerinrex",
        demo: null,
    },
];

export function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    Projects
                </motion.h2>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Card className="h-full flex flex-col hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-start justify-between gap-2">
                                        <span>{project.title}</span>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-primary transition-colors"
                                                aria-label={`${project.title} GitHub repository`}
                                            >
                                                <Github className="h-5 w-5" />
                                            </a>
                                        )}
                                    </CardTitle>
                                    <CardDescription className="text-sm leading-relaxed">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 text-xs bg-accent text-accent-foreground rounded border border-border"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline min-h-[44px]"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Live Demo
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}