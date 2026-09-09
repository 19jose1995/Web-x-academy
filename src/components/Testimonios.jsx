import { motion } from 'framer-motion';

/*
  REEMPLAZA ESTOS DATOS con testimonios reales de papás y estudiantes.
  Pide una frase corta y auténtica, nombre y si quieren foto.
*/
const testimonios = [
  {
    quote: "Mi hija lleva tres años en X Academy y es la parte de la semana que más espera. Ha cambiado en su postura, su seguridad, en todo.",
    nombre: "Mariela R.",
    rol: "Mamá de estudiante de Ballet",
    color: "#ec1763",
  },
  {
    quote: "Vine buscando hip hop y encontré una familia. Yngrid te enseña a moverte pero también a creer en ti.",
    nombre: "Sebastián V.",
    rol: "Estudiante de Hip Hop, 17 años",
    color: "#f37826",
  },
  {
    quote: "Como mamá yo tenía miedo de que el teatro musical fuera demasiado para un niño de 8 años. Genesis los maneja increíble, con mucha paciencia y pasión.",
    nombre: "Carmen L.",
    rol: "Mamá de estudiante de Teatro Musical",
    color: "#5568A9",
  },
];

export default function Testimonios() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">

        <div data-aos="fade-up" className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
            Lo que dicen las familias
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Santo Domingo · Arroyo Hondo
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonios.map((t, i) => (
            <motion.div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="flex flex-col gap-5"
            >
              {/* Comillas */}
              <div
                className="text-5xl font-black leading-none"
                style={{ color: `${t.color}30` }}
              >
                "
              </div>

              <p className="text-slate-600 text-base leading-relaxed -mt-3 flex-1">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div
                  className="h-8 w-1 rounded-full"
                  style={{ background: t.color }}
                />
                <div>
                  <p className="font-bold text-slate-800 text-sm">{t.nombre}</p>
                  <p className="text-slate-400 text-xs">{t.rol}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
