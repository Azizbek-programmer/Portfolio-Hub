import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This defines how long the animation loader stays on the screen
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onComplete, 800); // Wait for the fade out to finish
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute w-40 h-40 rounded-full border border-primary/20 bg-primary/5 blur-xl"
        ></motion.div>

        {/* SVG Drawing Animation */}
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24 overflow-visible z-10 drop-shadow-[0_0_15px_rgba(var(--primary),0.8)]"
        >
          <motion.path
            d="M 50 10 L 90 90 L 10 90 Z"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </svg>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-8 text-2xl font-display font-bold tracking-[0.2em] text-white/80"
      >
        PORTFOLIO
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-2 text-sm text-primary animate-pulse"
      >
        Initializing amazing experience...
      </motion.p>
    </motion.div>
  );
}
