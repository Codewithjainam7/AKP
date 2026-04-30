import React from 'react';

const LiquidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated Blobs only, no base color to prevent partitions */}
      <div className="absolute top-[-25%] left-[-20%] w-[100%] h-[100%] bg-[#ea580c]/[0.08] blur-[150px] rounded-full animate-blob"></div>
      <div className="absolute bottom-[-25%] right-[-20%] w-[120%] h-[120%] bg-[#c2410c]/[0.1] blur-[180px] rounded-full animate-blob animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[-20%] w-[80%] h-[80%] bg-[#f97316]/[0.07] blur-[140px] rounded-full animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[90%] h-[90%] bg-[#ea580c]/[0.07] blur-[140px] rounded-full animate-blob animation-delay-2000"></div>
      
      {/* Subtle floating dots for extra texture */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#ea580c]/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-[#c2410c]/20 rounded-full animate-pulse animation-delay-2000"></div>
    </div>
  );
};

export default LiquidBackground;
