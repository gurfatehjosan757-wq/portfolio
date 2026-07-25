"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Terminal } from "lucide-react";

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 bg-[#0d0d0d] px-6 py-12 border-t border-white/5 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 text-xs font-mono">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <span className="text-xs font-mono text-gray-300">
            © {new Date().getFullYear()} Gurfateh Josan. All rights reserved.
          </span>
        </div>

        {/* Realtime Clock & Location Indicator */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span>Mohali, IN / IST — {time || "10:45:00 AM"}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:border-blue-500/50 hover:text-white transition-colors cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
