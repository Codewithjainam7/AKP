import React, { useEffect } from 'react';
import PageTransition from './PageTransition';
import Experience from '../components/Experience';
import { motion } from 'framer-motion';
import { Briefcase, Award, TrendingUp, Users } from 'lucide-react';

export default function Career() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { icon: <Briefcase className="text-primary-500" />, label: 'Years Experience', value: '7+' },
    { icon: <Award className="text-blue-500" />, label: 'Patents & Copyrights', value: '5+' },
    { icon: <Users className="text-purple-500" />, label: 'Students Mentored', value: '500+' },
    { icon: <TrendingUp className="text-green-500" />, label: 'Research Papers', value: '10+' },
  ];

  return (
    <PageTransition>
      <div className="bg-[#0F0F11] pt-32 pb-20">
        {/* Career Hero */}
        <div className="container mx-auto px-6 lg:px-12 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl sm:text-8xl font-bold text-white mb-8 tracking-tighter leading-none" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
              Professional <br /> <span className="text-primary-500">Milestones</span>
            </h1>
            <p className="text-slate-400 text-xl sm:text-2xl leading-relaxed max-w-2xl">
              A comprehensive look at my journey in academia and industrial research, dedicated to pushing the boundaries of AI and Machine Learning.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                className="p-8 rounded-[32px] bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:border-primary-500/30 transition-all duration-500"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Experience Section */}
        <Experience isPage={true} />

        {/* Professional Philosophy */}
        <div className="container mx-auto px-6 lg:px-12 mt-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display, Syne, sans-serif)' }}>
                Commitment to <span className="text-blue-500">Excellence</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                In every role, from teaching undergraduate students to developing sophisticated ML models for environmental monitoring, my goal remains the same: to bridge the gap between theoretical research and practical, high-impact applications.
              </p>
              <div className="flex gap-4">
                 <div className="w-12 h-1 bg-primary-500 rounded-full" />
                 <div className="w-4 h-1 bg-white/10 rounded-full" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-[40px] overflow-hidden bg-slate-900 border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" 
                alt="Professional Environment"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
