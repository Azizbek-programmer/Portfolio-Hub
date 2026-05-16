import React, { useState, useMemo, lazy, Suspense, memo, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { Linkedin, Send, ExternalLink, Sparkles, Clock } from "lucide-react";
import { SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiJavascript, SiGithub, SiFramer, SiNextdotjs, SiDocker } from "react-icons/si";
import VisitorCounter from "./Contact/components/VisitorCounter";
import YearProgressModal from "./Contact/components/YearProgressModal";
import "./Contact/styles/animations.css";
import resumeImage from "@assets/Resume.png";

// --- Lazy Themes ---
const DefaultTheme = lazy(() => import("./Contact/themes/DefaultTheme"));
const HackerTheme = lazy(() => import("./Contact/themes/HackerTheme"));
type Theme = "default" | "hacker";

// --- Static Data ---
const TECH_SKILLS = [SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiJavascript, SiGithub, SiFramer, SiNextdotjs, SiDocker];
const SOCIAL_BUTTONS = [
  {
    label: "LinkedIn",
    icon: <Linkedin size={22} />,
    text: "text-[#00BFFF]",
    glowColor: "from-[#0077b5] via-[#00BFFF] to-[#38bdf8]",
    link: "https://www.linkedin.com/in/azizbek-mirzavaliyev-1aa1bb351/",
  },
  {
    label: "GitHub",
    icon: <SiGithub size={22} />,
    text: "text-[#c084fc]",
    glowColor: "from-[#6d28d9] via-[#8b5cf6] to-[#c084fc]",
    link: "https://github.com/Azizbek-programmer",
  },
  {
    label: "Telegram",
    icon: <Send size={22} />,
    text: "text-[#38bdf8]",
    glowColor: "from-[#0284c7] via-[#0ea5e9] to-[#67e8f9]",
    link: "https://t.me/BEK_AIR0",
  },
  {
    label: "Portfolio",
    icon: <SiFramer size={22} />,
    text: "text-[#f472b6]",
    glowColor: "from-[#c026d3] via-[#e879f9] to-[#fb7185]",
    link: "https://portfolio-hub-lime-xi.vercel.app/",
  },
  {
    label: "Resume",
    icon: <Sparkles size={22} />,
    text: "text-[#fde047]",
    glowColor: "from-[#ca8a04] via-[#facc15] to-[#fde047]",
    link: "/Azizbek_Mirzavaliyev.pdf",
  },
];

// --- Optimized Components ---

const SocialCard = memo(({ href, btn, index }: { href: string; btn: any; index: number }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={href.endsWith(".pdf") ? href.split("/").pop() : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
      }}
      className="relative w-full max-w-[460px] h-[68px] rounded-[24px] group overflow-visible"
    >
      {/* OUTER GLOW */}
      <div
        className={`absolute inset-0 rounded-[24px] bg-gradient-to-r ${btn.glowColor} opacity-25 blur-2xl group-hover:opacity-40 transition-all duration-500`}
      />

      {/* MAIN BORDER */}
      <div
        className={`absolute inset-0 rounded-[24px] p-[1.4px] bg-gradient-to-br ${btn.glowColor}`}
      >
        {/* INNER BODY */}
        <div className="relative w-full h-full rounded-[22px] bg-[#06080f]/95 overflow-hidden flex items-center px-6">
          
          {/* INSIDE COLOR LIGHT */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${btn.glowColor} opacity-[0.10] group-hover:opacity-[0.16] blur-xl transition-all duration-500`}
          />

          {/* DARK DEPTH */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_40%)]" />

          {/* BOTTOM SHADOW */}
          <div className="absolute inset-0 shadow-[inset_0_-25px_40px_rgba(0,0,0,0.8)]" />

          {/* ICON AREA */}
          <div
            className={`relative z-10 flex items-center justify-center ${btn.text} drop-shadow-[0_0_18px_currentColor]`}
          >
            {btn.icon}
          </div>

          {/* SEPARATOR */}
          <div
            className={`relative z-10 w-[1px] h-7 mx-5 bg-gradient-to-b from-transparent via-white/40 to-transparent`}
          />

          {/* TEXT */}
          <span
            className={`relative z-10 text-[17px] sm:text-[18px] font-medium tracking-wide ${btn.text} drop-shadow-[0_0_10px_currentColor]`}
          >
            {btn.label}
          </span>

          {/* RIGHT SIDE LIGHT */}
          <div
            className={`absolute right-[-20%] top-0 h-full w-[45%] bg-gradient-to-l ${btn.glowColor} opacity-[0.13] blur-3xl`}
          />

          {/* EXTERNAL ICON */}
          <motion.div
            whileHover={{ rotate: -12 }}
            className="ml-auto relative z-10 opacity-40 group-hover:opacity-80 transition-all duration-300"
          >
            <ExternalLink
              size={18}
              className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
});
const ThemeSwitcher = memo(({ theme, setTheme, onOpenTime }: { theme: Theme; setTheme: (t: Theme) => void; onOpenTime: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-[100] flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      <button
        onClick={onOpenTime}
        className="px-2.5 py-1.5 rounded-full text-blue-500 hover:bg-white/10 transition-all duration-300 flex items-center group"
        title="Year Progress"
      >
        <Clock size={16} className="group-hover:rotate-180 transition-transform duration-700" />
      </button>
      <div className="w-[1px] h-4 bg-white/10 mx-1" />
      {(["default", "hacker"] as Theme[]).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 capitalize ${
            theme === t 
              ? "bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          {t}
        </button>
      ))}
    </motion.div>
  );
});

export default function Contact() {
  const [theme, setTheme] = useState<Theme>("default");
  const [showYearProgress, setShowYearProgress] = useState(false);

  useEffect(() => {
    // Hide browser scrollbar only for this page
    document.documentElement.classList.add('no-scrollbar');
    document.body.classList.add('no-scrollbar');
    
    return () => {
      // Restore scrollbar when leaving the page
      document.documentElement.classList.remove('no-scrollbar');
      document.body.classList.remove('no-scrollbar');
    };
  }, []);

  return (
    <div className={`min-h-[100dvh] flex flex-col items-center justify-center overflow-x-hidden relative font-sans py-8 sm:py-16 transition-all duration-1000 bg-[#050810]`}>
      <ThemeSwitcher theme={theme} setTheme={setTheme} onOpenTime={() => setShowYearProgress(true)} />
      <YearProgressModal isOpen={showYearProgress} onClose={() => setShowYearProgress(false)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "anticipate" }}
          className="w-full flex flex-col items-center"
        >
          <Suspense fallback={<div className="min-h-screen" />}>
            {theme === "default" && (
              <DefaultTheme 
                socialButtons={SOCIAL_BUTTONS} 
                techSkills={TECH_SKILLS} 
                SocialCard={SocialCard} 
                resumeImage={resumeImage}
              />
            )}
            {theme === "hacker" && (
              <HackerTheme socialButtons={SOCIAL_BUTTONS} />
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Footer - Isolated to prevent Theme remount impact */}
      {theme !== "hacker" && (
        <div className="mt-16 sm:mt-32 text-[10px] font-mono tracking-widest uppercase flex items-center gap-4 text-gray-600">
          <span>Design by Antigravity AI</span>
          <span className="w-1 h-1 rounded-full bg-gray-700"></span>
          <span>© 2024 Azizbek</span>
        </div>
      )}
      
      {theme === "default" && <VisitorCounter />}
    </div>
  );
}
