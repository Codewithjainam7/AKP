import React from 'react';

const LiquidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base subtle tint to ensure matching everywhere */}
      <div className="absolute inset-0 bg-[#FAFAFA]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/40 via-transparent to-primary-50/20"></div>

      {/* Animated Blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[65%] h-[65%] bg-[#ea580c]/[0.1] blur-[100px] rounded-full animate-blob"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[75%] h-[75%] bg-[#c2410c]/[0.12] blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
      <div className="absolute top-[30%] right-[-5%] w-[55%] h-[55%] bg-[#f97316]/[0.08] blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[45%] h-[45%] bg-[#ea580c]/[0.08] blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      
      {/* Subtle floating rings/dots for extra texture */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#ea580c]/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-[#c2410c]/20 rounded-full animate-pulse animation-delay-2000"></div>
    </div>
  );
};

export default LiquidBackground;
