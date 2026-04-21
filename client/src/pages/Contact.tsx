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

const MagneticLink = ({ children, href, className, btn }: { children: React.ReactNode, href: string, className: string, btn: any }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: x * 0.3, y: y * 0.3 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${className} relative overflow-hidden group`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute inset-0 bg-gradient-to-r opacity-10 ${btn.glowColor}`} />
      </div>
      {children}
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
    if (!containerRef.current) return;
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
      label: "Portfolio Hub",
      icon: <ExternalLink size={20} />,
      bg: "hover:bg-emerald-500/10",
      border: "hover:border-emerald-400",
      text: "hover:text-emerald-400",
      shadow: "hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]",
      glowColor: "from-emerald-500 to-teal-400",
      link: "https://portfolio-hub-lime-xi.vercel.app/"
    },
    {
      label: "GitHub Profile",
      icon: <Github size={20} />,
      bg: "hover:bg-white/10",
      border: "hover:border-gray-300",
      text: "hover:text-white",
      shadow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
      glowColor: "from-gray-400 to-white",
      link: "https://github.com/Azizbek-programmer"
    },
    {
      label: "LinkedIn Professional",
      icon: <Linkedin size={20} />,
      bg: "hover:bg-blue-600/10",
      border: "hover:border-blue-500",
      text: "hover:text-blue-400",
      shadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
      glowColor: "from-blue-600 to-blue-400",
      link: "https://www.linkedin.com/in/azizbek-mirzavaliyev-1aa1bb351/"
    },
    {
      label: "Telegram Channel",
      icon: <Send size={20} />,
      bg: "hover:bg-teal-500/10",
      border: "hover:border-teal-400",
      text: "hover:text-teal-400",
      shadow: "hover:shadow-[0_0_20px_rgba(45,212,191,0.2)]",
      glowColor: "from-teal-500 to-blue-400",
      link: "https://t.me/BEK_AIR0"
    },
    {
      label: "Purp Email",
      icon: <Mail size={20} />,
      bg: "hover:bg-purple-500/10",
      border: "hover:border-purple-400",
      text: "hover:text-purple-400",
      shadow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
      glowColor: "from-purple-600 to-fuchsia-400",
      link: "mailto:azizbekmirzavaliyev31@gmail.com"
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

              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
                Professional <br />
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
          <div className="w-full lg:w-[380px] space-y-4" style={{ transform: "translateZ(100px)" }}>
            {socialButtons.map((btn, i) => (
              <MagneticLink
                key={i}
                href={btn.link}
                btn={btn}
                className={`group w-full flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-xl shadow-xl hover:shadow-2xl`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-500 ${btn.text}`}>
                    {btn.icon}
                  </div>
                  <span className="text-gray-200 font-medium tracking-tight group-hover:text-white transition-colors">{btn.label}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <ExternalLink size={16} className={btn.text} />
                </div>
              </MagneticLink>
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

      {/* Bottom Subtle Footer */}
      <div className="mt-20 text-gray-600 text-[10px] font-mono tracking-widest uppercase flex items-center gap-4">
        <span>Design by Antigravity AI</span>
        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
        <span>© 2024 Azizbek</span>
      </div>
    </div>
  );
}
