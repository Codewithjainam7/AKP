import React, { useEffect } from 'react';
import ResearchDetails from '../components/ResearchDetails';
import PageTransition from './PageTransition';

export default function ResearchPapersPage() {
  // Ensure we start at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div>
        <ResearchDetails />
      </div>
    </PageTransition>
  );
}
