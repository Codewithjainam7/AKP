import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const services = [
    { title: 'Machine Learning', img: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=400&q=80' },
    { title: 'Deep Learning', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80' },
    { title: 'NLP', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80' }
  ];

  useEffect(() => {
    // Horizontal scrolling for services mimicking the UI dots
    const ctx = gsap.context(() => {
      gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: "+=1000"
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} style={{
      position: 'relative',
      padding: '100px 0',
      backgroundColor: '#121212', // Dark background replacing black wave
      color: 'var(--white)',
      borderTopLeftRadius: '40px',
      borderTopRightRadius: '40px',
      marginTop: '-40px',
      zIndex: 10,
      overflow: 'hidden'
    }}>
      
      {/* Background Graphic blobs (orange) matching video */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,119,51,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,119,51,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }}></div>

      <div className="container" style={{ padding: '0 5%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', color: 'var(--white)', letterSpacing: '-1px' }}>
            My <span style={{ color: 'var(--primary)' }}>Services</span>
          </h2>
          <p style={{ maxWidth: '400px', fontSize: '14px', color: '#AAAAAA', textAlign: 'right' }}>
            I aim to leverage my technical skills, research experience and passion for emerging technologies to develop impactful and sustainable AI solutions.
          </p>
        </div>

        {/* Scrollable Container */}
        <div style={{ overflow: 'visible', paddingBottom: '40px' }}>
           <div ref={scrollRef} style={{ display: 'flex', gap: '30px', width: 'max-content' }}>
              {services.map((service, idx) => (
                <div key={idx} style={{
                  width: '380px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s'
                }} className="hover-target">
                  <h3 style={{ fontSize: '24px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>{service.title}</h3>
                  
                  <div style={{ 
                    position: 'relative', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    flex: 1, 
                    minHeight: '200px'
                  }}>
                    <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                   <button style={{
                      marginTop: '20px',
                      alignSelf: 'flex-end',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--primary)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                   }}>↗</button>
                </div>
              ))}
           </div>
        </div>
        
        {/* Mock Pagination Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          <div style={{ width: '24px', height: '8px', borderRadius: '4px', backgroundColor: 'var(--primary)' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
        </div>

      </div>
    </section>
  );
}
