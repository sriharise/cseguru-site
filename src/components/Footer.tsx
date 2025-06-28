// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-[3px] border-[#ececec] bg-white text-black py-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        {/* Left: Logo and Social Icons */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <Image src="/logo.png" alt="CSE Guru" width={120} height={40} />
          <div className="flex space-x-4 mt-4">
            <Link href="#" aria-label="Facebook" className="bg-black p-2 rounded-full hover:bg-yellow-300">
              <Facebook className="w-5 h-5 text-white" />
            </Link>
            <Link href="#" aria-label="Instagram" className="bg-black p-2 rounded-full hover:bg-yellow-300">
              <Instagram className="w-5 h-5 text-white" />
            </Link>
            <Link href="#" aria-label="YouTube" className="bg-black p-2 rounded-full hover:bg-yellow-300">
              <Youtube className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>

        {/* Right: Copyright and Links */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end w-full md:w-auto">
          <div className="text-xs text-gray-600 mb-4 md:mb-2">
            © {currentYear} CSE Guru. All rights reserved.
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end items-center text-[12px] text-black">
              <li><Link href="/" className="hover:text-gray-600 hover:underline active:text-gray-600 active:underline">Home</Link></li>
              <li className="mx-[7.5px] text-gray-400">|</li>
              <li><Link href="/about" className="hover:text-gray-600 hover:underline active:text-gray-600 active:underline">About</Link></li>
              <li className="mx-[7.5px] text-gray-400">|</li>
              <li><Link href="/trainings" className="hover:text-gray-600 hover:underline active:text-gray-600 active:underline">Trainings</Link></li>
              <li className="mx-[7.5px] text-gray-400">|</li>
              <li><Link href="/contact" className="hover:text-gray-600 hover:underline active:text-gray-600 active:underline">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;