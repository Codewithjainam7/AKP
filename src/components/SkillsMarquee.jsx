import React from 'react';

const SKILLS = [
  'Python', 'TensorFlow', 'PyTorch', 'Computer Vision', 'NLP',
  'YOLO', 'React', 'Data Science', 'Machine Learning', 'Deep Learning',
  'Climate AI', 'Acoustic Analytics', 'Generative AI'
];

export default function SkillsMarquee() {
  return (
    <section className="py-12 sm:py-16 bg-primary-600 overflow-hidden">
      <div className="flex whitespace-nowrap w-[200%]">
        
        <div className="flex gap-8 sm:gap-12 md:gap-16 pr-10 animate-[slide_40s_linear_infinite]">
          {SKILLS.concat(SKILLS).map((skill, idx) => (
            <div key={idx} className="flex items-center gap-3 sm:gap-5 text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-white uppercase select-none">
              <span className="text-yellow-300">✦</span>
              {skill}
            </div>
          ))}
        </div>
        
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
