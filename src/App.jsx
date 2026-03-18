import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Music2, Mic2, Theater } from "lucide-react";

import Header from "./components/Header";
import Gallery from "./components/Gallery";
import RegistrationForm from "./components/RegistrationForm";
import InteractiveMap from "./components/InteractiveMap";
import MaestrosDestacados from "./components/MaestrosDestacados";
import InstalacionesVideo from "./components/InstalacionesVideo";
import ScrollIndicator from "./components/ScrollIndicator";

/* ─── DATOS ─────────────────────────────────────────────────────── */

const STATS = [
  { value: "200+", label: "Estudiantes",      icon: "🎓" },
  { value: "8",    label: "Maestros",         icon: "⭐" },
  { value: "20+",  label: "Clases",           icon: "🎭" },
  { value: "5+",   label: "Años de arte",     icon: "🏆" },
];

const CLASES = [
  {
    title: "Danza",
    desc: "Ballet, contemporáneo, hip hop, heels, salsa y más. Para todas las edades.",
    type: "danza",
    from: "#ec1763",
    to: "#ff6b9d",
    href: "#horarios",
    tag: "danza",
  },
  {
    title: "Canto",
    desc: "Desarrolla tu voz con técnicas vocales profesionales y expresión escénica.",
    type: "canto",
    from: "#8fae00",
    to: "#cdd629",
    href: "#horarios",
    tag: "canto",
  },
  {
    title: "Teatro Musical",
    desc: "Actuación, expresión corporal, movimiento y canto integrados en escena.",
    type: "teatro",
    from: "#5568A9",
    to: "#7c8fd4",
    href: "#horarios",
    tag: "teatro",
  },
];

const HORARIOS = [
  { title: "Open Class Especial",          lines: ["Viernes: 7:30PM"],                                                                             featured: true,  cat: "especial" },
  { title: "Pre Ballet (6 - 8 años)",      lines: ["Lun/Mar/Mié/Jue: 3:30–4:30 PM", "Viernes: 3:30–5:00 PM", "Sáb: 9:30–11:30 AM"],              cat: "danza"   },
  { title: "Movimiento Creativo (3-5 años)",lines: ["Lun/Mié: 3:30–4:30 PM", "Sáb: 9:30–11:00 AM"],                                               cat: "danza"   },
  { title: "Ballet 1",                     lines: ["Lun/Mié: 4:30–5:30 PM", "Sáb: 4:30–5:30 PM"],                                                cat: "danza"   },
  { title: "Danza Contempo 1",             lines: ["Lun/Mié: 5:30–6:30 PM"],                                                                       cat: "danza"   },
  { title: "Danza Contempo 2",             lines: ["Mar/Jue: 5:30–6:30 PM"],                                                                       cat: "danza"   },
  { title: "Danza Contempo 3",             lines: ["Sáb: 10:00–11:30 PM"],                                                                         cat: "danza"   },
  { title: "Ballet Adultos",               lines: ["Lun/Mié: 7:00–8:00 PM"],                                                                       cat: "danza"   },
  { title: "Heels",                        lines: ["Miércoles: 6:00–7:30 PM"],                                                                     cat: "danza"   },
  { title: "Salsa Básica",                 lines: ["Mar/Jue: 7:00–8:00 PM", "Viernes: 6:30–8:00 PM"],                                             cat: "danza"   },
  { title: "Jazz Kids",                    lines: ["Lun/Mié: 4:30–5:30 PM"],                                                                       cat: "danza"   },
  { title: "Hip Hop Kids",                 lines: ["Mar/Jue: 4:30–5:30 PM"],                                                                       cat: "danza"   },
  { title: "Hip Hop Teens",                lines: ["Mar/Jue: 5:30–6:30 PM"],                                                                       cat: "danza"   },
  { title: "Hip Hop Adultos",              lines: ["Mar/Jue: 6:30–7:30 PM"],                                                                       cat: "danza"   },
  { title: "Movimiento creativo",          lines: ["Lun/Mar/Mié/Jue: 3:30–4:30 PM", "Viernes: 3:30–5:00 PM", "Sáb: 9:30–11:00 AM"],              cat: "danza"   },
  { title: "Jazz Teen +",                  lines: ["Mar/Jue: 4:30–5:30 PM"],                                                                       cat: "danza"   },
  { title: "Canto kids",                   lines: ["Viernes: 3:30–4:30 PM"],                                                                       cat: "canto"   },
  { title: "Canto teens",                  lines: ["Viernes: 4:30–5:30 PM"],                                                                       cat: "canto"   },
  { title: "Teatro Musical (Teens)",       lines: ["Viernes: 3:30–4:30 PM"],                                                                       cat: "teatro"  },
  { title: "Teatro Musical (Kids)",        lines: ["Viernes: 4:30–5:30 PM"],                                                                       cat: "teatro"  },
];

