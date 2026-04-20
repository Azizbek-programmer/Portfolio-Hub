import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiGithub,
  SiTelegram
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, ArrowDown, ExternalLink, Code2, Database, Layout, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/Section";
import { SkillCard } from "@/components/SkillCard";
import profileImage from "@assets/pastphole.png";
import { useI18n, Language } from "../lib/i18n";

// Framer Motion Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const textFadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, rotate: -3 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 } }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const { t, lang, setLang } = useI18n();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-primary/30">
      
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div 
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] bg-primary/20 rounded-full blur-[100px] md:blur-[120px] transform-gpu" 
        />
        <div 
          className="absolute top-[20%] -right-[10%] w-[60%] h-[70%] bg-blue-900/20 rounded-full blur-[100px] md:blur-[120px] transform-gpu" 
        />
        <div 
          className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[100px] md:blur-[120px] transform-gpu" 
        />
      </div>

      {/* Navigation - Glassmorphism */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/10 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transform-gpu"
      >
        <span className="text-2xl font-bold font-display tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" /> {t("portfolio")}
        </span>
        <div className="flex gap-6 items-center">
          <div className="relative group">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)}
              className="appearance-none bg-white/5 text-white border border-white/10 rounded-lg px-4 py-1.5 outline-none text-sm cursor-pointer hover:bg-white/10 transition-all font-medium"
            >
              <option value="uz" className="bg-black">UZ</option>
              <option value="ru" className="bg-black">RU</option>
              <option value="en" className="bg-black">EN</option>
            </select>
          </div>
          <div className="hidden md:flex gap-4">
            <a href="https://github.com/Azizbek-programmer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white hover:scale-110 transition-all">
              <SiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/azizbek-mirzavaliyev-1aa1bb351/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white hover:scale-110 transition-all">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://t.me/BEK_AIR0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white hover:scale-110 transition-all">
              <SiTelegram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Completely New Hero Section - Cinematic Centered Design */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden">
        {/* Dynamic Architectural Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none"></div>

        <motion.div 
          style={{ scale: heroScale }}
          className="container px-4 sm:px-6 z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto"
        >
          {/* Top Avatar Capsule */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 p-1.5 pr-6 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer hover:bg-white/[0.08] transition-colors"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-black/50">
              <img src={profileImage} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-semibold text-gray-200 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              {t("greeting")}
            </span>
          </motion.div>

          {/* Huge Cinematic Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-extrabold tracking-[-0.04em] text-white leading-[1.05] drop-shadow-2xl"
          >
            {t("heroTitle1")}
            <br />
            <span className="relative inline-block mt-2">
              <span className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 blur-3xl opacity-30 pointer-events-none"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-teal-400">
                {t("heroTitleHighlight")}
              </span>
            </span>
            <br />
            {t("heroTitle2")}
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-light mt-8"
          >
            {t("heroDesc")}
          </motion.p>

          {/* Modern Action Dock */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-3 bg-white/[0.04] p-2.5 rounded-3xl sm:rounded-full border border-white/5 backdrop-blur-xl shadow-2xl w-full sm:w-auto"
          >
            <Button 
              onClick={scrollToContact}
              className="group h-14 sm:h-16 px-8 sm:px-10 rounded-2xl sm:rounded-full text-base sm:text-lg font-semibold bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full sm:w-auto overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("contactBtn")} 
                <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button 
              variant="ghost"
              className="group h-14 sm:h-16 px-8 sm:px-10 rounded-2xl sm:rounded-full text-base sm:text-lg font-medium text-white hover:bg-white/10 hover:text-white w-full sm:w-auto transition-all"
            >
              {t("myWorksBtn")} 
              <ExternalLink className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform opacity-70 group-hover:opacity-100" />
            </Button>
          </motion.div>
          
          {/* Tech Stack Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-white/20"
          >
             <SiReact className="w-6 h-6 sm:w-7 sm:h-7 hover:text-cyan-400 hover:scale-125 transition-all duration-300" />
             <SiTypescript className="w-6 h-6 sm:w-7 sm:h-7 hover:text-blue-500 hover:scale-125 transition-all duration-300" />
             <SiNodedotjs className="w-6 h-6 sm:w-7 sm:h-7 hover:text-green-500 hover:scale-125 transition-all duration-300" />
             <SiTailwindcss className="w-6 h-6 sm:w-7 sm:h-7 hover:text-cyan-300 hover:scale-125 transition-all duration-300" />
             <SiPostgresql className="w-6 h-6 sm:w-7 sm:h-7 hover:text-blue-400 hover:scale-125 transition-all duration-300" />
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ opacity: opacityText }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          >
             <ArrowDown className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Parallax and Glassmorphism */}
      <Section className="relative z-10 py-32 bg-black/40 backdrop-blur-sm border-t border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-50" />
        <SectionHeader 
          title={t("aboutTitle")} 
          subtitle={t("aboutSubtitle")}
        />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-lg text-gray-300 leading-relaxed font-light"
          >
            <p className="text-xl/relaxed text-white/90 font-medium">
              {t("aboutDesc1")}
            </p>
            <p>
              {t("aboutDesc2")}
            </p>
            <div className="pt-6 flex flex-wrap gap-6">
              <div className="flex-1 min-w-[140px] p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-display mb-2">2+</h4>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{t("experienceText")}</p>
              </div>
              <div className="flex-1 min-w-[140px] p-6 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <h4 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-display mb-2">20+</h4>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{t("projectsText")}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 lg:translate-y-12">
                <motion.div whileHover={{ y: -10 }} className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md">
                  <Layout className="w-10 h-10 text-primary mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-white tracking-tight">Frontend</h4>
                  <p className="text-sm text-gray-400">React, Vue, Next.js, Framer Motion</p>
                </motion.div>
                <motion.div whileHover={{ y: -10 }} className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md">
                  <Database className="w-10 h-10 text-accent mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-white tracking-tight">Backend</h4>
                  <p className="text-sm text-gray-400">Node.js, Python, PostgreSQL, Prisma</p>
                </motion.div>
              </div>
              <div className="space-y-6">
                <motion.div whileHover={{ y: -10 }} className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md">
                  <Code2 className="w-10 h-10 text-green-400 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-white tracking-tight">Clean Code</h4>
                  <p className="text-sm text-gray-400">SOLID, DRY, KISS, TypeScript</p>
                </motion.div>
                <motion.div whileHover={{ y: -10 }} className="bg-gradient-to-br from-white/10 to-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md">
                  <ExternalLink className="w-10 h-10 text-yellow-400 mb-4" />
                  <h4 className="text-xl font-bold mb-2 text-white tracking-tight">Deployment</h4>
                  <p className="text-sm text-gray-400">AWS, Docker, CI/CD, Vercel</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section - High End Grid */}
      <Section className="py-32 relative z-10">
        <SectionHeader 
          title={t("skillsTitle")} 
          subtitle={t("skillsSubtitle")}
        />
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12"
        >
          {[
            {icon: <SiReact/>, name: "React", color: "text-cyan-400", level: "Advanced"}, 
            {icon: <SiTypescript/>, name: "TypeScript", color:"text-blue-500", level: "Advanced"}, 
            {icon:<SiNodedotjs/>, name:"Node.js", color:"text-green-500", level: "Advanced"}, 
            {icon:<SiPostgresql/>, name:"PostgreSQL", color:"text-blue-300", level: "Intermediate"}, 
            {icon:<SiTailwindcss/>, name:"Tailwind", color:"text-cyan-300", level: "Expert"}, 
            {icon:<SiJavascript/>, name:"JavaScript", color:"text-yellow-400", level: "Expert"}, 
            {icon:<SiGithub/>, name:"Git/GitHub", color:"text-white", level: "Advanced"}, 
            {icon:<Code2/>, name:"REST API", color:"text-purple-400", level: "Advanced"}
          ].map((skill, idx) => (
            <SkillCard
              key={skill.name}
              index={idx}
              {...skill}
            />
          ))}
        </motion.div>
      </Section>

      {/* Contact Section - Clean & Modern */}
      <Section id="contact" className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-primary/5">
        <SectionHeader 
          title={t("contactTitle")} 
          subtitle={t("contactSubtitle")}
        />
        
        <div className="grid lg:grid-cols-2 gap-16 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h3 className="text-3xl font-bold font-display tracking-tight text-white mb-8">{t("contactInfoTitle")}</h3>
            <div className="space-y-6">
              {[
                { i:<Mail/>, l:"Email", v:"azizbekmirzavaliyev31@gmail.com", h:"mailto:azizbekmirzavaliyev31@gmail.com", c:"text-white bg-white/10" },
                { i:<SiTelegram/>, l:"Telegram", v:"@BEK_AIR0", h:"https://t.me/BEK_AIR0", c:"text-blue-400 bg-blue-500/20" },
                { i:<FaLinkedin/>, l:"LinkedIn", v:"Azizbek Mirzavaliyev", h:"https://www.linkedin.com/in/azizbek-mirzavaliyev-1aa1bb351/", c:"text-blue-600 bg-blue-700/20" }
              ].map((item, idx) => (
              <motion.a 
                key={idx}
                href={item.h}
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group shadow-lg shadow-black/20"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${item.c}`}>
                  <div className="w-6 h-6 [&>svg]:w-full [&>svg]:h-full">{item.i}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium tracking-wider uppercase mb-1">{item.l}</p>
                  <p className="font-semibold text-lg text-white">{item.v}</p>
                </div>
              </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl flex flex-col justify-center items-center text-center"
          >
             <Sparkles className="w-16 h-16 text-primary mb-6 drop-shadow-[0_0_15px_rgba(var(--primary),0.8)]" />
             <h3 className="text-3xl font-display font-bold mb-4">{t("heroTitle1")}</h3>
             <p className="text-gray-400 mb-8 max-w-sm">
                Got a project in mind? Let's build something amazing together. Reach out via email or telegram!
             </p>
             <Button className="h-14 px-10 rounded-full text-lg w-full max-w-sm bg-primary text-black hover:bg-primary/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                Start a conversation
             </Button>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 text-center text-muted-foreground border-t border-white/10 bg-black/50 relative z-10 backdrop-blur-md">
        <p className="text-sm tracking-wider">© {new Date().getFullYear()} {t("footerText")}</p>
        <p className="text-xs text-gray-600 mt-2 flex items-center justify-center gap-2">Crafted with <span className="text-red-500">♥</span> using React & Framer Motion</p>
      </footer>
    </div>
  );
}
