import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Magnetic Dot ─── */
function MagneticDot({ isCurrent, idx }) {
  const dotRef = useRef(null);
  const magnetStrength = 0.4;

  const handleMouseMove = useCallback((e) => {
    const dot = dotRef.current;
    if (!dot) return;
    const rect = dot.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * magnetStrength;
    const dy = (e.clientY - cy) * magnetStrength;
    gsap.to(dot, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(dotRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
  }, []);

  return (
    <div
      className="exp-dot"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
        cursor: 'pointer',
      }}
    >
      <div
        ref={dotRef}
        style={{
          width: isCurrent ? '44px' : '36px',
          height: isCurrent ? '44px' : '36px',
          borderRadius: '50%',
          background: isCurrent
            ? 'linear-gradient(135deg, #ea580c, #f97316)'
            : '#FFFFFF',
          border: isCurrent ? 'none' : '3px solid #E5E5E5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.3s, background 0.3s',
          boxShadow: isCurrent
            ? '0 0 0 8px rgba(234,88,12,0.12), 0 0 30px rgba(234,88,12,0.2), 0 4px 20px rgba(0,0,0,0.1)'
            : '0 2px 10px rgba(0,0,0,0.06)',
          position: 'relative',
        }}
      >
        {/* Inner icon */}
        {isCurrent ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: '#D4D4D4',
          }}></div>
        )}
        {/* Pulse rings for current */}
        {isCurrent && (
          <>
            <span className="exp-pulse-1" style={{
              position: 'absolute', inset: '-6px', borderRadius: '50%',
              border: '2px solid rgba(234,88,12,0.4)', opacity: 0,
            }}></span>
            <span className="exp-pulse-2" style={{
              position: 'absolute', inset: '-6px', borderRadius: '50%',
              border: '2px solid rgba(234,88,12,0.3)', opacity: 0,
            }}></span>
          </>
        )}
      </div>
      {/* Step number badge */}
      <div className="exp-step-num" style={{
        position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)',
        fontSize: '11px', fontWeight: 700, color: isCurrent ? '#ea580c' : '#BABABA',
        fontFamily: 'var(--font-mono, monospace)', letterSpacing: '1px',
        whiteSpace: 'nowrap',
        backgroundColor: '#FAFAFA',
        padding: '2px 8px',
        borderRadius: '4px',
        zIndex: 6,
      }}>
        0{idx + 1}
      </div>
    </div>
  );
}

