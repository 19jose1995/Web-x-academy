import { useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Music2, Mic2, Theater } from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import XWearSection from "../components/XWearSection";
import Gallery from "../components/Gallery";
import RegistrationForm from "../components/RegistrationForm";
import InteractiveMap from "../components/InteractiveMap";
import MaestrosDestacados from "../components/MaestrosDestacados";
import InstalacionesVideo from "../components/InstalacionesVideo";
import ScrollIndicator from "../components/ScrollIndicator";
import { useSEO } from "../hooks/useSEO";

/* ─── DATOS ─────────────────────────────────────────────────────── */

const STATS = [
  { value: "200+", label: "Estudiantes",  icon: "🎓" },
  { value: "8",    label: "Maestros",     icon: "⭐" },
  { value: "20+",  label: "Clases",       icon: "🎭" },
  { value: "5+",   label: "Años de arte", icon: "🏆" },
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

const DISCIPLINAS = [
  { label: "Ballet",             emoji: "🩰", href: "/ballet",              color: "#ec1763" },
  { label: "Hip Hop",            emoji: "🎤", href: "/hip-hop",             color: "#f37826" },
  { label: "Contemporánea",      emoji: "💫", href: "/danza-contemporanea", color: "#5568A9" },
  { label: "Teatro Musical",     emoji: "🎭", href: "/teatro-musical",      color: "#7c8fd4" },
  { label: "Canto",              emoji: "🎵", href: "/canto",               color: "#8fae00" },
];

const HORARIOS = [
  { title: "Open Class Especial",            lines: ["Viernes: 7:30PM"],                                                                           featured: true,  cat: "especial" },
  { title: "Pre Ballet (6 - 8 años)",        lines: ["Lun/Mar/Mié/Jue: 3:30–4:30 PM", "Viernes: 3:30–5:00 PM", "Sáb: 9:30–11:30 AM"],            cat: "danza"   },
  { title: "Movimiento Creativo (3-5 años)", lines: ["Lun/Mié: 3:30–4:30 PM", "Sáb: 9:30–11:00 AM"],                                             cat: "danza"   },
  { title: "Ballet 1",                       lines: ["Lun/Mié: 4:30–5:30 PM", "Sáb: 4:30–5:30 PM"],                                              cat: "danza"   },
  { title: "Danza Contempo 1",               lines: ["Lun/Mié: 5:30–6:30 PM"],                                                                     cat: "danza"   },
  { title: "Danza Contempo 2",               lines: ["Mar/Jue: 5:30–6:30 PM"],                                                                     cat: "danza"   },
  { title: "Danza Contempo 3",               lines: ["Sáb: 10:00–11:30 PM"],                                                                       cat: "danza"   },
  { title: "Ballet Adultos",                 lines: ["Lun/Mié: 7:00–8:00 PM"],                                                                     cat: "danza"   },
  { title: "Heels",                          lines: ["Miércoles: 6:00–7:30 PM"],                                                                   cat: "danza"   },
  { title: "Salsa Básica",                   lines: ["Mar/Jue: 7:00–8:00 PM", "Viernes: 6:30–8:00 PM"],                                           cat: "danza"   },
  { title: "Jazz Kids",                      lines: ["Lun/Mié: 4:30–5:30 PM"],                                                                     cat: "danza"   },
  { title: "Hip Hop Kids",                   lines: ["Mar/Jue: 4:30–5:30 PM"],                                                                     cat: "danza"   },
  { title: "Hip Hop Teens",                  lines: ["Mar/Jue: 5:30–6:30 PM"],                                                                     cat: "danza"   },
  { title: "Hip Hop Adultos",                lines: ["Mar/Jue: 6:30–7:30 PM"],                                                                     cat: "danza"   },
  { title: "Movimiento creativo",            lines: ["Lun/Mar/Mié/Jue: 3:30–4:30 PM", "Viernes: 3:30–5:00 PM", "Sáb: 9:30–11:00 AM"],            cat: "danza"   },
  { title: "Jazz Teen +",                    lines: ["Mar/Jue: 4:30–5:30 PM"],                                                                     cat: "danza"   },
  { title: "Canto kids",                     lines: ["Viernes: 3:30–4:30 PM"],                                                                     cat: "canto"   },
  { title: "Canto teens",                    lines: ["Viernes: 4:30–5:30 PM"],                                                                     cat: "canto"   },
  { title: "Teatro Musical (Teens)",         lines: ["Viernes: 3:30–4:30 PM"],                                                                     cat: "teatro"  },
  { title: "Teatro Musical (Kids)",          lines: ["Viernes: 4:30–5:30 PM"],                                                                     cat: "teatro"  },
];

const GRUPOS = [
  {
    id: "danza",  label: "Danza",  icon: "💃", color: "#ec1763",
    clases: HORARIOS.filter(h => h.cat === "danza"),
  },
  {
    id: "canto",  label: "Canto",  icon: "🎤", color: "#cdd629",
    clases: HORARIOS.filter(h => h.cat === "canto"),
  },
  {
    id: "teatro", label: "Teatro Musical", icon: "🎭", color: "#5568A9",
    clases: HORARIOS.filter(h => h.cat === "teatro"),
  },
];

function GrupoAcordeon({ grupo }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <span className="text-lg">{grupo.icon}</span>
        <span className="font-bold text-white flex-1">{grupo.label}</span>
        <span className="text-xs text-white/30 mr-2">{grupo.clases.length} clases</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/40 text-sm leading-none"
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 divide-y divide-white/5">
              {grupo.clases.map((c) => (
                <div key={c.title} className="flex items-start justify-between gap-4 py-2.5">
                  <span className="text-white/80 text-sm font-medium">{c.title}</span>
                  <span className="text-white/40 text-xs text-right shrink-0 leading-relaxed">
                    {c.lines.join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

/* ─── HOME ──────────────────────────────────────────────────────── */
export default function Home() {
  useSEO({
    title: "X Academy | Academia de Artes Escénicas en Santo Domingo",
    description: "X Academy es una academia de artes escénicas en Arroyo Hondo, Santo Domingo. Clases de ballet, hip hop, danza contemporánea, teatro musical y canto para todas las edades.",
  });

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);


  return (
    <div className="min-h-screen text-slate-900 font-sans" style={{
      background: "linear-gradient(160deg, #ceeaee 0%, #f8c9dd 45%, #e8f0a0 100%)"
    }}>
      <ScrollIndicator />
      <Header />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay muted loop playsInline preload="metadata"
          poster="/final.png"
        >
          <source src="/videos/IMG_4884.MOV" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(236,23,99,0.18) 0%, rgba(0,0,0,0) 50%, rgba(85,104,169,0.20) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)" }} />

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
          Una academia de artes escénicas en <strong className="text-white">Arroyo Hondo, Santo Domingo</strong> donde el canto,
          el teatro y la danza se convierten en experiencias que transforman vidas.
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

        {/* Explora por disciplina */}
        <div data-aos="fade-up" className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-4">Explora cada disciplina en detalle</p>
          <div className="flex flex-wrap justify-center gap-3">
            {DISCIPLINAS.map((d, i) => (
              <motion.a
                key={d.label}
                href={d.href}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                whileHover={{ scale: 1.07 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition shadow-md"
                style={{ background: d.color }}
              >
                {d.emoji} {d.label}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAESTROS ════════════════════════════════════════════ */}
      <MaestrosDestacados />

      {/* ══ GALERÍA ════════════════════════════════════════════ */}
      <Gallery />

      {/* ══ INSTALACIONES / VIDEOS ══════════════════════════════ */}
      <InstalacionesVideo />

      {/* ══ X WEAR ══════════════════════════════════════════════ */}
      <XWearSection />

      {/* ══ HORARIOS ════════════════════════════════════════════ */}
      <section id="horarios" className="px-6 py-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)" }}>
        <div className="pointer-events-none absolute top-0 left-1/4 h-80 w-80 rounded-full bg-[#ec1763]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#5568A9]/10 blur-3xl" />

        <div className="mx-auto max-w-2xl relative">
          <div data-aos="fade-up" className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Clases y{' '}
              <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
                Horarios
              </span>
            </h2>
            <p className="mt-3 text-white/50 text-sm">Toca una categoría para ver los horarios.</p>
          </div>

          {/* Open Class destacado */}
          <div data-aos="fade-up" className="mb-4 rounded-2xl px-5 py-4 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg,#f37826,#ec1763)", boxShadow: "0 8px 28px rgba(243,120,38,0.3)" }}>
            <div>
              <span className="text-xs font-black tracking-widest uppercase text-white/70">Evento especial</span>
              <p className="text-white font-bold mt-0.5">Open Class</p>
            </div>
            <span className="text-white/90 text-sm font-semibold">Viernes · 7:30 PM</span>
          </div>

          {/* Acordeón */}
          <div data-aos="fade-up" data-aos-delay="80"
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {GRUPOS.map((g) => <GrupoAcordeon key={g.id} grupo={g} />)}
          </div>

          {/* CTA */}
          <div data-aos="fade-up" className="mt-8 text-center">
            <a
              href="https://wa.me/18093815369"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition"
            >
              ¿Dudas con el horario?{' '}
              <span className="text-[#ec1763]">Escríbenos por WhatsApp →</span>
            </a>
          </div>
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
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              src="/videos/Tour%20academia.mp4"
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

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

      <Footer />

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
