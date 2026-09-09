import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';

/* ─── ÁLBUMES ──────────────────────────────────────────────────── */

const ALBUMS = [
  {
    id: 'musical',
    label: 'La Vida es un Musical',
    year: '2026',
    desc: 'Un evento único donde el talento de nuestros estudiantes brilló en el escenario.',
    color: '#ec1763',
    photos: [
      '/DSC_0040.jpg.jpeg',
      '/DSC_0053 2.jpg.jpeg',
      '/DSC_0087.jpg.jpeg',
      '/DSC_0110.jpg.jpeg',
      '/DSC_0210.jpg.jpeg',
      '/DSC_0247.jpg.jpeg',
      '/DSC_0252.jpg.jpeg',
      '/DSC_0266.jpg.jpeg',
      '/DSC_0278.jpg.jpeg',
      '/DSC_0289.jpg.jpeg',
      '/DSC_0291.jpg.jpeg',
      '/DSC_0294 2.jpg.jpeg',
      '/DSC_0301.jpg.jpeg',
      '/DSC_0304 2.jpg.jpeg',
      '/DSC_0305.jpg.jpeg',
      '/DSC_0322.jpg.jpeg',
      '/DSC_0326.jpg.jpeg',
      '/DSC_0400 2.jpg.jpeg',
      '/DSC_0410.jpg.jpeg',
      '/DSC_0435.jpg.jpeg',
      '/DSC_0441.jpg.jpeg',
      '/DSC_0493.jpg.jpeg',
      '/DSC_0493 2.jpg.jpeg',
      '/DSC_0499.jpg.jpeg',
      '/DSC_0507.jpg.jpeg',
      '/DSC_0515.jpg.jpeg',
      '/DSC_0527.jpg.jpeg',
      '/DSC_0671.jpg.jpeg',
      '/DSC_0690.jpg.jpeg',
      '/DSC_0702 2.jpg.jpeg',
      '/DSC_0705.jpg.jpeg',
      '/DSC_0745 2.jpg.jpeg',
    ],
  },
  {
    id: 'academia',
    label: 'Academia',
    year: '2024–2025',
    desc: 'Momentos del día a día en X Academy — clases, ensayos y vida dentro de la academia.',
    color: '#5568A9',
    photos: [
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
    ],
  },
];

/* ─── PÁGINA ───────────────────────────────────────────────────── */

export default function Galeria() {
  useSEO({
    title: 'Galería · X Academy | Santo Domingo',
    description: 'Fotos y momentos de X Academy — presentaciones, clases y vida en la academia de artes escénicas en Arroyo Hondo, Santo Domingo.',
  });

  const [activeAlbum, setActiveAlbum] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const album = ALBUMS[activeAlbum];
  const photos = album.photos;

  const prev = useCallback(() =>
    setLightbox((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() =>
    setLightbox((i) => (i + 1) % photos.length), [photos.length]);
  const close = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setLightbox(null);
  }, [activeAlbum]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, prev, next, close]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* ── Hero ── */}
      <section
        className="pt-28 pb-16 px-6"
        style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)' }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-white/30 mb-6 tracking-wide"
          >
            <a href="/" className="hover:text-white/60 transition">Inicio</a>
            <span className="mx-2">›</span>
            Galería
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl font-black text-white leading-tight"
          >
            Galería
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/50 max-w-lg"
          >
            Momentos que capturan el arte, la pasión y el talento de X Academy.
          </motion.p>
        </div>
      </section>

      {/* ── Tabs de álbumes ── */}
      <section className="border-b border-slate-100 sticky top-0 z-40 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-1 overflow-x-auto py-3">
            {ALBUMS.map((a, i) => (
              <button
                key={a.id}
                onClick={() => setActiveAlbum(i)}
                className={[
                  'shrink-0 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200',
                  activeAlbum === i
                    ? 'text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100',
                ].join(' ')}
                style={activeAlbum === i ? { background: a.color } : {}}
              >
                {a.label}
                <span
                  className={[
                    'text-xs rounded-full px-2 py-0.5 font-bold',
                    activeAlbum === i ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400',
                  ].join(' ')}
                >
                  {a.photos.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contenido del álbum ── */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeAlbum}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-6xl px-6 py-12"
        >
          {/* Info del álbum */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full text-white"
                style={{ background: album.color }}
              >
                {album.year}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                {album.label}
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-lg">{album.desc}</p>
          </div>

          {/* Grid masonry */}
          <div
            style={{ columns: 2, columnGap: '10px' }}
            className="sm:columns-3"
          >
            {photos.map((src, i) => (
              <div
                key={src}
                className="mb-2.5 break-inside-avoid"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.04 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightbox(i)}
                >
                  <img
                    src={src}
                    alt={`${album.label} — foto ${i + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-white/20 p-2.5 backdrop-blur-sm border border-white/30">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(14px)' }}
            onClick={close}
          >
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative flex items-center justify-center w-full px-16 max-h-[78vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[lightbox]}
                alt={`${album.label} — foto ${lightbox + 1}`}
                className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
                draggable={false}
              />
            </motion.div>

            <div className="mt-3 text-white/50 text-xs font-semibold tracking-widest">
              {lightbox + 1} / {photos.length} · {album.label}
            </div>

            {/* Thumbnails */}
            <div
              className="mt-3 flex gap-1.5 overflow-x-auto px-6 pb-2 max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={[
                    'shrink-0 h-12 w-12 rounded-lg overflow-hidden transition border-2',
                    i === lightbox
                      ? 'scale-110 shadow-lg'
                      : 'border-transparent opacity-40 hover:opacity-80',
                  ].join(' ')}
                  style={i === lightbox ? { borderColor: album.color } : {}}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <button onClick={close}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition text-lg">
              ✕
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition">
              ‹
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl hover:bg-white/25 transition">
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
