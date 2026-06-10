import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import Research from './pages/Research';
import Career from './pages/Career';
import CopyrightPage from './pages/CopyrightPage';
import PatentsPage from './pages/PatentsPage';
import ResearchPapersPage from './pages/ResearchPapersPage';
import CertificationsPage from './pages/CertificationsPage';
import AdminDashboard from './pages/AdminDashboard';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

import { fetchDatabase } from './data/dbHelper';

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    // Fetch fresh data from Supabase
    fetchDatabase().then(() => {
      setIsDataLoaded(true);
    });
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
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

  if (!isDataLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1a1a2e]">
        <div className="text-white text-xl animate-pulse">Loading amazing things...</div>
      </div>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/career" element={<Career />} />
            <Route path="/copyright" element={<CopyrightPage />} />
            <Route path="/patents" element={<PatentsPage />} />
            <Route path="/research-papers" element={<ResearchPapersPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
