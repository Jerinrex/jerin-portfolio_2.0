"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    Briefcase, Calendar, MapPin, ChevronRight,
    Images, ChevronDown, ChevronUp, X, ChevronLeft
} from "lucide-react";
import Image from "next/image";

const experiences = [
    {
        company: "Colakin",
        website: "https://colakin.com/",
        role: "Full Stack Developer",
        type: "Full-time",
        duration: "Jun 2025 – Present",
        location: "Melbourne, Australia (Remote)",
        color: "#06b6d4",
        projects: [
            {
                name: "Deskpad",
                description:
                    "Web application for US students to manage assignments and academic work in real-time. Built the frontend using Flutter with real-time data sync and handled dynamic API integration.",
                tech: ["Flutter", "Dart", "REST API", "Oracle DB", "PL/SQL"],
                images: ["/images/d1.png", "/images/d2.png", "/images/d3.png"],
            },
            {
                name: "Binary Success",
                description:
                    "Practice paper platform for CA students. Developed the mobile/web frontend using Flutter, backend with PL/SQL stored procedures in Oracle DB, and handled dynamic API integration.",
                tech: ["Flutter", "Dart", "PL/SQL", "Oracle DB", "REST API"],
                images: ["/images/b1.png", "/images/b2.png", "/images/b3.png"],
            },
            {
                name: "Contractor Sync",
                description:
                    "Labour check-in system for a cleaning company. Field workers check in to assigned locations, monitored via a manager portal. Built the manager portal UI, stored procedures, and API integration.",
                tech: ["React.js", "Vite", "PL/SQL", "Oracle DB", "REST API"],
                images: ["/images/c1.png", "/images/c2.png", "/images/c3.png"],
            },
        ],
    },
    {
        company: "Queenbug Technologies",
        website: "https://queenbug.com/",
        role: "Full Stack Developer",
        type: "Internship",
        duration: "Nov 2024 – Mar 2025",
        location: "Bengaluru, Karnataka, India",
        color: "#8b5cf6",
        projects: [
            {
                name: "Cipher Sphere",
                description:
                    "Secure messaging platform for corporate companies. Developed core messaging modules using the MERN Stack with end-to-end security features.",
                tech: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API"],
                images: [],
            },
        ],
    },
];

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
    images,
    startIndex,
    onClose,
}: {
    images: string[];
    startIndex: number;
    onClose: () => void;
}) {
    const [current, setCurrent] = useState(startIndex);
    const [mounted, setMounted] = useState(false);

    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [current]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    if (!mounted) return null;

    const content = (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col"
            style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* ── Top bar: counter + close ── */}
            <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
                <div className="px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium">
                    {current + 1} / {images.length}
                </div>
                {/* BIG close button — always visible on mobile */}
                <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium transition-all active:scale-95"
                >
                    <X className="w-4 h-4" />
                    <span>Close</span>
                </button>
            </div>

            {/* ── Image area ── */}
            <div className="flex-1 flex items-center justify-center px-2 min-h-0">
                {/* Prev arrow */}
                <button
                    onClick={prev}
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all active:scale-95 mr-2"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>

                {/* Image */}
                <motion.div
                    key={current}
                    className="relative flex-1 h-full max-h-[75vh] rounded-xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Image
                        src={images[current]}
                        alt={`Screenshot ${current + 1}`}
                        fill
                        className="object-contain"
                        sizes="90vw"
                    />
                </motion.div>

                {/* Next arrow */}
                <button
                    onClick={next}
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all active:scale-95 ml-2"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
            </div>

            {/* ── Dot indicators ── */}
            <div className="flex justify-center gap-2 py-4 flex-shrink-0">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                        style={{
                            backgroundColor: i === current ? "white" : "rgba(255,255,255,0.3)",
                            transform: i === current ? "scale(1.3)" : "scale(1)",
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );

    return createPortal(content, document.body);
}

// ── Screenshot Dropdown ───────────────────────────────────────────────────────
function ScreenshotDropdown({ images, color }: { images: string[]; color: string }) {
    const [open, setOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <div className="mt-4">
            {/* Toggle button */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                    backgroundColor: `${color}15`,
                    color: color,
                    border: `1px solid ${color}35`,
                }}
            >
                <Images className="w-4 h-4" />
                <span>View Screenshots ({images.length})</span>
                {open
                    ? <ChevronUp className="w-4 h-4 ml-auto" />
                    : <ChevronDown className="w-4 h-4 ml-auto" />
                }
            </button>

            {/* Animated dropdown */}
            <motion.div
                initial={false}
                animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <div className="pt-3 grid grid-cols-3 gap-3">
                    {images.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                            transition={{ delay: i * 0.06 }}
                            onClick={() => setLightboxIndex(i)}
                            className="relative rounded-xl overflow-hidden cursor-pointer group"
                            style={{
                                aspectRatio: "16/10",
                                border: `1px solid ${color}25`,
                            }}
                        >
                            <Image
                                src={src}
                                alt={`Screenshot ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="200px"
                            />
                            {/* Hover overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                                style={{ backgroundColor: `${color}40` }}
                            >
                                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <Images className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            {/* Number badge */}
                            <div
                                className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                                style={{ backgroundColor: `${color}bb` }}
                            >
                                {i + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    startIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </div>
    );
}


// ── Main Experience ───────────────────────────────────────────────────────────
export function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
                <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    Experience
                </motion.h2>

                <div ref={ref} className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />

                    <div className="space-y-12">
                        {experiences.map((exp, expIndex) => (
                            <motion.div
                                key={exp.company}
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                transition={{ duration: 0.6, delay: expIndex * 0.2 }}
                                className="relative sm:pl-16"
                            >
                                {/* Timeline dot */}
                                <div
                                    className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-background hidden sm:block"
                                    style={{ backgroundColor: exp.color }}
                                />

                                {/* Company Header */}
                                <div className="mb-6">
                                    <div className="flex flex-wrap items-center gap-3 mb-1">
                                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${exp.color}20` }}>
                                            <Briefcase className="h-5 w-5" style={{ color: exp.color }} />
                                        </div>
                                        {exp.website ? (
    <a
        href={exp.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-2xl font-bold text-foreground hover:underline hover:text-primary transition-colors"
    >
        {exp.company}
    </a>
) : (
    <h3 className="text-2xl font-bold text-foreground">
        {exp.company}
    </h3>
)}
                                        <span
                                            className="px-3 py-1 text-xs font-medium rounded-full"
                                            style={{
                                                backgroundColor: `${exp.color}20`,
                                                color: exp.color,
                                                border: `1px solid ${exp.color}40`,
                                            }}
                                        >
                                            {exp.type}
                                        </span>
                                    </div>
                                    <p className="text-lg font-semibold text-foreground ml-12">{exp.role}</p>
                                    <div className="flex flex-wrap gap-4 mt-2 ml-12 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />{exp.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />{exp.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Projects */}
                                <div className="space-y-4 ml-0 sm:ml-12">
                                    {exp.projects.map((project, projIndex) => (
                                        <motion.div
                                            key={project.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: expIndex * 0.2 + projIndex * 0.1 + 0.3,
                                            }}
                                            className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all"
                                        >
                                            <div className="flex items-start gap-2 mb-2">
                                                <ChevronRight className="h-5 w-5 mt-0.5 shrink-0" style={{ color: exp.color }} />
                                                <h4 className="text-base font-semibold text-foreground">{project.name}</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed mb-3 pl-7">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pl-7">
                                                {project.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-2 py-1 text-xs rounded-full border"
                                                        style={{
                                                            backgroundColor: `${exp.color}10`,
                                                            color: exp.color,
                                                            borderColor: `${exp.color}30`,
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Screenshot Dropdown */}
                                            <div className="pl-7">
                                                <ScreenshotDropdown images={project.images} color={exp.color} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}