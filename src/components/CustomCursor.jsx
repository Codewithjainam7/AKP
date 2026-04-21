import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      gsap.to(cursor, { x: e.clientX - 7, y: e.clientY - 7, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX - 18, y: e.clientY - 18, duration: 0.3, ease: 'power2.out' });
    };

    const addHoverClass = () => document.body.classList.add('cursor-hover');
    const removeHoverClass = () => document.body.classList.remove('cursor-hover');

    window.addEventListener('mousemove', onMouseMove);
    
    const hoverElements = document.querySelectorAll('a, button, input, .hover-target');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverClass);
      el.addEventListener('mouseleave', removeHoverClass);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverClass);
        el.removeEventListener('mouseleave', removeHoverClass);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={ringRef} className="custom-cursor-ring"></div>
    </>
  );
}
