import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import { getDatabase } from '../data/dbHelper';

function TimelineCard({ exp, idx }) {
  const cardRef = useRef(null);
  const isEven = idx % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    
    gsap.fromTo(el,
      { 
        opacity: 0, 
        x: isEven ? -50 : 50, 
        scale: 0.9,
        rotateY: isEven ? 10 : -10 
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [isEven]);

  return (
    <div className={`relative flex items-center justify-between w-full mb-20 lg:mb-32 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* Timeline Node */}
      <div className="absolute left-8 lg:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20">
        <div className={`w-6 h-6 rounded-full border-4 border-[#0F0F11] shadow-[0_0_20px_rgba(234,88,12,0.5)] flex items-center justify-center transition-all duration-500 ${exp.current ? 'bg-primary-500 scale-125' : 'bg-slate-700 scale-100'}`}>
          {exp.current && <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-25" />}
        </div>
      </div>

      {/* Card Content */}
      <div ref={cardRef} className="w-full lg:w-[45%] ml-16 lg:ml-0">
        <div className="group relative p-8 rounded-[40px] bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-primary-500/30 transition-all duration-700 hover:bg-white/[0.05] hover:shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden">
          {/* Animated Gradient Border Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${exp.type === 'work' ? 'bg-primary-500/10 text-primary-500' : 'bg-blue-500/10 text-blue-500'}`}>
                  {exp.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {exp.date}
                  </span>
                  {exp.current && (
                    <span className="text-[9px] font-bold text-primary-500 uppercase tracking-tighter animate-pulse">
                      Currently Active
                    </span>
                  )}
                </div>
              </div>
              <Sparkles size={16} className="text-white/10 group-hover:text-primary-500/40 transition-colors duration-700" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight group-hover:text-primary-400 transition-colors duration-500" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
              {exp.role}
            </h3>
            <p className="text-primary-500/80 font-bold text-sm mb-6 flex items-center gap-2">
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              {exp.company}
            </p>
            
            <p className="text-slate-400 leading-relaxed mb-8 text-sm sm:text-base">
              {exp.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {(exp.tags || []).map(tag => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-slate-500 text-[10px] font-bold uppercase tracking-wider group-hover:border-primary-500/20 group-hover:text-slate-300 transition-all duration-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for desktop layout */}
      <div className="hidden lg:block lg:w-[45%]" />
    </div>
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const containerRef = useRef(null);
  const lineFillRef = useRef(null);

  // Load experiences from db reactively
  useEffect(() => {
    const db = getDatabase();
    setExperiences(db?.experiences || []);
  }, []);

  useEffect(() => {
    if (experiences.length === 0) return;

    const ctx = gsap.context(() => {
      // Timeline Line Progress
      gsap.fromTo(lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          }
        }
      );

      // Header Animation
      gsap.from(".exp-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section id="career" className="relative bg-[#0F0F11] py-32 overflow-hidden" ref={containerRef}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-32 exp-header">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Calendar size={14} />
            Career Journey
          </div>
          <h2 className="text-5xl sm:text-7xl font-bold text-white mb-8 tracking-tighter" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
            Experience & <span className="text-primary-500 relative">Education</span>
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A track record of academic excellence and professional innovation in the field of <span className="text-white">Artificial Intelligence</span>.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5" />
          
          {/* Animated Progress Line */}
          <div 
            ref={lineFillRef}
            className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-primary-500 via-primary-600 to-blue-500 origin-top z-10"
          />

          <div className="flex flex-col">
            {experiences.length > 0 ? (
              experiences.map((exp, idx) => (
                <TimelineCard key={exp.id || idx} exp={exp} idx={idx} />
              ))
            ) : (
              <div className="text-center py-20 text-slate-600 text-sm">
                No experience entries yet. Add them from the Admin Dashboard.
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
