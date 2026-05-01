import React, { useEffect, useRef } from 'react';
import { Award, CheckCircle } from 'lucide-react';
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
    <section id="patents" className="py-24 bg-white relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 lg:px-12 relative">
        
        {/* Background Decorative element */}
        <div className="absolute right-[5%] top-[20%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-primary-600/10 rounded-full blur-[50px] pointer-events-none"></div>

        <div className="text-center max-w-2xl mx-auto mb-16 patent-anim">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#ea580c]/10 text-[#ea580c] mb-8 shadow-inner">
            <Award size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
            Patents & <span className="text-[#ea580c]">Innovation</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Transforming novel research into protected intellectual property. Serving 7+ active patents and 7+ software copyrights.
          </p>
        </div>

        <div className="flex flex-col gap-5 max-w-4xl mx-auto">
          {PATENTS.map((patent, idx) => (
            <div key={idx} className="patent-anim group flex flex-col sm:flex-row sm:items-center justify-between p-7 sm:p-9 bg-white border border-slate-100 rounded-[32px] transition-all duration-500 hover:border-[#ea580c]/30 hover:shadow-[0_20px_60px_rgba(234,88,12,0.08)] hover:-translate-y-1.5 cursor-default">
              <div className="flex items-start sm:items-center gap-5 sm:gap-8 mb-4 sm:mb-0">
                <span className="text-2xl sm:text-3xl font-black text-slate-100 group-hover:text-[#ea580c]/10 transition-colors duration-500" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-lg sm:text-xl font-bold text-slate-800 leading-snug group-hover:text-[#ea580c] transition-colors duration-500">
                  {patent}
                </span>
              </div>
              <div className="flex items-center gap-2.5 self-start sm:self-center px-4 py-2 bg-green-50 text-green-700 text-xs font-black uppercase tracking-widest rounded-xl border border-green-100 shadow-sm">
                <CheckCircle size={16} strokeWidth={2.5} />
                Granted
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