/* ─── Timeline Card ─── */
function TimelineCard({ children, align }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rX = ((y - cy) / cy) * -6;
    const rY = ((x - cx) / cx) * 6;
    gsap.to(card, { rotateX: rX, rotateY: rY, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    if (glowRef.current) {
      gsap.to(glowRef.current, { x: x - 120, y: y - 120, opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.4)', overwrite: 'auto' });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '28px 32px',
        borderRadius: '20px',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(250,245,240,0.95))'
          : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(12px)',
        border: isHovered ? '1px solid rgba(234,88,12,0.2)' : '1px solid rgba(0,0,0,0.05)',
        boxShadow: isHovered
          ? '0 20px 50px rgba(234,88,12,0.08), 0 8px 20px rgba(0,0,0,0.04)'
          : '0 2px 10px rgba(0,0,0,0.02)',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      {/* Cursor glow orb */}
      <div ref={glowRef} style={{
        position: 'absolute', width: '240px', height: '240px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', opacity: 0, zIndex: 0, filter: 'blur(20px)',
      }}></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Timeline Item Row ─── */
function TimelineItem({ exp, idx, isLast }) {
  return (
    <div className="exp-item" style={{
      display: 'flex', alignItems: 'center',
      marginBottom: isLast ? '0' : '80px',
      position: 'relative', zIndex: 1, perspective: '1000px',
    }}>

      {/* Left Column */}
      <div className="exp-left" style={{ flex: 1, paddingRight: '56px', textAlign: 'right' }}>
        <TimelineCard align="right">
          {/* Date badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 14px', borderRadius: '999px', marginBottom: '12px',
            background: exp.current
              ? 'linear-gradient(135deg, rgba(234,88,12,0.12), rgba(249,115,22,0.08))'
              : 'rgba(0,0,0,0.04)',
            border: exp.current ? '1px solid rgba(234,88,12,0.2)' : '1px solid transparent',
          }}>
            {exp.current && (
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                backgroundColor: '#ea580c', display: 'inline-block',
                animation: 'blink 1.5s ease-in-out infinite',
              }}></span>
            )}
            <span style={{
              fontSize: '12px', fontWeight: 600,
              color: exp.current ? '#ea580c' : '#999',
              fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.5px',
            }}>{exp.date}</span>
          </div>
          <h3 style={{
            fontSize: '22px', fontWeight: 700, color: '#1B1B3A',
            marginBottom: '4px', lineHeight: 1.3,
          }}>{exp.company}</h3>
        </TimelineCard>
      </div>

      {/* Center Dot */}
      <MagneticDot isCurrent={exp.current} idx={idx} />

      {/* Connecting Arms */}
      <div className="exp-arm-left" style={{
        position: 'absolute', left: 'calc(50% - 40px)', top: '50%',
        width: '40px', height: '2px',
        background: exp.current
          ? 'linear-gradient(to left, rgba(234,88,12,0.4), transparent)'
          : 'linear-gradient(to left, rgba(0,0,0,0.08), transparent)',
        transformOrigin: 'right center', zIndex: 3,
      }}></div>
      <div className="exp-arm-right" style={{
        position: 'absolute', left: 'calc(50% + 0px)', top: '50%',
        width: '40px', height: '2px',
        background: exp.current
          ? 'linear-gradient(to right, rgba(234,88,12,0.4), transparent)'
          : 'linear-gradient(to right, rgba(0,0,0,0.08), transparent)',
        transformOrigin: 'left center', zIndex: 3,
      }}></div>

      {/* Right Column */}
      <div className="exp-right" style={{ flex: 1, paddingLeft: '56px', textAlign: 'left' }}>
        <TimelineCard align="left">
          <h3 style={{
            fontSize: '22px', fontWeight: 700, color: '#1B1B3A',
            marginBottom: '10px', lineHeight: 1.3,
          }}>{exp.role}</h3>
          <p style={{
            color: '#666', fontSize: '14px', lineHeight: '1.7',
            maxWidth: '320px',
          }}>{exp.desc}</p>
        </TimelineCard>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Experience() {
  const sectionRef = useRef(null);
  const lineTrackRef = useRef(null);
  const lineFillRef = useRef(null);

  const experiences = [
    { id: 1, company: 'Assistant Professor', date: '2024 – Present', role: 'Thakur College of Science and Commerce', desc: 'Department of AI & ML. Courses Taught: Artificial Intelligence, Machine Learning (ML), Deep Learning (DL).', current: true },
    { id: 2, company: 'M.Sc Information Technology', date: '2022 – 2024', role: 'Mumbai University', desc: 'Completed Master\'s from Thakur College of Science and Commerce, Mumbai.', current: false },
    { id: 3, company: 'B.Sc Information Technology', date: '2014 – 2017', role: 'Mumbai University', desc: 'Completed Bachelor\'s from Thakur College of Science and Commerce, Mumbai.', current: false },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Gradient fill scrub on the center line ── */
      gsap.fromTo(lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end: 'bottom 75%',
            scrub: 0.6,
          },
        }
      );

      /* ── Heading reveal ── */
      gsap.from('.exp-heading h2', {
        y: 50, opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
      });

      /* ── Subtitle ── */
      gsap.from('.exp-subtitle', {
        y: 20, opacity: 0, duration: 0.7, delay: 0.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.exp-heading', start: 'top 85%' },
      });

      /* ── Staggered timeline items ── */
      const items = document.querySelectorAll('.exp-item');
      items.forEach((item, i) => {
        const leftCard = item.querySelector('.exp-left');
        const rightCard = item.querySelector('.exp-right');
        const dot = item.querySelector('.exp-dot');
        const armL = item.querySelector('.exp-arm-left');
        const armR = item.querySelector('.exp-arm-right');
        const stepNum = item.querySelector('.exp-step-num');

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 82%' },
        });

        // Dot scale-in
        tl.from(dot, { scale: 0, duration: 0.5, ease: 'back.out(3)' }, 0);

        // Step number
        if (stepNum) {
          tl.from(stepNum, { y: 10, opacity: 0, duration: 0.4, ease: 'power2.out' }, 0.15);
        }

        // Arms grow outward
        tl.from(armL, { scaleX: 0, duration: 0.4, ease: 'power2.out' }, 0.2);
        tl.from(armR, { scaleX: 0, duration: 0.4, ease: 'power2.out' }, 0.2);

        // Cards slide + fade
        tl.from(leftCard, {
          x: -70, opacity: 0, rotateY: 8,
          duration: 0.7, ease: 'power3.out',
        }, 0.25);
        tl.from(rightCard, {
          x: 70, opacity: 0, rotateY: -8,
          duration: 0.7, ease: 'power3.out',
        }, 0.25);
      });

      /* ── Parallax dots (background decoration) ── */
      const decos = document.querySelectorAll('.exp-deco-dot');
      decos.forEach((d) => {
        gsap.to(d, {
          y: () => gsap.utils.random(-40, 40),
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
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

      <div className="relative pt-8 pb-24 bg-[#FAFAFA] section-padding overflow-hidden">

        {/* Decorative floating dots */}
        <div className="exp-deco-dot" style={{ position: 'absolute', top: '15%', left: '8%', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'rgba(234,88,12,0.15)' }}></div>
        <div className="exp-deco-dot" style={{ position: 'absolute', top: '40%', right: '6%', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid rgba(234,88,12,0.15)' }}></div>
        <div className="exp-deco-dot" style={{ position: 'absolute', top: '65%', left: '5%', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(234,88,12,0.1)' }}></div>
        <div className="exp-deco-dot" style={{ position: 'absolute', top: '80%', right: '10%', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.06)' }}></div>
        <div className="exp-deco-dot" style={{ position: 'absolute', top: '25%', right: '15%', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.06)' }}></div>

        <div className="container" style={{ maxWidth: '960px' }}>

          {/* Heading */}
          <div className="exp-heading" style={{
            textAlign: 'center', marginBottom: '20px',
            overflow: 'hidden',
          }}>
            <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-[#1B1B3A]">
              My <span className="text-[#ea580c]">Work Experience</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="exp-subtitle" style={{
            textAlign: 'center', color: '#888', fontSize: '15px',
            maxWidth: '420px', margin: '0 auto 72px', lineHeight: 1.7,
          }}>
            A timeline of academic milestones and professional growth in AI & Machine Learning.
          </p>

          {/* Timeline */}
          <div style={{ position: 'relative' }}>

            {/* Center Track Line */}
            <div ref={lineTrackRef} style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '3px', transform: 'translateX(-50%)',
              backgroundColor: '#ECECEC', borderRadius: '4px', zIndex: 0,
            }}></div>

            {/* Center Gradient Fill Line — scrubbed by scroll */}
            <div ref={lineFillRef} style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '3px', transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, #ea580c, #f97316, #fdba74)',
              borderRadius: '4px', zIndex: 1,
              transformOrigin: 'top center',
            }}></div>

            {experiences.map((exp, idx) => (
              <TimelineItem key={exp.id} exp={exp} idx={idx} isLast={idx === experiences.length - 1} />
            ))}
          </div>

        </div>
      </div>

      {/* Inline keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dotPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .exp-pulse-1 {
          animation: dotPulse 2s ease-out infinite;
        }
        .exp-pulse-2 {
          animation: dotPulse 2s ease-out infinite 0.7s;
        }
      `}} />
    </section>
  );
}
