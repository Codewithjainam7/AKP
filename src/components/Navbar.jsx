import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = 'pan-y';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = 'pan-y';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        id="main-nav-wrapper" 
        className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 transition-all duration-500"
      >
        <nav 
          id="main-nav"
          className="bg-dark-900/90 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white w-[90%] max-w-5xl transition-all duration-500"
        >
          {/* Left Links */}
          <ul className="hidden md:flex items-center space-x-8 w-1/3 justify-start">
            <li><Magnetic><Link to="/" className="text-white hover:text-primary-600 transition-colors inline-block">Home</Link></Magnetic></li>
            <li><Magnetic><Link to="/#about" className="text-white hover:text-primary-600 transition-colors inline-block">About</Link></Magnetic></li>
            <li><Magnetic><Link to="/research" className="text-white hover:text-primary-600 transition-colors inline-block">Research</Link></Magnetic></li>
          </ul>
          
          {/* Logo (Center) */}
          <div className="w-1/3 flex justify-center">
            <Magnetic>
              <Link to="/" className="flex items-center space-x-1 group whitespace-nowrap inline-block">
                <span className="text-white font-black text-2xl tracking-tighter transition-all group-hover:text-primary-600">AMIT</span>
                <span className="text-primary-600 font-black text-2xl tracking-tighter">.</span>
              </Link>
            </Magnetic>
          </div>
          
          {/* Right Links / Mobile Toggle Container */}
          <div className="w-1/3 flex justify-end">
            {/* Desktop Right Links */}
            <ul className="hidden md:flex items-center space-x-8">
              <li><Magnetic><Link to="/research#patents" className="text-white hover:text-primary-600 transition-colors inline-block">Patents</Link></Magnetic></li>
              <li><Magnetic><Link to="/#experience" className="text-white hover:text-primary-600 transition-colors inline-block">Career</Link></Magnetic></li>
              <li><Magnetic><Link to="/#contact" className="text-white hover:text-primary-600 transition-colors inline-block">Contact</Link></Magnetic></li>
            </ul>
            
            {/* Mobile Toggle */}
            <button 
              id="hamburger" 
              className="md:hidden text-white p-2"
              onClick={() => setIsOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar Menu */}
      <div 
        id="mobile-menu" 
        className={`fixed top-0 right-0 h-screen w-full bg-dark-900/98 backdrop-blur-3xl z-[60] flex flex-col p-12 pb-40 transition-transform duration-700 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-1">
            <span className="text-white font-black text-2xl tracking-tighter">AMIT</span>
            <span className="text-primary-600 font-black text-2xl">.</span>
          </div>
          <button 
            id="close-menu" 
            className="text-white p-4 hover:text-primary-600 transition-colors bg-white/5 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <ul className="space-y-6 flex-1 flex flex-col justify-center">
          {[
            { name: 'Home', href: '/' },
            { name: 'About', href: '/#about' },
            { name: 'Research', href: '/research' },
            { name: 'Patents', href: '/research#patents' },
            { name: 'Career', href: '/#experience' },
            { name: 'Contact', href: '/#contact' },
          ].map((item) => (
            <li key={item.name}>
              <Link 
                to={item.href} 
                className="text-4xl text-slate-400 font-black uppercase tracking-widest hover:text-white flex items-center justify-between group transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span>{item.name}</span> 
                <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="mt-12 flex space-x-6 pb-12">
            <Magnetic>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-all text-slate-400 hover:text-white border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-all text-slate-400 hover:text-white border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary-600 transition-all text-slate-400 hover:text-white border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </Magnetic>
        </div>
      </div>
    </>
  );
};

export default Navbar;
