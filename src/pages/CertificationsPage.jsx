import React, { useEffect } from 'react';
import CertificationDetails from '../components/CertificationDetails';
import PageTransition from './PageTransition';

export default function CertificationsPage() {
  // Ensure we start at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div>
        <CertificationDetails />
      </div>
    </PageTransition>
  );
}
