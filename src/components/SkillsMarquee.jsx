import React from 'react';

const SKILLS = [
  'Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP',
  'YOLO', 'React', 'Data Science', 'Machine Learning', 'Deep Learning',
  'Climate AI', 'Acoustic Analytics', 'Generative AI'
];

export default function SkillsMarquee() {
  return (
    <section style={{ padding: '60px 0', backgroundColor: 'var(--primary)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', width: '200%' }} className="marquee-container">
        
        <div className="marquee-content" style={{ display: 'flex', gap: '40px', paddingRight: '40px' }}>
          {SKILLS.concat(SKILLS).map((skill, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '32px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--white)',
              textTransform: 'uppercase'
            }}>
              <span style={{ color: 'var(--badge-yellow)' }}>✦</span>
              {skill}
            </div>
          ))}
        </div>
        
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .marquee-content {
          animation: slide 30s linear infinite;
        }
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
