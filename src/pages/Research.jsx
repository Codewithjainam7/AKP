import React, { useEffect } from 'react';
import Projects from '../components/Projects';
import Patents from '../components/Patents';
import Publications from '../components/Publications';
import PageTransition from './PageTransition';

export default function Research() {
  // Ensure we start at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div style={{ paddingTop: '100px' }}>
        <Projects />
        <Patents />
        <Publications />
      </div>
    </PageTransition>
  );
}
