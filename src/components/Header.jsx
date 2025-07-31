// src/components/Header.jsx
import React, { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

<<<<<<< HEAD
  const items = [
    { label: 'Clases',   href: '#horarios',    internal: true },
    { label: 'Maestros', href: '#maestros',  internal: true },
    { label: 'Registro', href: '#registro',  internal: true },
    { label: 'WhatsApp', href: 'https://wa.me/8294513903', internal: false },
  ];

  // cierra menu al hacer clic fuera
  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleClick = (href, internal) => (e) => {
    if (internal) {
      e.preventDefault();
      setOpen(false);
      const headerH = document.querySelector('header')?.getBoundingClientRect().height || 0;
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
    // externo (WhatsApp) deja normal
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <img
   src="/final fondo blanco.png"
  alt="Logo"
  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#5568A9] object-contain"
/>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-4 items-center">
        {items.map((it) =>
          it.internal ? (
            <a
              key={it.label}
              href={it.href}
              onClick={handleClick(it.href, true)}
              className="px-3 py-1 rounded-full text-[#5568A9] border border-[#5568A9] hover:bg-[#5568A9] hover:text-white transition"
            >
              {it.label}
            </a>
          ) : (
            <a
              key={it.label}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded-full bg-green-600 text-white hover:bg-green-600 transition flex items-center"
            >
              <img src="/whatsapp.png" alt="" className="h-4 w-4 mr-1" />
              WhatsApp
            </a>
          )
        )}
      </nav>

      {/* Mobile toggle */}
      <div className="relative md:hidden" ref={menuRef}>
        <button
          className="p-2 focus:outline-none"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          <div className="space-y-1">
            <span className={`block h-0.5 w-6 bg-black ${open ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black ${open ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
            {items.map((it) =>
              it.internal ? (
                <a
                  key={it.label}
                  href={it.href}
                  onClick={handleClick(it.href, true)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  {it.label}
                </a>
              ) : (
                <a
                  key={it.label}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  <img src="/whatsapp.png" alt="" className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
              )
            )}
          </div>
        )}
=======
        {/* Navegación */}
        <nav className="flex items-center space-x-4">
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
          {/* WhatsApp Button */}
           <motion.a
          href="https://wa.me/8294513903"
        target="_blank"
        rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-full text-base font-medium bg-green-600 text-white hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
         transition={{ type: 'spring', stiffness: 300, damping: 20 }}
       >
         {/* Icono de WhatsApp en PNG */}
          <img
            src="/whatsapp.png"
          alt="WhatsApp icon"
           className="w-5 h-5 object-contain"
         />
         <span>WhatsApp</span>       
         </motion.a>
        </nav>
>>>>>>> e35b3d432a8050c4433dec60043ef7c793c83c4f
      </div>
    </header>
  );
}
