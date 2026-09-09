import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function XWearSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Grid de 2 columnas en desktop, stacked en móvil */}
      <div className="grid md:grid-cols-2 min-h-[560px]">

        {/* ── Columna izquierda: contenido ── */}
        <div className="relative z-10 flex flex-col justify-center px-8 sm:px-12 md:px-16 py-16 md:py-20">

          {/* Logo */}
          <motion.img
            src="/xwear-logo.jpg"
            alt="X Wear — Dance · Passion · Style"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-56 sm:w-72 mb-8 object-contain"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-sm mb-8"
          >
            La tienda de ropa de baile de X Academy. Todo lo que necesitas para bailar,
            con el estilo que mereces — diseñado para la comunidad de la academia.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {['Ballet', 'Hip Hop', 'Contemporánea', 'Teatro Musical'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold px-3 py-1 rounded-full border"
                style={{ color: '#e91e8c', borderColor: '#e91e8c40' }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="https://wa.me/18093815369?text=Hola%2C%20me%20interesa%20X%20Wear%20"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold text-white text-sm transition hover:scale-105"
              style={{
                background: 'linear-gradient(135deg,#e91e8c,#ec1763)',
                boxShadow: '0 8px 28px rgba(233,30,140,0.35)',
              }}
            >
              <img src="/whatsapp.png" alt="" className="h-4 w-4 brightness-0 invert" />
              Consultar disponibilidad
            </a>
            <span
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/40 cursor-default"
            >
              Tienda online · Próximamente
            </span>
          </motion.div>
        </div>

        {/* ── Columna derecha: video ── */}
        <div className="relative overflow-hidden min-h-[340px] md:min-h-0">
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            src="/videos/X%20wear.MOV"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Gradiente de fusión hacia la izquierda */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, #000 0%, transparent 40%)',
            }}
          />
          {/* Overlay oscuro general */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Badge */}
          <div className="absolute bottom-6 right-6">
            <span
              className="text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full"
              style={{ background: '#e91e8c', color: '#fff' }}
            >
              X Wear
            </span>
          </div>
        </div>
      </div>

      {/* Línea rosa de fondo decorativa */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #e91e8c, transparent)' }}
      />
    </section>
  );
}
