import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../hooks/useSEO';

export default function ComoElegirPrimeraClaseBallet() {
  useSEO({
    title: 'Cómo elegir la primera clase de ballet para tu hija | X Academy Santo Domingo',
    description: 'Guía para padres en Santo Domingo: cómo elegir la primera clase de ballet para tu hija. Edad ideal, qué buscar en una academia y por qué X Academy en Arroyo Hondo.',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      <Header />

      {/* Hero del artículo */}
      <section
        className="relative pt-28 pb-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)' }}
      >
        <div
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full blur-3xl opacity-15"
          style={{ background: '#ec1763' }}
        />

        <div className="mx-auto max-w-3xl relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-white/30 mb-8 tracking-wide"
          >
            <a href="/" className="hover:text-white/60 transition">Inicio</a>
            <span className="mx-2">›</span>
            <a href="/ballet" className="hover:text-white/60 transition">Ballet</a>
            <span className="mx-2">›</span>
            Artículo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="h-px w-10 mb-6"
              style={{ background: 'linear-gradient(90deg,#ec1763,#ff6b9d)' }}
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Cómo elegir la primera clase de ballet para tu hija
            </h1>
            <p className="mt-5 text-white/50 text-sm">
              X Academy · Arroyo Hondo, Santo Domingo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido del artículo */}
      <article className="mx-auto max-w-3xl px-6 py-16">

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
          Si tu hija ha mostrado interés en el ballet —ya sea porque vio una actuación, porque
          "quiere bailar como una princesa" o simplemente porque la música la mueve a moverse—
          probablemente ya estás pensando en cómo darle esa oportunidad. Elegir bien la primera
          academia y el primer nivel es clave para que la experiencia sea positiva y duradera.
        </p>

        <hr className="border-slate-100 my-10" />

        <h2 className="text-2xl font-black text-slate-800 mb-5">¿Cuál es la edad ideal para empezar?</h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          No existe una única respuesta, pero aquí hay una guía general:
        </p>

        <div className="space-y-5 mb-10">
          <div className="flex gap-5">
            <div className="shrink-0 w-16 text-right">
              <span className="text-xs font-black text-pink-500">3–5</span>
              <br />
              <span className="text-xs text-slate-400">años</span>
            </div>
            <div className="flex-1 border-l border-slate-200 pl-5 pb-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong className="text-slate-800">Movimiento Creativo.</strong> No se trata de
                técnica sino de explorar el cuerpo, la música y el espacio a través del juego. Es
                la puerta de entrada perfecta.
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="shrink-0 w-16 text-right">
              <span className="text-xs font-black text-pink-500">6–8</span>
              <br />
              <span className="text-xs text-slate-400">años</span>
            </div>
            <div className="flex-1 border-l border-slate-200 pl-5 pb-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong className="text-slate-800">Pre-Ballet.</strong> Se introducen los primeros
                elementos técnicos: postura, coordinación, posiciones básicas. Las niñas ya pueden
                seguir instrucciones más estructuradas.
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="shrink-0 w-16 text-right">
              <span className="text-xs font-black text-pink-500">9+</span>
              <br />
              <span className="text-xs text-slate-400">años</span>
            </div>
            <div className="flex-1 border-l border-slate-200 pl-5">
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong className="text-slate-800">Ballet 1 y superiores.</strong> A esta edad
                pueden comenzar a desarrollar una técnica más exigente con resultados notables.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-100 my-10" />

        <h2 className="text-2xl font-black text-slate-800 mb-5">
          ¿Qué buscar en una academia de ballet en Santo Domingo?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          No todas las academias son iguales. Estos son los factores que realmente importan:
        </p>

        <div className="space-y-6 mb-10">
          {[
            {
              title: 'Maestras con formación real',
              body: 'Verifica que tengan formación formal en danza clásica, no solo años de experiencia como bailarinas. En X Academy, Isabel Martínez e Isaura Abreu se graduaron de ENDANZA.',
            },
            {
              title: 'Grupos separados por edad y nivel',
              body: 'Mezclar niñas de 4 años con niñas de 10 en la misma clase perjudica a ambas. Pregunta cómo están organizados los grupos antes de inscribirte.',
            },
            {
              title: 'El espacio importa',
              body: 'Piso de madera o flotante, barras, espejos y buena ventilación. Si puedes, visita el espacio antes de comprometerte. Nosotros te invitamos a conocer X Academy antes de inscribir a tu hija.',
            },
            {
              title: 'Una academia que presente resultados',
              body: 'Las academias serias organizan presentaciones para que los estudiantes vivan la experiencia escénica real. Eso dice mucho sobre la cultura artística del lugar.',
            },
            {
              title: 'Cercanía y constancia',
              body: 'Una academia cercana facilita la constancia, que en el ballet es fundamental. X Academy está en el Club Arroyo Hondo, Santo Domingo, con horarios de lunes a sábado.',
            },
          ].map(({ title, body }, i) => (
            <div key={i}>
              <h3 className="font-bold text-slate-800 text-base mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <hr className="border-slate-100 my-10" />

        <h2 className="text-2xl font-black text-slate-800 mb-5">¿Y si mi hija no quiere seguir?</h2>
        <p className="text-slate-600 leading-relaxed mb-5">
          Es completamente normal que en las primeras semanas haya dudas o incluso resistencia.
          El ballet requiere adaptación a una nueva disciplina, un nuevo espacio y nuevas personas.
          Dale al menos 4 a 6 semanas antes de tomar una decisión definitiva, habla con la
          maestra para entender cómo se está adaptando, y evita presionar: el ballet debe ser
          algo que ella quiera y disfrute.
        </p>
        <p className="text-slate-600 leading-relaxed mb-10">
          Si después de dos o tres meses sigue sin conectar, está bien explorar otras disciplinas.
          En X Academy también tenemos hip hop, teatro musical y canto — puede que su pasión
          esté esperando en otro salón.
        </p>

        {/* CTA editorial */}
        <div
          className="rounded-3xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg,#1a1a2e,#302b63)' }}
        >
          <div
            className="h-px w-10 mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg,#ec1763,#ff6b9d)' }}
          />
          <p className="text-white font-black text-2xl mb-2">¿Lista para dar el primer paso?</p>
          <p className="text-white/50 text-sm mb-7">
            Te esperamos en Arroyo Hondo. Primera clase de prueba disponible.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#registro"
              className="rounded-full px-8 py-3 font-bold text-white text-sm transition hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#ec1763,#ff6b9d)' }}
            >
              Inscríbete Ahora
            </a>
            <a
              href="https://wa.me/18093815369"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/8 px-8 py-3 font-bold text-white text-sm transition hover:bg-white/15"
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </div>

        {/* Más artículos */}
        <div className="mt-14">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-5">
            Seguir leyendo
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="/blog/beneficios-de-la-danza-para-ninos"
              className="group block rounded-2xl border border-slate-100 p-5 hover:border-slate-200 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition mb-1">
                5 beneficios de la danza para niños
              </h3>
              <p className="text-slate-400 text-xs">Leer artículo →</p>
            </a>
            <a
              href="/ballet"
              className="group block rounded-2xl border border-slate-100 p-5 hover:border-slate-200 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition mb-1">
                Clases de Ballet en X Academy: niveles y horarios
              </h3>
              <p className="text-slate-400 text-xs">Ver clases →</p>
            </a>
          </div>
        </div>
      </article>

      <Footer />

      <a
        href="https://wa.me/18093815369"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-2xl shadow-green-500/40 transition hover:scale-110 hover:bg-green-600"
        aria-label="WhatsApp"
      >
        <img src="/whatsapp.png" alt="" className="h-7 w-7" />
      </a>
    </div>
  );
}
