import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPTextReveal({ text, className = "", delay = 0 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = containerRef.current.querySelectorAll('.reveal-word-inner');
      
      gsap.fromTo(words, 
        { y: '110%', opacity: 0, rotateZ: 5 },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: 'power4.out',
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  // Split text into words manually
  const words = text.split(' ').map((word, i) => (
    <span 
      key={i} 
      style={{ 
        display: 'inline-block', 
        overflow: 'hidden', 
        paddingBottom: '0.1em',
        marginRight: '0.25em' 
      }}
    >
      <span 
        className="reveal-word-inner" 
        style={{ display: 'inline-block', transformOrigin: 'top left' }}
        dangerouslySetInnerHTML={{ __html: word === 'my' || word === 'My' || word.includes('Research') || word.includes('Services') || word.includes('Hire') || word.includes('Copyright') || word.includes('Patents') ? `<span class="text-primary-600">${word}</span>` : word }}
      />
    </span>
  ));

  return (
    <div ref={containerRef} className={className}>
      {words}
    </div>
  );
}
