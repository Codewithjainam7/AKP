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
      <div className="flex flex-col h-screen bg-[#FAFAFA] overflow-hidden">
        {/* Skeleton Navbar */}
        <div className="w-full h-16 bg-white border-b border-gray-100 flex items-center px-8 gap-6 shrink-0">
          <div className="h-8 w-28 rounded-lg skeleton-shimmer" />
          <div className="flex-1" />
          <div className="h-5 w-16 rounded-md skeleton-shimmer" />
          <div className="h-5 w-16 rounded-md skeleton-shimmer" />
          <div className="h-5 w-20 rounded-md skeleton-shimmer" />
          <div className="h-9 w-24 rounded-full skeleton-shimmer" />
        </div>

        {/* Skeleton Hero */}
        <div className="flex flex-1 items-center justify-center px-8 lg:px-20 gap-16">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-5 max-w-xl">
            <div className="h-4 w-24 rounded-full skeleton-shimmer" />
            <div className="h-14 w-full rounded-2xl skeleton-shimmer" />
            <div className="h-14 w-3/4 rounded-2xl skeleton-shimmer" />
            <div className="h-5 w-full rounded-lg skeleton-shimmer" />
            <div className="h-5 w-5/6 rounded-lg skeleton-shimmer" />
            <div className="h-5 w-2/3 rounded-lg skeleton-shimmer" />
            <div className="flex gap-4 mt-4 items-center">
              <div className="h-12 w-40 rounded-full skeleton-shimmer" />
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <div className="h-6 w-12 rounded-md skeleton-shimmer" />
                  <div className="h-3 w-16 rounded-md skeleton-shimmer" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-6 w-10 rounded-md skeleton-shimmer" />
                  <div className="h-3 w-12 rounded-md skeleton-shimmer" />
                </div>
              </div>
            </div>
          </div>

          {/* Right image blob */}
          <div className="hidden lg:flex items-center justify-center w-[420px] h-[420px] shrink-0">
            <div
              className="w-80 h-80 skeleton-shimmer"
              style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
            />
          </div>
        </div>

        {/* Shimmer keyframes injected inline */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -600px 0; }
            100% { background-position: 600px 0; }
          }
          .skeleton-shimmer {
            background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%);
            background-size: 600px 100%;
            animation: shimmer 1.4s infinite linear;
          }
        `}</style>
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
