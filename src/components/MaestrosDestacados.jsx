import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const maestros = [
  {
    src: '/Isabel.webp',
    name: 'Isabel Martínez',
    role: 'Directora Artística',
    color: '#ec1763',
    resumen: 'Isabel Martínez es bailarina, coreógrafa, docente y gestora cultural con más de 20 años en la danza. Inició su formación a los 3 años y la formalizó graduándose de la Escuela Nacional de danza (ENDANZA) en el 2017 y hoy es directora y fundadora de X Academy y de la compañía Explicitus, con la cual ha creado piezas reconocidas como Her Crown, Juanita y Work to Do, obra con la que ganó el primer lugar como coreógrafa en los Premios Clara Elena Ramírez y fue nominada a los Premios Soberano.',
  },
  {
    src: '/Yngrid.webp',
    name: 'Yngrid Canela',
    role: 'Hip Hop',
    color: '#5568A9',
    resumen: 'Yngrid Canela, Licenciada en Negocios Internacionales. Apasionada de las artes, coreógrafa, bailarina, maestra y actriz. Desde los 13 años en los estudios de las artes. Ha sido coreógrafa de espectáculos como Premios Heat y coreografiado conciertos y artistas dominicanos. Actualmente es coreógrafa de la compañía de danza contemporánea Explicitus.',
  },
  {
    src: '/Melody.webp',
    name: 'Melody Santelises',
    role: 'Heels',
    color: '#f37826',
    resumen: 'Melody Ysatis Santelises Graciano es una bailarina, actriz, cantante y gimnasta dominicana. Inició su formación a los 6 años en el Articentro de Danza Miriam Bello, y más adelante obtuvo una beca en la Escuela Nacional de Danza, donde se graduó tras 10 años en la mención Contemporáneo-Folklore. Es Licenciada en Interpretación y Coreografía de la Danza por la Universidad Rey Juan Carlos en Madrid.',
  },
  {
    src: '/Cristian.webp',
    name: 'Cristian Hazin',
    role: 'Danza Contemporánea',
    color: '#cdd629',
    resumen: 'Cristian Omar Hazin Garrido, bailarín profesional, coreógrafo y maestro. Inició su formación en Balleteatro Dominicano, años después ingresó al Conservatorio Nacional de Danza, llegando a formar parte de la compañía juvenil. Licenciado en Coreografía e Interpretación de la Danza por el Instituto de Danza Alicia Alonso en la Universidad Rey Juan Carlos, Madrid, España.',
  },
  {
    src: '/Sofia.webp',
    name: 'Sofia Martinez',
    role: 'Baby Ballet',
    color: '#ec1763',
    resumen: 'Sofía Martínez es egresada de la Escuela Nacional de Danza (END) en la mención Clásico-Contemporáneo. A lo largo de su formación y carrera ha desarrollado una técnica sólida y una fuerte presencia escénica. Actualmente forma parte del Ballet Concierto Dominicano de la Compañía Explicitus.',
  },
  {
    src: '/Genesis.webp',
    name: 'Genesis Brito',
    role: 'Teatro Musical',
    color: '#5568A9',
    resumen: 'Génesis Brito es actriz y bailarina, y actualmente se desempeña como bailarina principal de la compañía de danza contemporánea Explicitus. Es egresada de la Academia de Formación Artística (AFA) y tiene una Licenciatura en Teatro, mención Actuación, en la UASD.',
  },
  {
    src: '/Isaura.webp',
    name: 'Isaura Abreu',
    role: 'Baby Ballet & Pre-Ballet',
    color: '#f37826',
    resumen: 'Alba Isaura es una joven bailarina dominicana, graduada en 2024 del Bachillerato Técnico en Artes, mención Danza. Actualmente forma parte de la compañía de danza contemporánea Explicitus. Se especializa en danza clásica y contemporánea, y también se desempeña como docente.',
  },
  {
    src: '/Paola.webp',
    name: 'Paola Prado',
    role: 'Teatro Musical · Canto',
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
        className="relative overflow-hidden px-4 pb-32 pt-24 sm:px-8 sm:pt-32"
        style={{ background: 'linear-gradient(160deg, #0f0c29 0%, #302b63 55%, #1a1a2e 100%)' }}
      >
        {/* Título */}
        <div className="mx-auto mb-16 grid max-w-6xl gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 data-fx="split" className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl">
            Conoce a nuestros{' '}
            <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
              maestros
            </span>
          </h2>
          <p data-fx="up" className="max-w-sm text-white/55 md:justify-self-end md:text-lg">
            Artistas y educadores apasionados que guían cada paso de tu formación. Toca una foto para conocer su historia.
          </p>
        </div>

        {/* 8 maestros en rejilla escalonada */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
          {maestros.map((m, i) => (
            <TeacherCard key={m.name} m={m} i={i} onClick={() => setSelected(m)} />
          ))}
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal-bg"
            data-lenis-prevent
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
    <div className={i % 2 ? 'translate-y-8 md:translate-y-14' : ''}>
      <button
        type="button"
        onClick={onClick}
        data-fx="clip"
        data-delay={(i % 4) * 0.08}
        data-cursor="Ver bio"
        className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl text-left"
      >
        <img
          src={m.src}
          alt={m.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 via-35% to-transparent" />
        <div
          className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: m.color }}
        />

        <div className="absolute inset-x-0 bottom-0 p-4 pr-14">
          <div className="mb-1 flex items-start gap-1.5 text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-white/75 sm:text-[11px]">
            <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: m.color }} />
            {m.role}
          </div>
          <h3 className="text-sm font-bold leading-tight text-white sm:text-lg">{m.name}</h3>
          <span
            className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-full text-sm font-black text-white transition-transform duration-500 group-hover:rotate-90"
            style={{ background: m.color }}
          >
            +
          </span>
        </div>
      </button>
    </div>
  );
}
