import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronLeft, ChevronRight, Award, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { getDatabase } from '../data/dbHelper';

export default function CertificationDetails() {
  const database = getDatabase();
  const CERTIFICATIONS = database.certifications || [];
  const ALL_CATEGORIES = ['All', ...Array.from(new Set(CERTIFICATIONS.map(c => c.category)))];

  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoaded, setImageLoaded] = useState({});

  const filtered = CERTIFICATIONS.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // ── Lightbox helpers ──
  const openLightbox = (idx) => setLightbox({ open: true, index: idx });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const nextSlide = () => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }));
  const prevSlide = () => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));

  // Close on Esc
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox.open, filtered.length]);

  // ── GSAP animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ct-hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
      gsap.fromTo('.ct-title-word', { opacity: 0, y: 100, rotateX: -50 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.4, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
      gsap.fromTo('.ct-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.fromTo('.ct-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 });
      gsap.fromTo('.ct-hero-deco-num', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 });
      gsap.fromTo('.ct-stat', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.8 });
      gsap.fromTo('.ct-stat-bar', { scaleX: 0 }, { scaleX: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 1.0 });

      gsap.fromTo('.ct-section-label', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.ct-gallery-section', start: 'top 85%' } });
      gsap.fromTo('.ct-section-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.ct-gallery-section', start: 'top 85%' } });
      gsap.fromTo('.ct-filter-bar', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.ct-gallery-section', start: 'top 85%' } });

      gsap.fromTo('.ct-card', { opacity: 0, y: 60, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.8, stagger: 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: '.ct-gallery-grid', start: 'top 85%' }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleImageError = (idx) => {
    setImageErrors(prev => ({ ...prev, [idx]: true }));
    setImageLoaded(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <div ref={containerRef}>
      {/* ═══════ HERO — Dark ═══════ */}
      <section className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex items-end">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary-600/[0.08] blur-[160px] rounded-full animate-blob" />
          <div className="absolute top-[30%] -left-[15%] w-[45%] h-[45%] bg-orange-500/[0.06] blur-[130px] rounded-full animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[20%] right-[15%] w-[50%] h-[50%] bg-amber-600/[0.05] blur-[140px] rounded-full animate-blob animation-delay-4000" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.6)_100%)]" />
        </div>

        <div className="ct-hero-deco-num absolute top-[15%] right-[5%] lg:right-[10%] select-none pointer-events-none">
          <span className="text-[20vw] lg:text-[15vw] font-black text-white/[0.02] leading-none block" style={{ fontFamily: 'Syne, sans-serif' }}>
            {String(CERTIFICATIONS.length).padStart(2, '0')}
          </span>
        </div>

        <div className="absolute top-[40%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-primary-600/20 to-transparent" />
        <div className="absolute top-[55%] right-0 w-[150px] h-px bg-gradient-to-l from-transparent via-primary-600/15 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10 pb-20 pt-40">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-4xl">
              <div className="ct-hero-label flex items-center gap-3 mb-8">
                <div className="w-12 h-[2px] bg-primary-600"></div>
                <span className="text-[10px] sm:text-xs font-black text-primary-600 uppercase tracking-[0.2em] sm:tracking-[0.3em]" style={{ fontFamily: 'monospace' }}>Achievements & Credentials</span>
              </div>

              <h1 className="text-[13.5vw] sm:text-7xl lg:text-[8rem] font-bold tracking-tighter leading-[0.9] sm:leading-[0.85] mb-8" style={{ fontFamily: 'Syne, sans-serif', perspective: '600px' }}>
                <span className="ct-title-word inline-block text-white">Certified</span><br />
                <span className="ct-title-word inline-block text-primary-600">Excellence</span>
              </h1>

              <div className="ct-hero-line w-24 h-[3px] bg-primary-600 mb-8 origin-left"></div>

              <p className="ct-subtitle text-white/40 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                A curated portfolio of professional certifications validating expertise across cloud computing, deep learning, computer vision, and software development.
              </p>
            </div>

            <div className="ct-stats-row flex flex-wrap lg:flex-col gap-8 lg:gap-6 lg:pb-4">
              {[
                { value: `${CERTIFICATIONS.length}+`, label: 'Certifications' },
                { value: `${ALL_CATEGORIES.length - 1}+`, label: 'Skill Domains' },
                { value: '2023–24', label: 'Earned Period' },
                { value: 'Global', label: 'Accreditation' },
              ].map((stat, idx) => (
                <div key={idx} className="ct-stat flex items-center gap-4 lg:gap-5">
                  <div className="ct-stat-bar w-8 h-[2px] bg-primary-600 origin-left shrink-0"></div>
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

      {/* ═══════ GALLERY — White ═══════ */}
      <section className="ct-gallery-section relative z-10 bg-[#0a0a0a]">
        <div className="relative pt-20 pb-24 bg-white rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[5%] left-[5%] w-[300px] h-[300px] bg-primary-600/[0.04] blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] bg-orange-600/[0.03] blur-[100px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative">
            {/* ── Header + Search ── */}
            <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="ct-section-label inline-flex items-center gap-2.5 text-primary-600 mb-4 font-black uppercase tracking-[0.3em] text-xs" style={{ fontFamily: 'monospace' }}>
                  <div className="w-8 h-[2px] bg-primary-600"></div>
                  Gallery
                </div>
                <h2 className="ct-section-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Certifications & <span className="text-primary-600">Awards</span>
                </h2>
              </div>
              <div className="relative w-full lg:w-72 shrink-0">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search certifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/80 text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-600/10 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            {/* ── Category filter tabs ── */}
            <div className="ct-filter-bar flex flex-nowrap gap-2 mb-12 overflow-x-auto pb-4 -mx-6 px-6 lg:-mx-12 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-800'
                  }`}
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ── Gallery grid ── */}
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-slate-400 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>No certifications found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="ct-gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((cert, idx) => (
                  <div
                    key={idx}
                    className="ct-card group cursor-pointer rounded-[24px] overflow-hidden border border-slate-100 bg-white hover:border-slate-200 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
                    onClick={() => openLightbox(idx)}
                  >
                    {/* Image area */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                      {/* Skeleton loader */}
                      {!imageLoaded[idx] && !imageErrors[idx] && (
                        <div className="absolute inset-0 bg-slate-100 animate-pulse">
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200/70 to-slate-100 animate-[shimmer_1.5s_infinite]" style={{ backgroundSize: '200% 100%' }} />
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 rounded-2xl bg-slate-200 mb-3" />
                            <div className="w-24 h-3 rounded-full bg-slate-200 mb-2" />
                            <div className="w-16 h-2 rounded-full bg-slate-200" />
                          </div>
                        </div>
                      )}

                      {imageErrors[idx] ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                          <div className="w-20 h-20 rounded-3xl bg-primary-600/10 flex items-center justify-center mb-4 group-hover:bg-primary-600/20 transition-colors duration-500">
                            <Award size={36} className="text-primary-600/60" strokeWidth={1.5} />
                          </div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest" style={{ fontFamily: 'monospace' }}>{cert.category}</span>
                          <span className="text-sm font-bold text-slate-500 mt-1" style={{ fontFamily: 'Syne, sans-serif' }}>{cert.issuer}</span>
                        </div>
                      ) : cert.pdf ? (
                        <iframe
                          src={cert.pdf.startsWith('data:') ? cert.pdf : `${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                          title={cert.title}
                          onLoad={() => setImageLoaded(prev => ({ ...prev, [idx]: true }))}
                          className={`w-[150%] h-[150%] scale-[0.67] origin-top-left pointer-events-none transition-all duration-700 ease-out group-hover:scale-[0.70] bg-white ${imageLoaded[idx] ? 'opacity-100' : 'opacity-0'}`}
                        />
                      ) : (
                        <img
                          src={cert.image}
                          alt={cert.title}
                          loading="lazy"
                          onError={() => handleImageError(idx)}
                          onLoad={() => setImageLoaded(prev => ({ ...prev, [idx]: true }))}
                          className={`w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-700 ease-out ${imageLoaded[idx] ? 'opacity-100' : 'opacity-0'}`}
                        />
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-[12px] font-bold text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                          <ExternalLink size={13} />
                          View Full
                        </div>
                      </div>

                      {/* Category tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black text-primary-600 uppercase tracking-widest border border-white/50" style={{ fontFamily: 'Syne, sans-serif' }}>
                          {cert.category}
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[11px] font-bold text-slate-400 tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>{cert.issuer} · {cert.date}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors duration-400 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {cert.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 group-hover:text-slate-600 transition-colors duration-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {cert.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ LIGHTBOX ═══════ */}
      <AnimatePresence>
        {lightbox.open && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.15, duration: 0.4, type: 'spring', damping: 15 }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-50"
              onClick={closeLightbox}
            >
              <X size={20} />
            </motion.button>

            {/* Navigation */}
            {filtered.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-10"
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                >
                  <ChevronLeft size={22} />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 z-10"
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                >
                  <ChevronRight size={22} />
                </motion.button>
              </>
            )}

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ delay: 0.05, duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10 max-w-6xl w-full mx-4 sm:mx-8 mt-12 lg:mt-0 max-h-[80vh] lg:max-h-[90vh] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative w-full lg:w-[60%] shrink-0 rounded-[20px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightbox.index}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                  >
                    {imageErrors[lightbox.index] ? (
                      <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                        <div className="w-24 h-24 rounded-3xl bg-primary-600/20 flex items-center justify-center mb-5">
                          <Award size={48} className="text-primary-600" strokeWidth={1.5} />
                        </div>
                        <span className="text-sm font-bold text-white/40 uppercase tracking-widest mb-1" style={{ fontFamily: 'monospace' }}>{filtered[lightbox.index]?.category}</span>
                        <span className="text-lg font-bold text-white/70" style={{ fontFamily: 'Syne, sans-serif' }}>{filtered[lightbox.index]?.issuer}</span>
                      </div>
                    ) : filtered[lightbox.index]?.pdf ? (
                      <iframe 
                        src={filtered[lightbox.index].pdf.startsWith('data:') ? filtered[lightbox.index].pdf : `${filtered[lightbox.index].pdf}#toolbar=0&navpanes=0&view=FitH`}
                        title={filtered[lightbox.index].title}
                        className="w-full aspect-[4/3] lg:aspect-auto lg:h-[70vh] rounded-[20px] bg-white"
                      />
                    ) : (
                      <img
                        src={filtered[lightbox.index]?.image}
                        alt={filtered[lightbox.index]?.title}
                        onError={() => handleImageError(lightbox.index)}
                        className="w-full object-contain max-h-[70vh]"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Details panel */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
                className="w-full lg:w-[40%] py-2 lg:py-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-black text-primary-500 uppercase tracking-widest" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {filtered[lightbox.index]?.category}
                  </span>
                  <span className="text-white/30 text-xs" style={{ fontFamily: 'monospace' }}>
                    {lightbox.index + 1} / {filtered.length}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {filtered[lightbox.index]?.title}
                </h3>

                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-bold text-white/50" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {filtered[lightbox.index]?.issuer} · {filtered[lightbox.index]?.date}
                  </span>
                </div>

                <div className="w-12 h-[2px] bg-primary-600 mb-5"></div>

                <p className="text-white/50 text-sm sm:text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {filtered[lightbox.index]?.description}
                </p>

                {/* Meta tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-0.5" style={{ fontFamily: 'monospace' }}>Issuer</div>
                    <div className="text-sm font-bold text-white/70" style={{ fontFamily: 'Syne, sans-serif' }}>{filtered[lightbox.index]?.issuer}</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-0.5" style={{ fontFamily: 'monospace' }}>Year</div>
                    <div className="text-sm font-bold text-white/70" style={{ fontFamily: 'Syne, sans-serif' }}>{filtered[lightbox.index]?.date}</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-0.5" style={{ fontFamily: 'monospace' }}>Domain</div>
                    <div className="text-sm font-bold text-white/70" style={{ fontFamily: 'Syne, sans-serif' }}>{filtered[lightbox.index]?.category}</div>
                  </div>
                </div>

                {filtered[lightbox.index]?.pdf && (
                  <div className="mt-8">
                    <a
                      href={filtered[lightbox.index].pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary-600 text-white font-bold text-[13px] tracking-wide hover:bg-primary-500 hover:scale-[1.02] transition-all duration-300"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      View Original PDF
                      <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
