import React from 'react';

const LiquidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/10 blur-[120px] rounded-full animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-orange-400/10 blur-[120px] rounded-full animate-blob animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-primary-500/10 blur-[100px] rounded-full animate-blob animation-delay-4000"></div>
      
      {/* Subtle floating rings/dots for extra texture */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary-600/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-orange-500/20 rounded-full animate-pulse animation-delay-2000"></div>
    </div>
  );
};

export default LiquidBackground;
