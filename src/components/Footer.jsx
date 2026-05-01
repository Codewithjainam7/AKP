import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './Magnetic';
import { motion } from 'framer-motion';

const Footer = () => {
  const location = useLocation();
  const wrapperBg = location.pathname === '/' ? 'bg-primary-600' : 'bg-[#0a0a0a]';

  return (
    <div className={`relative z-10 ${wrapperBg}`}>
      <footer id="contact" className="bg-dark-900 text-white pt-24 pb-12 rounded-t-[3rem] md:rounded-t-[4rem] relative overflow-hidden border-t-2 border-white/20 shadow-2xl">
      {/* Orange Bottom Line Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-700 via-primary-500 to-primary-700 shadow-[0_0_20px_rgba(234,88,12,0.8)]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white">
            Lets Connect there
          </h2>
          <Magnetic>
            <a href="https://wa.me/918369831270" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-primary-600 font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition duration-300">
              Hire me ↗
            </a>
          </Magnetic>
        </motion.div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-12 border-t border-white/10 pt-16">
          {/* Left Panel: Profile Info */}
          <div className="col-span-1 lg:col-span-5 pr-0 lg:pr-12">
            
            {/* Logo */}
            <div className="flex items-center space-x-0 mb-8">
              <span className="text-white font-black text-4xl tracking-normal font-heading">AMIT</span>
              <span className="text-primary-600 font-black text-4xl tracking-normal">.</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-medium">
              Address: Room No 10, Sai Prabha Welfare Society, Ashok Nagar,<br />
              Ghartan Pada no 2, Dahisar East, Mumbai -400068
            </p>

            <p className="text-slate-300 text-sm font-medium mb-10">
              DOB. 5th March 1997
            </p>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Magnetic>
                <a href="https://www.linkedin.com/in/amit-kumar-pandey-03994928b/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0077b5] transition-all flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://www.instagram.com/amitpandey5341/?next=%2F" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E1306C] transition-all flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </Magnetic>
              <div className="w-3 h-3 rounded-full bg-primary-600"></div>
            </div>
          </div>

          {/* Right Panel: Links and Form */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            
            {/* Navigation Column */}
            <div>
              <h4 className="text-primary-600 font-bold mb-8 transition-colors">Navigation</h4>
              <ul className="space-y-5 text-sm font-medium text-slate-100">
                <li><Link to="/" className="hover:text-primary-600 transition-colors">Home</Link></li>
                <li><Link to="/#about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
                <li><Link to="/research" className="hover:text-primary-600 transition-colors">Research</Link></li>
                <li><Link to="/#experience" className="hover:text-primary-600 transition-colors">Career</Link></li>
                <li><Link to="/research#patents" className="hover:text-primary-600 transition-colors">Patents</Link></li>
                <li><Link to="/research" className="hover:text-primary-600 transition-colors">Projects</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-primary-600 font-bold mb-8 transition-colors">Contact</h4>
              <ul className="space-y-6 text-sm font-medium text-slate-100 break-all">
                <li><a href="tel:+918369831270" className="block hover:text-primary-600 transition-colors">+91 83698 31270</a></li>
                <li><a href="mailto:amitpandey8089@gmail.com" className="block opacity-90 hover:text-primary-600 transition-colors">amitpandey8089@gmail.com</a></li>
              </ul>
            </div>

            {/* Empty Column for spacing after removal of newsletter */}
            <div className="col-span-1 md:col-span-1"></div>

          </div>
        </div>

        {/* Bottom Footer Area */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-300 font-medium">
          <p className="mb-4 md:mb-0">
            Copyright &copy; 2026 Amit Pandey. All Rights Reserved.
          </p>
          <div className="flex space-x-2">
             <a href="#" className="hover:text-white transition-colors">User Terms & Conditions</a>
             <span>|</span>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
