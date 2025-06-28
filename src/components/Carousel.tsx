'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const slides = [
  { image: '/dataStructures.png', heading: 'Master Data Structures & Algorithms', description: 'Build a strong foundation to crack interviews and exams.' },
  { image: '/operatingSystems.png', heading: 'Dive Into Operating Systems', description: 'Understand core concepts of processes, memory and more.' },
  { image: '/computationEasy.png', heading: 'Theory of Computation Made Easy', description: 'Clear your concepts with intuitive learning.' },
  { image: '/Gate.png', heading: 'Ace GATE with Confidence', description: 'Get exam-ready with curated topics and practice content.' },
  { image: '/analysisAlgorithms.png', heading: 'Learn Analysis of Algorithms', description: 'Master complexity with real-world examples.' },
];

import { useState } from 'react';

const Carousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
    slides: { perView: 1 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div ref={sliderRef} className="keen-slider h-[320px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className="keen-slider__slide relative">
          <Image src={slide.image} alt={slide.heading} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.heading}</h2>
            <p className="text-md md:text-lg max-w-2xl">{slide.description}</p>
          </div>
        </div>
      ))}
    
            {/* Slide Dots */}
      <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => instanceRef.current?.moveToIdx(i)}
            className={`w-3 h-3 rounded-full inline-block cursor-pointer transition-colors duration-300 ${currentSlide === i ? 'bg-white' : 'bg-white/50'}`}></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
