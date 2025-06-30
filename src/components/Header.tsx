// src/components/Header.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/trainings', label: 'Trainings' },
  { href: '/contact', label: 'Contact' },
];

const SearchBox: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => (
  <div className={`bg-white shadow-md`}>
    <input
      type="text"
      placeholder="Search..."
      className="border px-3 py-1 text-sm text-black w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 lg:w-30"
    />
  </div>
);

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="w-full h-[10px] bg-[#FFBD33]" />

      <header className="text-black shadow-md sticky top-0 z-50 bg-white">
        <div className="w-full flex justify-between items-center max-w-7xl lg:px-0 px-4 mx-auto border-b-[3px] border-[#3C2B3E]">
          {/* Logo + Tagline */}
          <div className="flex items-center gap-[5px] py-[15px]">
            <Image src="/logo.png" alt="CSE Guru" width={138} height={60} />
            <Image src="/tagline.png" alt="Lets learn together" width={120} height={24} />
          </div>

          {/* Desktop Navigation */}
          <div
            className="hidden lg:flex px-[90px] items-stretch h-[90px]"
            style={{ backgroundColor: '#3C2B3E', clipPath: 'polygon(50px 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          >
            <nav className="flex items-center space-x-[90px] text-[14px] font-bold text-white">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative ${
                    pathname === href ? 'text-yellow-300 after:w-full' : 'hover:text-yellow-300 hover:after:w-full'
                  } after:transition-all after:duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-yellow-300 after:w-0`}
                >
                  {label}
                </Link>
              ))}
              <SearchBox />
            </nav>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#3C2B3E]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#3C2B3E] text-white px-6 py-4 space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-[16px] font-bold ${pathname === href ? 'text-yellow-300 underline' : 'hover:text-yellow-300'}`}
              >
                {label}
              </Link>
            ))}
            <SearchBox isMobile />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;