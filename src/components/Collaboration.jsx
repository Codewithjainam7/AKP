import React from 'react';

export default function Collaboration() {
  return (
    <section id="contact" style={{ backgroundColor: '#1B1B1B', color: 'var(--white)', padding: '100px 5% 40px', borderTopLeftRadius: '40px', borderTopRightRadius: '40px', marginTop: '-40px', position: 'relative', zIndex: 20 }}>
      <div className="container">
        
        {/* Top Connecting Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '80px', paddingBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '56px', letterSpacing: '-1px' }}>
            Lets Connect there
          </h2>
          <a href="mailto:amitpandey8089@gmail.com" className="pill-btn hover-target" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--primary)', padding: '16px 40px', fontSize: '18px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Hire me ↗
          </a>
        </div>

        {/* Footer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '80px' }}>
          
          {/* Logo & Text Column */}
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'var(--white)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              letterSpacing: '1px',
              marginBottom: '24px'
            }}>
              <div style={{ 
                width: '36px', height: '36px', 
                backgroundColor: 'var(--primary)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '12px',
                color: 'var(--white)',
                fontSize: '14px'
              }}>
                JC
              </div>
              JCREA
            </div>
            <p style={{ color: '#AAAAAA', lineHeight: '1.6', fontSize: '14px' }}>
              Address: Room No.10, Sai Prabha Welfare Society, Ashok Nagar, Ghartan Pada no 2, Dahisar East, Mumbai-400068<br/><br/>
              DOB: 5th March 1997
            </p>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>in</div>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>tw</div>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ig</div>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '24px' }}>Navigation</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li><a href="#home" style={{ color: '#CCCCCC', fontSize: '14px' }}>Home</a></li>
              <li><a href="#about" style={{ color: '#CCCCCC', fontSize: '14px' }}>About Us</a></li>
              <li><a href="#service" style={{ color: '#CCCCCC', fontSize: '14px' }}>Service</a></li>
              <li><a href="#resume" style={{ color: '#CCCCCC', fontSize: '14px' }}>Resume</a></li>
              <li><a href="#project" style={{ color: '#CCCCCC', fontSize: '14px' }}>Project</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '24px' }}>Contact</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ color: '#CCCCCC', fontSize: '14px' }}>+91 83698 31270</li>
              <li style={{ color: '#CCCCCC', fontSize: '14px', textTransform: 'lowercase' }}>amitpandey8089@gmail.com</li>
              <li><a href="https://www.linkedin.com/in/amit-kumar-pandey-03994928b/" target="_blank" rel="noreferrer" style={{ color: '#CCCCCC', fontSize: '14px' }}>LinkedIn Profile</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '24px' }}>Get the latest information</h4>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
               <input 
                 type="email" 
                 placeholder="Email Address" 
                 style={{ 
                   width: '100%', 
                   padding: '16px 24px', 
                   backgroundColor: '#FFFFFF', 
                   border: 'none', 
                   borderRadius: '999px',
                   fontFamily: 'var(--font-body)',
                   outline: 'none'
                 }} 
               />
               <button style={{ 
                 position: 'absolute', 
                 right: '8px', 
                 width: '40px', 
                 height: '40px', 
                 backgroundColor: 'var(--primary)', 
                 borderRadius: '50%',
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 color: 'var(--white)',
                 border: 'none'
               }}>
                 ➤
               </button>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#AAAAAA', fontSize: '14px' }}>Copyright © 2026 Amit Pandey. All Rights Reserved.</div>
          <div style={{ color: '#AAAAAA', fontSize: '14px' }}>User Terms & Conditions | Privacy Policy</div>
        </div>

      </div>
    </section>
  );
}
