import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../hooks/useSEO';

export default function DisciplinaLayout({
  seoTitle, seoDesc,
  title, heroDesc,
  from, to,
  about,
  beneficios,
  schedules,
  instructors,
  relatedLinks,
}) {
  useSEO({ title: seoTitle, description: seoDesc });

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      <Header />

      {/* ══ HERO ══ */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end px-6 pt-28 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)' }}
      >
        {/* Manchas de color de la disciplina */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: from }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full blur-3xl opacity-15"
          style={{ background: to }}
        />

        <div className="mx-auto max-w-6xl w-full relative">
          {/* Breadcrumb pequeño */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs text-white/30 mb-6 tracking-wide"
          >
            <a href="/" className="hover:text-white/60 transition">Inicio</a>
            <span className="mx-2">›</span>
            {title}
          </motion.p>

          <div className="grid md:grid-cols-2 gap-10 items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.95] tracking-tight"
              >
                {title}
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-1.5 w-24 mt-5 rounded-full origin-left"
                style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
              />
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-white/65 text-base sm:text-lg leading-relaxed max-w-md"
              >
                {heroDesc}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end"
            >
              <a
                href="/#registro"
                className="inline-block rounded-full px-8 py-3.5 font-bold text-white text-center text-base transition hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${from}, ${to})`,
                  boxShadow: `0 8px 32px ${from}50`,
                }}
              >
                Inscríbete
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ INSTRUCTOR (lo más humano primero) ══ */}
      {instructors && instructors.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          {instructors.map((m, i) => (
            <div
              key={m.name}
              data-aos="fade-up"
              className={`grid md:grid-cols-2 gap-10 items-center ${i > 0 ? 'mt-16 pt-16 border-t border-slate-100' : ''}`}
            >
              {/* Foto */}
              <div className={`relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                <img
                  src={m.src}
                  alt={m.name}
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-32"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}
                />
                <div
                  className="absolute top-4 left-4 rounded-full px-4 py-1.5 text-xs font-bold text-white"
                  style={{ background: m.color || from }}
                >
                  {m.role}
                </div>
              </div>

              {/* Bio */}
              <div className={i % 2 !== 0 ? 'md:order-1' : ''}>
                <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: m.color || from }}>
                  Quien te va a enseñar
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-5">{m.name}</h2>
                <p className="text-slate-500 text-base leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ══ SOBRE LA DISCIPLINA ══ */}
      <section
        className="py-20 px-6"
        style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)' }}
      >
        <div className="mx-auto max-w-4xl">
          <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
            <div data-aos="fade-right">
              <div
                className="h-px w-12 mb-6"
                style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
              />
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Sobre el {title}
              </h2>
            </div>
            <div data-aos="fade-left" className="text-white/65 text-base sm:text-lg leading-relaxed space-y-4">
              {about}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HORARIOS ══ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div data-aos="fade-up" className="mb-10">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: from }}>
            Club Arroyo Hondo · Santo Domingo
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">Horarios</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {schedules.map((s, i) => (
            <div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 60}
              className="group rounded-2xl border border-slate-100 p-5 hover:border-transparent transition-all duration-300 hover:shadow-xl"
              style={{ '--hover-bg': `${from}10` }}
              onMouseEnter={e => e.currentTarget.style.background = `${from}08`}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              <div
                className="h-0.5 w-8 mb-4 rounded-full"
                style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
              />
              <h3 className="font-bold text-slate-800 text-sm mb-3">{s.title}</h3>
              <ul className="space-y-1">
                {s.lines.map((line, j) => (
                  <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="h-1 w-1 rounded-full shrink-0 mt-1.5" style={{ background: from }} />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-aos="fade-up" className="mt-10">
          <a
            href="https://wa.me/18093815369"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition"
          >
            ¿Dudas con el horario?{' '}
            <span style={{ color: from }}>Escríbenos por WhatsApp →</span>
          </a>
        </div>
      </section>

      {/* ══ OTRAS DISCIPLINAS ══ */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section
          className="py-16 px-6 border-t border-slate-100"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-6">
              También en X Academy
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition hover:scale-105 hover:shadow-lg"
                  style={{ background: link.color }}
                >
                  {link.emoji} {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

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
