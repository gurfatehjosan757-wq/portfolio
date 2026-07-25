"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Terminal, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    setMuted(!muted);
    // Web Audio API subtle synth tone feedback
    if (muted && typeof window !== "undefined" && window.AudioContext) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#121212]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              GURFATEH JOSAN
            </span>
            <span className="text-[10px] font-mono text-gray-400 tracking-wider">FULL STACK JAVA DEV</span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 rounded-full border border-white/10 bg-white/[0.03] px-6 py-2 backdrop-blur-md">
          <a href="#work" className="text-xs font-mono text-gray-300 hover:text-white transition-colors">
            // PROJECTS
          </a>
          <a href="#stack" className="text-xs font-mono text-gray-300 hover:text-white transition-colors">
            // SKILLS
          </a>
          <a href="#experience" className="text-xs font-mono text-gray-300 hover:text-white transition-colors">
            // EXPERIENCE
          </a>
          <a href="#contact" className="text-xs font-mono text-gray-300 hover:text-white transition-colors">
            // CONTACT
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:border-blue-500/40 hover:text-white transition-colors cursor-pointer"
            title={muted ? "Enable Audio Feedback" : "Mute Audio Feedback"}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-blue-400" />}
          </button>

          {/* Let's Talk CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-mono font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
          >
            LET'S TALK <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
