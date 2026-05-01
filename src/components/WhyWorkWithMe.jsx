import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Stat Item — editorial style, no cards/icons ─── */
function StatItem({ target, suffix = '+', label }) {
  const numRef = useRef(null);
  const barRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Count up
          gsap.fromTo(el, { innerText: 0 }, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function () {
              el.textContent = Math.floor(this.targets()[0].innerText) + suffix;
            },
          });
          // Accent bar grows
          if (barRef.current) {
            gsap.fromTo(barRef.current,
              { width: '0px' },
              { width: '24px', duration: 0.8, delay: 0.3, ease: 'power3.out' }
            );
          }
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, hasAnimated]);

  return (
    <div style={{ flex: 1 }}>
      {/* Tiny accent bar */}
      <div ref={barRef} style={{
        width: '0px', height: '3px', borderRadius: '2px',
        background: 'linear-gradient(to right, #ea580c, #f97316)',
        marginBottom: '14px',
      }}></div>
      <div ref={numRef} style={{
        fontSize: '40px', fontWeight: 600, color: '#1B1B3A',
        marginBottom: '6px', lineHeight: 1,
        fontFamily: 'var(--font-display, Syne, sans-serif)',
        letterSpacing: '-1px',
      }}>0{suffix}</div>
      <div style={{
        color: '#999', fontSize: '13px', fontWeight: 400,
        letterSpacing: '0.2px',
      }}>{label}</div>
    </div>
  );
}

/* ─── Magnetic Button ─── */
function MagneticButton({ children, href }) {
  const btnRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.3;
    const dy = (e.clientY - cy) * 0.3;
    gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power3.out' });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '15px 40px', borderRadius: '999px',
        background: isHovered
          ? 'linear-gradient(135deg, #ea580c, #f97316)'
          : 'linear-gradient(135deg, #1B1B1B, #333)',
        color: '#FFF', fontSize: '15px', fontWeight: 500,
        textDecoration: 'none', cursor: 'pointer',
        boxShadow: isHovered
          ? '0 8px 30px rgba(234,88,12,0.35)'
          : '0 4px 20px rgba(0,0,0,0.12)',
        transition: 'background 0.4s, box-shadow 0.4s',
        willChange: 'transform',
        letterSpacing: '0.3px',
      }}
    >
      {children}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{
          transition: 'transform 0.3s',
          transform: isHovered ? 'translate(3px, -3px)' : 'translate(0, 0)',
        }}>
        <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
      </svg>
    </a>
  );
}

/* ─── Skill Tag ─── */
function SkillTag({ text, delay }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08, y: -2 }}
      style={{
        display: 'inline-block', padding: '6px 16px',
        borderRadius: '999px', fontSize: '12px', fontWeight: 500,
        color: '#ea580c', border: '1px solid rgba(234,88,12,0.2)',
        background: 'rgba(234,88,12,0.04)',
        cursor: 'default', transition: 'all 0.2s',
        letterSpacing: '0.3px',
      }}
    >
      {text}
    </motion.span>
  );
}

