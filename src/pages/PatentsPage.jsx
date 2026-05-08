import React, { useEffect } from 'react';
import PatentDetails from '../components/PatentDetails';
import PageTransition from './PageTransition';

export default function PatentsPage() {
  // Ensure we start at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div>
        <PatentDetails />
      </div>
    </PageTransition>
  );
}
