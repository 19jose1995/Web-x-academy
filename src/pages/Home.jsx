import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap, prefersReducedMotion, scrollToTarget } from "../lib/motion";
import { useScrollFx } from "../lib/useScrollFx";
import Marquee from "../components/Marquee";
import { GRUPOS } from "../data/horarios";
import { Music2, Mic2, Theater, MapPin, Clock, Phone, Mail, Instagram } from "lucide-react";

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
import LazyVideo from "../components/LazyVideo";
import HeroX from "../components/HeroX";

/* ─── DATOS ─────────────────────────────────────────────────────── */

const STATS = [
  { value: "200+", label: "Estudiantes",  color: "#ec1763" },
  { value: "8",    label: "Maestros",     color: "#f37826" },
  { value: "20+",  label: "Clases",       color: "#cdd629" },
  { value: "5+",   label: "Años de arte", color: "#7c8fd4" },
];

const CLASES = [
  {
    title: "Danza",
    desc: "Ballet, contemporáneo y jazz. Desde el Baby Ballet a los 3 años hasta adultos.",
    type: "danza",
    from: "#ec1763",
    to: "#ff6b9d",
    href: "#horarios",
    tag: "danza",
    img: "/DSC_0515.webp",
    meta: "Baby Ballet · Pre-Ballet · Ballet · Contemporáneo · Jazz",
  },
  {
    title: "Hip Hop & Heels",
    desc: "Ritmo, actitud y estilo urbano. Hip hop desde los 6 años y heels para mayores de 16.",
    type: "urbano",
    from: "#f37826",
    to: "#cdd629",
    href: "#horarios",
    tag: "urbano",
    img: "/DSC_0326.webp",
    meta: "Kids · Teens · Adultos",
  },
  {
    title: "Teatro Musical",
    desc: "Actuación, expresión corporal, movimiento y canto integrados en escena.",
    type: "teatro",
    from: "#5568A9",
    to: "#7c8fd4",
    href: "#horarios",
    tag: "teatro",
    img: "/DSC_0040.webp",
    meta: "Canto, danza y teatro · Kids · Teens · Adultos",
  },
];

const DISCIPLINAS = [
  { label: "Ballet",             emoji: "🩰", href: "/ballet",              color: "#ec1763" },
  { label: "Hip Hop",            emoji: "🎤", href: "/hip-hop",             color: "#f37826" },
  { label: "Contemporánea",      emoji: "💫", href: "/danza-contemporanea", color: "#5568A9" },
  { label: "Teatro Musical",     emoji: "🎭", href: "/teatro-musical",      color: "#7c8fd4" },
];

function GrupoAcordeon({ grupo }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: grupo.color }} />
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
                <div key={c.title} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <span className="text-white/85 text-sm font-medium">{c.title}</span>
                  <span className="flex flex-col text-white/50 text-xs leading-relaxed sm:text-right">
                    {c.lines.map((l) => <span key={l}>{l}</span>)}
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

