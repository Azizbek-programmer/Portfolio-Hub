import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock } from "lucide-react";

interface RealTimeClockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YearProgressModal({ isOpen, onClose }: RealTimeClockModalProps) {
  const timeRef = useRef<HTMLSpanElement>(null);
  const msRef = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let animationFrameId: number;

    const updateTime = () => {
      const now = new Date();
      
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

      if (dateRef.current) {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateRef.current.textContent = now.toLocaleDateString('en-US', options);
      }

      animationFrameId = requestAnimationFrame(updateTime);
    };

    // requestAnimationFrame ensures 60/120fps smooth updating without lagging the React render cycle
    animationFrameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-[#02040A]/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[550px] rounded-[2rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] overflow-hidden"
          >
            {/* Ambient Premium Glows inside the card */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 p-8 sm:p-12 flex flex-col items-center">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300 transform-gpu active:scale-95"
              >
                <X size={18} />
              </button>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center w-full"
              >
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-semibold tracking-widest uppercase mb-10 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                  <Clock size={16} />
                  <span>Real-Time Clock</span>
                </div>

                {/* The Clock Display */}
                <div className="flex items-baseline justify-center w-full mt-4 mb-8">
                  <span 
                    ref={timeRef} 
                    className="text-5xl sm:text-7xl md:text-[5.5rem] font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-50 to-blue-200 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    00:00:00
                  </span>
                  <span 
                    ref={msRef} 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tabular-nums text-blue-400 ml-1 sm:ml-2 w-[60px] sm:w-[70px] text-left opacity-80"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    .000
                  </span>
                </div>

                {/* Date */}
                <div 
                  ref={dateRef}
                  className="mt-6 px-6 py-3 rounded-2xl bg-black/40 border border-white/5 text-gray-400 text-sm sm:text-base font-medium tracking-widest uppercase shadow-inner"
                >
                  Loading date...
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
