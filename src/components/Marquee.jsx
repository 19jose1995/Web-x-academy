import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/motion";

const ITEMS = [
  { text: "Ballet", color: "#ec1763" },
  { text: "Hip Hop", color: "#f37826" },
  { text: "Contemporáneo", color: "#cdd629" },
  { text: "Teatro Musical", color: "#7c8fd4" },
  { text: "Canto", color: "#ec1763" },
  { text: "Heels", color: "#f37826" },
  { text: "Jazz", color: "#cdd629" },
  { text: "Salsa", color: "#7c8fd4" },
];

function Star({ color }) {
  return (
    <svg viewBox="0 0 24 24" className="mx-[0.35em] inline-block h-[0.55em] w-[0.55em] shrink-0" aria-hidden="true">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" fill={color} />
    </svg>
  );
}

function Row({ outline, rowRef }) {
  const items = outline ? [...ITEMS].reverse() : ITEMS;
  const set = (
    <div className="flex shrink-0 items-center pr-[0.35em]">
      {items.map((it) => (
        <span key={it.text} className="flex items-center">
          <span
            style={outline
              ? { WebkitTextStroke: "1.5px rgba(255,255,255,0.55)", color: "transparent" }
              : { color: it.color }}
          >
            {it.text}
          </span>
          <Star color={outline ? "rgba(255,255,255,0.35)" : "#ffffff"} />
        </span>
      ))}
    </div>
  );
  return (
    <div ref={rowRef} className="flex w-max will-change-transform">
      {set}
      <div aria-hidden="true" className="flex">{set}</div>
    </div>
  );
}

/* Cinta infinita de disciplinas: acelera y cambia de sentido con el scroll */
export default function Marquee() {
  const root = useRef(null);
  const rowA = useRef(null);
  const rowB = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    let dir = 1;
    let boost = 0;
    let xA = 0;
    let xB = 0;
    const st = ScrollTrigger.create({
      trigger: root.current, start: "top bottom", end: "bottom top",
      onUpdate: (self) => {
        dir = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / 220, 14);
      },
    });
    const tick = (_t, dt) => {
      if (!st.isActive) return;
      const step = (0.6 + boost) * dir * (dt / 16.7);
      boost *= 0.92;
      const wA = rowA.current.scrollWidth / 2;
      const wB = rowB.current.scrollWidth / 2;
      xA = (xA - step) % wA;
      xB = (xB + step) % wB;
      if (xA > 0) xA -= wA;
      if (xB > 0) xB -= wB;
      gsap.set(rowA.current, { x: xA, skewX: -boost * 0.8 });
      gsap.set(rowB.current, { x: xB, skewX: boost * 0.8 });
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      st.kill();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Disciplinas: Ballet, Hip Hop, Contemporáneo, Teatro Musical, Canto, Heels, Jazz y Salsa"
      className="relative overflow-hidden bg-[#0f0c29] py-6 sm:py-8"
    >
      <div aria-hidden="true" className="select-none space-y-1 text-[2.6rem] font-black uppercase leading-[1.05] tracking-tight sm:text-7xl">
        <Row rowRef={rowA} />
        <Row rowRef={rowB} outline />
      </div>
    </section>
  );
}
