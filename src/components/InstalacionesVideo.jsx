import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEOS = [
  {
    id: 1,
    title: 'Nuestras Instalaciones',
    desc: 'Conoce los espacios donde el arte cobra vida.',
    src: '/videos/IMG_0465.MOV',
  },
  {
    id: 2,
    title: 'X Academy en acción',
    desc: 'Momentos reales dentro de nuestras clases.',
    src: '/videos/IMG_8629.MOV',
  },
  {
    id: 3,
    title: 'Talento en escena',
    desc: 'Nuestros estudiantes dando lo mejor de sí.',
    src: '/videos/IMG_8888.MOV',
  },
  {
    id: 4,
    title: 'Arte y movimiento',
    desc: 'La pasión que nos mueve cada día.',
    src: '/videos/IMG_9513.MOV',
  },
  {
    id: 5,
    title: 'Detrás de escena',
    desc: 'La magia que ocurre antes de cada presentación.',
    src: '/videos/IMG_7308.MOV',
  },
  {
    id: 6,
    title: 'Ensayo en vivo',
    desc: 'Disciplina y pasión en cada práctica.',
    src: '/videos/IMG_7393.MOV',
  },
];

export default function InstalacionesVideo() {
  const [active, setActive] = useState(null);

  return (
    <>
      <section
        className="py-24 px-4 sm:px-8"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a2e 100%)' }}
        data-aos="fade-up"
      >
        <div className="mx-auto max-w-5xl">

          {/* Título estilo Instagram */}
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Nuestras{' '}
              <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
                Instalaciones
              </span>
            </h2>
            <p className="mt-3 text-white/50 max-w-md mx-auto text-sm sm:text-base">
              Espacios diseñados para que el arte y el talento florezcan.
            </p>
          </div>

          {/* Header estilo perfil de Instagram */}
          <div className="flex items-center gap-4 mb-5 px-1">
            <div className="relative shrink-0">
              {/* Ring degradado estilo Instagram */}
              <div className="h-14 w-14 rounded-full p-[2px]"
                style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                <div className="h-full w-full rounded-full bg-[#1a1a2e] p-0.5">
                  <img src="/logo.png" alt="X Academy" className="h-full w-full rounded-full object-contain brightness-0 invert" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm">xacademyarts</p>
              <p className="text-white/40 text-xs">Santo Domingo, Rep. Dom.</p>
            </div>
            <a
              href="https://instagram.com/xacademyarts"
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-xs font-bold text-white/80 border border-white/20 rounded-lg px-4 py-1.5 hover:bg-white/10 transition"
            >
              Seguir
            </a>
          </div>

          {/* Grid de 6 videos — estilo feed Instagram */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5">
            {VIDEOS.map((v, i) => (
              <FeedCard key={v.id} video={v} index={i} onPlay={() => setActive(v)} />
            ))}
          </div>

          {/* CTA Instagram */}
          <div className="mt-6 text-center">
            <a
              href="https://instagram.com/xacademyarts"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-105"
            >
              📸 Ver más en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── MODAL con audio y controles ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-black"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header estilo Instagram */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#111]">
                <div className="h-8 w-8 rounded-full p-[2px]"
                  style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <div className="h-full w-full rounded-full bg-[#111] p-0.5">
                    <img src="/logo.png" alt="X Academy" className="h-full w-full rounded-full object-contain brightness-0 invert" />
                  </div>
                </div>
                <span className="text-white text-sm font-bold flex-1">xacademyarts</span>
                <button
                  onClick={() => setActive(null)}
                  className="text-white/60 hover:text-white text-xl transition"
                >
                  ✕
                </button>
              </div>

              {/* Video con audio */}
              <video
                key={active.src}
                className="w-full bg-black"
                style={{ maxHeight: '65vh', objectFit: 'contain' }}
                src={active.src}
                controls
                autoPlay
                playsInline
              />

              {/* Info */}
              <div className="px-4 py-3 bg-[#111]">
                <p className="text-white font-bold text-sm">{active.title}</p>
                <p className="text-white/50 text-xs mt-0.5">{active.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Tarjeta del feed (video autoreproducido sin audio) ── */
function FeedCard({ video, index, onPlay }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="relative aspect-square overflow-hidden cursor-pointer bg-black group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
    >
      {/* Video silencioso en loop */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={video.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlay en hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2"
          >
            {/* Icono sonido */}
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </div>
            <p className="text-white text-xs font-semibold">{video.title}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icono mute siempre visible (pequeño, esquina) */}
      {!hovered && (
        <div className="absolute bottom-2 right-2 h-6 w-6 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}
