// src/components/Testimonials.tsx
import React from 'react';

const testimonials = [
  {
    name: 'Anjali R.',
    role: 'GATE Aspirant',
    feedback:
      'CSE Guru helped me build a solid foundation in DSA and TOC. The explanations are super clear and exam-focused!',
  },
  {
    name: 'Karthik M.',
    role: 'Computer Science Student',
    feedback:
      'I never thought OS and Algorithms could be this easy to understand. The playlists are gold!',
  },
  {
    name: 'Sowmya D.',
    role: 'University Topper',
    feedback:
      'These courses helped me revise fast before my semester exams. Can’t wait for more series!'
  },
];

const Testimonials: React.FC = () => {
  return (
    <section style={{ background: 'linear-gradient(to bottom, rgba(251, 99, 4, 0.2), rgba(251, 99, 4, 0.1))' }} className='py-12 rounded-2xl overflow-hidden'>
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-center mb-10 text-[#3C2B3E]">What Learners Say</h3>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
              <p className="text-[#FFBD33] text-[32px] font-bold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
