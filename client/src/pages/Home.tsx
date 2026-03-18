import { motion, useScroll, useTransform } from "framer-motion";

import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiGithub,
  // SiLinkedin,
  SiTelegram
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, ArrowDown, ExternalLink, Code2, Database, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/Section";
import { SkillCard } from "@/components/SkillCard";
// import { ContactForm } from "@/components/ContactForm";
import profileImage from "@assets/pastphole.png";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/5">
        <span className="text-xl font-bold font-display tracking-tight">Portfolio.</span>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <SiGithub className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-white transition-colors">
            <SiTelegram className="w-5 h-5" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-background/90" />
        </motion.div>

        <div className="container px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-medium mb-6"
            >
              👋 Salom, men Fullstack Dasturchiman
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              G'oyalarni <span className="text-gradient">Kodga</span> <br />
              Aylantiraman
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Zamonaviy veb-saytlar va ilovalar yaratish bo'yicha mutaxassis. 
              Mijozlar uchun sifatli va tezkor yechimlar taklif qilaman.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={scrollToContact}
                className="h-12 px-8 rounded-full text-lg bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10"
              >
                Bog'lanish <Mail className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline"
                className="h-12 px-8 rounded-full text-lg border-white/20 hover:bg-white/10 backdrop-blur-sm"
              >
                Mening ishlarim <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary/20">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-secondary/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl z-20"
            >
              <Code2 className="w-8 h-8 text-accent" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-secondary/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl z-20"
            >
              <Database className="w-8 h-8 text-primary" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 animate-bounce text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <Section className="bg-secondary/20">
        <SectionHeader 
          title="Men Haqimda" 
          subtitle="Qisqacha o'zim va faoliyatim haqida ma'lumot"
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Men O'zbekistonda yashaydigan ishtiyoqli Fullstack Dasturchiman. 
              Dasturlash olamiga kirib kelganimdan beri, men har doim yangi texnologiyalarni o'rganishga 
              va murakkab muammolarga optimal yechimlar topishga intilaman.
            </p>
            <p>
              Mening asosiy maqsadim - foydalanuvchilar uchun qulay, tezkor va chiroyli 
              raqamli mahsulotlar yaratishdir. Har bir loyihaga individual yondashaman va 
              maksimal darajada sifatli natija ko'rsatishga harakat qilaman.
            </p>
            <div className="pt-4 flex gap-4">
              <div className="p-4 bg-secondary/50 rounded-xl border border-white/5 text-center min-w-[120px]">
                <h4 className="text-3xl font-bold text-primary font-display">2+</h4>
                <p className="text-sm">Yillik tajriba</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-xl border border-white/5 text-center min-w-[120px]">
                <h4 className="text-3xl font-bold text-accent font-display">20+</h4>
                <p className="text-sm">Loyihalar</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="bg-secondary/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <Layout className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-bold mb-1 text-white">Frontend</h4>
                  <p className="text-sm text-muted-foreground">React, Vue, Next.js</p>
                </div>
                <div className="bg-secondary/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <Database className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-bold mb-1 text-white">Backend</h4>
                  <p className="text-sm text-muted-foreground">Node.js, Python, Go</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-secondary/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <Code2 className="w-8 h-8 text-green-400 mb-3" />
                  <h4 className="font-bold mb-1 text-white">Clean Code</h4>
                  <p className="text-sm text-muted-foreground">SOLID, DRY, KISS</p>
                </div>
                <div className="bg-secondary/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <ExternalLink className="w-8 h-8 text-yellow-400 mb-3" />
                  <h4 className="font-bold mb-1 text-white">Deployment</h4>
                  <p className="text-sm text-muted-foreground">AWS, Docker, CI/CD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section>
        <SectionHeader 
          title="Texnik Ko'nikmalar" 
          subtitle="Men foydalanadigan asosiy texnologiyalar va vositalar"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SkillCard 
            index={0}
            icon={<SiReact />}
            name="React"
            level="Advanced"
            color="text-cyan-400"
          />
          <SkillCard 
            index={1}
            icon={<SiTypescript />}
            name="TypeScript"
            level="Advanced"
            color="text-blue-500"
          />
          <SkillCard 
            index={2}
            icon={<SiNodedotjs />}
            name="Node.js"
            level="Intermediate"
            color="text-green-500"
          />
          <SkillCard 
            index={3}
            icon={<SiPostgresql />}
            name="PostgreSQL"
            level="Intermediate"
            color="text-blue-300"
          />
          <SkillCard 
            index={4}
            icon={<SiTailwindcss />}
            name="Tailwind"
            level="Advanced"
            color="text-cyan-300"
          />
          <SkillCard 
            index={5}
            icon={<SiJavascript />}
            name="JavaScript"
            level="Expert"
            color="text-yellow-400"
          />
          <SkillCard 
            index={6}
            icon={<SiGithub />}
            name="Git/GitHub"
            level="Advanced"
            color="text-white"
          />
          <SkillCard 
            index={7}
            icon={<Code2 />}
            name="REST API"
            level="Advanced"
            color="text-purple-400"
          />
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="pb-32">
        <SectionHeader 
          title="Bog'lanish" 
          subtitle="Hamkorlik qilish yoki savollaringiz bo'lsa xabar qoldiring"
        />
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold font-display">Aloqa ma'lumotlari</h3>
            <div className="space-y-6">
              <a 
                href="mailto:contact@example.com" 
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-lg">contact@example.com</p>
                </div>
              </a>
              
              <a 
                href="https://t.me/username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  <SiTelegram className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telegram</p>
                  <p className="font-medium text-lg">@username</p>
                </div>
              </a>

              <a 
                href="https://linkedin.com/in/username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-blue-700/20 flex items-center justify-center text-blue-700">
                  <FaLinkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-medium text-lg">/in/username</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* <ContactForm /> */}
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground border-t border-white/5 bg-secondary/20">
        <p>© {new Date().getFullYear()} Fullstack Developer Portfolio. Barcha huquqlar himoyalangan.</p>
      </footer>
    </div>
  );
}
