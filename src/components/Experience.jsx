import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidBackground from './LiquidBackground';

gsap.registerPlugin(ScrollTrigger);

function TimelineItem({ exp, idx, isLast }) {
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const leftGlowRef = useRef(null);
  const rightGlowRef = useRef(null);
  const [isHoveredLeft, setIsHoveredLeft] = useState(false);
  const [isHoveredRight, setIsHoveredRight] = useState(false);

  const handleMouseMove = (e, cardRef, glowRef) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: x - 100,
        y: y - 100,
        opacity: 0.15,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleMouseLeave = (cardRef, glowRef, setHoverState) => {
    setHoverState(false);
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto'
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.4
      });
    }
  };

  return (
    <div className={`exp-item flex flex-col md:flex-row items-start md:items-center relative z-10 perspective-[800px] ${isLast ? '' : 'mb-16 md:mb-[60px]'}`}>
      
      {/* Left Column (Desktop Only) / Top Column (Mobile) */}
      <div className="exp-left w-full md:flex-1 md:pr-[60px] md:text-right pl-12 md:pl-0 mb-4 md:mb-0">
        <div
          ref={leftCardRef}
          onMouseMove={(e) => handleMouseMove(e, leftCardRef, leftGlowRef)}
          onMouseEnter={() => setIsHoveredLeft(true)}
          onMouseLeave={() => handleMouseLeave(leftCardRef, leftGlowRef, setIsHoveredLeft)}
          className={`p-6 md:p-[24px_28px] rounded-2xl transition-all duration-300 relative overflow-hidden transform-style-3d cursor-default ${isHoveredLeft ? 'bg-[#FAFAFA] border border-primary-600/15 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'bg-transparent border border-transparent'}`}
        >
          {/* Glow Orb */}
          <div ref={leftGlowRef} className="absolute w-[200px] h-[200px] rounded-full bg-gradient-radial from-primary-600/50 to-transparent pointer-events-none opacity-0 z-0 blur-[20px]"></div>
          <h3 className="text-xl md:text-2xl font-bold text-[#1B1B3A] mb-2 relative z-10">{exp.company}</h3>
          <p className="text-slate-400 text-xs md:text-sm font-medium relative z-10">{exp.date}</p>
        </div>
      </div>

      {/* Center/Left Dot */}
      <div className="exp-dot absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 -translate-x-0 md:-ml-4 w-8 h-8 rounded-full bg-white border-2 border-primary-600 flex items-center justify-center z-20 transition-all duration-300 shadow-none">
        <div className={`w-4 h-4 rounded-full ${exp.current ? 'bg-primary-600' : 'bg-transparent'}`}></div>
        {/* Pulse ring for current */}
        {exp.current && (
          <div className="absolute w-8 h-8 rounded-full border-2 border-primary-600 animate-[dotPulse_2s_ease-out_infinite] opacity-0"></div>
        )}
      </div>

      {/* Right Column */}
      <div className="exp-right w-full md:flex-1 md:pl-[60px] text-left pl-12 md:pl-0">
        <div
          ref={rightCardRef}
          onMouseMove={(e) => handleMouseMove(e, rightCardRef, rightGlowRef)}
          onMouseEnter={() => setIsHoveredRight(true)}
          onMouseLeave={() => handleMouseLeave(rightCardRef, rightGlowRef, setIsHoveredRight)}
          className={`p-6 md:p-[24px_28px] rounded-2xl transition-all duration-300 relative overflow-hidden transform-style-3d cursor-default ${isHoveredRight ? 'bg-[#FAFAFA] border border-primary-600/15 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'bg-transparent border border-transparent'}`}
        >
           {/* Glow Orb */}
           <div ref={rightGlowRef} className="absolute w-[200px] h-[200px] rounded-full bg-gradient-radial from-primary-600/50 to-transparent pointer-events-none opacity-0 z-0 blur-[20px]"></div>
          <h3 className="text-xl md:text-2xl font-bold text-[#1B1B3A] mb-2 relative z-10">{exp.role}</h3>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm relative z-10">{exp.desc}</p>
        </div>
      </div>

    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  const experiences = [
    { id: 1, company: 'Assistant Professor', date: '2024 - Present', role: 'Thakur College of Science and Commerce', desc: 'Department of AI & ML. Courses Taught: Artificial Intelligence, Machine Learning (ML), Deep Learning (DL).', current: true },
    { id: 2, company: 'M.Sc Information Technology', date: '2022 - 2024', role: 'Mumbai University', desc: 'Completed Master\'s from Thakur College of Science and Commerce, Mumbai.', current: false },
    { id: 3, company: 'B.Sc Information Technology', date: '2014 - 2017', role: 'Mumbai University', desc: 'Completed Bachelor\'s from Thakur College of Science and Commerce, Mumbai.', current: false }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the dashed line growing downward
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.5,
          }
        }
      );

      // Animate heading
      gsap.from('.exp-heading', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp-heading',
          start: 'top 85%',
        }
      });

      // Animate each timeline item
      const items = document.querySelectorAll('.exp-item');
      items.forEach((item, idx) => {
        const leftCol = item.querySelector('.exp-left');
        gsap.from(leftCol, {
          opacity: 0,
          x: -60,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        });

        const rightCol = item.querySelector('.exp-right');
        gsap.from(rightCol, {
          opacity: 0,
          x: 60,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        });

        const dot = item.querySelector('.exp-dot');
        gsap.from(dot, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(3)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative z-20 bg-[#0F0F11]">
      
      {/* Dynamic SVG Wave Divider */}
      <div className="w-full overflow-hidden leading-[0] bg-[#0F0F11]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[120px] block" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FAFAFA" d="M0,60L48,65.3C96,71,192,82,288,78.2C384,75,480,57,576,50C672,43,768,46,864,56.3C960,67,1056,84,1152,82.2C1248,80,1344,60,1392,50L1440,40L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>

      <div className="relative pt-4 pb-16 bg-[#FAFAFA] py-24 overflow-hidden">
        <LiquidBackground />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          
          <h2 className="exp-heading text-4xl sm:text-5xl font-bold text-[#1B1B3A] text-center mb-16 md:mb-20 tracking-tight">
            My <span className="text-primary-600">Work Experience</span>
          </h2>

          <div className="relative">
          
          {/* Center/Left Dashed Line — animated with scaleY */}
          <div ref={lineRef} className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-slate-200 md:-ml-[1px] origin-top z-0"></div>

          {experiences.map((exp, idx) => (
            <TimelineItem key={exp.id} exp={exp} idx={idx} isLast={idx === experiences.length - 1} />
          ))}

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dotPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}} />
      </div>
    </section>
  );
}

