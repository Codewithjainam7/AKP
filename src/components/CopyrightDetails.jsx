import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Download, ExternalLink, ArrowUpRight, Search } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { getDatabase } from '../data/dbHelper';

export default function CopyrightDetails() {
  const database = getDatabase();
  const COPYRIGHTS = database.copyrights || [];

  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCopyrights = COPYRIGHTS.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.cr-hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo('.cr-title-word',
        { opacity: 0, y: 100, rotateX: -50 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.4, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo('.cr-hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo('.cr-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
      );

      gsap.fromTo('.cr-hero-deco-num',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo('.cr-stat',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.8 }
      );

      gsap.fromTo('.cr-stat-bar',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 1.0 }
      );

      gsap.fromTo('.cr-section-label',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.cr-cards-section', start: 'top 85%' } }
      );

      gsap.fromTo('.cr-section-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.cr-cards-section', start: 'top 85%' } }
      );

      gsap.fromTo('.cr-card',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out', scrollTrigger: { trigger: '.cr-cards-grid', start: 'top 85%' } }
      );

      document.querySelectorAll('.cr-card').forEach((card) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%' } });
        tl.fromTo(card.querySelector('.cr-card-number'),
          { opacity: 0, x: -30, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0.2);
        tl.fromTo(card.querySelector('.cr-card-meta'),
          { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.35);
        tl.fromTo(card.querySelector('.cr-card-title'),
          { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.4);
        tl.fromTo(card.querySelector('.cr-card-body'),
          { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.55);
        tl.fromTo(card.querySelector('.cr-card-actions'),
          { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7);
      });

      gsap.fromTo('.cr-card-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.cr-cards-grid', start: 'top 85%' } }
      );

      // Right panel reveal
      document.querySelectorAll('.cr-card').forEach((card) => {
        const rightPanel = card.querySelector('.cr-card-right');
        if (rightPanel) {
          gsap.fromTo(rightPanel, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
        }
      });

      // Hover micro-animations
      document.querySelectorAll('.cr-card').forEach((card) => {
        const number = card.querySelector('.cr-card-number span');
        const title = card.querySelector('.cr-card-title h3');

        card.addEventListener('mouseenter', () => {
          gsap.to(number, { x: 8, color: 'rgba(234, 88, 12, 0.15)', duration: 0.4, ease: 'power2.out' });
          gsap.to(title, { x: 4, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(number, { x: 0, color: '#f8fafc', duration: 0.4, ease: 'power2.out' });
          gsap.to(title, { x: 0, duration: 0.3, ease: 'power2.out' });
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex items-end">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[15%] w-[60%] h-[60%] bg-primary-600/[0.08] blur-[160px] rounded-full animate-blob" />
          <div className="absolute top-[35%] -right-[10%] w-[45%] h-[45%] bg-orange-500/[0.06] blur-[130px] rounded-full animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[20%] left-[15%] w-[50%] h-[50%] bg-amber-600/[0.05] blur-[140px] rounded-full animate-blob animation-delay-4000" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.6)_100%)]" />
        </div>

        <div className="cr-hero-deco-num absolute top-[15%] right-[5%] lg:right-[10%] select-none pointer-events-none">
          <span className="text-[20vw] lg:text-[15vw] font-black text-white/[0.02] leading-none block" style={{ fontFamily: 'Syne, sans-serif' }}>07</span>
        </div>

        <div className="absolute top-[40%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-primary-600/20 to-transparent" />
        <div className="absolute top-[55%] right-0 w-[150px] h-px bg-gradient-to-l from-transparent via-primary-600/15 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10 pb-20 pt-40">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-4xl">
              <div className="cr-hero-label flex items-center gap-3 mb-8">
                <div className="w-12 h-[2px] bg-primary-600"></div>
                <span className="text-xs font-black text-primary-600 uppercase tracking-[0.3em]" style={{ fontFamily: 'monospace' }}>Intellectual Property</span>
              </div>

              <h1 className="text-6xl sm:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.85] mb-8" style={{ fontFamily: 'Syne, sans-serif', perspective: '600px' }}>
                <span className="cr-title-word inline-block text-white">Software</span><br />
                <span className="cr-title-word inline-block text-primary-600">Copyrights</span>
              </h1>

              <div className="cr-hero-line w-24 h-[3px] bg-primary-600 mb-8 origin-left"></div>

              <p className="cr-subtitle text-white/40 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                Protecting innovative software solutions through registered intellectual property across multiple AI and environmental science domains.
              </p>
            </div>

            <div className="cr-stats-row flex flex-wrap lg:flex-col gap-8 lg:gap-6 lg:pb-4">
              {[
                { value: '7+', label: 'Copyrights Registered' },
                { value: '4+', label: 'AI Domains' },
                { value: '2024', label: 'Year Filed' },
                { value: '100%', label: 'Success Rate' },
              ].map((stat, idx) => (
                <div key={idx} className="cr-stat flex items-center gap-4 lg:gap-5">
                  <div className="cr-stat-bar w-8 h-[2px] bg-primary-600 origin-left shrink-0"></div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight whitespace-nowrap" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</div>
                    <div className="text-xs text-white/30 mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CERTIFICATES — White ═══════ */}
      <section className="cr-cards-section relative z-10 bg-[#0a0a0a]">
        <div className="relative pt-20 pb-24 bg-white rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[5%] right-[5%] w-[300px] h-[300px] bg-primary-600/[0.04] blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-orange-600/[0.03] blur-[100px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative">
            <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="cr-section-label inline-flex items-center gap-2.5 text-primary-600 mb-4 font-black uppercase tracking-[0.3em] text-xs" style={{ fontFamily: 'monospace' }}>
                  <div className="w-8 h-[2px] bg-primary-600"></div>
                  Registered Works
                </div>
                <h2 className="cr-section-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Copyright <span className="text-primary-600">Certificates</span>
                </h2>
              </div>
              <div className="relative w-full lg:w-72 shrink-0">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search copyrights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/80 text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-600/10 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div className="cr-cards-grid flex flex-col">
              {filteredCopyrights.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-slate-400 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>No copyrights found for "{searchQuery}"</p>
                </div>
              )}
              {filteredCopyrights.map((item, idx) => (
                <div key={idx}>
                  <div className="cr-card-divider h-px bg-slate-200 origin-left"></div>

                  <div className="cr-card group py-7 sm:py-8 cursor-default relative">
                    <div className="cr-card-number absolute left-0 top-6 sm:top-7 pointer-events-none">
                      <span className="text-7xl sm:text-8xl font-black text-slate-50 select-none block leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="relative z-10 pl-20 sm:pl-28 flex flex-col lg:flex-row lg:items-start lg:gap-10">
                      <div className="flex-1 min-w-0">
                        <div className="cr-card-meta flex flex-wrap items-center gap-3 sm:gap-4 mb-3">
                          <span className="text-[12px] font-extrabold text-primary-600 uppercase tracking-[0.15em]" style={{ fontFamily: 'Syne, sans-serif' }}>
                            {item.category}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
                            ✓ Registered
                          </span>
                        </div>

                        <div className="cr-card-title">
                          <h3 className="text-2xl sm:text-[28px] font-bold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors duration-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                            {item.title}
                          </h3>
                        </div>

                        <p className="cr-card-body text-slate-500 text-sm sm:text-base leading-relaxed mt-2.5 group-hover:text-slate-700 transition-colors duration-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.description}
                        </p>

                        <div className="cr-card-actions flex flex-wrap items-center gap-3 mt-5">
                          <a
                            href={item.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-900 bg-slate-900 text-white text-[13px] font-bold tracking-wide hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            <Eye size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                            View Certificate
                            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                          </a>
                          <a
                            href={item.pdf}
                            download
                            className="group/dl inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 text-[13px] font-bold tracking-wide hover:border-slate-900 hover:text-slate-900 transition-all duration-300"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            <Download size={14} className="group-hover/dl:translate-y-0.5 transition-transform duration-300" />
                            Download PDF
                          </a>
                        </div>
                      </div>

                      {/* Right panel */}
                      <div className="cr-card-right hidden lg:flex flex-col items-end gap-5 w-[280px] shrink-0 pt-1">
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <div className="bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100 group-hover:border-slate-200 transition-colors duration-300">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1" style={{ fontFamily: 'monospace' }}>Reg No</div>
                            <div className="text-sm font-bold text-slate-700" style={{ fontFamily: 'Syne, sans-serif' }}>{item.regNo}</div>
                          </div>
                          <div className="bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100 group-hover:border-slate-200 transition-colors duration-300">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1" style={{ fontFamily: 'monospace' }}>Category</div>
                            <div className="text-sm font-bold text-slate-700" style={{ fontFamily: 'Syne, sans-serif' }}>{item.category}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/[0.03] border border-slate-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-[11px] font-bold text-slate-500 tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>Registered: {item.date}</span>
                        </div>

                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] text-right leading-tight" style={{ fontFamily: 'monospace' }}>
                          Software Copyright<br/>
                          <span className="text-slate-200">Govt. of India</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="cr-card-divider h-px bg-slate-200 origin-left"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
