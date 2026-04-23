import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark-900 text-white pt-24 pb-12 mt-24 rounded-t-[3rem] md:rounded-t-[4rem] relative overflow-hidden border-t border-white/5 shadow-2xl">
      {/* Orange Bottom Line Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary-700 via-primary-500 to-primary-700 shadow-[0_0_20px_rgba(234,88,12,0.8)]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Top Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-white">
            Lets Connect there
          </h2>
          <a href="#" className="inline-flex items-center justify-center bg-white text-primary-600 font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition duration-300">
            Hire me ↗
          </a>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 border-t border-white/10 pt-16">
          {/* Left Panel: Profile Info */}
          <div className="col-span-1 lg:col-span-5 pr-0 lg:pr-12">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-white text-sm">
                JO
              </div>
              <span className="font-black text-2xl tracking-widest uppercase">JCREA</span>
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
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white">
                in
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white">
                tw
              </a>
              <div className="flex items-end space-x-8">
                 <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-sm font-medium text-slate-300 hover:text-white">
                   ig
                 </a>
                 <div className="w-3 h-3 rounded-full bg-primary-600 mb-1"></div>
              </div>
            </div>
          </div>

          {/* Right Panel: Links and Form */}
          <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Navigation Column */}
            <div>
              <h4 className="text-primary-600 font-bold mb-8 transition-colors">Navigation</h4>
              <ul className="space-y-5 text-sm font-medium text-slate-100">
                <li><a href="#" className="hover:text-primary-600 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Service</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Resume</a></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors">Project</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-primary-600 font-bold mb-8 transition-colors">Contact</h4>
              <ul className="space-y-6 text-sm font-medium text-slate-100">
                <li><span className="block">+91 83698 31270</span></li>
                <li><span className="block opacity-90">amitpandey8089@gmail.com</span></li>
                <li><a href="#" className="hover:text-primary-600 transition-colors inline-block mt-2">LinkedIn Profile</a></li>
              </ul>
            </div>

            {/* Input Form Column */}
            <div className="col-span-1 md:col-span-1">
              <h4 className="text-primary-600 font-bold mb-8 transition-colors">Get the latest information</h4>
              <div className="relative flex items-center mt-4">
                <input 
                  type="email" 
                  className="w-full bg-white text-dark-900 rounded-full py-4 pl-6 pr-16 outline-none shadow-inner"
                  placeholder=""
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-600 hover:bg-primary-700 transition-colors rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

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
  );
};

export default Footer;
