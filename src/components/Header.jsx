import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef();

  const items = [
    { label: 'Clases',   href: '#horarios', internal: true },
    { label: 'Maestros', href: '#maestros', internal: true },
    { label: 'Registro', href: '#registro', internal: true },
    { label: 'WhatsApp', href: 'https://wa.me/18093815369', internal: false },
  ];

  // Sombra al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cierra menú al hacer clic fuera
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
  };

  return (
    <header
      className={[
        'sticky top-0 z-50 px-4 py-3 flex items-center justify-between transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white/70 backdrop-blur-sm',
      ].join(' ')}
    >
      {/* Logo */}
      <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <img
          src="/logo.png"
          alt="X Academy"
          className="h-10 sm:h-12 object-contain"
        />
      </a>

      {/* Desktop nav */}
      <nav className="hidden md:flex space-x-2 items-center">
        {items.map((it) =>
          it.internal ? (
            <a
              key={it.label}
              href={it.href}
              onClick={handleClick(it.href, true)}
              className="px-4 py-1.5 rounded-full text-slate-700 border border-slate-300 text-sm font-medium hover:border-[#5568A9] hover:text-[#5568A9] transition"
            >
              {it.label}
            </a>
          ) : (
            <a
              key={it.label}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition flex items-center gap-1.5"
            >
              <img src="/whatsapp.png" alt="" className="h-4 w-4" />
              WhatsApp
            </a>
          )
        )}
      </nav>

      {/* Mobile toggle */}
      <div className="relative md:hidden" ref={menuRef}>
        <button
          className="p-2 rounded-lg hover:bg-slate-100 focus:outline-none transition"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menú"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-slate-700 rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
            {items.map((it) =>
              it.internal ? (
                <a
                  key={it.label}
                  href={it.href}
                  onClick={handleClick(it.href, true)}
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#5568A9] transition"
                >
                  {it.label}
                </a>
              ) : (
                <a
                  key={it.label}
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  <img src="/whatsapp.png" alt="" className="h-4 w-4" />
                  WhatsApp
                </a>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
}
