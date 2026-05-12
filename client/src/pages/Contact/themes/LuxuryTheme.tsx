import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from "lucide-react";
import profileImage from "@assets/profile.jpg";
import '../styles/animations.css';

interface LuxuryThemeProps {
  socialButtons: any[];
}

const LuxuryTheme = ({ socialButtons }: LuxuryThemeProps) => {
  const particles = useMemo(() => 
    [...Array(30)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 20 + 10}s`,
      delay: `${Math.random() * 10}s`
    })), []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-20 bg-[#050505] relative overflow-hidden">
      {/* Premium Luxury Background - Optimized with CSS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4AF37]/10 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#D4AF37]/5 blur-[250px] rounded-full" />
        {/* Floating Gold Particles using CSS animations */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="gold-particle"
            style={{
              left: p.left,
              animation: `gold-particle ${p.duration} linear infinite ${p.delay}`,
              bottom: '-20px'
            }}
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
              <div className="flex items-center gap-6">
                <span className="h-[1px] w-20 bg-[#D4AF37]/50" />
                <span className="text-[#D4AF37] text-[11px] font-bold tracking-[0.8em] uppercase">Est. 2024</span>
              </div>
              
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
              {/* Artistic Framing - Optimized with CSS rotation */}
              <div 
                className="absolute -inset-16 border border-[#D4AF37]/20 rounded-full"
                style={{ animation: 'rotateCW 30s linear infinite', willChange: 'transform' }}
              />
              <div 
                className="absolute -inset-24 border border-[#D4AF37]/10 rounded-full border-dashed"
                style={{ animation: 'rotateCCW 45s linear infinite', willChange: 'transform' }}
              />
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes rotateCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes rotateCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
              `}} />
              
              <div className="relative w-80 h-[500px] md:w-[480px] md:h-[650px] overflow-hidden rounded-[4rem] border border-[#D4AF37]/40 shadow-[0_60px_100px_-20px_rgba(0,0,0,1)] bg-[#0a0a0a]">
                <img 
                  src={profileImage} 
                  className="w-full h-full object-cover transition-all duration-[3s] group-hover/profile:scale-110 group-hover/profile:brightness-110" 
                  loading="lazy"
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
                style={{ willChange: 'transform' }}
              >
                <Sparkles className="text-[#D4AF37]" size={32} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(LuxuryTheme);
