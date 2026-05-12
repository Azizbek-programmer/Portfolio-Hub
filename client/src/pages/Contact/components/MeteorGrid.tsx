import React, { memo, useMemo } from 'react';
import '../styles/animations.css';

const MeteorGrid = () => {
  const meteors = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 2}s`,
      animationDelay: `${i * 3}s`
    })), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_20%,transparent_100%)]" />
      
      {/* Meteors using CSS animations for 60FPS */}
      {meteors.map((m, i) => (
        <div
          key={i}
          className="meteor"
          style={{
            left: m.left,
            top: m.top,
            animation: `meteor ${m.animationDuration} linear infinite ${m.animationDelay}`
          }}
        />
      ))}
    </div>
  );
};

export default memo(MeteorGrid);
