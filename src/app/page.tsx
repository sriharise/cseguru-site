// src/app/page.tsx
import React from 'react';
import { Pacifico, Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import WelcomeSection from '@/components/WelcomeSection';
import Carousel from '@/components/Carousel';
import CourseCards from '@/components/CourseCards';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-open-sans',
});

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
    <div className={openSans.className}>
      <Header />

      <main className="max-w-7xl mx-auto p-4 pt-0 lg:p-0">
        <Carousel />

        <WelcomeSection />

        <CourseCards />

        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
