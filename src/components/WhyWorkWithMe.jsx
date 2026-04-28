import React from 'react';
import { motion } from 'framer-motion';
import GSAPTextReveal from './GSAPTextReveal';

export default function WhyWorkWithMe() {
  return (
    <section id="hire" className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        
        {/* Left Side Avatar */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ flex: '0 0 45%', position: 'relative', height: '550px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          
          {/* Vertical Name Along Left Edge */}
          <div style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%) rotate(-90deg)',
            fontSize: '14px',
            fontWeight: '800',
            letterSpacing: '8px',
            color: '#D0CCC5',
            textTransform: 'uppercase',
            zIndex: 0,
            whiteSpace: 'nowrap',
            userSelect: 'none'
          }}>AMIT KUMAR PANDEY</div>

          {/* Large "01" Behind Photo */}
          <div style={{
            position: 'absolute',
            right: '10px',
            top: '30px',
            fontSize: '180px',
            fontWeight: '900',
            color: '#F0EDE8',
            lineHeight: '1',
            zIndex: 0,
            userSelect: 'none',
            fontFamily: 'serif'
          }}>01</div>

          {/* Reverse L-Border — Top & Right */}
          <div style={{
            position: 'absolute',
            width: '360px',
            height: '440px',
            right: '40px',
            top: '55px',
            zIndex: 0,
            borderTop: '3px solid var(--primary)',
            borderRight: '3px solid var(--primary)'
          }}></div>

          {/* Main Photo */}
          <div style={{
            width: '340px',
            height: '420px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.08)'
          }}>
            <img 
              src="/amit_sir_photo.png" 
              alt="Amit Kumar" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }} 
            />
          </div>

          {/* Caption Line Below Photo */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '80px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 2
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#D0CCC5' }}></div>
            <span style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '3px', color: '#999', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Researcher · Innovator</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#D0CCC5' }}></div>
          </div>
        </motion.div>

        {/* Right Side Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ flex: 1, paddingLeft: '40px' }}
        >
          <div style={{ fontSize: '56px', color: '#1B1B3A', marginBottom: '24px', letterSpacing: '-1px', fontWeight: 'bold' }}>
            <GSAPTextReveal text="Why Hire me?" />
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', maxWidth: '400px', marginBottom: '40px' }}>
            To secure a challenging and growth-oriented position in a dynamic organization where I can apply my knowledge of Artificial Intelligence, data science, and soft computing to real-world problem solving.
          </p>

          <div style={{ display: 'flex', gap: '60px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#1B1B3A', marginBottom: '4px' }}>7+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Patents Issued</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '700', color: '#1B1B3A', marginBottom: '4px' }}>16+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Research Publications</div>
            </div>
          </div>

          <a href="#contact" className="pill-btn" style={{ backgroundColor: '#1B1B1B', color: 'var(--white)', padding: '16px 40px', fontSize: '18px', border: 'none' }}>
            Hire me
          </a>
        </motion.div>

      </div>
    </section>
  );
}
