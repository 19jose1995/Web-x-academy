// src/components/Header.jsx
<<<<<<< HEAD
import React, { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const headerEl = document.querySelector('header');
    const offset = headerEl?.getBoundingClientRect().height || 0;
    const target = document.getElementById(sectionId);
    if (target) {
      const topPos = target.getBoundingClientRect().top + window.pageYOffset - offset - 1;
      window.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Clases', id: 'horarios' },
    { label: 'Maestros', id: 'maestros' },
    { label: 'Registro', id: 'registro' },
    // WhatsApp como enlace más
    { label: 'WhatsApp', href: 'https://wa.me/8294513903', icon: true },
  ];

=======
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

>>>>>>> e35b3d432a8050c4433dec60043ef7c793c83c4f
  return (
    <header
      className="bg-white shadow-md border-b border-gray-200 px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 z-50"
      data-aos="fade-down"
    >
<<<<<<< HEAD
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src="/final fondo blanco.png" alt="X Academy logo" className="h-12 sm:h-14" />
        <span className="text-xl sm:text-2xl font-bold text-[#5568A9]">X Academy</span>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6 text-base font-medium">
        {navItems.map((item) => (
          item.icon ? (
            <a
              key="whatsapp"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              <img src="/whatsapp.png" alt="WA" className="w-5 h-5 mr-1" />
              WhatsApp
            </a>
          ) : (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={handleNavClick(item.id)}
              className="px-3 py-2 text-gray-700 hover:text-[#5568A9] hover:underline hover:scale-105 transition"
            >
              {item.label}
            </a>
          )
        ))}
=======
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
>>>>>>> e35b3d432a8050c4433dec60043ef7c793c83c4f
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <div className="space-y-1">
          <span className={`block h-0.5 w-6 bg-[#5568A9] ${menuOpen ? 'transform rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#5568A9] ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-[#5568A9] ${menuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-6">
          {navItems.map((item) => (
            item.icon ? (
              <a
                key="whatsapp-mob"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                <img src="/whatsapp.png" alt="WA" className="w-6 h-6 mr-2" />
                WhatsApp
              </a>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleNavClick(item.id)}
                className="text-2xl font-semibold text-[#5568A9] hover:text-[#ec1763] transition"
              >
                {item.label}
              </a>
            )
          ))}
        </div>
      )}
    </header>
  );
}
