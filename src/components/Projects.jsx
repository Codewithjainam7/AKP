import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import GSAPTextReveal from './GSAPTextReveal';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const scrollRef = useRef(null);
  
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
    <section id="project" className="py-24 bg-white" style={{ fontFamily: 'var(--font-body)' }}>
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-8">
          <div className="text-4xl sm:text-5xl lg:text-7xl text-[#1B1B3A] font-bold tracking-tighter leading-[1.05] max-w-3xl" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
            <GSAPTextReveal text="Lets have a look at my Research" />
          </div>
          
          <button 
            onClick={handleSeeAll}
            className="bg-[#ea580c] text-white rounded-full px-10 py-4 font-bold hover:bg-[#f97316] transition-all duration-300 shadow-xl shadow-orange-600/20 whitespace-nowrap active:scale-95"
          >
            See All
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-16 group">
          {/* Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white text-[#ea580c] flex items-center justify-center z-20 shadow-2xl border border-orange-100 hover:bg-[#ea580c] hover:text-white transition-all duration-300 active:scale-90"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-white text-[#ea580c] flex items-center justify-center z-20 shadow-2xl border border-orange-100 hover:bg-[#ea580c] hover:text-white transition-all duration-300 active:scale-90"
            aria-label="Next project"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 md:gap-10 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
          >
            {portfolio.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex-none w-[90%] sm:w-[48%] min-w-[300px] snap-center lg:snap-start"
              >
                 <div className="group/card relative rounded-[40px] overflow-hidden bg-slate-50 aspect-[4/5] sm:aspect-auto shadow-2xl shadow-slate-200 transition-transform duration-500 hover:-translate-y-2">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full sm:h-[500px] object-cover" 
                    />
                    
                    {/* Floating Info Card */}
                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 bg-white/90 backdrop-blur-2xl p-8 rounded-[32px] border border-white/50 shadow-2xl transition-all duration-500 group-hover/card:bg-white group-hover/card:shadow-orange-600/10">
                       <div className="text-[#ea580c] font-black text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-3" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
                         {item.category}
                       </div>
                       <h3 className="text-2xl sm:text-3xl font-bold text-[#1B1B3A] leading-tight" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
                         {item.title}
                       </h3>
                    </div>

                    {/* Quick View Icon */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination */}
        <div className="flex justify-center gap-3 mb-20">
          <div className="w-10 h-1.5 rounded-full bg-[#ea580c]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
        </div>

        {/* Tags */}
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-24">
          {tags.map((tag, idx) => (
             <button key={idx} className="px-7 py-3 rounded-full bg-white border border-slate-100 text-[#1B1B3A] text-sm font-bold hover:border-[#ea580c] hover:text-[#ea580c] hover:shadow-lg hover:shadow-orange-600/5 transition-all duration-300 active:scale-95">
               {tag}
             </button>
          ))}
        </div>

        {/* Highlight Section */}
        <div className="text-center max-w-4xl mx-auto pb-20 relative">
           {/* Decorative Element */}
           <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-600/5 blur-3xl rounded-full"></div>

           <h3 className="text-3xl sm:text-4xl font-bold text-[#1B1B3A] mb-6 flex items-center justify-center gap-4 flex-wrap" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
              Sea Surface Temperature Predicting Device
              <button className="w-12 h-12 rounded-full bg-[#ea580c] text-white flex items-center justify-center hover:scale-110 hover:rotate-45 transition-all duration-500 shadow-xl shadow-orange-600/20">
                <ArrowUpRight className="w-6 h-6" />
              </button>
           </h3>
           <p className="text-slate-500 text-lg sm:text-xl leading-relaxed px-6 max-w-3xl mx-auto">
             Designed and patented a sophisticated portable device for real-time monitoring and mapping of sea surface temperature and potential marine pollution anomalies, utilizing advanced neural architectures.
           </p>
        </div>

      </div>
    </section>
  );
}
