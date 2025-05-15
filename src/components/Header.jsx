// src/components/Header.jsx
import React from 'react';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Clases', href: '#clases' },
  { label: 'Maestros', href: '#maestros' },
  { label: 'Registro', href: '#registro' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-2 border-[#5568A9] flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/final fondo blanco.png"
            alt="X Academy logo"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Navegación */}
        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-full text-base font-medium bg-white text-[#5568A9] border border-[#5568A9] hover:bg-[#5568A9] hover:text-white transition"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </header>
  );
}
