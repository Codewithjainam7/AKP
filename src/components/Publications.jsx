import React from 'react';
import { BookOpen } from 'lucide-react';

const PUBLICATIONS = [
  {
    title: 'Deep Learning Model for Ocean Surface State Prediction Using SST Data',
    conf: 'IEEE Sensors Journal',
    year: '2023'
  },
  {
    title: 'Cognitive State Analysis via AI-Generated Acoustics for Neuro-Enhancement',
    conf: 'International Conference on Medical Informatics',
    year: '2023'
  },
  {
    title: 'Automated Crop Yield Mapping from Drone Imagery using YOLOv8',
    conf: 'AgriTech AI Symposium',
    year: '2022'
  },
  {
    title: 'Underwater Pollution Detection: A Convolutional Neural Network Approach',
    conf: 'Journal of Ocean Engineering',
    year: '2022'
  }
];

export default function Publications() {
  return (
    <section id="publications" className="section-padding" style={{ backgroundColor: 'var(--bg-light)', color: '#000' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className="reveal">
          <h2 style={{ fontSize: '48px', color: '#0f172a' }}>
            Featured <span style={{ color: 'var(--primary)' }}>Publications</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '18px', marginTop: '16px' }}>15+ peer-reviewed research papers published internationally.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
          {PUBLICATIONS.map((pub, idx) => (
            <div key={idx} className="pub-card reveal" style={{
              display: 'flex',
              gap: '24px',
              padding: '30px',
              backgroundColor: 'var(--white)',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              alignItems: 'center'
            }}>
              
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)',
                flexShrink: 0
              }}>
                <BookOpen size={28} />
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#1e293b', lineHeight: '1.4' }}>{pub.title}</h3>
                <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                  <span>{pub.conf}</span>
                  <span>•</span>
                  <span>{pub.year}</span>
                </div>
              </div>

              <button className="pill-btn-outline hover-target" style={{ padding: '8px 20px', fontSize: '14px' }}>
                Read Paper
              </button>

            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .pub-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(79, 70, 229, 0.15) !important;
          border: 1px solid var(--primary);
        }
      `}} />
    </section>
  );
}
