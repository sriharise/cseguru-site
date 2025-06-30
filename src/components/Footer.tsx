// src/components/Footer.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-white text-black border-t-[3px] border-[#ececec] shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Block */}
        <div className="flex flex-col items-center md:items-start">
          <Image src="/logo.png" alt="CSE Guru Logo" width={100} height={40} className="mb-4" />
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="bg-black p-2 rounded-full">
              <Facebook className="text-white w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="bg-black p-2 rounded-full">
              <Instagram className="text-white w-5 h-5" />
            </a>
            <a href="#" aria-label="YouTube" className="bg-black p-2 rounded-full">
              <Youtube className="text-white w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Block */}
        <div className="flex flex-col justify-between items-center md:items-end text-sm">
          <div className="flex gap-[15px] flex-wrap justify-center md:justify-end">
            {['/', '/about', '/trainings', '/contact'].map((href, idx) => (
              <Link
                key={href}
                href={href}
                className={`text-[12px] ${pathname === href ? 'text-gray-600 underline' : 'hover:text-gray-600 hover:underline'}`}
              >
                {['Home', 'About', 'Trainings', 'Contact'][idx]}
              </Link>
            ))}
          </div>
          <p className="mt-4 md:mt-2">&copy; {new Date().getFullYear()} CSE Guru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;