import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    <div className="exp-item" style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: isLast ? '0' : '60px',
      position: 'relative',
      zIndex: 1,
      perspective: '800px'
    }}>
      
      {/* Left Column */}
      <div className="exp-left" style={{ 
        flex: 1, 
        paddingRight: '60px', 
        textAlign: 'right' 
      }}>
        <div
          ref={leftCardRef}
          onMouseMove={(e) => handleMouseMove(e, leftCardRef, leftGlowRef)}
          onMouseEnter={() => setIsHoveredLeft(true)}
          onMouseLeave={() => handleMouseLeave(leftCardRef, leftGlowRef, setIsHoveredLeft)}
          style={{
            padding: '24px 28px',
            borderRadius: '16px',
            backgroundColor: isHoveredLeft ? '#FAFAFA' : 'transparent',
            border: isHoveredLeft ? '1px solid rgba(255,119,51,0.15)' : '1px solid transparent',
            transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
            boxShadow: isHoveredLeft ? '0 8px 30px rgba(0,0,0,0.06)' : 'none',
            position: 'relative',
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            cursor: 'default'
          }}
        >
          {/* Glow Orb */}
          <div ref={leftGlowRef} style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,119,51,0.5) 0%, transparent 70%)',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 0,
            filter: 'blur(20px)'
          }}></div>
          <h3 style={{ fontSize: '24px', color: '#1B1B3A', marginBottom: '8px', position: 'relative', zIndex: 1 }}>{exp.company}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500', position: 'relative', zIndex: 1 }}>{exp.date}</p>
        </div>
      </div>

      {/* Center Dot */}
      <div className="exp-dot" style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        border: '2px solid var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        boxShadow: exp.current ? '0 0 0 6px rgba(255, 119, 51, 0.12), 0 0 20px rgba(255, 119, 51, 0.15)' : 'none',
        transition: 'box-shadow 0.3s ease'
      }}>
        <div style={{
           width: '16px',
           height: '16px',
           borderRadius: '50%',
           backgroundColor: exp.current ? 'var(--primary)' : 'transparent',
        }}></div>
        {/* Pulse ring for current */}
        {exp.current && (
          <div style={{
            position: 'absolute',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid var(--primary)',
            animation: 'dotPulse 2s ease-out infinite',
            opacity: 0
          }}></div>
        )}
      </div>

      {/* Right Column */}
      <div className="exp-right" style={{ 
        flex: 1, 
        paddingLeft: '60px',
        textAlign: 'left'
      }}>
        <div
          ref={rightCardRef}
          onMouseMove={(e) => handleMouseMove(e, rightCardRef, rightGlowRef)}
          onMouseEnter={() => setIsHoveredRight(true)}
          onMouseLeave={() => handleMouseLeave(rightCardRef, rightGlowRef, setIsHoveredRight)}
          style={{
            padding: '24px 28px',
            borderRadius: '16px',
            backgroundColor: isHoveredRight ? '#FAFAFA' : 'transparent',
            border: isHoveredRight ? '1px solid rgba(255,119,51,0.15)' : '1px solid transparent',
            transition: 'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
            boxShadow: isHoveredRight ? '0 8px 30px rgba(0,0,0,0.06)' : 'none',
            position: 'relative',
            overflow: 'hidden',
            transformStyle: 'preserve-3d',
            cursor: 'default'
          }}
        >
           {/* Glow Orb */}
           <div ref={rightGlowRef} style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,119,51,0.5) 0%, transparent 70%)',
            pointerEvents: 'none',
            opacity: 0,
            zIndex: 0,
            filter: 'blur(20px)'
          }}></div>
          <h3 style={{ fontSize: '24px', color: '#1B1B3A', marginBottom: '8px', position: 'relative', zIndex: 1 }}>{exp.role}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', maxWidth: '300px', position: 'relative', zIndex: 1 }}>{exp.desc}</p>
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

      <div className="relative pt-4 pb-16 bg-[#FAFAFA] section-padding">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <h2 className="exp-heading" style={{ fontSize: '48px', color: '#1B1B3A', textAlign: 'center', marginBottom: '80px', letterSpacing: '-1px' }}>
            My <span style={{ color: 'var(--primary)' }}>Work Experience</span>
          </h2>

          <div style={{ position: 'relative' }}>
          
          {/* Center Dashed Line — animated with scaleY */}
          <div ref={lineRef} style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            borderLeft: '2px dashed #E5E5E5',
            transform: 'translateX(-50%)',
            transformOrigin: 'top center',
            zIndex: 0
          }}></div>

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
