import React, { useEffect, useRef } from 'react';
import { Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PATENTS = [
  'Deep learning apparatus for SST prediction',
  'Underwater pollution detection method using CNNs',
  'Cognitive state analysis via AI generated acoustics',
  'Automated crop yield mapping from drone imagery',
  'Real-time network security monitoring AI'
];

export default function Patents() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.patent-anim', 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="patents" className="section-padding" style={{ backgroundColor: '#ffffff', color: '#000000' }} ref={containerRef}>
      <div className="container" style={{ position: 'relative' }}>
        
        {/* Background Decorative element */}
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '20%',
          width: '300px',
          height: '300px',
          background: 'var(--primary)',
          opacity: '0.05',
          borderRadius: '50%',
          filter: 'blur(50px)'
        }}></div>

        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }} className="patent-anim">
          <Award size={48} color="var(--primary)" style={{ margin: '0 auto 24px' }} />
          <h2 style={{ fontSize: '42px', marginBottom: '16px', color: '#000000' }}>Patents & Innovation</h2>
          <p style={{ color: '#4b5563', fontSize: '18px' }}>
            Transforming novel research into protected intellectual property. Serving 7+ active patents and 7+ software copyrights.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
          {PATENTS.map((patent, idx) => (
            <div key={idx} className="patent-anim patent-item" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '24px 32px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '20px' }}>{String(idx + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: '18px', fontWeight: '500', color: '#000000' }}>{patent}</span>
              </div>
              <div style={{ color: '#F59E0B', fontSize: '14px', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: '6px 12px', borderRadius: '8px' }}>
                Granted
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .patent-item:hover {
          border-color: var(--primary);
          background-color: rgba(79, 70, 229, 0.05);
          transform: translateX(10px);
        }
      `}} />
    </section>
  );
}

