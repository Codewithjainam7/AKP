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

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smoother scroll setup or global animations can go here
    
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
