import React, { useEffect, useRef } from 'react';
import { Award, CheckCircle, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PATENTS = [
  { title: 'Deep learning apparatus for SST prediction', category: 'Deep Learning', year: '2023' },
  { title: 'Underwater pollution detection method using CNNs', category: 'Computer Vision', year: '2023' },
  { title: 'Cognitive state analysis via AI generated acoustics', category: 'Audio AI', year: '2022' },
  { title: 'Automated crop yield mapping from drone imagery', category: 'Remote Sensing', year: '2022' },
  { title: 'Real-time network security monitoring AI', category: 'Cybersecurity', year: '2021' }
];

function PatentCard({ patent, idx }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(dy, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(dx, [-0.5, 0.5], ["-7deg", "7deg"]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(el, 
      { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotateX: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
    
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="spotlight-card group relative p-8 sm:p-10 bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-[40px] transition-all duration-500 hover:border-primary-500/40 hover:shadow-[0_40px_80px_rgba(234,88,12,0.15)] cursor-default overflow-hidden opacity-0"
    >
      {/* Decorative inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-6 sm:gap-8">
          <div className="relative">
            <span className="text-4xl sm:text-5xl font-black text-slate-100 group-hover:text-primary-500/20 transition-all duration-700 select-none block" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
                {patent.category}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                Filed: {patent.year}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight group-hover:text-primary-600 transition-colors duration-500">
              {patent.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 self-start md:self-center">
          <div className="flex items-center gap-2.5 px-5 py-2.5 bg-emerald-50 text-emerald-700 text-[11px] font-black uppercase tracking-widest rounded-2xl border border-emerald-100 shadow-sm group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-400 transition-all duration-500">
            <ShieldCheck size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-500" />
            Granted
          </div>
          <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary-50 hover:text-primary-600 border border-slate-100 hover:border-primary-200 transition-all duration-300">
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Patents() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".header-reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="patents" className="py-32 mesh-gradient relative" ref={containerRef}>
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-500/5 blur-[120px] rounded-full animate-blob" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-orange-500/10 blur-[100px] rounded-full animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[20%] w-[35%] h-[35%] bg-amber-500/5 blur-[110px] rounded-full animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="text-center max-w-3xl mx-auto mb-24 header-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
            <Award size={14} />
            Intellectual Property
          </div>
          
          <h2 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-8 tracking-tighter" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
            Patents & <span className="text-primary-600 relative">
              Innovation
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-500/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-slate-500 text-xl leading-relaxed font-medium">
            Bridging the gap between academic theory and real-world application. 
            Currently holding <span className="text-slate-900 font-bold">7+ active patents</span> and multiple software copyrights.
          </p>
        </div>

        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
          {PATENTS.map((patent, idx) => (
            <PatentCard key={`patent-${idx}`} patent={patent} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

