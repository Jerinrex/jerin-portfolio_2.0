"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
                        About Me
                    </h2>
                    <div className="prose prose-lg prose-invert max-w-none space-y-4">
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            I'm <span className="text-white font-semibold">Jerin Rex G</span>, a Full Stack Developer 
                            specialized in building Web & Mobile applications using <span className="text-white font-semibold">Flutter</span> and 
                            the <span className="text-white font-semibold">MERN Stack</span>. Currently working full-time 
                            at <span className="text-white font-semibold">Colakin</span> (Remote, Australia) as a Full Stack Developer.
                        </p>
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                            I hold a <span className="text-white font-semibold">Master's in Computer Applications (MCA)</span> along 
                            with a <span className="text-white font-semibold">Diploma in Cyber Security</span> from Sacred Heart College. 
                            My journey started with a BCA from Don Bosco College, and since then I've been passionate about 
                            creating real-world applications that solve meaningful problems.
                        </p>
                       
                    </div>
                </motion.div>
            </div>
        </section>
    );
}