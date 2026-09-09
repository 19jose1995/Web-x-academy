import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../hooks/useSEO';

const articulos = [
  {
    slug: '/blog/como-elegir-primera-clase-ballet',
    categoria: 'Para familias',
    titulo: 'Cómo elegir la primera clase de ballet para tu hija',
    extracto: 'Edad ideal, qué buscar en una academia y cómo saber si la maestra es la correcta. Guía práctica para padres en Santo Domingo.',
    minutos: '5 min',
    disciplina: 'Ballet',
    color: '#ec1763',
  },
  {
    slug: '/blog/beneficios-de-la-danza-para-ninos',
    categoria: 'Para familias',
    titulo: '5 beneficios de la danza para niños: por qué empezar desde pequeños',
    extracto: 'La danza no es solo un hobby. Afecta el desarrollo cognitivo, la expresión emocional y la autoestima de una manera que pocos actividades logran.',
    minutos: '6 min',
    disciplina: 'Danza',
    color: '#f37826',
  },
];

export default function BlogIndex() {
  useSEO({
    title: 'Blog | X Academy Santo Domingo — Artes escénicas, familias y comunidad',
    description: 'Artículos sobre ballet, danza, canto y teatro musical en Santo Domingo. Guías para padres, historias de estudiantes y todo lo que pasa en X Academy, Arroyo Hondo.',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      <Header />

      {/* Header del blog */}
      <section
        className="relative pt-28 pb-16 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)' }}
      >
        <div
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full blur-3xl opacity-10"
          style={{ background: '#ec1763' }}
        />

        <div className="mx-auto max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="h-px w-10 mb-6"
              style={{ background: 'linear-gradient(90deg,#ec1763,#f37826)' }}
            />
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Blog
            </h1>
            <p className="mt-3 text-white/50 text-base max-w-lg">
              Guías para padres, novedades de la academia y todo lo que pasa en X Academy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lista de artículos */}
      <section className="mx-auto max-w-4xl px-6 py-16">

        {/* Artículo destacado */}
        <a
          href={articulos[0].slug}
          className="group block mb-14"
          data-aos="fade-up"
        >
          <div className="rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div
              className="h-2 w-full"
              style={{ background: `linear-gradient(90deg, ${articulos[0].color}, #ff6b9d)` }}
            />
            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full text-white"
                  style={{ background: articulos[0].color }}
                >
                  {articulos[0].disciplina}
                </span>
                <span className="text-xs text-slate-400">{articulos[0].categoria}</span>
                <span className="text-xs text-slate-300">·</span>
                <span className="text-xs text-slate-400">{articulos[0].minutos} de lectura</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 group-hover:text-pink-600 transition-colors leading-tight mb-3">
                {articulos[0].titulo}
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-5">
                {articulos[0].extracto}
              </p>
              <span className="text-sm font-bold text-slate-400 group-hover:text-pink-500 transition-colors">
                Leer artículo →
              </span>
            </div>
          </div>
        </a>

        <hr className="border-slate-100 mb-14" />

        {/* Resto de artículos */}
        <div className="grid gap-6 sm:grid-cols-2">
          {articulos.slice(1).map((art, i) => (
            <motion.a
              key={art.slug}
              href={art.slug}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="group block rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
                  style={{ background: art.color }}
                >
                  {art.disciplina}
                </span>
                <span className="text-xs text-slate-400">{art.minutos}</span>
              </div>
              <h3 className="font-black text-slate-800 text-base leading-snug group-hover:text-pink-600 transition-colors mb-2">
                {art.titulo}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{art.extracto}</p>
              <span className="text-xs font-bold text-slate-400 group-hover:text-pink-500 transition-colors">
                Leer →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Próximamente */}
        <div className="mt-16 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
          <p className="text-slate-400 text-sm mb-1">Próximamente</p>
          <p className="text-slate-600 font-bold text-base">
            Más artículos sobre disciplinas, preparación para audiciones y vida artística en Santo Domingo.
          </p>
        </div>
      </section>

      <Footer />

      <a
        href="https://wa.me/18093815369"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-2xl shadow-green-500/40 transition hover:scale-110 hover:bg-green-600"
        aria-label="WhatsApp"
      >
        <img src="/whatsapp.png" alt="" className="h-7 w-7" />
      </a>
    </div>
  );
}
