import React from 'react';
import { motion } from 'framer-motion';

export default function WhyWorkWithMe() {
  return (
    <section id="hire" className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        
        {/* Left Side Avatar */}
        <div style={{ flex: '0 0 45%', position: 'relative', height: '500px' }}>
          {/* Background orange circle */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '50px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: '#FFE9DF', // Light peach background
            zIndex: 0
          }}></div>

          <img 
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80" 
            alt="Jenny pointing" 
            style={{
              position: 'absolute',
              bottom: '0',
              left: '50px',
              height: '450px',
              objectFit: 'contain',
              zIndex: 1
            }} 
          />
        </div>

        {/* Right Side Content */}
        <div style={{ flex: 1, paddingLeft: '40px' }}>
          <h2 style={{ fontSize: '56px', color: '#1B1B3A', marginBottom: '24px', letterSpacing: '-1px' }}>
            Why <span style={{ color: 'var(--primary)' }}>Hire me?</span>
          </h2>
          
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

          <a href="#contact" className="pill-btn hover-target" style={{ backgroundColor: '#1B1B1B', color: 'var(--white)', padding: '16px 40px', fontSize: '18px', border: 'none' }}>
            Hire me
          </a>
        </div>

      </div>
    </section>
  );
}
