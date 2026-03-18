import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/Gallery/img1 (2).jpg',
  '/Gallery/img1 (3).jpg',
  '/Gallery/img1 (4).jpg',
  '/Gallery/img1 (5).jpg',
  '/Gallery/img1 (6).jpg',
  '/Gallery/img1 (7).jpg',
  '/Gallery/img1 (8).jpg',
  '/Gallery/img1 (9).jpg',
  '/Gallery/img1 (10).jpg',
  '/Gallery/img1 (11).jpg',
  '/Gallery/img1 (12).jpg',
  '/Gallery/img1 (13).jpg',
  '/Gallery/img1 (14).jpg',
  '/Gallery/img1 (15).jpg',
  '/Gallery/img1 (16).jpg',
  '/Gallery/img1 (17).jpg',
];

// Layout para el grid principal (primeras 7 fotos en hero grid)
// Resto en masonry columns debajo
const heroLayout = [
  { col: '1 / 3', row: '1 / 3' }, // 0 - grande
  { col: '3',     row: '1'     }, // 1
  { col: '4',     row: '1'     }, // 2
  { col: '3',     row: '2'     }, // 3
  { col: '4',     row: '2'     }, // 4
  { col: '1',     row: '3'     }, // 5
  { col: '2 / 4', row: '3'     }, // 6 - wide
  { col: '4',     row: '3'     }, // 7
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const prev = useCallback(() =>
    setLightbox((i) => (i - 1 + images.length) % images.length), []);
  const next = useCallback(() =>
    setLightbox((i) => (i + 1) % images.length), []);
  const close = useCallback(() => setLightbox(null), []);

  // Teclado
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, prev, next, close]);

  // Bloquea scroll del body cuando el lightbox está abierto
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      {/* ── SECCIÓN ── */}
      <section
        id="galeria"
        className="relative py-24 px-4 sm:px-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a2e 100%)' }}
      >
        {/* Brillo de fondo */}
        <div className="pointer-events-none absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#ec1763]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#5568A9]/10 blur-3xl" />

        {/* Título */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Nuestra{' '}
            <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
              Galería
            </span>
          </h2>
          <p className="mt-3 text-white/50 text-sm sm:text-base max-w-md mx-auto">
            Momentos que capturan la pasión, el arte y el talento de X Academy.
          </p>
        </div>

        {/* ── HERO GRID (8 fotos en layout asimétrico) ── */}
        <div
          className="mx-auto max-w-6xl mb-4"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(3, 220px)',
            gap: '10px',
          }}
        >
          {images.slice(0, 8).map((src, i) => (
            <GalleryCard
              key={src}
              src={src}
              index={i}
              style={{
                gridColumn: heroLayout[i].col,
                gridRow: heroLayout[i].row,
              }}
              onClick={() => setLightbox(i)}
            />
          ))}
        </div>

        {/* ── MASONRY GRID (8 fotos ocultas) ── */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              key="masonry"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div
                className="mx-auto max-w-6xl mt-2"
                style={{ columns: '2', columnGap: '10px' }}
              >
                {images.slice(8).map((src, i) => (
                  <div key={src} className="mb-2.5 break-inside-avoid">
                    <GalleryCard
                      src={src}
                      index={i + 8}
                      onClick={() => setLightbox(i + 8)}
                      masonry
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botones Ver más / CTA */}
        <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setShowMore((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/25 hover:scale-105"
          >
            {showMore ? (
              <><span>▲</span> Ver menos</>
            ) : (
              <><span>▼</span> Ver más fotos ({images.slice(8).length})</>
            )}
          </button>
          <a
            href="https://instagram.com/xacademyarts"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105"
          >
            <span>📸</span> Ver más en Instagram
          </a>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={close}
          >
            {/* Imagen principal */}
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative flex items-center justify-center w-full px-16 max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightbox]}
                alt={`Foto ${lightbox + 1}`}
                className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
                draggable={false}
              />
            </motion.div>

            {/* Contador */}
            <div className="mt-4 text-white/60 text-sm font-medium tracking-widest">
              {lightbox + 1} / {images.length}
            </div>

            {/* Thumbnails */}
            <div
              className="mt-4 flex gap-2 overflow-x-auto px-6 pb-2 max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setLightbox(i)}
                  className={[
                    'shrink-0 h-14 w-14 rounded-lg overflow-hidden transition border-2',
                    i === lightbox
                      ? 'border-[#ec1763] scale-110 shadow-lg shadow-pink-500/30'
                      : 'border-transparent opacity-50 hover:opacity-100',
                  ].join(' ')}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Botón cerrar */}
            <button
              onClick={close}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-xl"
            >
              ✕
            </button>

            {/* Flecha prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition"
            >
              ‹
            </button>

            {/* Flecha next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Componente de tarjeta de imagen ── */
function GalleryCard({ src, index, onClick, style, masonry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 7) * 0.06 }}
      className="group relative overflow-hidden rounded-xl cursor-pointer"
      style={style}
      onClick={onClick}
    >
      <img
        src={src}
        alt={`Galería ${index + 1}`}
        loading="lazy"
        className={[
          'w-full object-cover transition-transform duration-700 group-hover:scale-110',
          masonry ? 'h-auto' : 'h-full',
        ].join(' ')}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      {/* Icono expand */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm border border-white/30">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
