import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GenerativeAIBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Optimize canvas context for performance
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    let animationFrameId;
    let isVisible = true;

    const setSize = () => {
      // Lower resolution scaling for low-end devices if needed, but standard innerWidth is usually fine
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    
    // Debounce resize
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setSize, 200);
    };
    window.addEventListener('resize', handleResize);

    // Further reduced counts for mobile to guarantee 60fps
    const isMobile = window.innerWidth < 768;
    const streams = [];
    const streamCount = isMobile ? 10 : 35;
    
    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 120 + 60,
        speed: Math.random() * 1.5 + 0.5,
        thickness: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(234, 88, 12, 0.2)' : 'rgba(37, 99, 235, 0.15)',
        sinOffset: Math.random() * Math.PI * 2
      });
    }

    const nodes = [];
    const nodeCount = isMobile ? 20 : 60; // Reduced for performance
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    let mouse = { x: -1000, y: -1000, active: false };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseOut = () => { mouse.active = false; };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    // Intersection Observer: Pause animation when hero is not visible (Massive performance boost for rest of site)
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible) {
        draw();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0 });
    observer.observe(canvas);

    const draw = () => {
      if (!isVisible) return; // Don't draw if off-screen

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;

      // Draw Data Streams
      streams.forEach(stream => {
        stream.y += stream.speed;
        if (stream.y > canvas.height + stream.length) {
          stream.y = -stream.length;
          stream.x = Math.random() * canvas.width;
        }

        const waveX = stream.x + Math.sin(time + stream.sinOffset) * 15;

        const gradient = ctx.createLinearGradient(waveX, stream.y - stream.length, waveX, stream.y);
        gradient.addColorStop(0, 'rgba(250,250,250,0)');
        gradient.addColorStop(1, stream.color);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = stream.thickness;
        ctx.lineCap = 'round';
        ctx.moveTo(waveX, stream.y - stream.length);
        ctx.lineTo(waveX, stream.y);
        ctx.stroke();
      });

      // Draw ML Processing Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        node.pulse += 0.05;
        const currentRadius = node.radius + Math.sin(node.pulse) * 1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.abs(currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? 'rgba(234, 88, 12, 0.3)' : 'rgba(27, 27, 58, 0.15)';
        ctx.fill();

        // Optimized distance calculation (squared) for O(N^2) loop
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = node.x - nodes[j].x;
          const dy = node.y - nodes[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 12100) { // 110 * 110
            const distance = Math.sqrt(distSq); // Only calc exact root if close enough
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 - distance/1500})`; 
            ctx.lineWidth = 0.5;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 32400) { // 180 * 180
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(234, 88, 12, ${0.2 - dist/900})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Initial draw kick-off is handled by the IntersectionObserver when it fires immediately

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-90" />;
};

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set(['.hero-title', '.hero-subtitle', '.hero-cta', '.hero-stats'], { y: 60, opacity: 0 });
      gsap.set('.hero-image-wrapper', { scale: 0.8, opacity: 0, y: 30 });
      gsap.set('.svg-underline path', { strokeDasharray: 400, strokeDashoffset: 400 });

      // Animations
      tl.to('.hero-image-wrapper', {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: 'power4.out'
      })
      .to('.hero-title', {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out'
      }, "-=1.0")
      .to('.svg-underline path', {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.6")
      .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.8")
      .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)'
      }, "-=0.6")
      .to('.hero-stats', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="hero relative w-full h-[100dvh] min-h-[650px] flex flex-col justify-center items-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* GENERATIVE AI BACKGROUND */}
      <GenerativeAIBackground />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center items-center pt-20 lg:pt-0">
        
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* --- LEFT: TEXT & CTA --- */}
          <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 z-20 pointer-events-auto">
            
            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-[#1B1B3A]">
              <div className="overflow-hidden pb-1"><div className="hero-title">I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-400">Amit,</span></div></div>
              <div className="overflow-hidden pb-4">
                <div className="hero-title">
                  Academic{' '}
                  <span className="relative inline-block">
                    Innovator
                    <svg className="svg-underline absolute -bottom-1 lg:-bottom-2 left-0 w-full h-[14px]" viewBox="0 0 100 14" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 10 Q 50 2 100 10" stroke="#ea580c" strokeWidth="6" vectorEffect="non-scaling-stroke" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </h1>
            
            <p className="hero-subtitle mt-6 lg:mt-8 text-lg sm:text-xl text-slate-500 max-w-xl font-medium leading-relaxed">
              Bridging the gap between cutting-edge <strong className="text-[#1B1B3A]">Machine Learning</strong> research and scalable practical solutions.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 mt-10 w-full justify-center lg:justify-start">
              
              {/* Revamped Premium Button (Glitch-free) */}
              <div className="hero-cta">
                <a href="#research" className="group flex items-center gap-4 px-8 py-4 bg-[#1B1B3A] hover:bg-[#ea580c] text-white rounded-full shadow-[0_8px_20px_rgba(27,27,58,0.15)] hover:shadow-[0_15px_30px_rgba(234,88,12,0.3)] transition-all duration-300 transform hover:-translate-y-1">
                  <span className="font-bold text-[13px] sm:text-sm tracking-[0.2em] uppercase">
                    View Resume 
                  </span>
                  
                  <div className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#ea580c] transition-colors duration-300" />
                  </div>
                </a>
              </div>

              {/* Clean Inline Stats */}
              <div className="hero-stats flex items-center gap-6 sm:border-l-2 sm:border-slate-200 sm:pl-6 h-12">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-2xl font-black text-[#1B1B3A] leading-none">10<span className="text-primary-600">+</span></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Years Exp.</span>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-2xl font-black text-[#1B1B3A] leading-none">1000<span className="text-primary-600">+</span></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Mentored</span>
                </div>
              </div>
              
            </div>
          </div>

          {/* --- RIGHT: CIRCULAR PORTRAIT --- */}
          <div className="w-full lg:w-[45%] relative flex justify-center items-center order-1 lg:order-2 h-[300px] sm:h-[400px] lg:h-[500px] z-10 pointer-events-auto">
            <div className="hero-image-wrapper relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem] group perspective-[1000px]">
               
               {/* Ambient Glow */}
               <div className="absolute inset-[-10px] bg-gradient-to-tr from-primary-500 to-yellow-300 rounded-full blur-xl opacity-40 group-hover:opacity-70 group-hover:blur-2xl transition-all duration-700"></div>
               
               {/* Inner image container */}
               <div className="relative w-full h-full rounded-full overflow-hidden bg-white border-[6px] lg:border-[8px] border-white shadow-2xl z-20">
                 <img 
                    src="/amit_sir_photo.png" 
                    alt="Amit Kumar Pandey" 
                    className="w-full h-full object-cover" 
                 />
               </div>
               
            </div>
          </div>

        </div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40 hover:opacity-100 transition-opacity cursor-pointer text-slate-400 hidden md:block z-20 pointer-events-auto">
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </div>

    </section>
  );
};

export default Hero;
