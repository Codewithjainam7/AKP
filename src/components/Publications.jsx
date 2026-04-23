import React from 'react';
import { BookOpen, ExternalLink, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const PUBLICATIONS = [
  {
    title: 'Machine Learning Technique For Tuberculosis Detection',
    journal: 'INTERNATIONAL JOURNAL OF CREATIVE RESEARCH THOUGHTS - IJCRT',
    date: 'Mar 3, 2024',
    link: 'https://ijcrt.org/papers/IJCRT2403714.pdf',
    description: 'This project introduces a groundbreaking machine learning framework for TB detection, utilizing the K-Nearest Neighbors (KNN) algorithm. Through meticulous experimentation and parameter tuning, the study achieves an impressive 95.12% accuracy in classifying TB cases.'
  },
  {
    title: 'Cat Family Recognition by Using Convolution Neural Network',
    journal: 'Iconic Research And Engineering Journals',
    date: 'Dec 12, 2023',
    link: 'https://www.irejournals.com/formatedpaper/17052571.pdf',
    description: 'Utilizing Convolutional Neural Networks (CNNs) with TensorFlow and Keras to classify images of Cheetahs, Leopards, Lions, Pumas, and Tigers with high species recognition accuracy.'
  },
  {
    title: 'Facial Emotion Recognition of Cat Breeds by Using Convolution Neural Network',
    journal: 'Iconic Research And Engineering Journals',
    date: 'Dec 2023',
    link: 'https://www.irejournals.com/paper-details/1705255',
    description: 'An investigation into decoding the emotional states of animals using CNN algorithms, focusing on the intricate task of detecting and classifying emotional expressions in various cat breeds.'
  },
  {
    title: 'Facial Emotion Recognition of Human Species by Using Deep Learning Techniques',
    journal: 'Iconic Research And Engineering Journals',
    date: 'Nov 2023',
    link: 'https://www.irejournals.com/paper-details/1705255',
    description: 'Developing a robust CNN for Human Facial Expression Recognition, identifying emotions such as anger, happiness, neutrality, sadness, and surprise using TensorFlow and Keras.'
  },
  {
    title: 'Financial Analysis for Long Term Projection in Stocks',
    journal: 'International Journal of All Research Education and Scientific Methods (IJARESM)',
    date: '2023',
    link: 'https://www.ijaresm.com/financial-analysis-for-long-term-projection-in-stocks',
    description: 'Leveraging machine learning and AI to predict stock price movements by analyzing diverse datasets and understanding how emotional responses influence market behavior.'
  },
  {
    title: 'Fish Species Recognition using Convolutional Neural Networks for Biodiversity Monitoring',
    journal: 'Iconic Research And Engineering Journals',
    date: '2023',
    link: 'https://www.irejournals.com/formatedpaper/1705306.pdf',
    description: 'Automated system using CNNs to recognize fish species for biodiversity monitoring, streamlining data collection and aiding sustainable aquatic ecosystem management.'
  },
  {
    title: 'Handwriting Detection System Using Image Processing',
    journal: 'International Journal of Research and Analytical Reviews (IJRAR.ORG)',
    date: '2024',
    link: 'https://www.ijrar.org/papers/IJRAR24A3043.pdf',
    description: 'Implementation of a handwriting detection system using advanced image processing techniques like texture analysis and intensity pixel histograms for character recognition.'
  },
  {
    title: 'Heart Disease Predication Using Machine Learning Techniques',
    journal: 'INTERNATIONAL JOURNAL OF CREATIVE RESEARCH THOUGHTS - IJCRT',
    date: '2024',
    link: 'https://www.ijcrt.org/papers/IJCRT2403754.pdf',
    description: 'Examining the use of Support Vector Machines (SVM) in predicting heart disease using comprehensive patient datasets for proactive cardiovascular health management.'
  },
  {
    title: 'Leaf Disease Detection using Image Processing',
    journal: 'International Journal of All Research Education and Scientific Methods (IJARESM)',
    date: '2023',
    link: 'https://www.ijaresm.com/leaf-disease-detecton-using-image-processing',
    description: 'Utilizing image processing and CNN-SVM hybrid models to detect corn leaf diseases with a recognition rate of over 93%, advancing agricultural diagnostics.'
  },
  {
    title: 'News Summarization of BBC Articles: A Multi-Category Approach',
    journal: 'International Journal of Scientific Research in Engineering and Management (IJSREM)',
    date: '2023',
    link: 'https://ijsrem.com/download/news-summarization-of-bbc-articles-a-multi-category-approach/',
    description: 'Applying advanced NLP techniques and BERT models to automatically summarize news articles across multiple categories including tech, sport, and politics.'
  },
  {
    title: 'Parrot Species Recognition by using CNN & SVM',
    journal: 'International Journal of Scientific Research in Engineering and Management (IJSREM)',
    date: '2023',
    link: 'https://ijsrem.com/download/parrot-species-recognition-by-using-cnn-svm/',
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
    <section id="publications" className="section-padding" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
      <div className="container">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>
            <GraduationCap size={20} />
            Research Work
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#fff', marginBottom: '20px' }}>
            International <span style={{ color: 'var(--primary)' }}>Publications</span>
          </h2>
          <p style={{ color: '#a1a1aa', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
            Exploring the frontiers of Machine Learning and Image Processing through peer-reviewed research and practical applications.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="publications-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '30px' 
          }}
        >
          {PUBLICATIONS.map((pub, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="pub-card-modern hover-target"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 119, 51, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)'
                  }}>
                    <BookOpen size={24} />
                  </div>
                  <span style={{ fontSize: '12px', color: '#71717a', fontWeight: '600', backgroundColor: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '100px' }}>
                    {pub.date}
                  </span>
                </div>

                <h3 style={{ 
                  fontSize: '20px', 
                  marginBottom: '12px', 
                  color: '#fff', 
                  lineHeight: '1.4',
                  fontWeight: '700'
                }}>
                  {pub.title}
                </h3>
                
                <p style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '600', marginBottom: '16px', opacity: 0.9 }}>
                  {pub.journal}
                </p>

                <p style={{ 
                  color: '#a1a1aa', 
                  fontSize: '14px', 
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {pub.description}
                </p>
              </div>

              <a 
                href={pub.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="pub-link pill-btn-outline" 
                style={{ 
                  padding: '10px 24px', 
                  fontSize: '14px',
                  width: 'fit-content',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(255, 119, 51, 0.3)',
                  color: '#fff'
                }}
              >
                Show publication <ExternalLink size={16} />
              </a>

              <div className="card-shine" />
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .pub-card-modern:hover {
          transform: translateY(-8px);
          border-color: var(--primary) !important;
          background-color: rgba(255, 119, 51, 0.05) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .pub-card-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at top right, rgba(255, 119, 51, 0.1), transparent 40%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .pub-card-modern:hover::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .publications-grid {
            grid-template-columns: 1fr !important;
          }
          .pub-card-modern {
            padding: 24px !important;
          }
        }

        .pub-link:hover {
          background-color: var(--primary) !important;
          color: #fff !important;
          border-color: var(--primary) !important;
        }
      `}} />
    </section>
  );
}

