import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ─── SMOOTH SCROLL ─────────────────────────────────────────────── */
// Una sola instancia de Lenis para todo el sitio, sincronizada con GSAP.
let lenis = null;

export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.14 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

// Desplazamiento suave a un ancla o posición; usa Lenis si está activo.
export function scrollToTarget(target, offset = -72) {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
