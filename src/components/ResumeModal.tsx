"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, CheckCircle2, Award, Briefcase, GraduationCap } from "lucide-react";
import confetti from "canvas-confetti";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    // Create dummy text blob as resume download placeholder
    const resumeText = `
GURFATEH JOSAN
Full Stack Java Developer
Location: Mohali, Punjab, India

SUMMARY:
I build modern, scalable, and responsive web applications using Java, Spring Boot, React, and MySQL. Passionate about solving real-world problems through clean code and intuitive user experiences.

EDUCATION:
Bachelor of Technology in Computer Science (2024 - 2028)
CGC University, Mohali

TECHNICAL SKILLS:
- Languages: Java, JavaScript, C++, Python, SQL
- Frontend: React, HTML5, CSS3, Tailwind CSS
- Backend: Spring Boot, Node.js, Express.js
- Database: MySQL
- Tools: Git, GitHub, VS Code, Postman

PROJECTS:
1. Campus Lost & Found Management System (Python, Tkinter, MySQL)
2. AI Resume Builder (React, Node.js, OpenAI API)
3. Student Management System (Spring Boot, MySQL)
4. Weather App (Spring Boot, Thymeleaf, OpenWeather API)

EXPERIENCE & HIGHLIGHTS:
- Personal Projects & Full Stack Development
- Developed responsive frontend applications using React.
- Built REST APIs with Spring Boot.
- Designed relational databases using MySQL.
- Practiced Data Structures and Algorithms.
- Worked with Git and GitHub for version control.
    `.trim();

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Gurfateh_Josan_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#181820] p-8 shadow-2xl overflow-hidden text-gray-100"
          >
            {/* Background Radial Glow */}
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Gurfateh Josan</h3>
                <p className="text-xs font-mono text-blue-400">Full Stack Java Developer • Mohali, Punjab</p>
              </div>
            </div>

            {/* Resume Summary Body */}
            <div className="space-y-6 text-sm text-gray-300 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Core Summary */}
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" /> Executive Summary
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Computer Science student and Full Stack Java Developer proficient in Java, Spring Boot, React, and MySQL. Experienced in constructing REST APIs, responsive UIs, and relational database schemas.
                </p>
              </div>

              {/* Education */}
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-purple-400" /> Education
                </h4>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-bold text-white">Bachelor of Technology in Computer Science</p>
                    <p className="text-xs text-purple-300">CGC University, Mohali</p>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-full">2024 – 2028</span>
                </div>
              </div>

              {/* Skills Overview */}
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-cyan-400" /> Technical Competencies
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Java", "Spring Boot", "React", "MySQL", "JavaScript", "C++", "Python", "Node.js", "Express.js", "Tailwind CSS", "Git"].map((s) => (
                    <span key={s} className="text-xs font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-gray-400">PDF / Plain Text Resume</span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={handleDownload}
                  className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-mono font-bold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  Download Resume <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
