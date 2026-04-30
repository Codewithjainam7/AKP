import React from 'react';

const LiquidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base subtle tint to ensure matching everywhere */}
      <div className="absolute inset-0 bg-[#FAFAFA]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-transparent to-primary-50/20"></div>

      {/* Animated Blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-primary-600/[0.04] blur-[120px] rounded-full animate-blob"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-orange-400/[0.05] blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
      <div className="absolute top-[30%] right-[-5%] w-[50%] h-[50%] bg-primary-500/[0.03] blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[40%] h-[40%] bg-orange-300/[0.03] blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      
      {/* Subtle floating rings/dots for extra texture */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary-600/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-orange-500/10 rounded-full animate-pulse animation-delay-2000"></div>
    </div>
  );
};

export default LiquidBackground;
