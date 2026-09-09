import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSEO } from '../../hooks/useSEO';

const beneficios = [
  {
    num: '1',
    title: 'Desarrollo cognitivo y memoria',
    color: '#ec1763',
    body: 'Aprender coreografías, secuencias de movimientos y ritmos musicales activa múltiples áreas del cerebro simultáneamente. Los niños que practican danza mejoran su memoria de trabajo, su atención sostenida y su capacidad de seguir instrucciones complejas. En las clases de X Academy, en Santo Domingo, los pequeños memorizan combinaciones de pasos que ejercitan constantemente su mente.',
  },
  {
    num: '2',
    title: 'Coordinación, flexibilidad y postura',
    color: '#f37826',
    body: 'La danza trabaja el cuerpo de manera integral. El ballet desarrolla postura, flexibilidad y coordinación motriz. El hip hop fortalece el core y el equilibrio. La contemporánea enseña conciencia corporal profunda. Independientemente de la disciplina, los niños que bailan tienen un cuerpo más funcional y saludable.',
  },
  {
    num: '3',
    title: 'Expresión emocional y comunicación',
    color: '#5568A9',
    body: 'Muchos niños tienen dificultades para expresar lo que sienten con palabras. La danza les ofrece un lenguaje alternativo: el movimiento. Nuestros maestros en X Academy guían a los estudiantes para que encuentren en la danza un canal de expresión auténtico y liberador, lo que también mejora su comunicación verbal en otros contextos.',
  },
  {
    num: '4',
    title: 'Socialización y trabajo en equipo',
    color: '#7c8fd4',
    body: 'Las clases de danza son espacios de convivencia. Los niños aprenden a respetar turnos, compartir el espacio, apoyarse mutuamente y celebrar los logros colectivos. Los montajes y presentaciones de X Academy en Arroyo Hondo refuerzan el sentido de equipo: el éxito de la función depende de todos por igual.',
  },
  {
    num: '5',
    title: 'Autoestima y confianza en uno mismo',
    color: '#cdd629',
    body: 'Dominar un paso nuevo, actuar ante un público, recibir aplausos: cada experiencia en la danza construye la autoestima ladrillo a ladrillo. En X Academy los estudiantes crecen en un ambiente donde cada progreso —por pequeño que sea— es reconocido y celebrado.',
  },
];

export default function BeneficiosDanzaNinos() {
  useSEO({
    title: '5 beneficios de la danza para niños | X Academy Santo Domingo',
    description: 'Descubre los 5 principales beneficios de la danza para niños: desarrollo cognitivo, coordinación, expresión emocional, socialización y autoestima. X Academy, Arroyo Hondo, Santo Domingo.',
  });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      <Header />

      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#302b63 60%,#1a1a2e 100%)' }}
      >
        <div
          className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full blur-3xl opacity-15"
          style={{ background: '#f37826' }}
        />

        <div className="mx-auto max-w-3xl relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-white/30 mb-8 tracking-wide"
          >
            <a href="/" className="hover:text-white/60 transition">Inicio</a>
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
              style={{ background: 'linear-gradient(90deg,#ec1763,#f37826)' }}
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              5 beneficios de la danza para niños: por qué empezar desde pequeños
            </h1>
            <p className="mt-5 text-white/50 text-sm">
              X Academy · Arroyo Hondo, Santo Domingo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido */}
      <article className="mx-auto max-w-3xl px-6 py-16">

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
          Inscribir a un niño en clases de danza no es solo darle un hobby: es invertir en su
          desarrollo integral. La danza —ya sea ballet, hip hop, contemporánea o teatro
          musical— activa el cuerpo, estimula la mente y nutre el alma desde edades muy tempranas.
          En <strong>X Academy</strong>, en <strong>Arroyo Hondo, Santo Domingo</strong>, lo
          vemos cada día con nuestros más de 200 estudiantes. Estos son los cinco beneficios
          más importantes.
        </p>

        {/* Lista de beneficios — estilo editorial */}
        <div className="space-y-12">
          {beneficios.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span
                  className="text-6xl font-black leading-none"
                  style={{ color: `${b.color}20` }}
                >
                  {b.num}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-800">{b.title}</h2>
              </div>
              <p className="text-slate-500 text-base leading-relaxed pl-0 sm:pl-16">{b.body}</p>
              {i < beneficios.length - 1 && <hr className="mt-12 border-slate-100" />}
            </motion.div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-slate-100 p-6 bg-slate-50">
          <h2 className="text-lg font-black text-slate-800 mb-3">¿Cuándo empezar?</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            La respuesta corta: <strong className="text-slate-700">cuanto antes, mejor</strong>.
            En X Academy recibimos niños desde los <strong className="text-slate-700">3 años</strong>{' '}
            en Movimiento Creativo, donde el objetivo no es la técnica sino la exploración libre y
            gozosa del movimiento. A los 6 años comienza el Pre-Ballet; a los 9 ya pueden integrarse
            al Ballet 1 con bases más estructuradas. Lo más importante es que el niño quiera estar ahí.
          </p>
        </div>

        {/* CTA */}
        <div
          className="mt-14 rounded-3xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg,#1a1a2e,#302b63)' }}
        >
          <div
            className="h-px w-10 mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg,#ec1763,#f37826)' }}
          />
          <p className="text-white font-black text-2xl mb-2">¿Quieres que tu hijo viva esto?</p>
          <p className="text-white/50 text-sm mb-7">Inscríbelo en X Academy, Arroyo Hondo, Santo Domingo.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#registro"
              className="rounded-full px-8 py-3 font-bold text-white text-sm transition hover:scale-105"
              style={{ background: 'linear-gradient(135deg,#ec1763,#f37826)' }}
            >
              Inscribir a mi hijo
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
              href="/blog/como-elegir-primera-clase-ballet"
              className="group block rounded-2xl border border-slate-100 p-5 hover:border-slate-200 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition mb-1">
                Cómo elegir la primera clase de ballet para tu hija
              </h3>
              <p className="text-slate-400 text-xs">Leer artículo →</p>
            </a>
            <a
              href="/ballet"
              className="group block rounded-2xl border border-slate-100 p-5 hover:border-slate-200 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-slate-800 text-sm group-hover:text-pink-600 transition mb-1">
                Ver todas las clases de danza en X Academy
              </h3>
              <p className="text-slate-400 text-xs">Explorar clases →</p>
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
