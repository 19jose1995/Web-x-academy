import { Link } from 'react-router-dom';

const PREVIEW = [
  '/DSC_0040.webp',
  '/DSC_0110.webp',
  '/DSC_0247.webp',
  '/DSC_0441.webp',
  '/DSC_0671.webp',
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-24 sm:py-32 px-6 bg-white">
      <div className="mx-auto max-w-6xl">

        <div className="flex items-end justify-between mb-8">
          <div>
            <p data-fx="up" className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#ec1763' }}>
              Galería
            </p>
            <h2 data-fx="split" className="text-5xl sm:text-7xl font-black text-slate-900 leading-[0.95] tracking-tight">
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

        <div className="mb-6" data-fx="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-500">
            La Vida es un Musical · 2026
          </span>
        </div>

        {/* Grid: primera foto alta (row-span-2) + 3 normales + 1 con overlay CTA */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 [grid-template-rows:200px_200px] sm:[grid-template-rows:280px_280px]"
        >
          {PREVIEW.map((src, i) => (
            <Link
              key={src}
              to="/galeria"
              data-fx="clip"
              data-delay={i * 0.08}
              data-cursor="Ver"
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
              {i === PREVIEW.length - 1 && (
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
            Seguir en Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
