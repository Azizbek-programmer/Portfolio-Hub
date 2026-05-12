import React, { memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, MessageSquare, Sparkles, Send } from "lucide-react";
import MeteorGrid from '../components/MeteorGrid';
import ProfileAura from '../components/ProfileAura';
import profileImage from "@assets/profile.jpg";

interface DefaultThemeProps {
  socialButtons: any[];
  techSkills: any[];
  SocialCard: any;
}

const DefaultTheme = ({ socialButtons, techSkills, SocialCard }: DefaultThemeProps) => {
  // 3D Tilt Effect - Only active on desktop
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-300, 300], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-300, 300], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 600;
    const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 600;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <MeteorGrid />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: 'transform'
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
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#050810]">
                  <img src={profileImage} alt="Azizbek" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <ProfileAura />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="h-[1px] w-8 bg-blue-500"></span>
                <span className="text-blue-400 font-mono text-sm tracking-widest uppercase">Full Stack Developer</span>
              </div>

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
              <SocialCard key={i} href={btn.link} btn={btn} index={i} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Marquee Section - Optimized with CSS translate */}
      <div className="w-full mt-16 sm:mt-32 relative z-10">
        <div className="text-center mb-6 sm:mb-10">
          <h3 className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold">Asosiy Texnologiyalar</h3>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-4"></div>
        </div>

        <div className="relative w-full overflow-hidden flex items-center py-6 sm:py-10 bg-white/[0.01] border-y border-white/[0.05]">
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#050810] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#050810] to-transparent z-20 pointer-events-none" />
          
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .marquee-inner {
              display: flex;
              gap: 4rem;
              animation: marquee 40s linear infinite;
              will-change: transform;
            }
            @media (min-width: 768px) { .marquee-inner { gap: 8rem; } }
          `}} />
          
          <div className="marquee-inner">
            {[...techSkills, ...techSkills].map((Icon, idx) => (
              <div key={idx} className="group flex flex-col items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <Icon className="w-10 h-10 md:w-14 md:h-14 transition-transform duration-500 group-hover:scale-125" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Section */}
      <div className="w-full max-w-[1100px] mt-16 sm:mt-32 px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[550px] sm:h-auto sm:aspect-[1/1.414] w-full max-w-4xl mx-auto rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl group touch-pan-y"
        >
          <iframe 
            src="/Azizbek_Mirzavaliyev.pdf#view=FitH&scrollbar=0&toolbar=0&navpanes=0" 
            className="w-full h-full border-none rounded-[2rem] pointer-events-auto"
            title="Azizbek Mirzavaliyev Resume"
            style={{ overflow: 'hidden' }}
            loading="lazy"
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
  );
};

export default memo(DefaultTheme);
