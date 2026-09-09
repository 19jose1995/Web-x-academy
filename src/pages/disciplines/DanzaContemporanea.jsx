import DisciplinaLayout from './DisciplinaLayout';

const about = (
  <>
    <p>
      La danza contemporánea es una de las disciplinas más libres y expresivas del mundo del
      movimiento. A diferencia del ballet clásico, no sigue reglas rígidas de forma: su objetivo
      es comunicar, explorar y transformar. En <strong>X Academy</strong>, en{' '}
      <strong>Arroyo Hondo, Santo Domingo</strong>, nuestras clases de danza contemporánea están
      diseñadas para estudiantes que desean ir más allá de la técnica y encontrar su propio lenguaje
      corporal.
    </p>
    <p>
      El programa de contemporánea de X Academy combina técnicas de <em>release</em>,{' '}
      <em>contact improvisation</em>, suelo y trabajo espacial, guiado por Cristian Hazin, bailarín
      y coreógrafo licenciado por el{' '}
      <strong>Instituto de Danza Alicia Alonso</strong> de la Universidad Rey Juan Carlos en Madrid,
      España.
    </p>
    <p>
      Los tres niveles —Contemporáneo 1, 2 y 3— permiten que los estudiantes progresen a su propio
      ritmo, desde los fundamentos del movimiento hasta coreografías complejas y proyectos de
      creación artística. Es la disciplina ideal para quienes ya tienen base en ballet o desean
      ampliar su vocabulario de movimiento.
    </p>
  </>
);

const beneficios = [
  { icon: '🌊', title: 'Libertad de expresión', desc: 'No hay un único modo correcto de moverse. La contemporánea celebra la individualidad.' },
  { icon: '🧩', title: 'Conciencia corporal', desc: 'Aprende a escuchar y comprender tu cuerpo desde adentro hacia afuera.' },
  { icon: '💪', title: 'Fuerza funcional', desc: 'El trabajo de suelo y las transiciones desarrollan una fuerza equilibrada y funcional.' },
  { icon: '🎭', title: 'Capacidad expresiva', desc: 'Conecta emoción y movimiento para crear presencia escénica genuina.' },
  { icon: '🔄', title: 'Adaptabilidad', desc: 'Los bailarines contemporáneos pueden adaptarse a múltiples géneros y estilos.' },
  { icon: '🎓', title: 'Formación profesional', desc: 'Base sólida para quienes aspiran a una carrera artística en danza.' },
];

const schedules = [
  { title: 'Danza Contemporánea 1', lines: ['Lun/Mié: 5:30–6:30 PM'] },
  { title: 'Danza Contemporánea 2', lines: ['Mar/Jue: 5:30–6:30 PM'] },
  { title: 'Danza Contemporánea 3', lines: ['Sáb: 10:00–11:30 AM'] },
];

const instructors = [
  {
    src: '/Cristian.jpg',
    name: 'Cristian Hazin',
    role: 'Danza Contemporánea',
    color: '#cdd629',
    bio: 'Bailarín profesional, coreógrafo y maestro. Formado en Balleteatro Dominicano y el Conservatorio Nacional de Danza. Licenciado en Coreografía e Interpretación de la Danza por el Instituto de Danza Alicia Alonso, Universidad Rey Juan Carlos, Madrid, España.',
  },
];

const relatedLinks = [
  { label: 'Ballet',         emoji: '🩰', href: '/ballet',         color: '#ec1763' },
  { label: 'Hip Hop',        emoji: '🎤', href: '/hip-hop',        color: '#f37826' },
  { label: 'Teatro Musical', emoji: '🎭', href: '/teatro-musical', color: '#7c8fd4' },
  { label: 'Canto',          emoji: '🎵', href: '/canto',          color: '#8fae00' },
];

export default function DanzaContemporanea() {
  return (
    <DisciplinaLayout
      seoTitle="Clases de Danza Contemporánea en Santo Domingo | X Academy"
      seoDesc="Aprende danza contemporánea en X Academy, Arroyo Hondo, Santo Domingo. Tres niveles guiados por Cristian Hazin, licenciado por el Instituto Alicia Alonso de Madrid."
      title="Danza Contemporánea"
      emoji="💫"
      subtitle="Expresiva · Libre · Profunda"
      heroDesc="La danza contemporánea rompe los límites del movimiento convencional. En X Academy, Arroyo Hondo, ofrecemos tres niveles para que encuentres tu propio lenguaje corporal."
      from="#5568A9"
      to="#7c8fd4"
      about={about}
      beneficios={beneficios}
      schedules={schedules}
      instructors={instructors}
      relatedLinks={relatedLinks}
    />
  );
}
