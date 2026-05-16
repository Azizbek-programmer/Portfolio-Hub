import React, { useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface RealTimeClockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YearProgressModal({ isOpen, onClose }: RealTimeClockModalProps) {
  const timeRef = useRef<HTMLSpanElement>(null);
  const msRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const { year, totalDays, daysPassed, daysLeft, startOfYear, endOfYear } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);
    const msInDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.round((endOfYear.getTime() - startOfYear.getTime()) / msInDay);
    const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / msInDay);
    const daysLeft = totalDays - daysPassed;
    
    return { year: currentYear, totalDays, daysPassed, daysLeft, startOfYear, endOfYear };
  }, []);

  const dots = Array.from({ length: totalDays }, (_, i) => i < daysPassed);

  useEffect(() => {
    if (!isOpen) return;
    let animationFrameId: number;

    const updateTime = () => {
      const now = new Date();
      
      // Update Clock
      if (timeRef.current) {
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeRef.current.textContent = `${hours}:${minutes}:${seconds}`;
      }
      if (msRef.current) {
        const ms = String(now.getMilliseconds()).padStart(3, '0');
        msRef.current.textContent = `.${ms}`;
      }

      // Update Live Percentage with high precision
      if (percentRef.current) {
        const passedMs = now.getTime() - startOfYear.getTime();
        const totalMs = endOfYear.getTime() - startOfYear.getTime();
        const livePercentage = ((passedMs / totalMs) * 100).toFixed(5);
        percentRef.current.textContent = `${livePercentage}%`;
      }

      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen, startOfYear, endOfYear]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-[#030612]/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[600px] rounded-[2rem] bg-[#0a0f1a] border border-blue-500/20 shadow-[0_0_80px_-20px_rgba(59,130,246,0.2)] overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 p-6 sm:p-10 flex flex-col w-full">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300"
              >
                <X size={18} />
              </button>

              {/* 1. The Live Clock (Top Focus) */}
              <div className="flex items-baseline justify-center w-full mb-8">
                <span 
                  ref={timeRef} 
                  className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  00:00:00
                </span>
                <span 
                  ref={msRef} 
                  className="text-xl sm:text-2xl font-bold tabular-nums text-blue-400 ml-1 w-[50px] text-left opacity-90"
                >
                  .000
                </span>
              </div>

              {/* 2. Header & Percentage (Emotional Focus) */}
              <div className="flex justify-between items-end mb-6 w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  {year} in Days
                </h2>
                <div 
                  ref={percentRef}
                  className="text-2xl sm:text-3xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)] tabular-nums"
                >
                  0.00000%
                </div>
              </div>

              {/* 3. The 365 Dots Grid (Visual Representation) */}
              {/* Exact match to the reference image: filled circles vs empty rings */}
              <div className="w-full flex flex-wrap gap-[5px] sm:gap-[6px] justify-start content-start mb-10">
                {dots.map((isPassed, index) => (
                  <div
                    key={index}
                    className={`
                      rounded-full flex-shrink-0
                      ${isPassed 
                        ? 'w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]' 
                        : 'w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] border border-blue-200/30 bg-transparent'
                      }
                    `}
                  />
                ))}
              </div>

              {/* 4. Footer (Days Left Focus) */}
              <div className="flex justify-center w-full mt-auto">
                <div className="text-2xl sm:text-3xl font-medium text-gray-300">
                  <span className="text-white font-bold">{daysLeft}</span> Days Left
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