const CAT_TABS = [
  { id: "todos",  label: "Todos",  icon: "🎪", color: "#5568A9" },
  { id: "danza",  label: "Danza",  icon: "💃", color: "#ec1763" },
  { id: "canto",  label: "Canto",  icon: "🎤", color: "#cdd629" },
  { id: "teatro", label: "Teatro", icon: "🎭", color: "#5568A9" },
];

const CAT_COLOR = {
  danza:    { main: "#ec1763", from: "#ec1763", to: "#ff6b9d", bg: "rgba(236,23,99,0.08)",  text: "#c4004f" },
  canto:    { main: "#b5c400", from: "#cdd629", to: "#8fae00", bg: "rgba(205,214,41,0.10)", text: "#7a8a00" },
  teatro:   { main: "#5568A9", from: "#5568A9", to: "#7c8fd4", bg: "rgba(85,104,169,0.09)", text: "#3a4d8f" },
  especial: { main: "#f37826", from: "#f37826", to: "#ec1763", bg: "rgba(243,120,38,0.10)",  text: "#c45500" },
};

/* ─── CONTADOR ──────────────────────────────────────────────────── */
function CountStat({ value, label, icon }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-1"
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-4xl sm:text-5xl font-extrabold text-white">{value}</span>
      <span className="text-sm font-medium text-white/60 tracking-wide uppercase">{label}</span>
    </motion.div>
  );
}

/* ─── ICONOS CLASES ─────────────────────────────────────────────── */
function ClasesIcon({ type }) {
  const map = {
    danza:  <Music2  size={28} strokeWidth={1.5} />,
    canto:  <Mic2    size={28} strokeWidth={1.5} />,
    teatro: <Theater size={28} strokeWidth={1.5} />,
  };
  return (
    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 text-white border border-white/25">
      {map[type]}
    </div>
  );
}

/* ─── FADE-UP ANIMATION ─────────────────────────────────────────── */
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

