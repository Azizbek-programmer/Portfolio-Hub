import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ProfileAura = () => {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="w-48 h-48 md:w-64 md:h-64 bg-blue-500 rounded-full blur-[60px]"
        style={{ willChange: 'transform, opacity' }}
      />
    </div>
  );
};

export default memo(ProfileAura);
