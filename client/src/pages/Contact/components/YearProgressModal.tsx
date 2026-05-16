import React, { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface YearProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YearProgressModal({ isOpen, onClose }: YearProgressModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const {
    year,
    daysPassed,
    totalDays,
    daysLeft,
    percentage,
  } = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);
    
    // Calculate total days (handles leap years)
    const msInDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.round((endOfYear.getTime() - startOfYear.getTime()) / msInDay);
    
    // Calculate days passed
    const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / msInDay);
    
    // Calculate remaining
    const daysLeft = totalDays - daysPassed;
    
    // Calculate percentage
    const percentage = ((daysPassed / totalDays) * 100).toFixed(2);
    
    return {
      year: currentYear,
      daysPassed,
      totalDays,
      daysLeft,
      percentage
    };
  }, []);

  // Generate dots array
  const dots = Array.from({ length: totalDays }, (_, i) => i < daysPassed);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotateX: 60, y: 150, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, rotateX: 0, y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.8, rotateX: -30, y: -100, opacity: 0, filter: "blur(20px)" }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 15, 
              mass: 1.2,
            }}
            style={{ transformPerspective: 1200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[600px] aspect-[4/5] sm:aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] border border-white/10 bg-[#050810]"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-blue-600/20 blur-[120px] rounded-full transform -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full transform translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[100] p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10 flex flex-col h-full p-8 sm:p-12"
            >
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                className="flex justify-between items-end mb-8"
              >
                <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                  {year} in Days
                </h2>
                <div className="text-xl sm:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 tracking-wide">
                  {percentage}%
                </div>
              </motion.div>

              {/* Dots Grid */}
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-wrap gap-[3px] sm:gap-1 md:gap-[5px] justify-center content-center w-full max-w-[500px]">
                  {dots.map((isPassed, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0, filter: "blur(5px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.5 + (index * 0.001),
                        ease: "easeOut"
                      }}
                      className={`
                        w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] md:w-[10px] md:h-[10px] rounded-full
                        ${isPassed 
                          ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' 
                          : 'border border-white/20 bg-transparent'
                        }
                      `}
                    />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 flex justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 20 }}
                  className="text-2xl sm:text-3xl font-medium text-white/90 tracking-wider"
                >
                  {daysLeft} Days Left
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