/* ─── APP ───────────────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState("todos");

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  const filtered = HORARIOS.filter((h) => tab === "todos" || h.cat === tab || h.featured);

  return (
    <div className="min-h-screen text-slate-900 font-sans" style={{
      background: "linear-gradient(160deg, #ceeaee 0%, #f8c9dd 45%, #e8f0a0 100%)"
    }}>
      <ScrollIndicator />
      <Header />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">

        {/* ── Video de fondo ── */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay muted loop playsInline preload="metadata"
          poster="/final.png"
        >
          <source src="/videos/IMG_3025.MOV" type="video/mp4" />
        </video>

        {/* ── Overlays ── */}
        {/* Capa oscura base */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Degradado de marca (rosa→azul) muy suave */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(236,23,99,0.18) 0%, rgba(0,0,0,0) 50%, rgba(85,104,169,0.20) 100%)" }} />
        {/* Viñeta: bordes más oscuros para centrar atención */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />

        {/* ── Contenido ── */}
        <motion.img
          src="/logo.png"
          alt="X Academy Performing Arts"
          className="relative h-44 sm:h-60 mb-8 object-contain drop-shadow-2xl brightness-0 invert"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.h1
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-white"
        >
          Descubre tu talento
          <br />
          <span style={{ background: "linear-gradient(90deg,#ec1763,#f37826,#cdd629)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            en X Academy
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.7, delay: 0.35 }}
          className="relative mt-5 max-w-xl text-lg text-white/75"
        >
          Una academia de artes escénicas donde el canto, el teatro y la danza
          se convierten en experiencias que transforman vidas.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative mt-8 flex flex-col sm:flex-row items-center gap-3"
        >
          <a href="#registro"
            className="rounded-full bg-[#f37826] px-8 py-3.5 font-bold text-white shadow-xl shadow-orange-500/30 transition hover:scale-105 hover:bg-orange-500 text-base">
            Inscríbete Ahora
          </a>
          <a href="#horarios"
            className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-3.5 font-bold text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/20 text-base">
            Ver clases
          </a>
        </motion.div>

        {/* Flecha scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#1a1a2e,#302b63)" }} className="py-16 px-6">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((s) => <CountStat key={s.label} {...s} />)}
        </div>
      </section>

      {/* ══ CLASES ══════════════════════════════════════════════ */}
      <section id="clases" className="mx-auto max-w-6xl px-6 py-20">
        <div data-aos="fade-up" className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
            Clases en <span style={{ color: "#5568A9" }}>X Academy</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Elige tu pasión. Encuentra tu disciplina. Vive el arte.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CLASES.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl p-8 shadow-xl cursor-pointer block"
              style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
            >
              {/* Blob decorativo */}
              <div className="pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full bg-white/10 blur-xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/10 blur-xl" />

              <div className="relative"><ClasesIcon type={c.type} /></div>
              <h3 className="relative mt-4 text-2xl font-extrabold text-white">{c.title}</h3>
              <p className="relative mt-2 text-white/80 text-sm leading-relaxed">{c.desc}</p>
              <div className="relative mt-6 flex items-center gap-1 text-white/70 text-sm font-bold group-hover:text-white transition">
                Ver horarios
                <svg className="w-4 h-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ══ MAESTROS ════════════════════════════════════════════ */}
      <MaestrosDestacados />

      {/* ══ GALERÍA ════════════════════════════════════════════ */}
      <Gallery />

      {/* ══ INSTALACIONES / VIDEOS ══════════════════════════════ */}
      <InstalacionesVideo />

      {/* ══ HORARIOS ════════════════════════════════════════════ */}
      <section id="horarios" className="px-6 py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)" }}>
        {/* Brillos de fondo */}
        <div className="pointer-events-none absolute top-0 left-1/4 h-80 w-80 rounded-full bg-[#ec1763]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#5568A9]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#cdd629]/5 blur-3xl" />

        <div className="mx-auto max-w-6xl relative">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Clases y{' '}
              <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
                Horarios
              </span>
            </h2>
            <p className="mt-3 text-white/50">Encuentra el horario perfecto para ti.</p>
          </div>

          {/* Tabs */}
          <div data-aos="fade-up" className="flex flex-wrap justify-center gap-3 mb-10">
            {CAT_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
                style={
                  tab === t.id
                    ? { background: t.color, color: "#fff", boxShadow: `0 4px 20px ${t.color}55`, transform: "scale(1.06)" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }
                }
              >
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 md:grid-cols-3"
          >
            {filtered.map((h, i) => {
              const c = CAT_COLOR[h.cat];
              return (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={
                    h.featured
                      ? { background: `linear-gradient(135deg, ${c.from}, ${c.to})`, boxShadow: `0 8px 32px ${c.main}55` }
                      : { background: c.bg, border: `1px solid ${c.main}25` }
                  }
                >
                  {/* Barra superior de color */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, ${c.from}, ${c.to})` }}
                  />

                  {/* Blob decorativo */}
                  <div
                    className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full blur-xl opacity-40"
                    style={{ background: c.main }}
                  />

                  <div className="flex items-start justify-between gap-2 relative">
                    <h3
                      className="font-extrabold text-sm leading-snug"
                      style={{ color: h.featured ? "#fff" : c.text }}
                    >
                      {h.title}
                    </h3>
                    {h.featured ? (
                      <span className="shrink-0 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white ring-1 ring-white/30">
                        OPEN CLASS
                      </span>
                    ) : (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-xs font-bold"
                        style={{ background: `${c.main}22`, color: c.main }}
                      >
                        {h.cat === "danza" ? "💃" : h.cat === "canto" ? "🎤" : "🎭"}
                      </span>
                    )}
                  </div>

                  <ul className="mt-3 space-y-1.5 text-xs relative">
                    {h.lines.map((line) => (
                      <li key={line} className="flex items-start gap-2"
                        style={{ color: h.featured ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)" }}>
                        <span
                          className="shrink-0 h-1.5 w-1.5 rounded-full mt-1.5"
                          style={{ background: h.featured ? "rgba(255,255,255,0.7)" : c.main }}
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══ FORMULARIO ══════════════════════════════════════════ */}
      <RegistrationForm />

      {/* ══ SEDE ════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div data-aos="fade-right" className="rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-md">
            <h3 className="text-3xl font-extrabold text-[#5568A9]">Visítanos en nuestra sede física</h3>
            <p className="mt-2 text-slate-500 text-sm">Te esperamos para informarte, inscribirte y asesorarte.</p>

            <div className="mt-6 space-y-4 text-sm divide-y divide-slate-100">
              {[
                { icon: "📍", label: "Dirección",  color: "#5568A9", value: "Club Arroyo Hondo, Calle Dr. José Antonio Polanco Billini 10" },
                { icon: "🕐", label: "Horario",    color: "#5568A9", value: "Lun–Vie: 2:00 PM – 9:00 PM\nSáb: 9:00 AM – 1:00 PM\nDom: Cerrado" },
                { icon: "📞", label: "Teléfono",   color: "#ec1763", value: "+1 (809) 381-5369" },
                { icon: "✉️", label: "Email",      color: "#f37826", value: "info@xacademy.com.do" },
              ].map(({ icon, label, color, value }) => (
                <div key={label} className="flex gap-3 pt-4 first:pt-0">
                  <span className="text-xl shrink-0">{icon}</span>
                  <div>
                    <div className="font-bold text-xs tracking-wide uppercase" style={{ color }}>{label}</div>
                    <div className="text-slate-600 whitespace-pre-line mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <InteractiveMap />
            </div>
          </div>

          <div data-aos="fade-left" className="relative overflow-hidden rounded-3xl shadow-2xl flex flex-col bg-black min-h-[420px]">
            {/* Video de fondo */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              src="/videos/IMG_3025.MOV"
              autoPlay muted loop playsInline
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Contenido encima del video */}
            <div className="relative flex flex-col justify-between h-full p-8 flex-1">
              <div>
                <span className="inline-block rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 mb-4">
                  📍 Arroyo Hondo · Santo Domingo
                </span>
                <h3 className="text-4xl font-black text-white leading-tight drop-shadow-lg">
                  X Academy<br />
                  <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
                    Sede Física
                  </span>
                </h3>
              </div>

              <div className="mt-auto pt-16">
                <p className="text-sm text-white/70 mb-4">¿Tienes dudas? Contáctanos directamente.</p>
                <div className="flex gap-3 flex-wrap">
                  <a href="https://wa.me/18093815369" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition hover:scale-105 hover:bg-green-600">
                    <img src="/whatsapp.png" alt="" className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href="https://instagram.com/xacademyarts" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-white border border-white/25 transition hover:scale-105 hover:bg-white/25">
                    📸 Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer style={{ background: "linear-gradient(135deg,#1a1a2e,#302b63)" }} className="text-white">
        <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <img src="/logo.png" alt="X Academy" className="h-16 object-contain mb-4 brightness-0 invert" />
            <p className="text-sm text-white/50 leading-relaxed">
              Academia de artes escénicas en Santo Domingo, República Dominicana. Danza, canto y teatro para todas las edades.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Navegación</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              {[["Clases", "#clases"], ["Horarios", "#horarios"], ["Maestros", "#maestros"], ["Registro", "#registro"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition">{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Contacto</h4>
            <ul className="space-y-2.5 text-sm text-white/50">
              <li>📞 +1 (809) 381-5369</li>
              <li>✉️ info@xacademy.com.do</li>
              <li>📍 Club Arroyo Hondo, Santo Domingo</li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href="https://wa.me/18093815369" target="_blank" rel="noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 transition hover:bg-green-400 hover:scale-110">
                <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/xacademyarts" target="_blank" rel="noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white transition hover:scale-110 text-lg">
                📸
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-white/30">
          © {new Date().getFullYear()} X Academy · Todos los derechos reservados · Hecho con ❤️ en Rep. Dom.
        </div>
      </footer>

      {/* ══ WHATSAPP FLOTANTE ════════════════════════════════════ */}
      <a href="https://wa.me/18093815369" target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-2xl shadow-green-500/40 transition hover:scale-110 hover:bg-green-600"
        aria-label="WhatsApp">
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <img src="/whatsapp.png" alt="" className="h-7 w-7" />
        </motion.div>
      </a>
    </div>
  );
}
