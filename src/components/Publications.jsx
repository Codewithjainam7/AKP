import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, GraduationCap } from 'lucide-react';
import TiltCard from './TiltCard';

const PUBLICATIONS = [
  {
    title: 'Machine Learning Algorithm Based Sea Surface Temperature Prediction Model',
    journal: 'Indian Journal of Geo Marine Sciences (IJMS)',
    date: '2024',
    link: 'https://nopr.niscpr.res.in/handle/123456789/63129',
    description: 'Comprehensive methodology for predicting sea surface temperatures using advanced machine learning algorithms, published in the Indian Journal of Geo Marine Sciences (IJMS) by CSIR-NISCPR.'
  },
  {
    title: 'Image Enhancement of Underwater Images using Fusion',
    journal: 'Dogo Rangsang Research Journal',
    date: '2023',
    link: 'https://www.dfrjournal.com/index.php/dfr/article/view/47',
    description: 'Novel fusion-based approach for enhancing underwater imagery, addressing challenges of marine photography including color distortion and low visibility.'
  },
  {
    title: 'Identification of Parrot Species Using CNN and SVM Models',
    journal: 'Iconic Research And Engineering Journals',
    date: '2023',
    link: 'https://www.irejournals.com/formatedpaper/1705257.pdf',
    description: 'Comparative analysis of CNN and SVM for accuracy assessment in parrot species recognition, with CNN achieving a superior accuracy of 95%.'
  },
  {
    title: 'Polarimetric SAR Data Denoising using SOFM',
    journal: 'Iconic Research And Engineering Journals',
    date: '2023',
    link: 'https://www.irejournals.com/paper-details/1705252',
    description: 'Denoising polarimetric Synthetic Aperture Radar (SAR) data using Self-Organizing Feature Maps (SOFM) to enhance data quality for environmental monitoring.'
  },
  {
    title: 'Sea Surface Temperature Prediction by Using EDA and Exponential Smoothening Algorithm',
    journal: 'Iconic Research And Engineering Journals',
    date: '2023',
    link: 'https://www.irejournals.com/paper-details/1705276',
    description: 'Integrated approach for predicting sea surface temperature combining Exploratory Data Analysis and Exponential Smoothing for strong predictive capabilities.'
  },
  {
    title: 'Segregation of Marine Species using Deep Learning Techniques',
    journal: 'International Journal of Research and Analytical Reviews (IJRAR.ORG)',
    date: '2024',
    link: 'https://www.ijrar.org/papers/IJRAR24A3119.pdf',
    description: 'Utilizing CNN and KNN to evaluate and classify marine life species, aiming to develop an automated approach for aquatic biodiversity identification.'
  },
  {
    title: 'T20 Cricket Score Prediction Using Machine Learning',
    journal: 'Iconic Research And Engineering Journals',
    date: '2023',
    link: 'https://www.irejournals.com/formatedpaper/1705253.pdf',
    description: 'A T20 Cricket Score Predictor using the XGBoost algorithm to forecast final scores based on various match parameters and real-time dynamics.'
  }
];

export default function Publications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <section id="research" className="py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 text-primary-600 mb-4 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
            <GraduationCap size={18} />
            Research Work
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            International <span className="text-primary-600">Publications</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Exploring the frontiers of Machine Learning and Image Processing through peer-reviewed research and practical applications.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          {PUBLICATIONS.map((pub, idx) => (
            <TiltCard 
              key={idx} 
              variants={itemVariants}
              className="group relative bg-white/5 border border-white/10 rounded-[32px] p-8 flex flex-col h-full transition-all duration-500 hover:border-primary-600/50 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-primary-600/10 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-600/10 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                    {pub.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-primary-600 transition-colors">
                  {pub.title}
                </h3>
                
                <p className="text-primary-600 text-xs sm:text-sm font-bold mb-4 opacity-80 uppercase tracking-wider">
                  {pub.journal}
                </p>

                <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-4 group-hover:text-slate-300 transition-colors">
                  {pub.description}
                </p>

                <div className="mt-auto">
                  <a 
                    href={pub.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-600/30 text-white text-sm font-bold hover:bg-primary-600 hover:border-primary-600 transition-all duration-300 group/link"
                  >
                    Read More
                    <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Decorative Gradient Overlay */}
              <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary-600/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </TiltCard>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
