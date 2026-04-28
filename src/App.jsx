import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Experience from './components/Experience';
import WhyWorkWithMe from './components/WhyWorkWithMe';
import Projects from './components/Projects';
import Patents from './components/Patents';
import SkillsMarquee from './components/SkillsMarquee';
import Publications from './components/Publications';
import Footer from './components/Footer';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    
    // Global Scroll Reveal
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1, 
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="app-container">


      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <Experience />
        <WhyWorkWithMe />
        <Projects />
        <Patents />
        <SkillsMarquee />
        <Publications />
      </main>
      <Footer />
    </div>
  );
}

export default App;
