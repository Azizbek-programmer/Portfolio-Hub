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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]" />
        </motion.div>

        <motion.div 
          style={{ scale: heroScale }}
          className="container px-4 z-10 grid md:grid-cols-2 gap-12 items-center transform-gpu"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div 
              variants={textFadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium mb-6 shadow-[0_0_20px_rgba(var(--primary),0.2)]"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              {t("greeting")}
            </motion.div>
            
            <motion.h1 
              variants={textFadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-6 tracking-tight drop-shadow-2xl" 
            >
              {t("heroTitle1")}
              <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent animate-gradient bg-[length:300%_300%] inline-block">
                {t("heroTitleHighlight")}
              </span>
              {t("heroTitle2")}
            </motion.h1>
            
            <motion.p 
              variants={textFadeUp}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-light"
            >
              {t("heroDesc")}
            </motion.p>

            <motion.div variants={textFadeUp} className="flex flex-wrap gap-5">
              <Button 
                onClick={scrollToContact}
                className="group h-14 px-8 rounded-full text-lg bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105"
              >
                {t("contactBtn")} 
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="group h-14 px-8 rounded-full text-lg border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/40"
              >
                {t("myWorksBtn")} 
                <ExternalLink className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side floating image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            className="relative transform-gpu"
          >
            <div className="relative z-10 w-full max-w-[420px] mx-auto aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            </div>
            
            {/* Extremely smooth floating elements */}
            <motion.div 
              animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 lg:-top-12 lg:-right-12 bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl z-20 will-change-transform"
            >
              <Code2 className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-6 -left-6 lg:-bottom-12 lg:-left-12 bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl z-20 will-change-transform"
            >
              <Database className="w-10 h-10 text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ opacity: opacityText }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="flex flex-col items-center gap-2"
          >
             <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Scroll</span>
             <ArrowDown className="w-5 h-5 text-white/50" />
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
