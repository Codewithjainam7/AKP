import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Download, ExternalLink, ArrowUpRight, BookOpen, Search, FlaskConical, Brain, ScanEye, Languages, PawPrint, Bug, Satellite, Trophy, Cat, Fish } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RESEARCH_PAPERS = [
  {
    title: 'Sea Surface Temperature Prediction by Using EDA and Exponential Smoothening Algorithm',
    paperId: '1705276',
    authors: 'Amit Kumar Pandey, Dr. Santosh Singh, Nishant Varma',
    date: 'December 2023',
    category: 'Climate Science',
    volume: 'Vol. 7, Issue 6',
    pages: '159–163',
    description: 'An integrated approach for sea surface temperature prediction combining Exploratory Data Analysis and Exponential Smoothing techniques, developing a robust predictive model for climate monitoring and oceanic condition forecasting.',
    pdf: 'https://www.irejournals.com/formatedpaper/1705276.pdf',
    link: 'https://www.irejournals.com/paper-details/1705276',
  },
  {
    title: 'Facial Emotion Recognition of Human Species by Using Deep Learning Techniques',
    paperId: '1705299',
    authors: 'Amit Kumar Pandey, Dr. Santosh Singh, Ankush Sushil Singh, Ashwani Kumar Mishra',
    date: 'December 2023',
    category: 'Deep Learning',
    volume: 'Vol. 7, Issue 6',
    pages: '147–152',
    description: 'A CNN-based model for accurately identifying diverse human facial expressions including anger, happiness, neutrality, sadness, and surprise, leveraging TensorFlow and Keras for emotion analysis and human-computer interaction.',
    pdf: 'https://www.irejournals.com/formatedpaper/1705299.pdf',
    link: 'https://www.irejournals.com/paper-details/1705299',
  },
  {
    title: 'Integrated Approach for Crab Species Classification: Comparative Analysis of SVM and CNN',
    paperId: '1705315',
    authors: 'Amit Kumar Pandey, Dr. Santosh Singh, Kalash Seetharam Shetty, Ashwani Kumar Mishra, Bipin Yadav',
    date: 'December 2023',
    category: 'Computer Vision',
    volume: 'Vol. 7, Issue 6',
    pages: '228–234',
    description: 'An integrated approach using SVM and CNN for accurate crab species classification, leveraging pre-trained models like MobileNetV2 and VGG16 for feature extraction across three crab species.',
    pdf: 'https://www.irejournals.com/formatedpaper/17053151.pdf',
    link: 'https://www.irejournals.com/paper-details/1705315',
  },
  {
    title: 'News Summarization Articles by Using NLP',
    paperId: '1705416',
    authors: 'Amit Kumar Pandey, Pradeep Tripathi',
    date: 'January 2024',
    category: 'NLP',
    volume: 'Vol. 7, Issue 7',
    pages: '339–343',
    description: 'Harnessing advanced natural language processing techniques for automated condensation of BBC articles across five diverse categories, utilizing the Hugging Face Transformers library for efficient news summarization.',
    pdf: 'https://www.irejournals.com/formatedpaper/1705416.pdf',
    link: 'https://www.irejournals.com/paper-details/1705416',
  },
  {
    title: 'Facial Emotion Recognition of Cat Breeds by Using Convolution Neural Network',
    paperId: '1705255',
    authors: 'Amit Kumar Pandey, Poonam Jain, Bipin Yadav, Vikas Pandey',
    date: 'December 2023',
    category: 'Animal AI',
    volume: 'Vol. 7, Issue 6',
    pages: '58–63',
    description: 'Exploring cat facial emotion recognition using CNN algorithms, detecting and classifying emotional expressions in cats with a diverse dataset encompassing various cat breeds and emotional states.',
    pdf: 'https://www.irejournals.com/formatedpaper/1705255.pdf',
    link: 'https://www.irejournals.com/paper-details/1705255',
  },
  {
    title: 'Butterfly Species Recognition Using Convolutional Neural Network',
    paperId: '1705260',
    authors: 'Amit Kumar Pandey, Dr. Santosh Singh, Ankush Sushil Singh, Ashwani Kumar Mishra, Bipin Yadav',
    date: 'December 2023',
    category: 'Biodiversity',
    volume: 'Vol. 7, Issue 6',
    pages: '70–74',
    description: 'An innovative CNN-based Butterfly Species Recognition System designed to automatically extract and analyze intricate features within butterfly images for accurate species classification and biodiversity monitoring.',
    pdf: 'https://www.irejournals.com/formatedpaper/17052601.pdf',
    link: 'https://www.irejournals.com/paper-details/1705260',
  },
  {
    title: 'Polarimetric SAR Data Denoising using SOFM',
    paperId: '1705252',
    authors: 'Amit Kumar Pandey, Mithilesh Vishwakarma, Bipin Yadav, Gopal Rajbhar',
    date: 'December 2023',
    category: 'Remote Sensing',
    volume: 'Vol. 7, Issue 6',
    pages: '42–48',
    description: 'Addressing the problem of denoising polarimetric SAR data using Self-Organizing Feature Maps (SOFM), a neural network-based approach for enhancing remote sensing data quality and accuracy.',
    pdf: 'https://www.irejournals.com/formatedpaper/1705252.pdf',
    link: 'https://www.irejournals.com/paper-details/1705252',
  },
  {
    title: 'T20 Cricket Score Prediction Using Machine Learning',
    paperId: '1705253',
    authors: 'Amit Kumar Pandey, Sherilyn Kevin, Bipin Yadav, Gopal Rajbhar',
    date: 'December 2023',
    category: 'Sports Analytics',
    volume: 'Vol. 7, Issue 6',
    pages: '49–57',
    description: 'A T20 Cricket Score Predictor powered by XGBoost machine learning, enabling real-time final score prediction based on team strength, venue conditions, and recent performance metrics.',
    pdf: 'https://www.irejournals.com/formatedpaper/1705253.pdf',
    link: 'https://www.irejournals.com/paper-details/1705253',
  },
  {
    title: 'Cat Family Recognition by Using Convolution Neural Network',
    paperId: '1705257',
    authors: 'Amit Kumar Pandey, Dr. Santosh Singh, Bipin Yadav',
    date: 'December 2023',
    category: 'Image Classification',
    volume: 'Vol. 7, Issue 6',
    pages: '64–69',
    description: 'An automated CNN solution for recognizing various species within the cat family — Cheetahs, Leopards, Lions, Pumas, and Tigers — with implications for wildlife monitoring and conservation initiatives.',
    pdf: 'https://www.irejournals.com/formatedpaper/17052571.pdf',
    link: 'https://www.irejournals.com/paper-details/1705257',
  },
  {
    title: 'Fish Species Recognition using Convolutional Neural Networks for Biodiversity Monitoring',
    paperId: '1705306',
    authors: 'Amit Kumar Pandey, Dr. Santosh Singh, Ankush Sushil Singh, Shravan Shivanand Kamat',
    date: 'December 2023',
    category: 'Marine Biology',
    volume: 'Vol. 7, Issue 6',
    pages: '223–227',
    description: 'An automated CNN system for recognizing fish species to enhance biodiversity monitoring, offering a scalable solution for precise fish species recognition in aquatic ecosystem management.',
    pdf: 'https://www.irejournals.com/formatedpaper/1705306.pdf',
    link: 'https://www.irejournals.com/paper-details/1705306',
  },
];

