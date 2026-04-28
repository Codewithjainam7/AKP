import React from 'react';
import TiltCard from './TiltCard';

export default function Experience() {
  const experiences = [
    { id: 1, company: 'Assistant Professor', date: '2024 - 2026', role: 'Thakur College of Science and Commerce', desc: 'Department of AI & ML. Courses Taught: Artificial Intelligence, Machine Learning (ML), Deep Learning (DL).' },
    { id: 2, company: 'M.Sc Information Technology', date: '2022 - 2024', role: 'Mumbai University', desc: 'Completed Master\'s from Thakur College of Science and Commerce, Mumbai.' },
    { id: 3, company: 'B.Sc Information Technology', date: '2014 - 2017', role: 'Mumbai University', desc: 'Completed Bachelor\'s from Thakur College of Science and Commerce, Mumbai.' }
  ];

  return (
    <section id="experience" className="section-padding" style={{ backgroundColor: '#FFFFFF', position: 'relative', zIndex: 11 }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <h2 style={{ fontSize: '48px', color: '#1B1B3A', textAlign: 'center', marginBottom: '80px', letterSpacing: '-1px' }}>
          My <span style={{ color: 'var(--primary)' }}>Work Experience</span>
        </h2>

        <div style={{ position: 'relative' }}>
          
          {/* Center Dotted Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            borderLeft: '2px dashed #E5E5E5',
            transform: 'translateX(-50%)',
            zIndex: 0
          }}></div>

          {experiences.map((exp, idx) => (
            <div key={exp.id} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: idx !== experiences.length - 1 ? '60px' : '0',
              position: 'relative',
              zIndex: 1
            }}>
              
              {/* Left Column (Company) */}
              <div style={{ flex: 1, paddingRight: '60px', textAlign: 'right' }}>
                <TiltCard style={{ padding: '20px', background: '#F8F9FA', borderRadius: '16px', display: 'inline-block' }}>
                  <h3 style={{ fontSize: '24px', color: '#1B1B3A', marginBottom: '8px' }}>{exp.company}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '500' }}>{exp.date}</p>
                </TiltCard>
              </div>

              {/* Center Dot (Filled Orange if active, outline otherwise) */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2px solid var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}>
                <div style={{
                   width: '16px',
                   height: '16px',
                   borderRadius: '50%',
                   backgroundColor: idx === 2 ? 'var(--primary)' : 'transparent',
                }}></div>
              </div>

              {/* Right Column (Role details) */}
              <div style={{ flex: 1, paddingLeft: '60px', textAlign: 'left' }}>
                <TiltCard style={{ padding: '20px', background: '#F8F9FA', borderRadius: '16px', display: 'inline-block' }}>
                  <h3 style={{ fontSize: '24px', color: '#1B1B3A', marginBottom: '8px' }}>{exp.role}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', maxWidth: '300px' }}>{exp.desc}</p>
                </TiltCard>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
