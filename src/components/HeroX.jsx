import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, scrollToTarget } from "../lib/motion";

/* ─── GEOMETRÍA DE LA X DEL LOGO ────────────────────────────────── */
// Trazos calcados sobre /logo.png (lienzo 800×800).
const X_MAIN = "M70 194 L196 335 Q222 365 200 400 L84 590 Q66 628 108 610 L262 478 Q292 452 320 482 L452 634";
const X_ARM = "M446 194 L310 346";
const X_HEAD = ["M216 150 L262 127", "M212 190 L286 158", "M245 211 L298 182"];
const X_CENTER = { x: 260, y: 380 };
const X_SIZE = { w: 420, h: 520 };
const ZOOM_POINT = { x: 142, y: 495 }; // punto sobre el trazo por donde "entramos"
const STROKE = 40;

const ECHOES = [
  { color: "#5568A9", dx: -40, dy: 26 },
  { color: "#cdd629", dx: -30, dy: 19.5 },
  { color: "#f37826", dx: -20, dy: 13 },
  { color: "#ec1763", dx: -10, dy: 6.5 },
];

const WORDS = [
  { text: "Danza", color: "#ec1763" },
  { text: "Hip Hop", color: "#cdd629" },
  { text: "Teatro", color: "#f37826" },
  { text: "Musical", color: "#7c8fd4" },
];

function XStrokes({ width = STROKE, ...props }) {
  return (
    <g fill="none" strokeLinejoin="round" {...props}>
      <path d={X_MAIN} strokeWidth={width} pathLength="1" />
      <path d={X_ARM} strokeWidth={width} pathLength="1" />
      {X_HEAD.map((d) => (
        <path key={d} d={d} strokeWidth={width * 0.4} pathLength="1" />
      ))}
    </g>
  );
}

function layoutFor(vw, vh) {
  const mobile = vw < 768;
  const s0 = mobile
    ? Math.min((vh * 0.34) / X_SIZE.h, (vw * 0.7) / X_SIZE.w)
    : Math.min((vh * 0.76) / X_SIZE.h, (vw * 0.4) / X_SIZE.w);
  const cx = mobile ? vw * 0.5 : vw * 0.7;
  const cy = mobile ? vh * 0.29 : vh * 0.52;
  // Posición en pantalla del punto de zoom con la escala inicial
  const px = cx + s0 * (ZOOM_POINT.x - X_CENTER.x);
  const py = cy + s0 * (ZOOM_POINT.y - X_CENTER.y);
  const far = Math.max(
    Math.hypot(px, py), Math.hypot(vw - px, py),
    Math.hypot(px, vh - py), Math.hypot(vw - px, vh - py),
  );
  const sEnd = far / (STROKE / 2 - 2);
  return { mobile, s0, sEnd, px, py };
}

const xTransform = (L, s) =>
  `translate(${L.px} ${L.py}) scale(${s}) translate(${-ZOOM_POINT.x} ${-ZOOM_POINT.y})`;