const CATEGORY_ICONS = {
  'Climate Science': FlaskConical,
  'Deep Learning': Brain,
  'Computer Vision': ScanEye,
  'NLP': Languages,
  'Animal AI': PawPrint,
  'Biodiversity': Bug,
  'Remote Sensing': Satellite,
  'Sports Analytics': Trophy,
  'Image Classification': Cat,
  'Marine Biology': Fish,
};

export default function ResearchDetails() {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPapers = RESEARCH_PAPERS.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.paperId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.authors.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.rp-hero-label',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );

      gsap.fromTo('.rp-title-word',
        { opacity: 0, y: 100, rotateX: -50 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.4, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo('.rp-hero-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo('.rp-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
      );

      gsap.fromTo('.rp-hero-deco-num',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      );

      gsap.fromTo('.rp-stat',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', delay: 0.8 }
      );

      gsap.fromTo('.rp-stat-bar',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out', delay: 1.0 }
      );

      gsap.fromTo('.rp-section-label',
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.rp-cards-section', start: 'top 85%' } }
      );

      gsap.fromTo('.rp-section-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.rp-cards-section', start: 'top 85%' } }
      );

      gsap.fromTo('.rp-card',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power4.out', scrollTrigger: { trigger: '.rp-cards-list', start: 'top 85%' } }
      );

      document.querySelectorAll('.rp-card').forEach((card) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 85%' } });
        tl.fromTo(card.querySelector('.rp-card-number'),
          { opacity: 0, x: -30, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0.2);
        tl.fromTo(card.querySelector('.rp-card-meta'),
          { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.35);
        tl.fromTo(card.querySelector('.rp-card-title'),
          { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.4);
        tl.fromTo(card.querySelector('.rp-card-desc'),
          { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.55);
        tl.fromTo(card.querySelector('.rp-card-actions'),
          { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.7);
      });

      gsap.fromTo('.rp-card-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out', scrollTrigger: { trigger: '.rp-cards-list', start: 'top 85%' } }
      );

      // Right panel reveal
      document.querySelectorAll('.rp-card').forEach((card) => {
        const rightPanel = card.querySelector('.rp-card-right');
        if (rightPanel) {
          gsap.fromTo(rightPanel, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
        }
      });

      // Hover micro-animations
      document.querySelectorAll('.rp-card').forEach((card) => {
        const number = card.querySelector('.rp-card-number span');
        const title = card.querySelector('.rp-card-title h3');

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
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-primary-600/[0.08] blur-[160px] rounded-full animate-blob" />
          <div className="absolute top-[30%] -left-[15%] w-[45%] h-[45%] bg-orange-500/[0.06] blur-[130px] rounded-full animate-blob animation-delay-2000" />
          <div className="absolute -bottom-[20%] right-[15%] w-[50%] h-[50%] bg-amber-600/[0.05] blur-[140px] rounded-full animate-blob animation-delay-4000" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.6)_100%)]" />
        </div>

        <div className="rp-hero-deco-num absolute top-[15%] right-[5%] lg:right-[10%] select-none pointer-events-none">
          <span className="text-[20vw] lg:text-[15vw] font-black text-white/[0.02] leading-none block" style={{ fontFamily: 'Syne, sans-serif' }}>10</span>
        </div>

        <div className="absolute top-[40%] left-0 w-[200px] h-px bg-gradient-to-r from-transparent via-primary-600/20 to-transparent" />
        <div className="absolute top-[55%] right-0 w-[150px] h-px bg-gradient-to-l from-transparent via-primary-600/15 to-transparent" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10 pb-20 pt-40">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-4xl">
              <div className="rp-hero-label flex items-center gap-3 mb-8">
                <div className="w-12 h-[2px] bg-primary-600"></div>
                <span className="text-xs font-black text-primary-600 uppercase tracking-[0.3em]" style={{ fontFamily: 'monospace' }}>Academic Research</span>
              </div>

              <h1 className="text-6xl sm:text-8xl lg:text-[8rem] font-bold tracking-tighter leading-[0.85] mb-8" style={{ fontFamily: 'Syne, sans-serif', perspective: '600px' }}>
                <span className="rp-title-word inline-block text-white">Research</span><br />
                <span className="rp-title-word inline-block text-primary-600">Papers</span>
              </h1>

              <div className="rp-hero-line w-24 h-[3px] bg-primary-600 mb-8 origin-left"></div>

              <p className="rp-subtitle text-white/40 text-lg sm:text-xl lg:text-2xl leading-relaxed max-w-xl" style={{ fontFamily: 'Inter, sans-serif' }}>
                Peer-reviewed publications spanning deep learning, computer vision, NLP, and environmental AI — advancing the frontier of machine intelligence.
              </p>
            </div>

            <div className="rp-stats-row flex flex-wrap lg:flex-col gap-8 lg:gap-6 lg:pb-4">
              {[
                { value: '10+', label: 'Papers Published' },
                { value: '6+', label: 'AI Domains' },
                { value: '2023–24', label: 'Publication Period' },
                { value: 'IRE', label: 'Journal Publisher' },
              ].map((stat, idx) => (
                <div key={idx} className="rp-stat flex items-center gap-4 lg:gap-5">
                  <div className="rp-stat-bar w-8 h-[2px] bg-primary-600 origin-left shrink-0"></div>
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

      {/* ═══════ PAPERS — White ═══════ */}
      <section className="rp-cards-section relative z-10 bg-[#0a0a0a]">
        <div className="relative pt-20 pb-24 bg-white rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[5%] left-[5%] w-[300px] h-[300px] bg-primary-600/[0.04] blur-[120px] rounded-full" />
            <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] bg-orange-600/[0.03] blur-[100px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 lg:px-12 relative">
            <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <div className="rp-section-label inline-flex items-center gap-2.5 text-primary-600 mb-4 font-black uppercase tracking-[0.3em] text-xs" style={{ fontFamily: 'monospace' }}>
                  <div className="w-8 h-[2px] bg-primary-600"></div>
                  Published Works
                </div>
                <h2 className="rp-section-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Research <span className="text-primary-600">Publications</span>
                </h2>
              </div>
              {/* Search bar */}
              <div className="relative w-full lg:w-72 shrink-0">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-slate-200 bg-slate-50/80 text-sm text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-600/10 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div className="rp-cards-list flex flex-col">
              {filteredPapers.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-slate-400 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>No papers found for "{searchQuery}"</p>
                </div>
              )}
              {filteredPapers.map((paper, idx) => {
                const IconComp = CATEGORY_ICONS[paper.category] || BookOpen;
                return (
                <div key={idx}>
                  <div className="rp-card-divider h-px bg-slate-200 origin-left"></div>

                  <div className="rp-card group py-7 sm:py-8 cursor-default relative">
                    {/* Number — absolute watermark */}
                    <div className="rp-card-number absolute left-0 top-6 sm:top-7 pointer-events-none">
                      <span className="text-7xl sm:text-8xl font-black text-slate-50 select-none block leading-none" style={{ fontFamily: 'Syne, sans-serif' }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Main flex row */}
                    <div className="relative z-10 pl-20 sm:pl-28 flex flex-col lg:flex-row lg:items-start lg:gap-10">
                      {/* Left content */}
                      <div className="flex-1 min-w-0">
                        <div className="rp-card-meta flex flex-wrap items-center gap-3 sm:gap-4 mb-3">
                          <span className="text-[12px] font-extrabold text-primary-600 uppercase tracking-[0.15em]" style={{ fontFamily: 'Syne, sans-serif' }}>
                            {paper.category}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span className="text-[12px] font-semibold text-slate-400" style={{ fontFamily: 'monospace' }}>
                            ID: {paper.paperId}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 hidden sm:block"></span>
                          <span className="text-[12px] font-bold text-emerald-600 uppercase tracking-wider" style={{ fontFamily: 'Syne, sans-serif' }}>
                            ✓ Published
                          </span>
                        </div>

                        <div className="rp-card-title">
                          <h3 className="text-2xl sm:text-[28px] font-bold text-slate-900 leading-snug group-hover:text-primary-600 transition-colors duration-400" style={{ fontFamily: 'Syne, sans-serif' }}>
                            {paper.title}
                          </h3>
                        </div>

                        <p className="text-slate-400 text-xs sm:text-sm mt-1.5 italic" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {paper.authors} · {paper.date}
                        </p>

                        <p className="rp-card-desc text-slate-500 text-sm sm:text-base leading-relaxed mt-2.5 group-hover:text-slate-700 transition-colors duration-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {paper.description}
                        </p>

                        {/* ── Action buttons ── */}
                        <div className="rp-card-actions flex flex-wrap items-center gap-3 mt-5">
                          <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-900 bg-slate-900 text-white text-[13px] font-bold tracking-wide hover:bg-primary-600 hover:border-primary-600 transition-all duration-300"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            <BookOpen size={14} className="group-hover/btn:scale-110 transition-transform duration-300" />
                            View Paper
                            <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                          </a>
                          <a
                            href={paper.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/dl inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-slate-600 text-[13px] font-bold tracking-wide hover:border-slate-900 hover:text-slate-900 transition-all duration-300"
                            style={{ fontFamily: 'Syne, sans-serif' }}
                          >
                            <Download size={14} className="group-hover/dl:translate-y-0.5 transition-transform duration-300" />
                            Download PDF
                          </a>
                        </div>
                      </div>

                      {/* Right panel — fills the empty space */}
                      <div className="rp-card-right hidden lg:flex flex-col items-end gap-5 w-[280px] shrink-0 pt-1">

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3 w-full">
                          <div className="bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100 group-hover:border-slate-200 transition-colors duration-300">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1" style={{ fontFamily: 'monospace' }}>Volume</div>
                            <div className="text-sm font-bold text-slate-700" style={{ fontFamily: 'Syne, sans-serif' }}>{paper.volume.replace('Vol. ', 'V').replace(', Issue ', '.I')}</div>
                          </div>
                          <div className="bg-slate-50/80 rounded-xl px-4 py-3 border border-slate-100 group-hover:border-slate-200 transition-colors duration-300">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1" style={{ fontFamily: 'monospace' }}>Pages</div>
                            <div className="text-sm font-bold text-slate-700" style={{ fontFamily: 'Syne, sans-serif' }}>pp. {paper.pages}</div>
                          </div>
                        </div>

                        {/* Date pill */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/[0.03] border border-slate-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-[11px] font-bold text-slate-500 tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>{paper.date}</span>
                        </div>

                        {/* Journal tag */}
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] text-right leading-tight" style={{ fontFamily: 'monospace' }}>
                          IRE Journals<br/>
                          <span className="text-slate-200">Peer Reviewed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
              })}
              <div className="rp-card-divider h-px bg-slate-200 origin-left"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
