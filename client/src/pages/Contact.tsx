import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Send, Mail, ExternalLink, MessageSquare, Sparkles } from "lucide-react";
import { SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiJavascript, SiGithub, SiFramer, SiNextdotjs, SiDocker } from "react-icons/si";
import profileImage from "@assets/Gemini_Generated_Image_roopwbroopwbroop.png";

// --- Components ---

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-blue-400/20 rounded-full"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

const SocialCard = ({ children, href, btn }: { children: React.ReactNode, href: string, btn: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={href.endsWith('.pdf') ? href.split('/').pop() : undefined}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="group relative flex items-center justify-between p-6 rounded-3xl bg-[#080a12] border border-white/[0.04] transition-all duration-500 hover:border-white/10 overflow-hidden"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`
          ),
        }}
      />

      {/* Brand Accent Glow */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${btn.glowColor}`} />

      <div className="flex items-center gap-6 relative z-10">
        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.05] transition-all duration-500 group-hover:scale-105 group-hover:bg-white/[0.07] ${btn.text}`}>
          {btn.icon}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-semibold text-gray-400 group-hover:text-white transition-colors duration-500 tracking-tight">
            {btn.label}
          </span>
          <span className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">
            {btn.subLabel}
          </span>
        </div>
      </div>

      <div className="relative z-10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.03] border border-white/[0.05] text-gray-500 group-hover:text-white transition-colors">
          <ExternalLink size={16} />
        </div>
      </div>
    </motion.a>
  );
};

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-300, 300], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-300, 300], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth < 1024) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 600;
    const yPct = (mouseY / height - 0.5) * 600;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const techSkills = [SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiJavascript, SiGithub, SiFramer, SiNextdotjs, SiDocker];

  const socialButtons = [
    {
      label: "Portfolio",
      subLabel: "Showcase Hub",
      icon: <SiFramer size={24} />,
      text: "text-emerald-400",
      glowColor: "from-emerald-500 to-teal-400",
      link: "https://portfolio-hub-lime-xi.vercel.app/"
    },
    {
      label: "GitHub",
      subLabel: "Open Source",
      icon: <SiGithub size={24} />,
      text: "text-white",
      glowColor: "from-gray-400 to-white",
      link: "https://github.com/Azizbek-programmer"
    },
    {
      label: "LinkedIn",
      subLabel: "Professional",
      icon: <Linkedin size={24} />,
      text: "text-blue-400",
      glowColor: "from-blue-600 to-blue-400",
      link: "https://www.linkedin.com/in/azizbek-mirzavaliyev-1aa1bb351/"
    },
    {
      label: "Telegram",
      subLabel: "Contact Me",
      icon: <Send size={24} />,
      text: "text-sky-400",
      glowColor: "from-sky-500 to-blue-400",
      link: "https://t.me/BEK_AIR0"
    },
    {
      label: "Resume",
      subLabel: "Direct Download",
      icon: <Sparkles size={24} />,
      text: "text-amber-400",
      glowColor: "from-amber-500 to-yellow-400",
      link: "/Azizbek_Mirzavaliyev.pdf"
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#050810] flex flex-col items-center justify-center overflow-x-hidden relative font-sans py-16 scroll-smooth">
      <ParticleBackground />

      {/* Hero Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container with 3D Effect */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-20 w-[95%] max-w-[1100px] mx-auto"
      >
        <div 
          className="relative overflow-hidden backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row gap-12 lg:gap-20 items-center group"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Animated Border Reveal */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-transparent [mask-image:linear-gradient(white,white),linear-gradient(white,white)] [mask-clip:padding-box,border-box] [mask-composite:intersect] group-hover:border-blue-500/30 transition-colors duration-700 -z-10" />

          {/* Left Content: Profile & Text */}
          <div className="flex-1 text-center lg:text-left space-y-8" style={{ transform: "translateZ(80px)" }}>
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#050810]">
                  <img
                    src={profileImage}
                    alt="Azizbek"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                  />
                </div>
              </motion.div>
              <div className="absolute -bottom-2 -right-2 bg-blue-500 p-2 rounded-lg shadow-lg">
                <Sparkles className="text-white w-4 h-4 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center lg:justify-start gap-3"
              >
                <span className="h-[1px] w-8 bg-blue-500"></span>
                <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Senior Web Developer</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1] md:leading-[0.9]">
                Professional <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 inline-block mt-2">
                  Solutions.
                </span>
              </h1>

              <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto lg:mx-0 font-light leading-relaxed">
                Men yuqori darajadagi, masshtablanuvchi va foydalanuvchilar uchun qulay tizimlar yarataman. Har bir loyiha - bu san'at va texnologiya uyg'unligi.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                Loyihalar uchun ochiq
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs text-gray-300">
                <MessageSquare className="w-3 h-3 text-blue-400" />
                Tezkor javob
              </div>
            </div>
          </div>

          {/* Right Content: Social Links */}
          <div className="w-full lg:w-[450px] flex flex-col gap-3" style={{ transform: "translateZ(100px)" }}>
            {socialButtons.map((btn, i) => (
              <SocialCard
                key={i}
                href={btn.link}
                btn={btn}
              >
                {/* Internal layout is now inside SocialCard */}
              </SocialCard>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Marquee Section */}
      <div className="w-full mt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-10"
        >
          <h3 className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold">Asosiy Texnologiyalar</h3>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4"></div>
        </motion.div>

        <div className="relative w-full overflow-hidden flex items-center py-10 bg-white/[0.01] border-y border-white/[0.05]">
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#050810] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#050810] to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-16 md:gap-32 items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...techSkills, ...techSkills].map((Icon, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-none"
              >
                <Icon className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-12" />
                <span className="text-[10px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">ACTIVE</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="w-full max-w-[1100px] mt-32 px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <Sparkles size={12} />
            CURRICULUM VITAE
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Mening <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Rezumeyim</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            Tajribam, ko'nikmalarim va yutuqlarim haqida batafsil ma'lumot olish uchun quyidagi rezumeni ko'rishingiz yoki yuklab olishingiz mumkin.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[550px] sm:h-auto sm:aspect-[1/1.414] w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl group touch-pan-y"
        >
          {/* Native PDF Viewer for better reliability */}
          <iframe 
            src="/Azizbek_Mirzavaliyev.pdf#view=FitH&scrollbar=0&toolbar=0&navpanes=0" 
            className="w-full h-full border-none rounded-[2rem] pointer-events-auto"
            title="Azizbek Mirzavaliyev Resume"
            style={{ overflow: 'hidden' }}
          />
          
          {/* Glassmorphism Controls */}
          <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl z-30 shadow-2xl w-[85%] sm:w-auto">
            <a 
              href="/Azizbek_Mirzavaliyev.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <ExternalLink size={18} />
              To'liq ko'rish
            </a>
            <a 
              href="/Azizbek_Mirzavaliyev.pdf" 
              download="Azizbek_Mirzavaliyev_Resume.pdf"
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Send size={18} className="rotate-90" />
              Yuklab olish
            </a>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Bottom Subtle Footer */}
      <div className="mt-32 text-gray-600 text-[10px] font-mono tracking-widest uppercase flex items-center gap-4">
        <span>Design by Antigravity AI</span>
        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
        <span>© 2024 Azizbek</span>
      </div>
    </div>
  );
}