/* ─── TARJETA DE CLASE CON INCLINACIÓN 3D ───────────────────────── */
function TiltCard({ c, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: px * 10, rotateX: -py * 10, duration: 0.5, ease: "power3.out" });
    gsap.to(ref.current.querySelector("[data-glare]"), { x: px * 160, y: py * 160, opacity: 0.35, duration: 0.5 });
  };
  const onLeave = () => {
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
    gsap.to(ref.current.querySelector("[data-glare]"), { opacity: 0, duration: 0.4 });
  };
  return (
    <div data-fx="up" className={`[perspective:1000px] ${i === 1 ? "md:mt-16" : ""}`}>
      <a
        ref={ref}
        href={c.href}
        onClick={(e) => { e.preventDefault(); scrollToTarget(c.href); }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-cursor="Ver"
        className="group relative block aspect-[4/5] overflow-hidden rounded-[28px] shadow-2xl [transform-style:preserve-3d]"
      >
        <img src={c.img} alt="" loading="lazy" decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 25%, ${c.from}e6 78%, ${c.from} 100%)` }} />
        <div data-glare className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 blur-3xl" />
        <span className="absolute left-6 top-5 text-sm font-black tracking-widest text-white/80">0{i + 1}</span>
        <div className="absolute left-6 top-14 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-white backdrop-blur-md">
          <ClasesIcon type={c.type} />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 [transform:translateZ(40px)]">
          <h3 className="text-3xl font-black text-white">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/85">{c.desc}</p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">{c.meta}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
            Ver horarios
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-slate-900 transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </a>
    </div>
  );
}

/* ─── ICONOS CLASES ─────────────────────────────────────────────── */
function ClasesIcon({ type }) {
  const map = {
    danza:  <Music2  size={22} strokeWidth={1.75} />,
    urbano: <Mic2    size={22} strokeWidth={1.75} />,
    teatro: <Theater size={22} strokeWidth={1.75} />,
  };
  return map[type];
}

/* ─── HOME ──────────────────────────────────────────────────────── */
export default function Home() {
  useSEO({
    title: "X Academy | Academia de Artes Escénicas en Santo Domingo",
    description: "X Academy es una academia de artes escénicas en Arroyo Hondo, Santo Domingo. Clases de ballet, hip hop, danza contemporánea, jazz y teatro musical para todas las edades.",
  });

  const root = useRef(null);
  useScrollFx(root);


  return (
    <div ref={root} className="min-h-screen text-slate-900 font-sans" style={{
      background: "linear-gradient(160deg, #ceeaee 0%, #f8c9dd 45%, #e8f0a0 100%)"
    }}>
      <ScrollIndicator />
      <Header />

      <HeroX />

      <Marquee />

      {/* ══ STATS ════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0f0c29] px-6 pb-20 pt-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} data-fx="up">
              <span data-fx="count" className="block text-6xl font-black tracking-tight sm:text-7xl" style={{ color: s.color }}>
                {s.value}
              </span>
              <span data-fx="line" className="mt-3 block h-[3px] w-14 rounded-full" style={{ background: s.color }} />
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.2em] text-white/55">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CLASES ══════════════════════════════════════════════ */}
      <section id="clases" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="mb-14 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
          <h2 data-fx="split" className="text-5xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-7xl">
            Elige tu <span className="bg-gradient-to-r from-[#ec1763] to-[#f37826] bg-clip-text text-transparent">pasión.</span>
          </h2>
          <p data-fx="up" className="max-w-sm text-slate-600 md:justify-self-end md:text-lg">
            Tres caminos para subir al escenario. Clases para niños desde los 3 años, teens y adultos.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {CLASES.map((c, i) => (
            <TiltCard key={c.title} c={c} i={i} />
          ))}
        </div>

        {/* Explora por disciplina */}
        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p data-fx="up" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Explora cada disciplina</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {DISCIPLINAS.map((d) => (
              <a
                key={d.label}
                href={d.href}
                data-fx="up"
                data-magnetic
                className="rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-md transition-shadow hover:shadow-xl"
                style={{ background: d.color }}
              >
                {d.label}
              </a>
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
      <section id="horarios" className="px-6 py-24 sm:py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)" }}>
        <div className="pointer-events-none absolute top-0 left-1/4 h-80 w-80 rounded-full bg-[#ec1763]/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#5568A9]/10 blur-3xl" />

        <div className="mx-auto max-w-2xl relative">
          <div className="text-center mb-10">
            <h2 data-fx="split" className="text-5xl sm:text-6xl font-black text-white tracking-tight">
              Clases y{' '}
              <span className="bg-gradient-to-r from-[#ec1763] via-[#f37826] to-[#cdd629] bg-clip-text text-transparent">
                Horarios
              </span>
            </h2>
            <p className="mt-3 text-white/50 text-sm">Toca una categoría para ver los horarios.</p>
          </div>

          {/* Open Class destacado */}
          <div data-fx="up" className="mb-4 rounded-2xl px-5 py-4 flex items-center justify-between"
            style={{ background: "linear-gradient(135deg,#f37826,#ec1763)", boxShadow: "0 8px 28px rgba(243,120,38,0.3)" }}>
            <div>
              <span className="text-xs font-black tracking-widest uppercase text-white/70">Evento especial</span>
              <p className="text-white font-bold mt-0.5">Open Class</p>
            </div>
            <span className="text-white/90 text-sm font-semibold">Viernes · 7:30 PM</span>
          </div>

          {/* Acordeón */}
          <div data-fx="up"
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {GRUPOS.map((g) => <GrupoAcordeon key={g.id} grupo={g} />)}
          </div>

          {/* CTA */}
          <div data-fx="up" className="mt-8 text-center">
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
          <div data-fx="up" className="rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-md">
            <h3 data-fx="split" className="text-4xl font-black leading-tight tracking-tight text-[#5568A9]">Visítanos en nuestra sede física</h3>
            <p className="mt-2 text-slate-500 text-sm">Te esperamos para informarte, inscribirte y asesorarte.</p>

            <div className="mt-6 space-y-4 text-sm divide-y divide-slate-100">
              {[
                { icon: MapPin, label: "Dirección",  color: "#5568A9", value: "Club Arroyo Hondo, Calle Dr. José Antonio Polanco Billini 10" },
                { icon: Clock, label: "Horario",    color: "#5568A9", value: "Lun–Vie: 2:00 PM – 9:00 PM\nSáb: 9:00 AM – 1:00 PM\nDom: Cerrado" },
                { icon: Phone, label: "Teléfono",   color: "#ec1763", value: "+1 (809) 381-5369" },
                { icon: Mail, label: "Email",      color: "#f37826", value: "info@xacademy.com.do" },
              ].map(({ icon: Icon, label, color, value }) => (
                <div key={label} className="flex gap-3 pt-4 first:pt-0">
                  <Icon size={20} strokeWidth={1.75} className="shrink-0 mt-0.5" style={{ color }} />
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

          <div data-fx="up" className="relative overflow-hidden rounded-3xl shadow-2xl flex flex-col bg-black min-h-[420px]">
            <LazyVideo
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              src="/videos/Tour%20academia.mp4"
              poster="/DSC_0266.webp"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="relative flex flex-col justify-between h-full p-8 flex-1">
              <div>
                <span className="inline-block rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-semibold text-white/80 mb-4">
                  Arroyo Hondo · Santo Domingo
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
                    <Instagram size={16} /> Instagram
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
