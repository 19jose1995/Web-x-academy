import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PREVIEW = [
  '/DSC_0040.jpg.jpeg',
  '/DSC_0110.jpg.jpeg',
  '/DSC_0247.jpg.jpeg',
  '/DSC_0322.jpg.jpeg',
  '/DSC_0441.jpg.jpeg',
  '/DSC_0671.jpg.jpeg',
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-6xl">

        <div className="flex items-end justify-between mb-8" data-aos="fade-up">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#ec1763' }}>
              Galería
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-800 leading-tight">
              Últimos eventos
            </h2>
          </div>
          <Link
            to="/galeria"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-slate-800 transition"
          >
            Ver galería completa <span>→</span>
          </Link>
        </div>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="50">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-500">
            📸 La Vida es un Musical · 2026
          </span>
        </div>

        {/* Grid: primera foto alta (row-span-2) + 4 normales + 1 con overlay CTA */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          style={{ gridTemplateRows: '220px 220px' }}
        >
          {PREVIEW.map((src, i) => (
            <Link
              key={src}
              to="/galeria"
              className={[
                'relative overflow-hidden rounded-2xl group block',
                i === 0 ? 'row-span-2' : '',
              ].join(' ')}
            >
              <img
                src={src}
                alt={`Evento ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              {i === 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-white font-bold text-sm tracking-wide">Ver todas →</span>
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Link
            to="/galeria"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition sm:hidden"
          >
            Ver galería completa →
          </Link>
          <a
            href="https://instagram.com/xacademyarts"
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-600 transition"
          >
            📸 Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
