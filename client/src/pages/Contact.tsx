import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, Mail } from "lucide-react";
import profileImage from "@assets/Gemini_Generated_Image_roopwbroopwbroop.png";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70, damping: 10 } }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center overflow-hidden relative font-sans">
      {/* Animated Background layers */}
      <motion.div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle_at_20%_30%,#1f2a44,transparent 50%), radial-gradient(circle_at_80%_70%,#1a3a5f,transparent 50%)",
            "radial-gradient(circle_at_30%_40%,#1f2a44,transparent 60%), radial-gradient(circle_at_70%_60%,#1a3a5f,transparent 60%)",
            "radial-gradient(circle_at_20%_30%,#1f2a44,transparent 50%), radial-gradient(circle_at_80%_70%,#1a3a5f,transparent 50%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating orbs - static to avoid GPU lag */}
      <div 
        className="absolute top-[10%] left-[15%] w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu"
      />
      <div 
        className="absolute bottom-[10%] right-[15%] w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none transform-gpu"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-10 backdrop-blur-xl bg-white/[0.04] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-10 md:p-14 w-[95%] max-w-[1000px] flex flex-col md:flex-row justify-between items-center gap-12 group overflow-hidden"
      >
        {/* Shine effect on card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* Left Content */}
        <div className="max-w-lg w-full z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="relative w-24 h-24 mb-8 group/avatar cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-teal-400 rounded-full blur-xl opacity-40 group-hover/avatar:opacity-70 transition-opacity duration-500 animate-pulse" />
            <motion.img
              src={profileImage}
              alt="Azizbek Mirzavaliyev avatar"
              className="relative w-full h-full rounded-full object-cover border-2 border-white/20 p-1 bg-[#0b0f1a]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-blue-400 tracking-[0.25em] text-xs mb-4 font-semibold uppercase flex items-center gap-3">
              <span className="w-10 h-[2px] bg-gradient-to-r from-blue-400 to-transparent inline-block"></span>
              Azizbek Mirzavaliyev
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 tracking-tight">
              Let's build <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-green-400">
                something amazing
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-2 font-light">
              I design and build high-performance web systems that scale with
              real business needs.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Focused on clean architecture, speed, and long-term reliability.
            </p>
          </motion.div>
        </div>

        {/* Right buttons */}
        <motion.div 
          className="flex flex-col gap-4 justify-center w-full md:w-[320px] z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              label: "Github",
              icon: <Github size={22} />,
              bg: "hover:bg-white/10",
              border: "hover:border-gray-300",
              text: "hover:text-white",
              shadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
              link: "https://github.com"
            },
            {
              label: "LinkedIn",
              icon: <Linkedin size={22} />,
              bg: "hover:bg-blue-600/10",
              border: "hover:border-blue-500",
              text: "hover:text-blue-400",
              shadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
              link: "https://linkedin.com"
            },
            {
              label: "Telegram",
              icon: <Send size={22} />,
              bg: "hover:bg-teal-500/10",
              border: "hover:border-teal-400",
              text: "hover:text-teal-400",
              shadow: "hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]",
              link: "https://t.me"
            },
            {
              label: "Email",
              icon: <Mail size={22} />,
              bg: "hover:bg-purple-500/10",
              border: "hover:border-purple-400",
              text: "hover:text-purple-400",
              shadow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
              link: "mailto:contact@example.com"
            },
          ].map((btn, i) => (
            <motion.a
              key={i}
              variants={itemVariants}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, x: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`group flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 shadow-lg transition-all duration-300 ${btn.bg} ${btn.border} ${btn.text} ${btn.shadow} backdrop-blur-md`}
            >
              <span className="font-medium tracking-wide">{btn.label}</span>
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 12, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              >
                {btn.icon}
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
