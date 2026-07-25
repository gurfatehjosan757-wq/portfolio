"use client";

import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Sparkles, Code2, Cpu, ArrowDown, Layers, Terminal, MapPin, Download, Send, Eye, GraduationCap } from "lucide-react";
import { AntiGravityCharacter } from "./AntiGravityCharacter";
import { ResumeModal } from "./ResumeModal";

interface OverlayProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const Overlay: React.FC<OverlayProps> = ({ containerRef }) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: 0% - 22% Scroll Progress
  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.25], [1, 1, 0.8, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  // Section 2: 25% - 50% Scroll Progress
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.32, 0.45, 0.52], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.52], [60, 0, 0, -60]);

  // Section 3: 55% - 80% Scroll Progress
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.62, 0.72, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.65, 0.72, 0.8], [60, 0, 0, -60]);

  // Section 4: 82% - 100% Scroll Progress (Transition to Work Grid)
  const opacity4 = useTransform(scrollYProgress, [0.82, 0.9, 0.98, 1], [0, 1, 1, 0.2]);
  const y4 = useTransform(scrollYProgress, [0.82, 0.92], [50, 0]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
        {/* Section 1: 0% Scroll - Hero Title */}
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 text-center"
        >
          <div className="pointer-events-auto flex flex-col items-center max-w-4xl">
            {/* Status & Location Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
              </span>
              <span className="text-xs font-mono font-medium tracking-wider text-blue-300 uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-cyan-400" /> Mohali, Punjab, India • Available for Opportunities
              </span>
            </div>

            {/* Smooth Floating Anti-Gravity Character */}
            <AntiGravityCharacter />

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-white">Hi, I'm </span>
              <span className="text-gradient">Gurfateh Josan</span>
            </h1>

            {/* Subheading */}
            <h2 className="mt-2 text-xl font-bold tracking-wide sm:text-2xl font-mono text-purple-300">
              Full Stack Java Developer
            </h2>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-sm text-gray-300 sm:text-base font-light leading-relaxed">
              I build modern, scalable, and responsive web applications using Java, Spring Boot, React, and MySQL. I'm passionate about solving real-world problems through clean code and intuitive user experiences.
            </p>

            {/* Hero Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:scale-105 cursor-pointer"
              >
                <Eye className="h-4 w-4" /> View Projects
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/20 hover:border-blue-400 transition-all hover:scale-105 cursor-pointer"
              >
                <Download className="h-4 w-4 text-cyan-300" /> Download Resume
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-950/40 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md hover:bg-blue-600 hover:text-white transition-all hover:scale-105 cursor-pointer"
              >
                <Send className="h-4 w-4" /> Contact Me
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-10 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                Scroll to scrub interactive timeline
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="flex h-9 w-5 items-start justify-center rounded-full border border-gray-600 p-1"
              >
                <div className="h-2 w-1 rounded-full bg-blue-400" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Section 2: 30% Scroll - About Me */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="sticky top-0 flex h-screen w-full items-center justify-start px-8 sm:px-16 lg:px-24"
        >
          <div className="pointer-events-auto max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400">
              <Code2 className="h-4 w-4" /> About Me
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Building scalable & <br />
              <span className="text-gradient">modern systems.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
              I'm a Computer Science student passionate about full-stack development and software engineering. I enjoy building scalable web applications, REST APIs, and responsive user interfaces while continuously learning new technologies.
            </p>

            {/* Feature Badges Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <div className="text-xl font-bold text-blue-400 font-mono">Spring Boot & Java</div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-mono tracking-wider">Backend Architecture</div>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <div className="text-xl font-bold text-purple-400 font-mono">React & MySQL</div>
                <div className="text-xs text-gray-400 mt-1 uppercase font-mono tracking-wider">Frontend & Relational DB</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: 60% Scroll - Education & Details */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="sticky top-0 flex h-screen w-full items-center justify-end px-8 sm:px-16 lg:px-24"
        >
          <div className="pointer-events-auto max-w-2xl text-right">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 justify-end">
              <Cpu className="h-4 w-4" /> Academic Background
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Academic & technical <br />
              <span className="text-gradient-purple">foundation.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed ml-auto">
              Pursuing my degree in Computer Science with a core emphasis on Data Structures, Algorithms, Software Engineering, and Full Stack Architecture.
            </p>

            {/* Education Cards */}
            <div className="mt-8 flex flex-col gap-3 items-end">
              <div className="glass-panel p-5 rounded-2xl border border-white/10 max-w-md text-left flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">B.Tech in Computer Science</h4>
                  <p className="text-xs font-mono text-purple-300 mt-0.5">CGC University, Mohali</p>
                  <p className="text-xs text-gray-400 mt-1">2024 – 2028 • Focus on Software Engineering & Web Systems</p>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/10 max-w-md text-left flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full Stack Java Focus</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Robust REST API endpoints, JPA/Hibernate ORM, MySQL database schemas, and modular React UIs.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: ~85% Scroll - Transition Callout */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 text-center"
        >
          <div className="pointer-events-auto flex flex-col items-center max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-mono text-purple-300">
              <Terminal className="h-3.5 w-3.5" /> EXPLORE FEATURED PROJECTS
            </div>
            <h2 className="text-4xl font-extrabold text-white sm:text-6xl">
              Ready to see my <span className="text-gradient">work?</span>
            </h2>
            <p className="mt-4 text-gray-300 max-w-md text-sm sm:text-base">
              Scroll down to explore full stack web applications, AI resume generation, desktop management tools, and REST API microservices.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-mono text-blue-400 animate-bounce">
              <span>Featured Projects Below</span>
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Resume Download Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};
