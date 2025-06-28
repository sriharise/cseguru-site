// src/components/WelcomeSection.tsx
import React from 'react';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
});

const WelcomeSection: React.FC = () => {
  return (
    <section className="my-12 flex justify-center">
      <div className="text-center max-w-3xl w-full">
        <h2 className={`text-[30px] md:text-[48px] font-bold text-[#FFBD33] mb-4 ${pacifico.className}`}>
          Welcome
        </h2>
        <div className="text-lg text-gray-700 font-medium">
          <p>Welcome to CSE Guru – your one-stop destination for mastering Computer Science.</p>
          <p>From GATE preparation to university syllabus, our tutorials make complex topics simple.</p>
          <p>Explore deep-dive videos on Algorithms, Operating Systems, TOC, and more.</p>
          <p>Created by passionate educators, designed for students who want clarity and results.</p>
          <p>Join thousands of learners and level up your tech career with confidence!</p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
