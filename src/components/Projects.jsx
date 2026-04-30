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
      const scrollAmount = window.innerWidth < 768 ? 300 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const tags = ['Research', 'Patents', 'Machine Learning', 'Data Science', 'Publications'];

  return (
    <section id="project" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-20 gap-8">
          <div className="text-4xl sm:text-5xl lg:text-6xl text-[#1B1B3A] font-bold tracking-tight leading-[1.1] max-w-2xl">
            <GSAPTextReveal text="Lets have a look at my Research" />
          </div>
          
          <button className="bg-primary-600 text-white rounded-full px-8 py-3 font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 whitespace-nowrap">
            See All
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative mb-16">
          {/* Navigation Buttons - Hidden on small mobile */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-600 text-white hidden md:flex items-center justify-center z-20 shadow-xl shadow-primary-600/30 hover:scale-110 transition-transform"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary-600 text-white hidden md:flex items-center justify-center z-20 shadow-xl shadow-primary-600/30 hover:scale-110 transition-transform"
            aria-label="Next project"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {portfolio.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex-none w-[85%] sm:w-[48%] min-w-[280px] snap-start"
              >
                 <div className="group relative rounded-3xl overflow-hidden bg-slate-50 aspect-[4/5] sm:aspect-auto">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full sm:h-[400px] object-cover" 
                    />
                    
                    {/* Overlay Text inside Image */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/80 backdrop-blur-xl p-6 rounded-2xl border border-white/50 shadow-2xl">
                       <h3 className="text-xl sm:text-2xl font-bold text-[#1B1B3A] mb-2 leading-tight">
                         {item.title}
                       </h3>
                       <div className="text-primary-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
                         {item.category}
                       </div>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination */}
        <div className="flex justify-center gap-2 mb-16">
          <div className="w-6 h-2 rounded-full bg-primary-600"></div>
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
        </div>

        {/* Tags */}
        <div className="flex justify-center gap-3 sm:gap-4 flex-wrap mb-16">
          {tags.map((tag, idx) => (
             <button key={idx} className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-[#1B1B3A] text-sm font-semibold hover:border-primary-600 hover:text-primary-600 transition-all shadow-sm">
               {tag}
             </button>
          ))}
        </div>

        {/* Detailed Text */}
        <div className="text-center max-w-3xl mx-auto pb-12">
           <h3 className="text-2xl sm:text-3xl font-bold text-[#1B1B3A] mb-4 flex items-center justify-center gap-3 flex-wrap">
              Sea Surface Temperature Predicting Device
              <button className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:scale-110 transition-transform">
                <ArrowUpRight className="w-5 h-5" />
              </button>
           </h3>
           <p className="text-slate-500 text-base sm:text-lg leading-relaxed px-4">
             Designed and patented a sophisticated portable device for real-time monitoring and mapping of sea surface temperature and potential marine pollution anomalies, utilizing advanced neural architectures.
           </p>
        </div>

      </div>
    </section>
  );
}

