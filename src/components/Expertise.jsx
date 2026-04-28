import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  const services = [
    { title: 'Patents', img: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=600&q=80' },
    { title: 'Copyright', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80' },
    { title: 'Research Work', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <section 
      id="service" 
      className="relative z-10 bg-[#FAFAFA]"
    >
      <div className="relative py-24 bg-[#0F0F11] rounded-t-[48px] md:rounded-t-[64px] border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-white">
            My <span className="text-[#ea580c]">Services</span>
          </h2>
          <p className="max-w-md text-base text-gray-400 text-left md:text-right font-medium">
            I aim to leverage my technical skills, research experience and passion for emerging technologies to develop impactful and sustainable AI solutions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-[#1A1A1C] hover:bg-[#ea580c] rounded-[32px] border border-white/[0.05] hover:border-transparent shadow-2xl hover:shadow-[0_20px_60px_rgba(234,88,12,0.3)] flex flex-col transition-all duration-500 overflow-hidden hover:-translate-y-2 cursor-pointer"
            >
              {/* Top Padding Area for Text */}
              <div className="p-8 pb-0">
                <h3 className="text-3xl font-bold text-white mb-6 tracking-wide relative z-10">
                  {service.title}
                </h3>
                
                {/* Divider Line */}
                <div className="w-full h-px bg-[#2A2A2C] group-hover:bg-white/20 transition-colors duration-500 mb-8 relative z-10"></div>
              </div>
              {/* Image Container - Full Bleed, no cuts */}
              <div className="relative w-full h-[280px] sm:h-[320px] mt-auto z-10 rounded-t-[24px] overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-orange-900/10 transition-colors duration-500 z-10 pointer-events-none"></div>
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
              </div>

              {/* Squircle Cutout + Button — scales in from bottom-right on hover */}
              <div className="absolute bottom-0 right-0 z-20 scale-0 group-hover:scale-100 origin-bottom-right transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="relative w-[104px] h-[104px] bg-[#ea580c] rounded-tl-[34px]">
                  {/* Top Reverse Curve */}
                  <svg className="absolute -top-7 right-0 w-7 h-7 text-[#ea580c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 24H0C13.2548 24 24 13.2548 24 0V24Z" />
                  </svg>
                  {/* Left Reverse Curve */}
                  <svg className="absolute bottom-0 -left-7 w-7 h-7 text-[#ea580c]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 24H0C13.2548 24 24 13.2548 24 0V24Z" />
                  </svg>
                  {/* The Button — pops in with a delay */}
                  <button className="absolute bottom-4 right-4 w-[64px] h-[64px] bg-white rounded-full flex items-center justify-center text-[#ea580c] shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-0 group-hover:scale-100 transition-transform duration-400 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] ring-2 ring-white/20">
                    <ArrowUpRight className="w-7 h-7 transform group-hover:rotate-45 transition-transform duration-500 delay-200" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
