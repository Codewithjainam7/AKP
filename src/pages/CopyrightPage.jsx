import React, { useEffect } from 'react';
import CopyrightDetails from '../components/CopyrightDetails';
import PageTransition from './PageTransition';

export default function CopyrightPage() {
  // Ensure we start at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div>
        <CopyrightDetails />
      </div>
    </PageTransition>
  );
}
