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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600/10 text-primary-600 mb-6">
            <Award size={40} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Patents & Innovation</h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Transforming novel research into protected intellectual property. Serving 7+ active patents and 7+ software copyrights.
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {PATENTS.map((patent, idx) => (
            <div key={idx} className="patent-anim group flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl transition-all duration-300 hover:border-primary-600/30 hover:bg-white hover:shadow-xl hover:shadow-primary-600/5 hover:-translate-y-1">
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-0">
                <span className="text-xl sm:text-2xl font-black text-primary-600/20 group-hover:text-primary-600 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-800 leading-snug group-hover:text-primary-600 transition-colors">
                  {patent}
                </span>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
                <CheckCircle size={14} />
                Granted
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

