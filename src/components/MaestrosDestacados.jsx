import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const maestros = [
  {
    src: '/Isabel.jpg',
    name: 'Isabel Martínez',
    role: 'Directora Artística',
    color: '#ec1763',
    resumen: 'Isabel Martínez es bailarina, coreógrafa, docente y gestora cultural con más de 20 años en la danza. Inició su formación a los 3 años y la formalizó graduándose de la Escuela Nacional de danza (ENDANZA) en el 2017 y hoy es directora y fundadora de X Academy y de la compañía Explicitus, con la cual ha creado piezas reconocidas como Her Crown, Juanita y Work to Do, obra con la que ganó el primer lugar como coreógrafa en los Premios Clara Elena Ramírez y fue nominada a los Premios Soberano.',
  },
  {
    src: '/Yngrid.jpg',
    name: 'Yngrid Canela',
    role: 'Hip Hop',
    color: '#5568A9',
    resumen: 'Yngrid Canela, Licenciada en Negocios Internacionales. Apasionada de las artes, coreógrafa, bailarina, maestra y actriz. Desde los 13 años en los estudios de las artes. Ha sido coreógrafa de espectáculos como Premios Heat y coreografiado conciertos y artistas dominicanos. Actualmente es coreógrafa de la compañía de danza contemporánea Explicitus.',
  },
  {
    src: '/Melody.jpg',
    name: 'Melody Santelises',
    role: 'Heels',
    color: '#f37826',
    resumen: 'Melody Ysatis Santelises Graciano es una bailarina, actriz, cantante y gimnasta dominicana. Inició su formación a los 6 años en el Articentro de Danza Miriam Bello, y más adelante obtuvo una beca en la Escuela Nacional de Danza, donde se graduó tras 10 años en la mención Contemporáneo-Folklore. Es Licenciada en Interpretación y Coreografía de la Danza por la Universidad Rey Juan Carlos en Madrid.',
  },
  {
    src: '/Cristian.jpg',
    name: 'Cristian Hazin',
    role: 'Danza Contemporánea',
    color: '#cdd629',
    resumen: 'Cristian Omar Hazin Garrido, bailarín profesional, coreógrafo y maestro. Inició su formación en Balleteatro Dominicano, años después ingresó al Conservatorio Nacional de Danza, llegando a formar parte de la compañía juvenil. Licenciado en Coreografía e Interpretación de la Danza por el Instituto de Danza Alicia Alonso en la Universidad Rey Juan Carlos, Madrid, España.',
  },
  {
    src: '/Sofia.jpg',
    name: 'Sofia Martinez',
    role: 'Movimiento Creativo',
    color: '#ec1763',
    resumen: 'Sofía Martínez es egresada de la Escuela Nacional de Danza (END) en la mención Clásico-Contemporáneo. A lo largo de su formación y carrera ha desarrollado una técnica sólida y una fuerte presencia escénica. Actualmente forma parte del Ballet Concierto Dominicano de la Compañía Explicitus.',
  },
  {
    src: '/Genesis.jpg',
    name: 'Genesis Brito',
    role: 'Teatro Musical',
    color: '#5568A9',
    resumen: 'Génesis Brito es actriz y bailarina, y actualmente se desempeña como bailarina principal de la compañía de danza contemporánea Explicitus. Es egresada de la Academia de Formación Artística (AFA) y tiene una Licenciatura en Teatro, mención Actuación, en la UASD.',
  },
  {
    src: '/Isaura.jpg',
    name: 'Isaura Abreu',
    role: 'Movimiento Creativo & Pre Ballet',
    color: '#f37826',
    resumen: 'Alba Isaura es una joven bailarina dominicana, graduada en 2024 del Bachillerato Técnico en Artes, mención Danza. Actualmente forma parte de la compañía de danza contemporánea Explicitus. Se especializa en danza clásica y contemporánea, y también se desempeña como docente.',
  },
  {
    src: '/Paola.jpeg',
    name: 'Paola Prado',
    role: 'Canto',
    color: '#ec1763',
    resumen: 'Paola Prado es cantante, vocal coach, maquilladora, directora coral y docente especializada en teatro musical. Estudia Licenciatura en Música Contemporánea en la UNPHU. Es fundadora del Estudio Musical Paola Prado y profesora de canto e interpretación en la Academia Amaury Sánchez desde 2018.',
  },
];

export default function MaestrosDestacados() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section
        id="maestros"
        className="py-24 px-4 sm:px-8"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a1a2e 100%)' }}
        data-aos="fade-up"
      >
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Conoce a Nuestros{' '}
            <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
              Maestros
            </span>
          </h2>
          <p className="mt-3 text-white/40 max-w-md mx-auto text-sm sm:text-base">
            Artistas y educadores apasionados que guían cada paso de tu formación.
          </p>
        </div>

        {/* Fila 1 — 4 maestros */}
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {maestros.slice(0, 4).map((m, i) => (
            <TeacherCard key={m.name} m={m} i={i} onClick={() => setSelected(m)} />
          ))}
        </div>

        {/* Fila 2 — 4 maestros */}
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {maestros.slice(4).map((m, i) => (
            <TeacherCard key={m.name} m={m} i={i + 4} onClick={() => setSelected(m)} />
          ))}
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Imagen del maestro */}
              <div className="relative h-56 sm:h-64">
                <img
                  src={selected.src}
                  alt={selected.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <div
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-1"
                    style={{ background: selected.color }}
                  >
                    {selected.role}
                  </div>
                  <h3 className="text-2xl font-extrabold text-white">{selected.name}</h3>
                </div>
              </div>

              {/* Bio */}
              <div className="p-6">
                <p className="text-slate-600 text-sm leading-relaxed">{selected.resumen}</p>
              </div>

              {/* Cerrar */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white text-sm hover:bg-black/50 transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TeacherCard({ m, i, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[3/4]"
      style={{ boxShadow: `0 0 0 0px ${m.color}` }}
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={m.src}
        alt={m.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
        style={{ background: m.color }}
      />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div
          className="text-xs font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: m.color }}
        >
          {m.role}
        </div>
        <h3 className="text-white font-bold text-sm sm:text-base leading-tight">{m.name}</h3>
        <div className="mt-2 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          <span>Ver bio</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Ring on hover */}
      <div
        className="absolute inset-0 rounded-2xl ring-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ '--tw-ring-color': m.color, ringColor: m.color, boxShadow: `inset 0 0 0 2px ${m.color}` }}
      />
    </motion.div>
  );
}
