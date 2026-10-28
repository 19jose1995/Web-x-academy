import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "../lib/motion";

/*
 * Cursor propio (solo con mouse): un punto magenta y un aro que lo sigue.
 * Sobre enlaces el aro crece; sobre [data-cursor="Texto"] muestra ese texto.
 * Los elementos con [data-magnetic] se dejan atraer un poco por el mouse.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled] = useState(
    () => typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion(),
  );

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    let magnet = null;

    let shown = false;
    const onMove = (e) => {
      if (!shown) { shown = true; gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 }); }
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        gsap.to(magnet, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.3,
          y: (e.clientY - (r.top + r.height / 2)) * 0.3,
          duration: 0.4, ease: "power3.out",
        });
      }
    };
    const onOver = (e) => {
      const target = e.target.closest("a, button, [data-cursor], input, select, textarea, label");
      const text = target?.closest("[data-cursor]")?.dataset.cursor || "";
      setLabel(text);
      gsap.to(ring.current, {
        scale: text ? 2.6 : target ? 1.7 : 1,
        backgroundColor: text ? "#ec1763" : "rgba(236,23,99,0)",
        duration: 0.35, ease: "power3.out",
      });
      gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.2 });
      const m = e.target.closest("[data-magnetic]");
      if (m !== magnet) {
        if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        magnet = m;
      }
    };
    const onLeave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[300] -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#ec1763]">
        <span className="text-[5px] font-black uppercase tracking-widest text-white">{label}</span>
      </div>
      <div ref={dot} aria-hidden="true"
        style={{ opacity: 0 }}
        className="pointer-events-none fixed left-0 top-0 z-[300] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#ec1763]" />
    </>
  );
}
