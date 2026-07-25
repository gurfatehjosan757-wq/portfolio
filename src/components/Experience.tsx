"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Award } from "lucide-react";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative z-20 bg-[#121212] px-6 py-24 sm:px-12 lg:px-20 border-t border-white/5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
            <Briefcase className="h-4 w-4" /> Experience & Education
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Practical <span className="text-gradient">Journey</span>
          </h2>
        </div>

        <div className="space-y-12">
          {/* Main Experience Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                <Calendar className="inline h-3 w-3 mr-1" />
                Active Focus
              </span>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-cyan-400" /> Mohali, Punjab, India
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white">Personal Projects & Full Stack Development</h3>
            <h4 className="text-sm font-medium text-purple-300 font-mono mt-1">Full Stack Java Engineer</h4>

            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Actively designing, building, and optimizing web applications and RESTful backend architectures using modern technologies and software engineering principles.
            </p>

            {/* Highlights List */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Developed responsive frontend applications using React.",
                "Built REST APIs with Spring Boot.",
                "Designed relational databases using MySQL.",
                "Practiced Data Structures and Algorithms.",
                "Worked with Git and GitHub for version control.",
              ].map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-black/30 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-300">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-panel p-8 rounded-3xl border border-purple-500/20 bg-purple-950/10 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                <GraduationCap className="inline h-3.5 w-3.5 mr-1 text-purple-400" />
                Degree Program
              </span>
              <span className="text-xs font-mono text-gray-400">2024 – 2028</span>
            </div>

            <h3 className="text-2xl font-bold text-white">Bachelor of Technology in Computer Science</h3>
            <h4 className="text-sm font-medium text-cyan-300 font-mono mt-1">CGC University, Mohali</h4>

            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Rigorous undergraduate curriculum focusing on core Computer Science topics including Object-Oriented Programming, Data Structures & Algorithms, Database Management Systems, and Software Engineering.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Object-Oriented Java", "Data Structures & Algorithms", "DBMS & MySQL", "Software Engineering"].map((course) => (
                <span key={course} className="text-xs font-mono text-purple-300 bg-purple-900/30 border border-purple-500/30 px-3 py-1 rounded-lg">
                  {course}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
