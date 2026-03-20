import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Mail } from "lucide-react";
import profileImage from "@assets/Gemini_Generated_Image_roopwbroopwbroop.png";


export default function PortfolioCard() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_30%,#1f2a44,transparent),radial-gradient(circle_at_80%_70%,#1a3a5f,transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-10 w-[900px] flex justify-between"
      >
        {/* Left */}
        <div className="max-w-md">
          <motion.img
            src={profileImage}
            alt="avatar"
            className="w-20 h-20 rounded-full mb-6 object-cover"
            whileHover={{ scale: 1.1 }}
          />

          <p className="text-gray-400 tracking-widest text-xs mb-2">
            AZIZBEK MIRZAVALIYEV
          </p>

          <h1 className="text-5xl font-semibold text-white leading-tight mb-6">
            Full Stack Developer
          </h1>

          <p className="text-gray-400 text-sm leading-relaxed">
            I design and build high-performance web systems that scale with
            real business needs.
          </p>

          <p className="text-gray-500 text-sm mt-3">
            Full Stack Engineer focused on clean architecture, speed, and
            long-term reliability.
          </p>
        </div>

        {/* Right buttons */}
        <div className="flex flex-col gap-4 justify-center">
          {[
            {
              label: "Github",
              icon: <Github size={20} />,
              color: "from-gray-300 to-gray-500",
            },
            {
              label: "LinkedIn",
              icon: <Linkedin size={20} />,
              color: "from-blue-600 to-blue-400",
            },
            {
              label: "Telegram",
              icon: <Send size={20} />,
              color: "from-teal-500 to-green-400",
            },
            {
              label: "Email",
              icon: <Mail size={20} />,
              color: "from-blue-500 to-green-500",
            },
          ].map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-between gap-4 px-6 py-4 rounded-full bg-gradient-to-r ${btn.color} text-white shadow-lg w-72`}
            >
              <span>{btn.label}</span>
              {btn.icon}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
