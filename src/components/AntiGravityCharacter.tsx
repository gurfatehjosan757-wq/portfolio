"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Code } from "lucide-react";

export const AntiGravityCharacter: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse offset relative to screen center (-10 to 10)
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-none select-none my-6">
      {/* Outer Floating Glow Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-48 w-48 rounded-full bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-purple-600/30 blur-2xl pointer-events-none"
      />

      {/* Main Floating Anti-Gravity Container */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          x: [-8, 8, -8],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          translateX: mousePos.x * 0.5,
          translateY: mousePos.y * 0.5,
        }}
        className="relative flex flex-col items-center"
      >
        {/* Orbital Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -bottom-4 -left-6 -right-6 rounded-full border border-blue-400/25 border-dashed pointer-events-none"
        />

        {/* Orbital Ring 2 (Counter rotating) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-8 -bottom-8 -left-10 -right-10 rounded-full border border-purple-400/20 pointer-events-none"
        />

        {/* Orbiting Particle Dots */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 h-full w-full pointer-events-none"
        >
          <div className="absolute -top-2 left-1/2 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
          <div className="absolute top-1/2 -right-4 h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
          <div className="absolute -bottom-2 left-1/3 h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
        </motion.div>

        {/* Anti-Gravity Character Graphic */}
        <div className="relative group cursor-pointer pointer-events-auto">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl bg-gradient-to-b from-slate-900/90 to-blue-950/80 border border-blue-400/30 backdrop-blur-xl p-3 shadow-2xl flex flex-col items-center justify-between overflow-hidden transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-blue-500/30">
            {/* Top Visor / Helmet Reflection */}
            <div className="w-full flex items-center justify-between">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              </div>
            </div>

            {/* Floating Character Icon Avatar */}
            <div className="relative my-auto flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                  <Terminal className="h-7 w-7 text-cyan-300" />
                </div>
                {/* Floating Code Hologram Badge */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-3 -top-2 bg-purple-600/90 text-white p-1 rounded-lg shadow-lg border border-purple-300/40"
                >
                  <Code className="h-3 w-3" />
                </motion.div>
              </div>
            </div>

            {/* Bottom Thruster Base Indicator */}
            <div className="w-full flex items-center justify-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
                JAVA // FULLSTACK
              </span>
            </div>

            {/* Thruster Flame Particle Bloom */}
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4], height: [8, 14, 8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 w-12 bg-gradient-to-t from-cyan-400 via-blue-500 to-transparent blur-xs rounded-b-full"
            />
          </div>

          {/* Interactive Floating Badge Label */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-950/60 px-3 py-1 text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-md">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>Anti-Gravity Character</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
