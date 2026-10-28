import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

/*
 * Animaciones de scroll declarativas. Dentro de `rootRef`:
 *   data-fx="split"     titular que entra palabra por palabra
 *   data-fx="up"        aparece subiendo (los vecinos entran escalonados)
 *   data-fx="clip"      imagen que se descubre de abajo hacia arriba
 *   data-fx="parallax"  se desplaza más lento/rápido que el scroll (data-speed, por defecto 12)
 *   data-fx="count"     número que cuenta hasta su valor ("200+", "8"…)
 *   data-fx="line"      línea que se dibuja de izquierda a derecha
 * Con "reducir movimiento" no se hace nada y todo queda visible.
 */

const IN_VIEW = "top 85%";

function splitWords(el) {
  if (el.dataset.fxSplitDone) return el.querySelectorAll("[data-fx-word]");
  const label = el.textContent.replace(/\s+/g, " ").trim();
  const wrap = (node) => {
    const mask = document.createElement("span");
    mask.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;padding:0.12em 0.02em 0.1em;margin:-0.12em -0.02em -0.1em";
    const inner = document.createElement("span");
    inner.dataset.fxWord = "";
    inner.style.display = "inline-block";
    inner.appendChild(node);
    mask.appendChild(inner);
    return mask;
  };
  [...el.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(" ") : wrap(document.createTextNode(part)));
      });
      node.replaceWith(frag);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR") {
      // Un span con degradado se anima como bloque para no romper el recorte del texto
      const placeholder = document.createComment("");
      node.replaceWith(placeholder);
      placeholder.replaceWith(wrap(node));
    }
  });
  el.setAttribute("aria-label", label);
  el.dataset.fxSplitDone = "1";
  return el.querySelectorAll("[data-fx-word]");
}

function parseCount(text) {
  const m = text.match(/^(\D*)(\d+)(.*)$/);
  return m ? { pre: m[1], n: Number(m[2]), post: m[3] } : null;
}

export function useScrollFx(rootRef, deps = []) {
  useLayoutEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context((self) => {
      const q = self.selector;

      q("[data-fx='split']").forEach((el) => {
        const words = splitWords(el);
        gsap.from(words, {
          yPercent: 110, rotate: 4, duration: 0.9, ease: "power4.out", stagger: 0.06,
          scrollTrigger: { trigger: el, start: IN_VIEW, once: true },
        });
      });

      gsap.set(q("[data-fx='up']"), { y: 48, opacity: 0 });
      ScrollTrigger.batch(q("[data-fx='up']"), {
        start: IN_VIEW, once: true,
        onEnter: (els) => gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: true }),
      });

      q("[data-fx='clip']").forEach((el) => {
        const img = el.querySelector("img, video");
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.inOut", delay: Number(el.dataset.delay || 0) });
        if (img) tl.from(img, { scale: 1.35, duration: 1.6, ease: "power3.out" }, "<");
      });

      q("[data-fx='parallax']").forEach((el) => {
        const speed = Number(el.dataset.speed || 12);
        gsap.fromTo(el, { yPercent: -speed / 2 }, {
          yPercent: speed / 2, ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      q("[data-fx='count']").forEach((el) => {
        el.dataset.fxCount ??= el.textContent.trim();
        const parsed = parseCount(el.dataset.fxCount);
        if (!parsed) return;
        const obj = { v: 0 };
        el.textContent = `${parsed.pre}0${parsed.post}`;
        gsap.to(obj, {
          v: parsed.n, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: IN_VIEW, once: true },
          onUpdate: () => { el.textContent = `${parsed.pre}${Math.round(obj.v)}${parsed.post}`; },
        });
      });

      q("[data-fx='line']").forEach((el) => {
        gsap.from(el, {
          scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: IN_VIEW, once: true },
        });
      });
    }, rootRef);
    // Las imágenes diferidas cambian alturas: recalcula posiciones al terminar de cargar
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
