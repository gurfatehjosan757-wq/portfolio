"use client";

import React, { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollyCanvas } from "@/components/ScrollyCanvas";
import { Overlay } from "@/components/Overlay";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  // Container ref for the 500vh scrollable sequence area
  const scrollyContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="relative bg-[#121212] min-h-screen text-gray-100 overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Component 1 & 2: Scroll-Linked Canvas & Parallax Overlay */}
      <div ref={scrollyContainerRef} className="relative h-[400vh] w-full bg-[#121212]">
        <ScrollyCanvas totalFrames={90} containerRef={scrollyContainerRef} />
        <Overlay containerRef={scrollyContainerRef} />
      </div>

      {/* Component 3: Work Grid (Placed after scroll sequence finishes) */}
      <Projects />

      {/* Additional Awwwards-Level Sections */}
      <TechStack />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
