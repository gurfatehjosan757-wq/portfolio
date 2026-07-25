"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, Github, Linkedin, Code, Sparkles, MessageSquare, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full Stack Java Opportunity",
    message: "",
  });

  const email = "gurfatehjosan99@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative z-20 bg-[#121212] px-6 py-28 sm:px-12 lg:px-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Direct Info & Copy Email */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-3">
              <MessageSquare className="h-4 w-4" /> Get In Touch
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Let's connect & <span className="text-gradient">build together.</span>
            </h2>
            <p className="mt-6 text-base text-gray-300 leading-relaxed max-w-lg">
              Looking for a passionate Full Stack Java Developer for software engineering roles, full-stack web applications, or REST API development? Send me a message!
            </p>

            {/* Location Pill */}
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>Mohali, Punjab, India</span>
            </div>

            {/* Email Copy Pill */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex flex-col pr-2">
                <span className="text-[10px] font-mono uppercase text-gray-400">Direct Email</span>
                <span className="text-sm font-mono text-white">{email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-xs font-mono text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            {/* Social & Platform Links */}
            <div className="mt-12">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-4">
                // CONNECT ELSEWHERE
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {[
                  { name: "Email", icon: <Mail className="h-5 w-5" />, href: `mailto:${email}` },
                  { name: "GitHub", icon: <Github className="h-5 w-5" />, href: "https://github.com" },
                  { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
                  { name: "LeetCode", icon: <Code className="h-5 w-5" />, href: "https://leetcode.com" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-gray-300 hover:border-blue-500/50 hover:text-white hover:bg-blue-600/10 transition-all font-mono text-xs"
                    title={s.name}
                  >
                    {s.icon}
                    <span>{s.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Glass Inquiry Form */}
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center flex flex-col items-center justify-center"
              >
                <div className="h-16 w-16 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/40">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="mt-2 text-sm text-gray-300 max-w-sm">
                  Thank you for reaching out, Gurfateh will get back to your message promptly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Recruiter / Collaborator Name"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@company.com"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Gurfateh, I'd like to discuss a project / software role..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
