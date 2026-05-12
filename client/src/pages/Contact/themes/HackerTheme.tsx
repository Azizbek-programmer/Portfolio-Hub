import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from "lucide-react";
import profileImage from "@assets/profile.jpg";
import '../styles/animations.css';

interface HackerThemeProps {
  socialButtons: any[];
}

const HackerTheme = ({ socialButtons }: HackerThemeProps) => {
  const matrixColumns = useMemo(() => 
    [...Array(40)].map((_, i) => ({
      left: `${i * 2.5}%`,
      duration: `${Math.random() * 8 + 4}s`,
      delay: `${Math.random() * 10}s`,
      text: Array(60).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')
    })), []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-mono p-4 md:p-10 relative overflow-hidden bg-black selection:bg-[#00ff00] selection:text-black">
      {/* Complex Matrix & CRT Background - Optimized with CSS */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] z-[60] animate-pulse" />
        <div className="absolute inset-0 bg-[#000500]">
          {matrixColumns.map((col, i) => (
            <div
              key={i}
              className="matrix-column"
              style={{
                left: col.left,
                animation: `matrix-rain ${col.duration} linear infinite ${col.delay}`
              }}
            >
              {col.text}
            </div>
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
        <div 
          className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff00] to-transparent z-[70] shadow-[0_0_20px_#00ff00] opacity-50"
          style={{ 
            animation: 'laser 4s linear infinite',
            willChange: 'transform'
          }}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes laser {
            0% { transform: translateY(0); }
            100% { transform: translateY(100vh); }
          }
        `}} />

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
              <img src={profileImage} className="w-full h-full object-cover grayscale brightness-110 contrast-150 scale-110 group-hover:scale-125 transition-transform duration-[3s]" loading="lazy" />
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
                  <div className="text-[#00ff00]/40 group-hover:text-[#00ff00] transition-transform duration-500 group-hover:rotate-90">
                    {btn.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="p-8 md:p-24 space-y-20 flex flex-col justify-center relative bg-black">
          <div className="space-y-10 relative">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#00ff00]/40 text-[10px] font-mono">
                <span className="w-10 h-[1px] bg-[#00ff00]/40" />
                CORE_MODULE_ACTIVE
              </div>
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
                  {[1,2,3,4].map(i => (
                    <div 
                      key={i} 
                      className="w-1 bg-[#00ff00]" 
                      style={{ 
                        animation: `barHeight 0.5s ease-in-out infinite alternate ${i * 0.1}s`,
                        willChange: 'height'
                      }} 
                    />
                  ))}
                </div>
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes barHeight {
                    0% { height: 4px; }
                    100% { height: 16px; }
                  }
                `}} />
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
    </div>
  );
};

export default memo(HackerTheme);
