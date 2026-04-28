import React from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import Experience from '../components/Experience';
import WhyWorkWithMe from '../components/WhyWorkWithMe';
import SkillsMarquee from '../components/SkillsMarquee';
import PageTransition from './PageTransition';

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Expertise />
      <Experience />
      <WhyWorkWithMe />
      <SkillsMarquee />
    </PageTransition>
  );
}