export default function WhyWorkWithMe() {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const glowRef = useRef(null);

  /* ── Cursor glow on photo ── */
  const handlePhotoMouseMove = useCallback((e) => {
    const el = glowRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(el, { x: x - 120, y: y - 120, opacity: 1, duration: 0.3, ease: 'power2.out' });
  }, []);

  const handlePhotoMouseLeave = useCallback(() => {
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  }, []);

  /* ── GSAP Scroll Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on photo container
      gsap.to('.why-photo-wrap', {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Parallax on the "01" number (opposite direction)
      gsap.to('.why-big-num', {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // L-border draw-in
      gsap.from('.why-l-border', {
        scaleX: 0, scaleY: 0,
        transformOrigin: 'top right',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.why-l-border', start: 'top 85%' },
      });

      // Content stagger
      gsap.from('.why-content-item', {
        y: 35, opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.why-content-area', start: 'top 78%' },
      });

      // Vertical name slide in
      gsap.from('.why-vert-name', {
        x: -30, opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.why-vert-name', start: 'top 85%' },
      });

      // Caption line
      gsap.from('.why-caption', {
        scaleX: 0, opacity: 0,
        transformOrigin: 'center center',
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.why-caption', start: 'top 95%' },
      });

      // Grid dots
      gsap.from('.why-grid-dot', {
        scale: 0, opacity: 0,
        stagger: { each: 0.02, from: 'random' },
        duration: 0.4,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.why-grid-pattern', start: 'top 85%' },
      });

      // Floating accent circles
      gsap.to('.why-float-circle', {
        y: -20,
        ease: 'sine.inOut',
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // Photo bottom badge slide up
      gsap.from('.why-photo-badge', {
        y: 30, opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.why-photo-badge', start: 'top 95%' },
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const skills = ['AI/ML', 'Deep Learning', 'Data Science', 'Soft Computing', 'Research'];

  return (
    <section id="hire" ref={sectionRef} className="section-padding" style={{ backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px' }}>

        {/* ─── Left Side: Photo Block ─── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ flex: '0 0 46%', position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* Floating accent circles */}
          <div className="why-float-circle" style={{
            position: 'absolute', right: '-10px', top: '30px',
            width: '18px', height: '18px', borderRadius: '50%',
            border: '2px solid rgba(234,88,12,0.2)', zIndex: 0,
          }}></div>
          <div className="why-float-circle" style={{
            position: 'absolute', left: '40px', top: '60px',
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: 'rgba(234,88,12,0.15)', zIndex: 0,
          }}></div>
          <div className="why-float-circle" style={{
            position: 'absolute', left: '20px', bottom: '80px',
            width: '14px', height: '14px', borderRadius: '50%',
            border: '2px solid rgba(234,88,12,0.12)', zIndex: 0,
          }}></div>

          {/* Vertical Name — NOW ORANGE */}
          <div className="why-vert-name" style={{
            position: 'absolute', left: '-5px', top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            fontSize: '11px', fontWeight: 500, letterSpacing: '8px',
            color: '#ea580c', textTransform: 'uppercase', zIndex: 0,
            whiteSpace: 'nowrap', userSelect: 'none', opacity: 0.5,
            fontFamily: 'var(--font-mono, monospace)',
          }}>AMIT KUMAR PANDEY</div>

          {/* Large "01" */}
          <div className="why-big-num" style={{
            position: 'absolute', right: '5px', top: '15px',
            fontSize: '200px', fontWeight: 300, lineHeight: 1,
            background: 'linear-gradient(180deg, rgba(234,88,12,0.08), rgba(234,88,12,0.02))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            zIndex: 0, userSelect: 'none',
            fontFamily: 'var(--font-display, Syne, serif)',
          }}>01</div>

          {/* L-Border — thinner */}
          <div className="why-l-border" style={{
            position: 'absolute', width: '370px', height: '450px',
            right: '35px', top: '60px', zIndex: 0,
            borderTop: '2px solid rgba(234,88,12,0.5)',
            borderRight: '2px solid rgba(234,88,12,0.5)',
            borderRadius: '0 6px 0 0',
          }}></div>

          {/* Dot Grid Pattern */}
          <div className="why-grid-pattern" style={{
            position: 'absolute', left: '30px', bottom: '55px',
            display: 'grid', gridTemplateColumns: 'repeat(5, 10px)',
            gap: '8px', zIndex: 0,
          }}>
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="why-grid-dot" style={{
                width: '3px', height: '3px', borderRadius: '50%',
                backgroundColor: 'rgba(234,88,12,0.25)',
              }}></div>
            ))}
          </div>

          {/* Main Photo */}
          <div
            className="why-photo-wrap"
            ref={photoRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            style={{
              width: '350px', height: '430px',
              position: 'relative', zIndex: 1,
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.08)',
              borderRadius: '6px',
            }}
          >
            {/* Cursor glow */}
            <div ref={glowRef} style={{
              position: 'absolute', width: '240px', height: '240px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(234,88,12,0.2) 0%, transparent 70%)',
              pointerEvents: 'none', opacity: 0, zIndex: 2, filter: 'blur(20px)',
            }}></div>
            <img
              src="/amit_sir_photo.png"
              alt="Amit Kumar Pandey"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            {/* Bottom gradient overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)',
              pointerEvents: 'none', zIndex: 1,
            }}></div>
          </div>

          {/* Badge on photo bottom */}
          <div className="why-photo-badge" style={{
            position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '8px 20px', borderRadius: '999px',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(234,88,12,0.15)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            zIndex: 3,
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#22c55e', display: 'inline-block',
              boxShadow: '0 0 6px rgba(34,197,94,0.5)',
              animation: 'blink 1.5s ease-in-out infinite',
            }}></span>
            <span style={{
              fontSize: '12px', fontWeight: 500, color: '#1B1B3A',
              letterSpacing: '0.3px',
            }}>Available for Collaboration</span>
          </div>

          {/* Caption Line Below */}
          <div className="why-caption" style={{
            position: 'absolute', bottom: '35px', left: '70px', right: '70px',
            display: 'flex', alignItems: 'center', gap: '14px', zIndex: 2,
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(234,88,12,0.3))' }}></div>
            <span style={{
              fontSize: '10px', fontWeight: 500, letterSpacing: '3px',
              color: '#ea580c', textTransform: 'uppercase', whiteSpace: 'nowrap',
              fontFamily: 'var(--font-mono, monospace)', opacity: 0.6,
            }}>Researcher · Innovator</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(234,88,12,0.3))' }}></div>
          </div>
        </motion.div>

        {/* ─── Right Side: Content ─── */}
        <div className="why-content-area" style={{ flex: 1, paddingLeft: '40px' }}>

          {/* Eyebrow label */}
          <div className="why-content-item" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginBottom: '14px',
          }}>
            <div style={{
              width: '24px', height: '2px',
              background: 'linear-gradient(to right, #ea580c, #f97316)',
            }}></div>
            <span style={{
              fontSize: '11px', fontWeight: 600, letterSpacing: '3px',
              color: '#ea580c', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono, monospace)',
            }}>About Me</span>
          </div>

          {/* Heading — lighter weight */}
          <h2 className="why-content-item" style={{
            fontSize: '48px', fontWeight: 600, color: '#1B1B3A',
            marginBottom: '20px', letterSpacing: '-1px', lineHeight: 1.15,
          }}>
            Why <span style={{
              background: 'linear-gradient(135deg, #ea580c, #f97316)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Hire</span> me?
          </h2>

          {/* Description — lighter */}
          <p className="why-content-item" style={{
            color: '#777', fontSize: '15px', lineHeight: 1.8,
            maxWidth: '420px', marginBottom: '24px', fontWeight: 400,
          }}>
            To secure a challenging and growth-oriented position in a dynamic organization where I can apply my knowledge of Artificial Intelligence, data science, and soft computing to real-world problem solving.
          </p>

          {/* Skill Tags */}
          <div className="why-content-item" style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px',
            marginBottom: '32px',
          }}>
            {skills.map((s, i) => (
              <SkillTag key={s} text={s} delay={i * 0.08} />
            ))}
          </div>

          {/* Stats — editorial style with vertical dividers */}
          <div className="why-content-item" style={{
            display: 'flex', alignItems: 'flex-start', gap: '0',
            marginBottom: '36px', padding: '4px 0',
          }}>
            <StatItem target={7} suffix="+" label="Patents Issued" />
            <div style={{ width: '1px', alignSelf: 'stretch', background: 'linear-gradient(to bottom, transparent, #E5E5E5, transparent)', margin: '0 20px', flexShrink: 0 }}></div>
            <StatItem target={16} suffix="+" label="Research Publications" />
            <div style={{ width: '1px', alignSelf: 'stretch', background: 'linear-gradient(to bottom, transparent, #E5E5E5, transparent)', margin: '0 20px', flexShrink: 0 }}></div>
            <StatItem target={3} suffix="+" label="Years Teaching" />
          </div>

          {/* CTA */}
          <div className="why-content-item">
            <MagneticButton href="#contact">
              Let's Connect
            </MagneticButton>
          </div>
        </div>

      </div>

      {/* Inline keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}} />
    </section>
  );
}
