// src/components/Header.jsx
import React from 'react';

export default function Header() {
  // Scroll handler to offset by header height
  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault();
    const headerEl = document.querySelector('header');
    // Use boundingClientRect height for accurate header size
    const offset = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const target = document.getElementById(sectionId);
    if (target) {
      const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset - 1; // subtract one extra pixel for safety
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  return (
    <header
      className="bg-white shadow-md border-b border-gray-200 px-10 py-5 flex items-center justify-between sticky top-0 z-50"
      data-aos="fade-down"
    >
      <div className="flex items-center space-x-4">
        <img
          src="/final fondo blanco.png"
          alt="X Academy logo"
          className="h-14"
        />
        <span className="text-2xl font-bold text-[#5568A9]">X Academy</span>
      </div>
      <nav className="space-x-6 text-base font-medium">
        <a
          href="#clases"
          onClick={handleNavClick('clases')}
          className="text-gray-700 hover:text-[#5568A9] hover:underline hover:scale-105 transition-all duration-200 inline-block"
        >
          Clases
        </a>
        <a
          href="#maestros"
          onClick={handleNavClick('maestros')}
          className="text-gray-700 hover:text-[#5568A9] hover:underline hover:scale-105 transition-all duration-200 inline-block"
        >
          Maestros
        </a>
        <a
          href="#registro"
          onClick={handleNavClick('registro')}
          className="text-gray-700 hover:text-[#5568A9] hover:underline hover:scale-105 transition-all duration-200 inline-block"
        >
          Registro
        </a>
      </nav>
    </header>
  );
}
