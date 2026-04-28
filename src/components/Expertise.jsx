import React from 'react';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    { title: 'Patents', img: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80' },
    { title: 'Deep Learning', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80' },
    { title: 'NLP', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <section id="service" style={{
      position: 'relative',
      padding: '100px 0',
      backgroundColor: '#121212',
      color: 'var(--white)',
      borderTopLeftRadius: '40px',
      borderTopRightRadius: '40px',
      marginTop: '-40px',
      zIndex: 10,
      overflow: 'hidden'
    }}>
      
      {/* Background Graphic blobs */}
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

        {/* Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s'
              }}
              whileHover={{ y: -10 }}
            >
              <h3 style={{ fontSize: '24px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>{service.title}</h3>
              
              <div style={{ 
                position: 'relative', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                height: '300px'
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
                  fontSize: '20px',
                  cursor: 'pointer'
               }}>↗</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
