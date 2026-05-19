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
    [...Array(30)].map((_, i) => ({
      left: `${(i / 30) * 100}%`,
      duration: `${Math.random() * 8 + 4}s`,
      delay: `${Math.random() * 10}s`,
      text: Array(40).fill(0).map(() => String.fromCharCode(0x30A0 + Math.random() * 96)).join('')
    })), []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-mono p-4 md:p-10 relative overflow-hidden bg-black selection:bg-[#00ff00] selection:text-black">
      {/* Complex Matrix & CRT Background - Optimized with CSS */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_3px,3px_100%] z-[60] animate-pulse" />
        <div className="absolute inset-0 bg-[#000500] transform-gpu">
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl w-full relative z-10 grid lg:grid-cols-[400px_1fr] gap-0 border border-[#00ff00]/40 bg-black/95 shadow-[0_0_150px_rgba(0,255,0,0.2)] backdrop-blur-sm overflow-hidden transform-gpu"
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Sidebar - Terminal Info */}
        <div className="p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-[#00ff00]/30 space-y-8 md:space-y-12 relative bg-[#001100]/20 overflow-hidden">
          {/* Scanning Laser */}
          <div 
            className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#00ff00]/60 to-transparent z-[70] shadow-[0_0_15px_rgba(0,255,0,0.4)] opacity-30 pointer-events-none"
            style={{ 
              animation: 'laser-scan 5s linear infinite',
              willChange: 'top, opacity'
            }}
          />
          <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-[#00ff00]/30 animate-pulse">
            ENCRYPTION_STATUS: AES-256-GCM
          </div>
          
          {/* Security Status Header */}
          <div className="flex flex-col items-center justify-center gap-1.5 pt-4">
            <div className="flex items-center gap-3 border border-[#00ff00]/30 px-4 py-2 bg-black/80 shadow-[0_0_15px_rgba(0,255,0,0.15)] rounded-sm">
              <div className="w-2 h-2 bg-[#00ff00] shadow-[0_0_10px_#00ff00] rounded-full animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="text-[#00ff00]/60 text-[9px] font-bold tracking-widest uppercase">Security Status:</span>
                <span className="text-[#00ff00] text-[10px] font-black tracking-widest uppercase">Online</span>
              </div>
            </div>
          </div>
          
          <div className="relative group flex justify-center">
            <div className="absolute -inset-6 bg-[#00ff00]/10 blur-3xl group-hover:bg-[#00ff00]/30 transition-all duration-1000" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-48 h-48 md:w-56 md:h-56 border border-[#00ff00]/50 p-2 overflow-hidden bg-black transform-gpu"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute inset-0 bg-[#00ff00]/5 z-10 animate-pulse" />
              <img src={profileImage} className="w-full h-full object-cover grayscale brightness-110 contrast-150 scale-110 group-hover:scale-125 transition-transform duration-[3s] transform-gpu" loading="lazy" />
              <div className="absolute bottom-2 left-2 bg-[#00ff00] text-black text-[9px] px-2 py-0.5 font-black uppercase z-20">Identity Verified</div>
            </motion.div>
          </div>

          <div className="space-y-6 md:space-y-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full animate-ping" />
                <span className="text-[#00ff00] text-xs font-black tracking-[0.5em] uppercase">Security Level 10</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#00ff00] tracking-tighter uppercase glitch-text" data-text="AZIZBEK">AZIZBEK</h2>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {socialButtons.map((btn, i) => (
                <motion.a 
                  key={i} 
                  href={btn.link} 
                  whileHover={{ x: 10, backgroundColor: "rgba(0,255,0,0.1)" }}
                  className="flex items-center justify-between border border-[#00ff00]/10 p-4 md:p-5 group transition-all transform-gpu"
                  style={{ willChange: 'transform, background-color' }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#00ff00]/30 text-[10px]">0{i+1}</span>
                    <span className="text-[#00ff00] text-[11px] font-bold tracking-widest">{btn.label.toUpperCase()}</span>
                  </div>
                  <div className="text-[#00ff00]/40 group-hover:text-[#00ff00] transition-transform duration-500 group-hover:rotate-90 transform-gpu">
                    {btn.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="p-6 md:p-16 lg:p-24 space-y-12 md:space-y-20 flex flex-col justify-center relative bg-black">
          <div className="space-y-6 md:space-y-10 relative">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#00ff00]/40 text-[10px] font-mono">
                <span className="w-10 h-[1px] bg-[#00ff00]/40" />
                CORE_MODULE_ACTIVE
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-black tracking-tighter text-[#00ff00] uppercase leading-[0.8] relative">
                NEURAL <br /> 
                <span className="text-transparent border-t-2 border-b-2 border-[#00ff00]/20 bg-clip-text -webkit-text-stroke-[1px] -webkit-text-stroke-[#00ff00] opacity-80">ENGINEER</span>
              </h1>
            </div>

            <p className="text-[#00ff00]/60 text-base md:text-2xl font-mono max-w-2xl leading-relaxed italic border-l-4 border-[#00ff00]/40 pl-6 md:pl-8">
              &gt; Architecting high-performance distributed systems with absolute precision and cryptographic security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 md:p-10 border border-[#00ff00]/30 bg-black/60 relative group overflow-hidden transform-gpu"
              style={{ willChange: 'transform' }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#00ff00]/30 z-[20] shadow-[0_0_10px_#00ff00] opacity-0 group-hover:opacity-100" style={{ animation: 'laser-scan 4s linear infinite' }} />
              <div className="absolute inset-0 bg-[#00ff00]/[0.02] pointer-events-none" />
              <div className="absolute -top-[1px] -left-[1px] w-12 h-12 border-t-2 border-l-2 border-[#00ff00]" />
              <div className="absolute -bottom-[1px] -right-[1px] w-12 h-12 border-b-2 border-r-2 border-[#00ff00]/40" />
              
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="space-y-1">
                  <h4 className="text-[#00ff00] text-xs font-black uppercase tracking-[0.3em]">Main Dossier</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00ff00] animate-pulse" />
                    <span className="text-[8px] text-[#00ff00]/60 uppercase tracking-widest font-mono">Status: Authorized</span>
                  </div>
                </div>
                <Sparkles size={16} className="text-[#00ff00] animate-pulse" />
              </div>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 font-mono">
                <div className="flex justify-between border-b border-[#00ff00]/10 pb-2">
                  <span className="text-[9px] text-[#00ff00]/40 uppercase">Architecture:</span>
                  <span className="text-[9px] text-[#00ff00]">DISTRIBUTED_CORE</span>
                </div>
                <div className="flex justify-between border-b border-[#00ff00]/10 pb-2">
                  <span className="text-[9px] text-[#00ff00]/40 uppercase">Security:</span>
                  <span className="text-[9px] text-[#00ff00]">AES-256-GCM</span>
                </div>
                <div className="flex justify-between border-b border-[#00ff00]/10 pb-2">
                  <span className="text-[9px] text-[#00ff00]/40 uppercase">Uptime:</span>
                  <span className="text-[9px] text-[#00ff00]">99.999%</span>
                </div>
              </div>

              <p className="text-[10px] text-[#00ff00]/50 font-mono leading-relaxed mb-6 md:mb-8">
                &gt; Accessing encrypted technical payload. Validating biometric signatures... Success.
              </p>

              <a href="/Azizbek_Mirzavaliyev.pdf" download className="relative block w-full text-center py-4 md:py-6 bg-transparent text-[#00ff00] font-black text-xs group-hover:bg-[#00ff00] group-hover:text-black border border-[#00ff00] transition-all duration-500 overflow-hidden uppercase tracking-[0.2em] transform-gpu">
                <span className="relative z-10">Download_Payload.bin</span>
                <div className="absolute inset-0 bg-[#00ff00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 transform-gpu" />
              </a>
            </motion.div>

            {/* Enhanced Terminal/Metrics Section */}
            <div className="space-y-6 md:space-y-8 flex flex-col justify-between">
              <div className="border border-[#00ff00]/20 bg-black/40 p-6 md:p-8 relative overflow-hidden flex-1">
                <div className="flex items-center justify-between border-b border-[#00ff00]/20 pb-4 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#00ff00] animate-ping" />
                    <span className="text-[#00ff00]/60 text-[9px] font-mono uppercase tracking-[0.3em]">Live Terminal</span>
                  </div>
                  <div className="text-[9px] text-[#00ff00]/30 font-mono">PORT: 8080</div>
                </div>
                
                <div className="space-y-3 md:space-y-4 font-mono text-[10px] leading-relaxed">
                  <div className="text-[#00ff00]/80 flex gap-2">
                    <span className="text-[#00ff00]/30">root@core:~$</span>
                    <span>initiate --scan</span>
                  </div>
                  <div className="text-[#00ff00]/60 flex gap-2">
                    <span className="text-[#00ff00]/30">&gt;</span>
                    <span className="text-[#00ff00] terminal-cursor">Scanning network nodes... [OK]</span>
                  </div>
                  <div className="text-[#00ff00]/60 flex gap-2">
                    <span className="text-[#00ff00]/30">&gt;</span>
                    <span>Establishing secure tunnel... [OK]</span>
                  </div>
                  <div className="text-[#00ff00]/30 text-[9px] space-y-1 pt-2 md:pt-4 opacity-50">
                    <div>[{new Date().toLocaleTimeString()}] INBOUND_CONNECTION: 192.168.1.42</div>
                    <div>[{new Date().toLocaleTimeString()}] HANDSHAKE_PROTOCOL: COMPLETED</div>
                    <div className="animate-pulse">[{new Date().toLocaleTimeString()}] LISTENING_FOR_PAYLOAD...</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 md:p-6 border border-[#00ff00]/10 bg-[#00ff00]/5 group hover:bg-[#00ff00]/10 transition-colors transform-gpu">
                  <div className="text-[#00ff00]/40 text-[9px] uppercase tracking-widest mb-1 md:mb-2">CPU_LOAD</div>
                  <div className="text-[#00ff00] text-xl md:text-2xl font-black tracking-tighter">2.4<span className="text-xs ml-1 opacity-50">%</span></div>
                </div>
                <div className="p-4 md:p-6 border border-[#00ff00]/10 bg-[#00ff00]/5 group hover:bg-[#00ff00]/10 transition-colors transform-gpu">
                  <div className="text-[#00ff00]/40 text-[9px] uppercase tracking-widest mb-1 md:mb-2">LATENCY</div>
                  <div className="text-[#00ff00] text-xl md:text-2xl font-black tracking-tighter">12<span className="text-xs ml-1 opacity-50">ms</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Security Status Dashboard */}
        <div className="lg:col-span-2 p-6 md:p-12 lg:p-20 border-t border-[#00ff00]/30 bg-[#001100]/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.05),transparent)] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex justify-center items-center relative py-8 overflow-hidden">
              <div className="absolute inset-0 bg-[#00ff00]/10 blur-[150px] animate-pulse" />
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/files-blob/public/assets/bot_greenprint-H9JtPdDs77kivcY7EdoYWFriVul1yT.gif" 
                alt="Security Bot"
                className="w-full h-auto max-w-[320px] md:max-w-[450px] relative z-10 brightness-110 contrast-125 drop-shadow-[0_0_60px_rgba(0,255,0,0.3)] transform-gpu"
                loading="lazy"
              />
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-4 bg-[#00ff00]/20 blur-3xl animate-pulse" />
            </div>
          </div>
        </div>



      </motion.div>
    </div>
  );
};

export default memo(HackerTheme);
