// src/app/page.tsx
import React from 'react';
import WelcomeSection from '@/components/WelcomeSection';
import Carousel from '@/components/Carousel';
import CourseCards from '@/components/CourseCards';
import Testimonials from '@/components/Testimonials';

export const metadata = {
  title: "CSE Guru – Learn CS the Smart Way",
  description:
    "Master core CS topics like DSA, GATE prep, OS and more. Learn interactively with CSE Guru.",
  keywords: [
    "CSE Guru",
    "computer science tutorials",
    "DSA",
    "GATE CS",
    "algorithms",
    "TOC",
    "operating systems",
  ],
};


const HomePage: React.FC = () => {
  return (
    <div>
      <Carousel />

      <WelcomeSection />

      <CourseCards />

      <Testimonials />
    </div>
  );
};

export default HomePage;
