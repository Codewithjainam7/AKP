import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GSAPTextReveal from './GSAPTextReveal';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, BookOpen } from 'lucide-react';
import Magnetic from './Magnetic';
import gsap from 'gsap';

export default function Projects() {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const portfolio = [
    { 
      title: 'Sea Surface Temperature Device', 
      desc: 'Design Patent No: 435593-001 | Issued: 10/02/2025. A novel device for detecting and monitoring sea surface temperatures.',
      img: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=600&q=80',
      category: 'Design Patent / Hardware'
    },
    { 
      title: 'Global Temperature Prediction Model', 
      desc: 'Copyright Reg No: SW-18870/2024. Computer software model for zonal global temperature prediction using hybrid machine learning techniques.',
      img: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?auto=format&fit=crop&w=600&q=80',
      category: 'Software Copyright / ML'
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSeeAll = () => {
    const patentsSection = document.getElementById('patents');
    if (patentsSection) {
      patentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tags = ['Research', 'Patents', 'Machine Learning', 'Data Science', 'Publications'];

  return (
    <section id="project" className="py-32 bg-white relative overflow-hidden" style={{ fontFamily: 'var(--font-body)' }} ref={sectionRef}>
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-28 gap-10">
          <div className="space-y-6 max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <BookOpen size={14} className="text-primary-600" />
              Academic Journey
            </motion.div>
            
            <div className="text-5xl sm:text-7xl lg:text-8xl text-[#1B1B3A] font-bold tracking-tighter leading-[0.95]" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
              <GSAPTextReveal text="Let's have a look at my Research" />
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-slate-400 text-lg sm:text-xl max-w-2xl font-medium leading-relaxed"
            >
              Exploring the intersection of <span className="text-slate-900">Machine Learning</span> and <span className="text-slate-900">Environmental Science</span> through innovative patents and software models.
            </motion.p>
          </div>
          
          <Magnetic>
            <button 
              onClick={handleSeeAll}
              className="group relative bg-[#ea580c] text-white rounded-full px-12 py-5 font-bold transition-all duration-500 shadow-2xl shadow-orange-600/20 whitespace-nowrap active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Explore All</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </Magnetic>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-24 group/carousel">
          {/* Custom Navigation */}
          <div className="absolute -top-12 right-0 flex gap-4 z-20">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex gap-8 md:gap-12 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory pr-[10%]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
          >
            {portfolio.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex-none w-[90%] sm:w-[550px] snap-center lg:snap-start"
              >
                 <div className="group/card relative rounded-[48px] overflow-hidden bg-slate-100 aspect-[4/5] sm:aspect-[1.2/1] shadow-2xl shadow-slate-200/50 transition-all duration-700 hover:shadow-orange-600/10">
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover/card:grayscale-0 transition-all duration-700" 
                    />
                    
                    {/* Glassmorphism Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B3A]/80 via-transparent to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-700" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-700">
                       <div className="flex items-center gap-3 text-primary-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
                         <Sparkles size={14} />
                         {item.category}
                       </div>
                       <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
                         {item.title}
                       </h3>
                       <p className="text-white/60 text-sm sm:text-base leading-relaxed line-clamp-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 delay-100">
                         {item.desc}
                       </p>
                    </div>

                    <div className="absolute top-8 right-8 w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white scale-0 group-hover/card:scale-100 transition-transform duration-500 delay-200">
                      <ArrowUpRight className="w-7 h-7" />
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex justify-center gap-3 sm:gap-5 flex-wrap mb-32">
          {tags.map((tag, idx) => (
             <button key={idx} className="group relative px-8 py-3.5 rounded-full bg-slate-50 border border-slate-100 text-[#1B1B3A] text-sm font-bold transition-all duration-500 hover:text-white hover:border-primary-600 active:scale-95 overflow-hidden">
               <span className="relative z-10">{tag}</span>
               <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             </button>
          ))}
        </div>

        {/* Bottom Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-slate-50 rounded-[60px] p-12 sm:p-20 text-center relative overflow-hidden border border-slate-100"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
           
           <div className="relative z-10 max-w-4xl mx-auto">
             <div className="w-16 h-16 rounded-2xl bg-primary-600/10 flex items-center justify-center text-primary-600 mx-auto mb-10">
               <Sparkles size={32} />
             </div>
             
             <h3 className="text-4xl sm:text-5xl font-bold text-[#1B1B3A] mb-8 leading-tight" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
                Sea Surface Temperature <br className="hidden sm:block" /> Predicting Device
             </h3>
             <p className="text-slate-500 text-lg sm:text-xl leading-relaxed mb-12">
               Designed and patented a sophisticated portable device for real-time monitoring and mapping of sea surface temperature and potential marine pollution anomalies.
             </p>
             
             <Magnetic>
               <button className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#1B1B3A] text-white font-bold hover:bg-primary-600 transition-all duration-500 group shadow-2xl shadow-slate-900/10">
                 View Technical Details
                 <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
             </Magnetic>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
