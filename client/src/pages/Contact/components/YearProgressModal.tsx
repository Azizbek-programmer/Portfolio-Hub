import React, { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, TrendingUp } from "lucide-react";

interface YearProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YearProgressModal({ isOpen, onClose }: YearProgressModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const { year, daysPassed, totalDays, daysLeft, percentage } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);
    const msInDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.round((endOfYear.getTime() - startOfYear.getTime()) / msInDay);
    const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / msInDay);
    const daysLeft = totalDays - daysPassed;
    const percentage = ((daysPassed / totalDays) * 100).toFixed(1);
    return { year: currentYear, daysPassed, totalDays, daysLeft, percentage };
  }, []);

  const dots = Array.from({ length: totalDays }, (_, i) => i < daysPassed);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-[#02040A]/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] // Very smooth, premium Apple-like easing
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[640px] rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] overflow-hidden transform-gpu"
          >
            {/* Ambient Premium Glows inside the card */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full">
              {/* Top Navigation / Close */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs sm:text-sm font-medium tracking-wide">
                  <CalendarDays size={14} />
                  <span>Time Tracking</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 sm:p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-300 transform-gpu active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Main Content (Staggered Entrance) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col flex-1"
              >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 sm:gap-0 mb-10">
                  <div>
                    <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                      Year {year}
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">Visualizing the days that have passed.</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end">
                    <div className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400">
                      {percentage}%
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold uppercase tracking-widest mt-1">
                      <TrendingUp size={12} />
                      Completed
                    </div>
                  </div>
                </div>

                {/* The 365 Grid - Rendered completely static for zero lag, animated entirely via the parent motion.div */}
                <div className="w-full bg-black/20 rounded-2xl p-4 sm:p-6 border border-white/5 shadow-inner">
                  <div className="flex flex-wrap gap-[3px] sm:gap-1 md:gap-[5px] justify-center content-start">
                    {dots.map((isPassed, index) => (
                      <div
                        key={index}
                        className={`
                          w-[4px] h-[4px] sm:w-[6px] sm:h-[6px] md:w-[8px] md:h-[8px] rounded-full transition-all duration-300
                          ${isPassed 
                            ? 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-[0_0_6px_rgba(96,165,250,0.8)] scale-110' 
                            : 'bg-white/10'
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <div className="text-gray-400 text-sm sm:text-base">
                    Passed: <span className="text-white font-medium">{daysPassed} days</span>
                  </div>
                  <div className="text-gray-400 text-sm sm:text-base">
                    Remaining: <span className="text-white font-medium">{daysLeft} days</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
