import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Send, Mail, ExternalLink, MessageSquare, Sparkles } from "lucide-react";
import { SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql, SiJavascript, SiGithub, SiFramer, SiNextdotjs, SiDocker } from "react-icons/si";
import profileImage from "@assets/profile.jpg";

// --- Components ---

const MeteorGrid = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
      
      {/* Meteors */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] w-[80px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40"
          initial={{ x: "-10%", y: Math.random() * 100 + "%", rotate: -45 }}
          animate={{ x: "120%", y: (Math.random() * 100 + 20) + "%" }}
          transition={{
            duration: Math.random() * 2 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3
          }}
        />
      ))}
    </div>
  );
};

const ProfileAura = () => {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-48 h-48 md:w-64 md:h-64 bg-blue-500 rounded-full blur-[60px]"
      />
    </div>
  );
};

import { createClient } from "@supabase/supabase-js";

// Supabase konfiguratsiyasi
const SUPABASE_URL = "https://xgvjzxpvlfupdakwldcc.supabase.co";
const SUPABASE_KEY = "sb_publishable_AvTn0I_P_shvnPORBiYEpg_5ITV3-mE";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Unikal tashrifni tekshirish
    const hasVisited = localStorage.getItem('contact_page_visited');
    
    const fetchCount = async () => {
      try {
        console.log("Fetching count from Supabase...");
        const { data, error } = await supabase
          .from('stats')
          .select('value')
          .eq('id', 'contact_views')
          .single();
        
        if (error) {
          console.warn("Jadval topilmadi yoki hali yaratilmagan:", error.message);
          return;
        }
        if (data) {
          console.log("Count fetched:", data.value);
          setCount(data.value);
        }
      } catch (err) {
        console.error("Sanoqni olishda xatolik:", err);
      }
    };

    const handleVisit = async () => {
      try {
        if (!hasVisited) {
          console.log("New unique visit detected. Incrementing...");
          const { error } = await supabase.rpc('increment_visitor_count');
          if (error) {
            console.warn("RPC funksiyasi topilmadi:", error.message);
          } else {
            localStorage.setItem('contact_page_visited', 'true');
          }
        }
        await fetchCount();
      } catch (err) {
        console.error("Visit handler error:", err);
        await fetchCount();
      }
    };

    handleVisit();

    // Real-time obuna (kimdir kirsa hamma ko'radi)
    const channel = supabase
      .channel('public:stats')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'stats', filter: "id=eq.contact_views" }, 
        payload => {
          setCount(payload.new.value);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/20 backdrop-blur-xl shadow-2xl"
    >
      <div className="relative flex h-2 w-2">
        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
        <div className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></div>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Visitors</span>
        <span className="text-sm font-bold text-white tabular-nums tracking-tight">
          {count !== null ? count.toLocaleString() : "..."}
        </span>
      </div>
    </motion.div>
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
      className="group relative flex items-center justify-between p-2.5 pl-3 pr-6 rounded-full bg-white/[0.03] border border-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.08] hover:border-white/40 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
    >
      {/* Real Glass Reflection (Glint) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 80%)`
          ),
        }}
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
};

type Theme = "default" | "hacker" | "luxury";

const ThemeSwitcher = ({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) => {
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
};

export default function Contact() {
  const [theme, setTheme] = useState<Theme>("default");
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
          {theme === "default" && (
            <div className="w-full flex flex-col items-center">
              <MeteorGrid />
              {/* Hero Background Glows */}
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

              <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative z-20 w-[95%] max-w-[1100px] mx-auto"
              >
                <div 
                  className="relative overflow-hidden backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row gap-12 lg:gap-20 items-center group"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <div className="absolute inset-0 rounded-[2.5rem] border border-transparent [mask-image:linear-gradient(white,white),linear-gradient(white,white)] [mask-clip:padding-box,border-box] [mask-composite:intersect] group-hover:border-blue-500/30 transition-colors duration-700 -z-10" />

                  <div className="flex-1 text-center lg:text-left space-y-8" style={{ transform: "translateZ(80px)" }}>
                    <div className="relative inline-block">
                      <motion.div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500">
                        <div className="w-full h-full rounded-2xl overflow-hidden bg-[#050810]">
                          <img src={profileImage} alt="Azizbek" className="w-full h-full object-cover" />
                        </div>
                        <ProfileAura />
                      </motion.div>
                    </div>
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center lg:justify-start gap-3"
                      >
                        <span className="h-[1px] w-8 bg-blue-500"></span>
                        <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Full Stack Developer</span>
                      </motion.div>

                      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1] md:leading-[0.9]">
                        Build <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 inline-block mt-2">
                          Better.
                        </span>
                      </h1>

                      <p className="text-gray-400 text-lg md:text-xl max-w-xs mx-auto lg:mx-0 font-light leading-relaxed">
                        G'oyalaringizni sifatli kod va samarali yechimlar orqali hayotga tatbiq etaman.
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

                  <div className="w-full lg:w-[400px] flex flex-col gap-2.5" style={{ transform: "translateZ(100px)" }}>
                    {socialButtons.map((btn, i) => (
                      <SocialCard key={i} href={btn.link} btn={btn} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Marquee Section */}
              <div className="w-full mt-16 sm:mt-32 relative z-10">
                <motion.div className="text-center mb-6 sm:mb-10">
                  <h3 className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold">Asosiy Texnologiyalar</h3>
                  <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4"></div>
                </motion.div>

                <div className="relative w-full overflow-hidden flex items-center py-6 sm:py-10 bg-white/[0.01] border-y border-white/[0.05]">
                  <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#050810] to-transparent z-20 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#050810] to-transparent z-20 pointer-events-none" />
                  <motion.div
                    className="flex gap-16 md:gap-32 items-center w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                  >
                    {[...techSkills, ...techSkills].map((Icon, idx) => (
                      <div key={idx} className="group flex flex-col items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <Icon className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-125" />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Resume Section */}
              <div className="w-full max-w-[1100px] mt-16 sm:mt-32 px-4 relative z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-8 sm:mb-12"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
                    <Sparkles size={12} />
                    CURRICULUM VITAE
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Resume</span>
                  </h2>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="relative h-[550px] sm:h-auto sm:aspect-[1/1.414] w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl group touch-pan-y"
                >
                  <iframe 
                    src="/Azizbek_Mirzavaliyev.pdf#view=FitH&scrollbar=0&toolbar=0&navpanes=0" 
                    className="w-full h-full border-none rounded-[2rem] pointer-events-auto"
                    title="Azizbek Mirzavaliyev Resume"
                    style={{ overflow: 'hidden' }}
                  />
                  <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl z-30 shadow-2xl w-[85%] sm:w-auto">
                    <a href="/Azizbek_Mirzavaliyev.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                      <ExternalLink size={18} /> To'liq ko'rish
                    </a>
                    <a href="/Azizbek_Mirzavaliyev.pdf" download="Azizbek_Mirzavaliyev_Resume.pdf" className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <Send size={18} className="rotate-90" /> Yuklab olish
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {theme === "hacker" && (
            <div className="w-full min-h-screen flex items-center justify-center font-mono p-4 md:p-10 relative overflow-hidden bg-black selection:bg-[#00ff00] selection:text-black">
              {/* Complex Matrix & CRT Background */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] z-[60] animate-pulse" />
                <div className="absolute inset-0 bg-[#000500]">
                  {[...Array(40)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: [null, 1200], opacity: [0, 0.4, 0] }}
                      transition={{ duration: Math.random() * 8 + 4, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
                      className="absolute text-[#00ff00] text-[10px] whitespace-nowrap opacity-10"
                      style={{ left: `${i * 2.5}%`, writingMode: 'vertical-rl' }}
                    >
                      {Array(60).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')}
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                className="max-w-7xl w-full relative z-10 grid lg:grid-cols-[450px_1fr] gap-0 border border-[#00ff00]/40 bg-black/95 shadow-[0_0_150px_rgba(0,255,0,0.2)] backdrop-blur-sm overflow-hidden"
              >
                {/* Scanning Laser */}
                <motion.div 
                  animate={{ y: ["0%", "1000%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff00] to-transparent z-[70] shadow-[0_0_20px_#00ff00] opacity-50"
                />

                {/* Sidebar - Terminal Info */}
                <div className="p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-[#00ff00]/30 space-y-16 relative bg-[#001100]/20">
                  <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-[#00ff00]/30 animate-pulse">
                    ENCRYPTION_STATUS: AES-256-GCM
                  </div>
                  
                  <div className="relative group flex justify-center">
                    <div className="absolute -inset-6 bg-[#00ff00]/10 blur-3xl group-hover:bg-[#00ff00]/30 transition-all duration-1000" />
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative w-64 h-64 border border-[#00ff00]/50 p-2 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#00ff00]/5 z-10 animate-pulse" />
                      <img src={profileImage} className="w-full h-full object-cover grayscale brightness-110 contrast-150 scale-110 group-hover:scale-125 transition-transform duration-[3s]" />
                      <div className="absolute bottom-2 left-2 bg-[#00ff00] text-black text-[9px] px-2 py-0.5 font-black uppercase">Identity Verified</div>
                    </motion.div>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#00ff00] rounded-full animate-ping" />
                        <span className="text-[#00ff00] text-xs font-black tracking-[0.5em] uppercase">Security Level 10</span>
                      </div>
                      <h2 className="text-4xl font-black text-[#00ff00] tracking-tighter uppercase glitch-text" data-text="AZIZBEK">AZIZBEK</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {socialButtons.map((btn, i) => (
                        <motion.a 
                          key={i} 
                          href={btn.link} 
                          whileHover={{ x: 15, backgroundColor: "rgba(0,255,0,0.15)" }}
                          className="flex items-center justify-between border border-[#00ff00]/10 p-5 group transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-[#00ff00]/30 text-[10px]">0{i+1}</span>
                            <span className="text-[#00ff00] text-[11px] font-bold tracking-widest">{btn.label.toUpperCase()}</span>
                          </div>
                          <motion.div animate={{ rotate: [0, 90, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-[#00ff00]/40 group-hover:text-[#00ff00]">
                            {btn.icon}
                          </motion.div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Dashboard */}
                <div className="p-8 md:p-24 space-y-20 flex flex-col justify-center relative bg-black">
                  <div className="space-y-10 relative">
                    <div className="space-y-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[#00ff00]/40 text-[10px] font-mono">
                        <span className="w-10 h-[1px] bg-[#00ff00]/40" />
                        CORE_MODULE_ACTIVE
                      </motion.div>
                      <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter text-[#00ff00] uppercase leading-[0.8] relative">
                        NEURAL <br /> 
                        <span className="text-transparent border-t-2 border-b-2 border-[#00ff00]/20 bg-clip-text -webkit-text-stroke-[1px] -webkit-text-stroke-[#00ff00] opacity-80">ENGINEER</span>
                      </h1>
                    </div>

                    <p className="text-[#00ff00]/60 text-lg md:text-2xl font-mono max-w-2xl leading-relaxed italic border-l-4 border-[#00ff00]/40 pl-8">
                      &gt; Architecting high-performance distributed systems with absolute precision and cryptographic security.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="p-10 border border-[#00ff00]/30 bg-[#00ff00]/5 space-y-6 relative group"
                    >
                      <div className="absolute -top-[1px] -left-[1px] w-8 h-8 border-t-2 border-l-2 border-[#00ff00]" />
                      <div className="flex items-center justify-between">
                        <h4 className="text-[#00ff00] text-sm font-black uppercase tracking-widest">Main Dossier</h4>
                        <Sparkles size={16} className="text-[#00ff00] animate-pulse" />
                      </div>
                      <p className="text-[11px] text-[#00ff00]/50 font-mono leading-relaxed">
                        Complete technical overview, architectural patterns, and full-stack performance metrics.
                      </p>
                      <a href="/Azizbek_Mirzavaliyev.pdf" download className="block w-full text-center py-5 bg-[#00ff00] text-black font-black text-xs hover:bg-black hover:text-[#00ff00] border border-[#00ff00] transition-all duration-300">
                        DOWNLOAD_PAYLOAD.BIN
                      </a>
                    </motion.div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#00ff00]/20 pb-4">
                        <span className="text-[#00ff00]/40 text-[10px] font-mono uppercase tracking-[0.3em]">Network Traffic</span>
                        <div className="flex gap-1">
                          {[1,2,3,4].map(i => <motion.div key={i} animate={{ height: [4, 16, 8] }} transition={{ duration: 0.5 + i*0.1, repeat: Infinity }} className="w-1 bg-[#00ff00]" />)}
                        </div>
                      </div>
                      <div className="space-y-4 font-mono text-[9px] text-[#00ff00]/30">
                        <div className="flex justify-between"><span>CPU_LOAD:</span> <span className="text-[#00ff00]">2.4%</span></div>
                        <div className="flex justify-between"><span>UPTIME:</span> <span className="text-[#00ff00]">99.99%</span></div>
                        <div className="flex justify-between"><span>LATENCY:</span> <span className="text-[#00ff00]">12ms</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <style dangerouslySetInnerHTML={{ __html: `
                .matrix-rain { background: radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.05), transparent); }
                .glitch-text {
                  position: relative;
                  text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.025em -0.05em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75);
                  animation: glitch 500ms infinite;
                }
                @keyframes glitch {
                  0% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.05em -0.025em 0 rgba(0,255,0,0.75), -0.025em 0.05em 0 rgba(0,0,255,0.75); }
                  14% { text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.05em -0.025em 0 rgba(0,255,0,0.75), -0.025em 0.05em 0 rgba(0,0,255,0.75); }
                  15% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75), 0.025em 0.025em 0 rgba(0,255,0,0.75), -0.05em -0.05em 0 rgba(0,0,255,0.75); }
                  49% { text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75), 0.025em 0.025em 0 rgba(0,255,0,0.75), -0.05em -0.05em 0 rgba(0,0,255,0.75); }
                  50% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75), 0.05em 0 0 rgba(0,255,0,0.75), 0 -0.05em 0 rgba(0,0,255,0.75); }
                  99% { text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75), 0.05em 0 0 rgba(0,255,0,0.75), 0 -0.05em 0 rgba(0,0,255,0.75); }
                  100% { text-shadow: -0.025em 0 0 rgba(255,0,0,0.75), -0.025em -0.025em 0 rgba(0,255,0,0.75), -0.025em -0.05em 0 rgba(0,0,255,0.75); }
                }
              `}} />
            </div>
          )}

          {theme === "luxury" && (
            <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-20 bg-[#050505] relative overflow-hidden">
              {/* Premium Luxury Background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 blur-[200px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#D4AF37]/5 blur-[250px] rounded-full" />
                {/* Floating Gold Particles */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 1000, x: Math.random() * 1500, opacity: 0 }}
                    animate={{ y: -500, opacity: [0, 1, 0] }}
                    transition={{ duration: Math.random() * 20 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
                    className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                  />
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[1400px] w-full relative z-10"
              >
                <div className="grid lg:grid-cols-[1fr_500px] gap-20 lg:gap-40 items-center">
                  {/* Left Side: Elegant Typography */}
                  <div className="space-y-16 order-2 lg:order-1">
                    <div className="space-y-8">
                      <motion.div 
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-6"
                      >
                        <span className="h-[1px] w-20 bg-[#D4AF37]/50" />
                        <span className="text-[#D4AF37] text-[11px] font-bold tracking-[0.8em] uppercase">Est. 2024</span>
                      </motion.div>
                      
                      <h1 className="text-[5rem] md:text-[10rem] font-serif text-white tracking-tighter leading-[0.85] italic">
                        Azizbek <br />
                        <span className="text-[#D4AF37] drop-shadow-[0_10px_30px_rgba(212,175,55,0.2)]">Mirzavaliyev</span>
                      </h1>

                      <p className="text-gray-400 text-xl md:text-3xl font-serif italic leading-relaxed max-w-2xl border-l-2 border-[#D4AF37]/30 pl-12 py-6">
                        "Curating elite digital experiences through the lens of sophisticated engineering and timeless minimalist design."
                      </p>
                    </div>

                    {/* Premium Links */}
                    <div className="flex flex-wrap gap-x-16 gap-y-8">
                      {socialButtons.map((btn, i) => (
                        <a key={i} href={btn.link} className="group relative flex items-center gap-4 py-2 overflow-hidden">
                          <div className="text-gray-600 group-hover:text-[#D4AF37] transition-all duration-700 transform group-hover:scale-125">
                            {btn.icon}
                          </div>
                          <span className="text-xs text-gray-500 font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                            {btn.label.split(' ')[0]}
                          </span>
                          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </a>
                      ))}
                    </div>

                    <div className="pt-10 flex flex-col md:flex-row items-center gap-12">
                      <a href="/Azizbek_Mirzavaliyev.pdf" download className="group relative px-16 py-8 bg-white text-black overflow-hidden transition-all duration-700 hover:text-white rounded-sm">
                        <div className="absolute inset-0 bg-[#D4AF37] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                        <span className="relative z-10 font-serif text-xl italic flex items-center gap-4">
                          <Sparkles size={22} />
                          Download Dossier
                        </span>
                      </a>
                      <div className="flex flex-col gap-2">
                        <span className="text-gray-500 text-[10px] font-bold tracking-[0.5em] uppercase italic opacity-50">Status</span>
                        <div className="flex items-center gap-4">
                          <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full shadow-[0_0_15px_#D4AF37] animate-pulse" />
                          <span className="text-white text-sm font-serif italic tracking-wide">Available for selective mandates</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Artistic Profile Image */}
                  <div className="relative order-1 lg:order-2 flex justify-center">
                    <div className="relative group/profile">
                      {/* Artistic Framing */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-16 border border-[#D4AF37]/20 rounded-full"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-24 border border-[#D4AF37]/10 rounded-full border-dashed"
                      />
                      
                      <div className="relative w-80 h-[500px] md:w-[480px] md:h-[650px] overflow-hidden rounded-[4rem] border border-[#D4AF37]/40 shadow-[0_60px_100px_-20px_rgba(0,0,0,1)] bg-[#0a0a0a]">
                        <img 
                          src={profileImage} 
                          className="w-full h-full object-cover transition-all duration-[3s] group-hover/profile:scale-110 group-hover/profile:brightness-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        <div className="absolute bottom-16 left-16 right-16">
                          <div className="h-[1px] w-full bg-[#D4AF37]/40 mb-8" />
                          <h3 className="text-5xl font-serif text-white italic tracking-tighter">Azizbek.M</h3>
                        </div>
                      </div>

                      {/* Floating Decorative Elements */}
                      <motion.div 
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 flex items-center justify-center"
                      >
                        <Sparkles className="text-[#D4AF37]" size={32} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <style dangerouslySetInnerHTML={{ __html: `
                .shimmer {
                  background: linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.2) 50%, rgba(212,175,55,0) 100%);
                  background-size: 200% 100%;
                  animation: shimmer 3s infinite;
                }
                @keyframes shimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }
              `}} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer (Only for themes that don't have their own footer) */}
      {theme !== "luxury" && theme !== "hacker" && (
        <div className={`mt-16 sm:mt-32 text-[10px] font-mono tracking-widest uppercase flex items-center gap-4 text-gray-600`}>
          <span>Design by Antigravity AI</span>
          <span className={`w-1 h-1 rounded-full bg-gray-700`}></span>
          <span>© 2024 Azizbek</span>
        </div>
      )}
      
      {theme === "default" && <VisitorCounter />}
    </div>
  );
}
