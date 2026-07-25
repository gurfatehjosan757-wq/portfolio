"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Code, Layers, Terminal, CheckCircle2, Database, Wrench } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: string; desc: string }[];
}

const CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Code className="h-4 w-4 text-blue-400" />,
    skills: [
      { name: "Java", level: "Core", desc: "Object-Oriented Programming, Collections, Multithreading & Streams" },
      { name: "JavaScript", level: "Advanced", desc: "ES6+, Async/Await, DOM manipulation, Event Loop" },
      { name: "C++", level: "Proficient", desc: "Data Structures, Algorithms, Memory Allocation" },
      { name: "Python", level: "Proficient", desc: "Scripting, GUI Development, Automation & Data Processing" },
      { name: "SQL", level: "Advanced", desc: "Relational Queries, Joins, Indexing, Schema Normalization" },
    ],
  },
  {
    title: "Frontend",
    icon: <Layers className="h-4 w-4 text-purple-400" />,
    skills: [
      { name: "React", level: "Advanced", desc: "Hooks, State Management, Component Architecture, JSX" },
      { name: "HTML5", level: "Master", desc: "Semantic markup, Accessibility (a11y), Web Standards" },
      { name: "CSS3", level: "Master", desc: "Flexbox, Grid, Custom Properties, Glassmorphism & Animations" },
      { name: "Tailwind CSS", level: "Master", desc: "Utility-first design systems, Responsive Layouts" },
    ],
  },
  {
    title: "Backend",
    icon: <Cpu className="h-4 w-4 text-cyan-400" />,
    skills: [
      { name: "Spring Boot", level: "Advanced", desc: "REST APIs, Spring MVC, Spring Data JPA, Dependency Injection" },
      { name: "Node.js", level: "Intermediate", desc: "Event-driven runtime, NPM packages, Async IO" },
      { name: "Express.js", level: "Intermediate", desc: "Routing, Middleware, RESTful API endpoints" },
    ],
  },
  {
    title: "Database",
    icon: <Database className="h-4 w-4 text-emerald-400" />,
    skills: [
      { name: "MySQL", level: "Advanced", desc: "Relational Database Design, Foreign Keys, CRUD Queries, ACID Compliance" },
    ],
  },
  {
    title: "Tools",
    icon: <Wrench className="h-4 w-4 text-yellow-400" />,
    skills: [
      { name: "Git", level: "Proficient", desc: "Branching workflows, Merging, Commit History management" },
      { name: "GitHub", level: "Proficient", desc: "Remote Repositories, Pull Requests, Code Reviews" },
      { name: "VS Code", level: "Master", desc: "IDE Extensions, Debugging, Custom Workspace Configs" },
      { name: "Postman", level: "Advanced", desc: "REST API Testing, Request Collections, Environment Variables" },
    ],
  },
];

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="stack" className="relative z-20 bg-[#121212] px-6 py-24 sm:px-12 lg:px-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-3">
              <Terminal className="h-4 w-4" /> Technical Competencies
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Skills & <span className="text-gradient-purple">Technologies</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-400 leading-relaxed">
            Categorized technical stack spanning core programming languages, modern frontend libraries, Java backend frameworks, relational databases, and developer tooling.
          </p>
        </div>

        {/* Category Tab Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(idx)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeCategory === idx
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-lg shadow-blue-500/10"
                  : "bg-white/[0.03] text-gray-400 border border-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.icon}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES[activeCategory].skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-blue-500/40 hover:bg-white/[0.06] transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                    <h4 className="text-base font-bold text-white">{skill.name}</h4>
                  </div>
                  <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full shrink-0">
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">{skill.desc}</p>
              </div>

              {/* Progress visual bar */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: skill.level === "Master" ? "95%" : skill.level === "Advanced" ? "85%" : "75%" }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
