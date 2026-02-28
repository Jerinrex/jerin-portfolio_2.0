"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Smartphone, Database, Shield, GitBranch, Globe } from "lucide-react";

const skillCategories = [
    {
        title: "Mobile Development",
        icon: Smartphone,
        skills: ["Flutter", "Dart", "Android Studio", "Java (Android)"],
    },
    {
        title: "Web & Full Stack",
        icon: Globe,
        skills: ["React.js", "Node.js", "Express.js", "PHP", "HTML", "CSS", "JavaScript", "Bootstrap"],
    },
    {
        title: "Databases",
        icon: Database,
        skills: ["MongoDB", "MySQL", "OracleDB","PL/SQL", "Firebase"],
    },
    {
        title: "Backend & APIs",
        icon: Code2,
        skills: ["REST API", "Postman", "Swagger", "Servlet", "JSP", "JDBC"],
    },
    {
        title: "Cybersecurity",
        icon: Shield,
        skills: ["Nmap", "Burp Suite", "John The Ripper"],
    },
    {
        title: "Tools & Version Control",
        icon: GitBranch,
        skills: ["Git", "GitHub", "VS Code", "NetBeans", "Oracle SQL Developer", "Python"],
    },
];

export function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    Technical Skills
                </motion.h2>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map(({ title, icon: Icon, skills }, index) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl">{title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}