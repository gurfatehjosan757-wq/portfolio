"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Sparkles, ArrowUpRight, X, Play, Code2, Database, Cpu } from "lucide-react";
import confetti from "canvas-confetti";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  stats: string;
  liveUrl: string;
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Campus Lost & Found System",
    category: "Desktop Application",
    description: "A desktop application that allows students to report, search, and claim lost and found items with secure login, admin approval, and database integration.",
    fullDetails: "Built using Python, Tkinter GUI, and MySQL database integration. Designed with secure authentication, admin verification workflows, multi-parameter search filters, and relational record tracking.",
    tags: ["Python", "Tkinter", "MySQL", "Desktop App", "Admin Approval"],
    gradient: "from-blue-600/30 via-indigo-600/20 to-purple-900/40",
    accentColor: "#3b82f6",
    stats: "MySQL Integration",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
  },
  {
    id: "project-2",
    title: "AI Resume Builder",
    category: "AI Web Application",
    description: "An AI-powered resume builder that generates professional resumes and provides ATS-friendly suggestions.",
    fullDetails: "Leverages React frontend components and Node.js backend services with OpenAI API integration. Analyzes resume content in real-time, providing keyword optimization, layout previews, and high-impact wording suggestions.",
    tags: ["React", "Node.js", "OpenAI API", "Tailwind CSS", "ATS Suggestions"],
    gradient: "from-purple-600/30 via-pink-600/20 to-rose-950/40",
    accentColor: "#a855f7",
    stats: "AI Powered",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
  },
  {
    id: "project-3",
    title: "Student Management System",
    category: "Backend REST API",
    description: "A REST API-based CRUD application for managing student records with complete Create, Read, Update, and Delete functionality.",
    fullDetails: "Architected using Spring Boot, Spring Data JPA, and MySQL. Implements clean multi-layered backend architecture (Controller, Service, Repository), strict data validation, and RESTful endpoint design.",
    tags: ["Spring Boot", "MySQL", "REST API", "Java", "CRUD Architecture"],
    gradient: "from-cyan-500/30 via-blue-700/20 to-slate-900/40",
    accentColor: "#06b6d4",
    stats: "Spring REST API",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
  },
  {
    id: "project-4",
    title: "Weather App",
    category: "Full Stack Web Application",
    description: "A weather application that fetches and displays real-time weather information using the OpenWeather API.",
    fullDetails: "Developed using Spring Boot, Thymeleaf templates, and OpenWeather API integration. Renders real-time temperature, humidity, wind conditions, and multi-day forecasts with dynamic UI styling.",
    tags: ["Spring Boot", "Thymeleaf", "OpenWeather API", "Java", "Web Services"],
    gradient: "from-emerald-500/30 via-teal-700/20 to-slate-950/40",
    accentColor: "#10b981",
    stats: "OpenWeather API",
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
  },
];

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleLaunchConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.7 },
      colors: ["#3b82f6", "#a855f7", "#06b6d4", "#10b981"],
    });
  };

  return (
    <section id="work" className="relative z-20 bg-[#121212] px-6 py-28 sm:px-12 lg:px-20 border-t border-white/5">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
              <Sparkles className="h-4 w-4 text-blue-400" /> Personal Portfolio & Projects
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-400 leading-relaxed">
            A showcase of full-stack Java web applications, REST APIs, AI tools, and desktop management systems built with clean code and modern standards.
          </p>
        </div>

        {/* 2x2 Grid of Glass-morphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/10"
            >
              {/* Card Gradient Background Layer */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Top Pill / Category & Stat */}
                <div className="flex items-center justify-between gap-4 mb-6 z-10 relative">
                  <span className="text-xs font-mono font-medium text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5 text-blue-400" /> {project.category}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
                    {project.stats}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors z-10 relative flex items-center justify-between">
                  {project.title}
                  <ArrowUpRight className="h-5 w-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-300 leading-relaxed z-10 relative">
                  {project.description}
                </p>

                {/* Technology Badges */}
                <div className="mt-6 flex flex-wrap gap-2 z-10 relative">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-blue-300 bg-blue-950/40 border border-blue-500/20 px-2.5 py-1 rounded-md hover:border-blue-400 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between z-10 relative">
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    handleLaunchConfetti();
                  }}
                  className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" /> View Case Details
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Source Code"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#181820] p-8 shadow-2xl overflow-hidden"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-4">
                {selectedProject.category}
              </div>

              <h3 className="text-3xl font-extrabold text-white">{selectedProject.title}</h3>

              <div className="mt-4 text-sm text-gray-300 space-y-3 leading-relaxed">
                <p className="font-medium text-white">{selectedProject.description}</p>
                <p className="text-gray-400">{selectedProject.fullDetails}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.tags.map((t) => (
                  <span key={t} className="text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-mono font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                >
                  GitHub Repository <Github className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-mono text-white hover:bg-white/20 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
