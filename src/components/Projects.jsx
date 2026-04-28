import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const tags = ['Research', 'Patents', 'Machine Learning', 'Data Science', 'Publications'];

  return (
    <section id="project" className="section-padding" style={{ backgroundColor: '#FFFFFF', paddingBottom: '0' }}>
      <div className="container">
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '80px' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '56px', color: '#1B1B3A', letterSpacing: '-1px', lineHeight: '1.1', maxWidth: '500px' }}
          >
            Lets have a look at <span style={{ color: 'var(--primary)' }}>my Research</span>
          </motion.h2>
          
          <button style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', borderRadius: '999px', padding: '12px 32px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
            See All
          </button>
        </div>

        {/* Carousel Container */}
        <div style={{ position: 'relative' }}>
          {/* Navigation Buttons */}
          <div 
            onClick={() => scroll('left')}
            style={{ 
              position: 'absolute', 
              left: '-20px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary)', 
              color: 'var(--white)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              zIndex: 20, 
              boxShadow: '0 10px 20px rgba(255,119,51,0.3)', 
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </div>

          <div 
            onClick={() => scroll('right')}
            style={{ 
              position: 'absolute', 
              right: '-20px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary)', 
              color: 'var(--white)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              zIndex: 20, 
              boxShadow: '0 10px 20px rgba(255,119,51,0.3)', 
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>

          <div 
            ref={scrollRef}
            style={{ 
              display: 'flex', 
              gap: '30px', 
              overflowX: 'auto', 
              paddingBottom: '40px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Hiding Scrollbar */}
            <style>{`.container div::-webkit-scrollbar { display: none; }`}</style>
            
            {portfolio.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                style={{ flex: '0 0 48%', position: 'relative', minWidth: '350px' }}
              >
                 <div style={{ borderRadius: '24px', overflow: 'hidden', backgroundColor: '#F8F9FA', position: 'relative' }}>
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={item.img} 
                      alt={item.title} 
                      style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
                    />
                    
                    {/* Overlay Text inside Image */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: '40px', 
                      left: '40px', 
                      right: '40px',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      padding: '24px',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.8)'
                     }}>
                       <h3 style={{ fontSize: '32px', color: '#1B1B3A', marginBottom: '8px' }}>{item.title.split(' ').slice(0,2).join(' ')}</h3>
                       <div style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}>{item.category}</div>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '40px 0 60px' }}>
          <div style={{ width: '24px', height: '8px', borderRadius: '4px', backgroundColor: 'var(--primary)' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#E5E5E5' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#E5E5E5' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#E5E5E5' }}></div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          {tags.map((tag, idx) => (
             <div key={idx} style={{ 
               padding: '12px 24px', 
               borderRadius: '999px',
               backgroundColor: '#FFFFFF',
               border: '1px solid #E5E5E5',
               color: '#1B1B3A',
               fontWeight: '500',
               cursor: 'pointer',
               boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
             }}>
               {tag}
             </div>
          ))}
        </div>

        {/* Detailed Text */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingBottom: '80px' }}>
           <h3 style={{ fontSize: '32px', color: '#1B1B3A', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Sea Surface Temperature Predicting Device
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer' }}>↗</div>
           </h3>
           <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
             Designed and patented a sophisticated portable device for real-time monitoring and mapping of sea surface temperature and potential marine pollution anomalies, utilizing advanced neural architectures.
           </p>
        </div>

      </div>
    </section>
  );
}

