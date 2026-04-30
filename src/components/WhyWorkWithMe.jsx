import React from 'react';
import { motion } from 'framer-motion';
import GSAPTextReveal from './GSAPTextReveal';

export default function WhyWorkWithMe() {
  return (
    <section id="hire" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
        
        {/* Left Side Avatar */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full lg:w-[45%] h-[400px] sm:h-[550px] flex items-center justify-center"
        >
          
          {/* Vertical Name Along Left Edge - Hidden on small mobile, visible on sm+ */}
          <div className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] sm:text-[14px] font-extrabold tracking-[4px] sm:tracking-[8px] text-slate-200 uppercase z-0 whitespace-nowrap select-none hidden sm:block">
            AMIT KUMAR PANDEY
          </div>

          {/* Large "01" Behind Photo */}
          <div className="absolute right-4 sm:right-10 top-0 sm:top-8 text-[120px] sm:text-[180px] font-black text-slate-50 leading-none z-0 select-none font-serif">
            01
          </div>

          {/* Reverse L-Border — Top & Right */}
          <div className="absolute w-[260px] h-[340px] sm:w-[360px] sm:h-[440px] right-6 sm:right-10 top-10 sm:top-14 z-0 border-t-4 border-r-4 border-primary-600"></div>

          {/* Main Photo */}
          <div className="w-[240px] h-[320px] sm:w-[340px] sm:h-[420px] relative z-10 overflow-hidden bg-white shadow-2xl">
            <img 
              src="/amit_sir_photo.png" 
              alt="Amit Kumar" 
              className="w-full h-full object-cover block" 
            />
          </div>

          {/* Caption Line Below Photo */}
          <div className="absolute bottom-6 sm:bottom-10 left-10 sm:left-20 right-10 sm:right-20 flex items-center gap-3 z-20">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-[8px] sm:text-[10px] font-bold tracking-[2px] sm:tracking-[3px] text-slate-400 uppercase whitespace-nowrap">Researcher · Innovator</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
        </motion.div>

        {/* Right Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:flex-1 lg:pl-16 text-center lg:text-left"
        >
          <div className="text-4xl sm:text-5xl lg:text-6xl text-[#1B1B3A] mb-8 tracking-tight font-bold">
            <GSAPTextReveal text="Why Hire me?" />
          </div>
          
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
            To secure a challenging and growth-oriented position in a dynamic organization where I can apply my knowledge of Artificial Intelligence, data science, and soft computing to real-world problem solving.
          </p>

          <div className="flex justify-center lg:justify-start gap-12 sm:gap-20 mb-10">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#1B1B3A] mb-1">7+</div>
              <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-widest">Patents</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-[#1B1B3A] mb-1">16+</div>
              <div className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-widest">Publications</div>
            </div>
          </div>

          <a href="#contact" className="inline-flex items-center justify-center bg-[#1B1B3A] hover:bg-primary-600 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            Hire me
          </a>
        </motion.div>

      </div>
    </section>
  );
}
