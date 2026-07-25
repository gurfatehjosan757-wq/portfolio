"use client";

import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Sparkles, Code2, Cpu, ArrowDown, Terminal, MapPin, Download, Send, Eye, GraduationCap } from "lucide-react";
import { AntiGravityCharacter } from "./AntiGravityCharacter";
import { ResumeModal } from "./ResumeModal";

interface OverlayProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const STAGES = [
  { id: "intro", label: "Intro", icon: Terminal },
  { id: "about", label: "About", icon: Code2 },
  { id: "academic", label: "Academic", icon: Cpu },
  { id: "work", label: "Work", icon: ArrowDown },
];

export const Overlay: React.FC<OverlayProps> = ({ containerRef }) => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Stage 1: 0% - 25%
  const opacity1 = useTransform(scrollYProgress, [0, 0.08, 0.2, 0.25], [1, 1, 0.8, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  // Stage 2: 25% - 50%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.32, 0.45, 0.5], [60, 0, 0, -60]);

  // Stage 3: 50% - 75%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.57, 0.7, 0.75], [60, 0, 0, -60]);

  // Stage 4: 75% - 100%
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 0.2]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.82], [50, 0]);

  // Timeline rail fill (0 -> 1 across the whole sequence)
  const railScaleY = scrollYProgress;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between">
        {/* Vertical Stage Timeline Rail */}
        <div className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex">
          <div className="relative flex flex-col items-center gap-3 rounded-full border border-white/10 bg-black/40 px-2 py-4 backdrop-blur-md">
            {/* Progress fill */}
            <motion.div
              style={{ scaleY: railScaleY }}
              className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400"
            />
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.id}
                  className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#121212] text-gray-500"
                  title={stage.label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage 1: Hero */}
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 text-center"
        >
          {/* Soft dark scrim to lift text off the bright canvas */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
          <div className="pointer-events-auto relative flex flex-col items-center max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/60 px-4 py-1.5 backdrop-blur-md shadow-lg shadow-blue-950/40">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
              </span>
              <span className="text-xs font-mono font-medium tracking-wider text-blue-200 uppercase flex items-center gap-1 drop-shadow">
                <MapPin className="h-3 w-3 text-cyan-300" /> Mohali, Punjab, India • Available for Opportunities
              </span>
            </div>

            <AntiGravityCharacter />

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              <span className="text-white">Hi, I'm </span>
              <span className="text-gradient">Gurfateh Josan</span>
            </h1>

            <h2 className="mt-2 text-xl font-bold tracking-wide sm:text-2xl font-mono text-purple-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Full Stack Java Developer
            </h2>

            <p className="mt-4 max-w-2xl text-sm text-gray-100 sm:text-base font-light leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              I build modern, scalable, and responsive web applications using Java, Spring Boot, React, and MySQL. I'm passionate about solving real-world problems through clean code and intuitive user experiences.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:scale-105 cursor-pointer"
              >
                <Eye className="h-4 w-4" /> View Projects
              </a>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-black/40 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md hover:bg-black/60 hover:border-blue-400 transition-all hover:scale-105 cursor-pointer"
              >
                <Download className="h-4 w-4 text-cyan-300" /> Download Resume
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-500/50 bg-blue-950/60 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-200 backdrop-blur-md hover:bg-blue-600 hover:text-white transition-all hover:scale-105 cursor-pointer"
              >
                <Send className="h-4 w-4" /> Contact Me
              </a>
            </div>

            <div className="mt-10 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-gray-200 tracking-widest uppercase drop-shadow">
                Scroll to scrub interactive timeline
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="flex h-9 w-5 items-start justify-center rounded-full border border-gray-500 p-1"
              >
                <div className="h-2 w-1 rounded-full bg-blue-400" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stage 2: About */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="sticky top-0 flex h-screen w-full items-center justify-start px-8 sm:px-16 lg:px-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="pointer-events-auto relative max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-300 drop-shadow">
              <Code2 className="h-4 w-4" /> About Me
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Building scalable & <br />
              <span className="text-gradient">modern systems.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-100 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              I'm a Computer Science student passionate about full-stack development and software engineering. I enjoy building scalable web applications, REST APIs, and responsive user interfaces while continuously learning new technologies.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-white/15 shadow-lg shadow-black/40">
                <div className="text-xl font-bold text-blue-300 font-mono">Spring Boot & Java</div>
                <div className="text-xs text-gray-200 mt-1 uppercase font-mono tracking-wider">Backend Architecture</div>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/15 shadow-lg shadow-black/40">
                <div className="text-xl font-bold text-purple-300 font-mono">React & MySQL</div>
                <div className="text-xs text-gray-200 mt-1 uppercase font-mono tracking-wider">Frontend & Relational DB</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage 3: Academic */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="sticky top-0 flex h-screen w-full items-center justify-end px-8 sm:px-16 lg:px-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />
          <div className="pointer-events-auto relative max-w-2xl text-right">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-300 justify-end drop-shadow">
              <Cpu className="h-4 w-4" /> Academic Background
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Academic & technical <br />
              <span className="text-gradient-purple">foundation.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-100 leading-relaxed ml-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Pursuing my degree in Computer Science with a core emphasis on Data Structures, Algorithms, Software Engineering, and Full Stack Architecture.
            </p>

            <div className="mt-8 flex flex-col gap-3 items-end">
              <div className="glass-panel p-5 rounded-2xl border border-white/15 max-w-md text-left flex items-start gap-4 shadow-lg shadow-black/40">
                <div className="h-10 w-10 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center shrink-0 border border-purple-500/40">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">B.Tech in Computer Science</h4>
                  <p className="text-xs font-mono text-purple-200 mt-0.5">CGC University, Mohali</p>
                  <p className="text-xs text-gray-200 mt-1">2024 – 2028 • Focus on Software Engineering & Web Systems</p>
                </div>
              </div>
              <div className="glass-panel p-4 rounded-xl border border-white/15 max-w-md text-left flex items-start gap-3 shadow-lg shadow-black/40">
                <Sparkles className="h-5 w-5 text-yellow-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Full Stack Java Focus</h4>
                  <p className="text-xs text-gray-200 mt-0.5">Robust REST API endpoints, JPA/Hibernate ORM, MySQL database schemas, and modular React UIs.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage 4: Transition to Work */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 text-center"
        >
          <div className="pointer-events-none absolute inset-0 bg-black/50" />
          <div className="pointer-events-auto relative flex flex-col items-center max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/60 px-4 py-1.5 text-xs font-mono text-purple-200 backdrop-blur-md shadow-lg shadow-purple-950/40">
              <Terminal className="h-3.5 w-3.5" /> EXPLORE FEATURED PROJECTS
            </div>
            <h2 className="text-4xl font-extrabold text-white sm:text-6xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Ready to see my <span className="text-gradient">work?</span>
            </h2>
            <p className="mt-4 text-gray-100 max-w-md text-sm sm:text-base drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Scroll down to explore full stack web applications, AI resume generation, desktop management tools, and REST API microservices.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-mono text-blue-300 animate-bounce drop-shadow">
              <span>Featured Projects Below</span>
              <ArrowDown className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};