/* ─── HERO ──────────────────────────────────────────────────────── */
export default function HeroX() {
  const root = useRef(null);
  const [vp, setVp] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  }));
  const L = layoutFor(vp.w, vp.h);

  // Solo recalcula al cambiar el ancho o un cambio grande de alto (evita saltos por la barra del navegador en iOS)
  useLayoutEffect(() => {
    const onResize = () =>
      setVp((p) =>
        p.w !== window.innerWidth || Math.abs(p.h - window.innerHeight) > 140
          ? { w: window.innerWidth, h: window.innerHeight }
          : p,
      );
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();
    const ctx = gsap.context((self) => {
      const q = self.selector;
      if (reduce) {
        gsap.set(q("[data-draw] path"), { strokeDashoffset: 0 });
        return;
      }

      /* Intro: la X se dibuja como un movimiento de baile */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(q("[data-draw='hole'] path"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", stagger: 0.12 })
        .fromTo(q("[data-draw='echo'] path"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.04 }, 0.15)
        .from(q("[data-media]"), { scale: 1.25, duration: 2.2, ease: "power2.out" }, 0)
        .from(q("[data-kicker]"), { y: 20, opacity: 0, duration: 0.7 }, 0.5)
        .from(q("[data-char]"), { yPercent: 115, rotate: 8, duration: 0.9, stagger: 0.025 }, 0.6)
        .from(q("[data-line2]"), { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power3.inOut" }, 1.0)
        .from(q("[data-sub], [data-cta]"), { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, 1.25)
        .from(q("[data-cue] > *"), { opacity: 0, duration: 0.6 }, 1.8);

      /* Scroll: entramos por la X hasta llenar la pantalla con el video */
      const xGroups = q("[data-x]");
      const zoom = { t: 0 };
      const ratio = L.sEnd / L.s0;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.to(zoom, {
        t: 1, duration: 1, ease: "power2.in",
        onUpdate: () => {
          const s = L.s0 * Math.pow(ratio, zoom.t);
          xGroups.forEach((g) => g.setAttribute("transform", xTransform(L, s)));
        },
      }, 0)
        .to(q("[data-echoes]"), { opacity: 0, duration: 0.25, ease: "none" }, 0)
        .to(q("[data-copy]"), { y: -80, opacity: 0, duration: 0.3, ease: "power1.in" }, 0)
        .to(q("[data-cue]"), { opacity: 0, duration: 0.1 }, 0)
        .fromTo(q("[data-shade]"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.8)
        .from(q("[data-word]"), { yPercent: 110, duration: 0.35, stagger: 0.08, ease: "power3.out" }, 1.0)
        .from(q("[data-word-sub]"), { opacity: 0, y: 20, duration: 0.25 }, 1.3)
        .to({}, { duration: 0.35 });
    }, root);
    return () => ctx.revert();
  }, [L.s0, L.sEnd, L.px, L.py]);

  const reduceInit = typeof window !== "undefined" && prefersReducedMotion();

  return (
    <section
      ref={root}
      className="relative"
      style={{ height: reduceInit ? "100svh" : L.mobile ? "230svh" : "260vh" }}
      aria-label="Bienvenida"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#0f0c29]">
        {/* Video / foto de fondo */}
        <div data-media className="absolute inset-0 will-change-transform">
          <video
            className="h-full w-full object-cover"
            autoPlay muted loop playsInline preload="metadata"
            poster="/DSC_0087.webp"
          >
            <source src="/videos/IMG_4884.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-[#0f0c29]/15" />

        {/* Capa con la X recortada: todo lo que no es X es escenario de color */}
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${vp.w} ${vp.h}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id="hx-glow-a" cx="12%" cy="18%" r="55%">
              <stop offset="0" stopColor="#ec1763" stopOpacity="0.45" />
              <stop offset="1" stopColor="#ec1763" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hx-glow-b" cx="88%" cy="92%" r="60%">
              <stop offset="0" stopColor="#5568A9" stopOpacity="0.55" />
              <stop offset="1" stopColor="#5568A9" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hx-glow-c" cx="70%" cy="10%" r="40%">
              <stop offset="0" stopColor="#f37826" stopOpacity="0.25" />
              <stop offset="1" stopColor="#f37826" stopOpacity="0" />
            </radialGradient>
            <mask id="hx-hole" maskUnits="userSpaceOnUse" x="0" y="0" width={vp.w} height={vp.h}>
              <rect width={vp.w} height={vp.h} fill="white" />
              <g data-x transform={xTransform(L, L.s0)}>
                <XStrokes stroke="black" data-draw="hole" strokeDasharray="1" />
              </g>
            </mask>
          </defs>

          <g mask="url(#hx-hole)">
            <rect width={vp.w} height={vp.h} fill="#0f0c29" />
            <rect width={vp.w} height={vp.h} fill="url(#hx-glow-a)" />
            <rect width={vp.w} height={vp.h} fill="url(#hx-glow-b)" />
            <rect width={vp.w} height={vp.h} fill="url(#hx-glow-c)" />
            <g data-echoes>
              <g data-x transform={xTransform(L, L.s0)}>
                {ECHOES.map((e) => (
                  <g key={e.color} transform={`translate(${e.dx} ${e.dy})`}>
                    <XStrokes stroke={e.color} data-draw="echo" strokeDasharray="1" />
                  </g>
                ))}
              </g>
            </g>
          </g>
        </svg>

        {/* Oscurecido para leer las palabras de la fase 2 */}
        <div data-shade className="pointer-events-none absolute inset-0 opacity-0"
          style={{ background: "linear-gradient(180deg, rgba(15,12,41,0.25) 0%, rgba(15,12,41,0.75) 100%)" }} />

        {/* Fase 1: titular */}
        <div data-copy className={`relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6 ${L.mobile ? "justify-end pb-14 text-center items-center" : "justify-center"}`}>
          <div className={L.mobile ? "" : "max-w-[46%]"}>
            <span data-kicker className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#cdd629]" />
              Arroyo Hondo · Santo Domingo
            </span>
            <h1 className="mt-5 font-black leading-[0.95] tracking-tight text-white"
              style={{ fontSize: L.mobile ? "clamp(2.6rem, 12vw, 3.6rem)" : "clamp(3.4rem, 6.2vw, 6rem)" }}>
              <span className="sr-only">Descubre tu talento en X Academy</span>
              <span aria-hidden="true" className="block">
                {"Descubre tu talento".split(" ").map((word, wi) => (
                  <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    {word.split("").map((ch, ci) => (
                      <span key={ci} data-char className="inline-block will-change-transform">{ch}</span>
                    ))}
                    {wi < 2 && <span className="inline-block">&nbsp;</span>}
                  </span>
                ))}
              </span>
              <span aria-hidden="true" data-line2 className="block pb-[0.08em]"
                style={{ background: "linear-gradient(90deg,#ec1763,#f37826 55%,#cdd629)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                en X Academy
              </span>
            </h1>
            <p data-sub className={`mt-5 text-white/75 ${L.mobile ? "text-[15px]" : "text-lg max-w-md"}`}>
              Ballet, hip hop, jazz, contemporáneo y teatro musical para niños, teens y adultos. Aquí el arte se vive en escena.
            </p>
            <div data-cta className={`mt-8 flex gap-3 ${L.mobile ? "justify-center" : ""}`}>
              <a href="#registro" onClick={(e) => { e.preventDefault(); scrollToTarget("#registro"); }}
                className="group relative overflow-hidden rounded-full bg-[#f37826] px-7 py-3.5 text-[15px] font-bold text-white shadow-xl shadow-orange-500/30 transition-transform hover:scale-[1.04]">
                <span className="absolute inset-0 -translate-x-full bg-[#ec1763] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                <span className="relative">Inscríbete ahora</span>
              </a>
              <a href="#horarios" onClick={(e) => { e.preventDefault(); scrollToTarget("#horarios"); }}
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-[15px] font-bold text-white backdrop-blur-md transition hover:bg-white/20">
                Ver clases
              </a>
            </div>
          </div>
        </div>

        {/* Fase 2: palabras sobre el video a pantalla completa */}
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-16 sm:pb-20 ${reduceInit ? "hidden" : ""}`}>
          <div className="mx-auto max-w-6xl">
            <p className="flex flex-wrap gap-x-[0.25em] font-black uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: L.mobile ? "clamp(2.8rem, 15vw, 4.5rem)" : "clamp(4rem, 9vw, 9rem)" }}>
              {WORDS.map((w) => (
                <span key={w.text} className="inline-block overflow-hidden">
                  <span data-word className="inline-block" style={{ color: w.color }}>{w.text}</span>
                </span>
              ))}
            </p>
            <p data-word-sub className="mt-4 max-w-md text-white/80 sm:text-lg">
              Más de 200 estudiantes, 8 maestros y más de 20 clases cada semana.
            </p>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div data-cue className={`${reduceInit ? "!hidden " : ""}pointer-events-none absolute bottom-6 left-[max(1.5rem,calc(50%-34.5rem))] z-10 hidden md:flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50`}>
          <span>Desliza</span>
          <span className="relative block h-9 w-px overflow-hidden bg-white/20">
            <span className="hx-cue absolute left-0 top-0 h-1/2 w-full bg-white" />
          </span>
        </div>
      </div>
    </section>
  );
}
