import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV = [
  { label: 'Clases',    href: '#clases' },
  { label: 'Maestros',  href: '#maestros' },
  { label: 'Horarios',  href: '#horarios' },
  { label: 'Galería',   href: '#galeria' },
  { label: 'Registro',  href: '#registro' },
];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (!el) return;
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea scroll cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          scrolled
            ? { background: 'rgba(15,12,41,0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }
            : { background: 'transparent' }
        }
      >
        <div className="mx-auto max-w-6xl px-5 h-16 sm:h-18 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="shrink-0"
          >
            <img src="/logo.png" alt="X Academy" className="h-9 sm:h-11 object-contain brightness-0 invert" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((it) => (
              <a
                key={it.label}
                href={it.href}
                onClick={(e) => { e.preventDefault(); scrollTo(it.href); }}
                className="relative px-3 py-1.5 text-sm font-medium text-white/75 hover:text-white transition-colors duration-200 group"
              >
                {it.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-[#ec1763] to-[#f37826] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </a>
            ))}

            <a
              href="https://wa.me/18093815369"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#ec1763,#f37826)', boxShadow: '0 4px 16px rgba(236,23,99,0.35)' }}
            >
              <img src="/whatsapp.png" alt="" className="h-3.5 w-3.5 brightness-0 invert" />
              WhatsApp
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* ── Menú móvil fullscreen ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'linear-gradient(135deg,#0f0c29 0%,#302b63 60%,#1a1a2e 100%)' }}
          >
            {/* Logo arriba */}
            <div className="flex items-center justify-between px-5 h-16">
              <img src="/logo.png" alt="X Academy" className="h-9 object-contain brightness-0 invert" />
              <button
                className="text-white/60 hover:text-white text-2xl transition"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Links grandes */}
            <nav className="flex flex-col justify-center flex-1 px-8 gap-2">
              {NAV.map((it, i) => (
                <motion.a
                  key={it.label}
                  href={it.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollTo(it.href), 300); }}
                  className="text-4xl font-black text-white/80 hover:text-white py-2 transition-colors border-b border-white/10"
                >
                  {it.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA WhatsApp abajo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="px-8 pb-12"
            >
              <a
                href="https://wa.me/18093815369"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-lg"
                style={{ background: 'linear-gradient(135deg,#ec1763,#f37826)' }}
                onClick={() => setOpen(false)}
              >
                <img src="/whatsapp.png" alt="" className="h-5 w-5 brightness-0 invert" />
                Contáctanos por WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
