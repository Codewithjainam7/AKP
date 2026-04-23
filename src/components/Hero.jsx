import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Star, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Staggered Entrance Animation
      const animateElements = document.querySelectorAll('[data-animate]');
      if (animateElements.length > 0) {
        gsap.from(animateElements, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2
        });
      }

      // 2. Reveal SVG Path strokes
      const path = document.querySelector('.hero h1 svg path');
      if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { 
            strokeDasharray: length, 
            strokeDashoffset: length 
          });

          gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power2.inOut",
              delay: 1
          });
      }

      // 3. Desktop parallax effect
      if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 30;
            const y = (clientY / window.innerHeight - 0.5) * 30;
            
            gsap.to('.hero .container, .hero .absolute', { 
              x: x * 0.5, 
              y: y * 0.5, 
              duration: 2, 
              ease: 'power2.out',
              overwrite: "auto"
            });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero min-h-screen flex flex-col justify-center items-center py-32 px-6 relative overflow-hidden bg-white text-dark-900">
      <div className="container mx-auto relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-6 py-2 rounded-full mb-12 shadow-sm" data-animate>
           <span className="text-xs font-black uppercase tracking-widest text-primary-600">Hello! 👋 Welcome to my Space</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[0.9] tracking-tighter" data-animate>
          I'm <span className="text-primary-600">Amit,</span><br />
          Academic <span className="relative">Innovator
            <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full" viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 18C100 2 300 2 398 18" stroke="#fb8a3d" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>

        {/* Main Content Area */}
        <div className="max-w-2xl mx-auto mt-16 relative">
          {/* Portrait Area */}
          <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full bg-primary-600/5 border-4 border-primary-600/20 relative mb-16 flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent z-10"></div>
             <img src="/amit_sir_photo.png" alt="Amit Kumar Pandey" className="w-full h-full object-cover relative z-0" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6" data-animate>
             <a href="#research" className="px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-primary-600/20 flex items-center space-x-3">
               <span>View Portfolio</span>
               <ArrowUpRight className="w-5 h-5" />
             </a>
          </div>
        </div>
      </div>

      {/* Impact Stats (Floating) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block space-y-12">
         <div className="text-right" data-animate>
            <div className="flex items-center justify-end space-x-1 mb-1">
               <Star className="w-4 h-4 text-primary-600 fill-primary-600" />
               <Star className="w-4 h-4 text-primary-600 fill-primary-600" />
               <Star className="w-4 h-4 text-primary-600 fill-primary-600" />
               <Star className="w-4 h-4 text-primary-600 fill-primary-600" />
               <Star className="w-4 h-4 text-primary-600 fill-primary-600" />
            </div>
            <p className="text-3xl font-black">10 Years</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Experience</p>
         </div>
         <div className="text-right" data-animate>
            <p className="text-3xl font-black">1000+</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Students Mentored</p>
         </div>
      </div>

      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50">
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
