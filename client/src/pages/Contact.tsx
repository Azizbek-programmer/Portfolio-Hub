import React, { useState, useMemo, lazy, Suspense, memo } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { Linkedin, Send, ExternalLink, Sparkles } from "lucide-react";
import { SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiJavascript, SiGithub, SiFramer, SiNextdotjs, SiDocker } from "react-icons/si";
import VisitorCounter from "./Contact/components/VisitorCounter";

// --- Lazy Themes ---
const DefaultTheme = lazy(() => import("./Contact/themes/DefaultTheme"));
const HackerTheme = lazy(() => import("./Contact/themes/HackerTheme"));
const LuxuryTheme = lazy(() => import("./Contact/themes/LuxuryTheme"));

type Theme = "default" | "hacker" | "luxury";

// --- Static Data ---
const TECH_SKILLS = [SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiJavascript, SiGithub, SiFramer, SiNextdotjs, SiDocker];

const SOCIAL_BUTTONS = [
  {
    label: "Portfolio Hub",
    icon: <SiFramer size={18} />,
    text: "text-emerald-400",
    glowColor: "from-emerald-500 to-teal-400",
    link: "https://portfolio-hub-lime-xi.vercel.app/"
  },
  {
    label: "GitHub Profile",
    icon: <SiGithub size={18} />,
    text: "text-white",
    glowColor: "from-gray-400 to-white",
    link: "https://github.com/Azizbek-programmer"
  },
  {
    label: "LinkedIn Professional",
    icon: <Linkedin size={18} />,
    text: "text-[#0A66C2]",
    glowColor: "from-blue-600 to-blue-400",
    link: "https://www.linkedin.com/in/azizbek-mirzavaliyev-1aa1bb351/"
  },
  {
    label: "Telegram Channel",
    icon: <Send size={18} />,
    text: "text-[#229ED9]",
    glowColor: "from-sky-500 to-blue-400",
    link: "https://t.me/BEK_AIR0"
  },
  {
    label: "Resume Download",
    icon: <Sparkles size={18} />,
    text: "text-amber-400",
    glowColor: "from-amber-500 to-yellow-400",
    link: "/Azizbek_Mirzavaliyev.pdf"
  },
];

// --- Optimized Components ---

const SocialCard = memo(({ href, btn }: { href: string, btn: any, index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotlightBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 80%)`
  );

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
      className="group relative flex items-center justify-between p-2.5 pl-3 pr-6 rounded-full bg-white/[0.03] border border-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.08] hover:border-white/40 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-500 group-hover:scale-110 shadow-inner ${btn.text}`}>
          {btn.icon}
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-500 tracking-wide">
            {btn.label}
          </span>
        </div>
      </div>

      <div className="relative z-10 opacity-40 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
        <ExternalLink size={14} className="text-white" />
      </div>
    </motion.a>
  );
});

const ThemeSwitcher = memo(({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 right-6 z-[100] flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      {(["default", "hacker", "luxury"] as Theme[]).map((t) => (
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

  return (
    <div className={`min-h-[100dvh] flex flex-col items-center justify-center overflow-x-hidden relative font-sans py-8 sm:py-16 transition-all duration-1000 ${
      theme === "luxury" ? "bg-[#0a0a0a]" : "bg-[#050810]"
    }`}>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />

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
              />
            )}
            {theme === "hacker" && (
              <HackerTheme socialButtons={SOCIAL_BUTTONS} />
            )}
            {theme === "luxury" && (
              <LuxuryTheme socialButtons={SOCIAL_BUTTONS} />
            )}
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Footer - Isolated to prevent Theme remount impact */}
      {theme !== "luxury" && theme !== "hacker" && (
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
