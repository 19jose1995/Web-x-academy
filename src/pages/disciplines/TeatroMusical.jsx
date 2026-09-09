import DisciplinaLayout from './DisciplinaLayout';

const about = (
  <>
    <p>
      El teatro musical es el arte de contar historias a través de la combinación de{' '}
      <strong>actuación, canto y danza</strong>. Es una de las disciplinas más completas y
      exigentes de las artes escénicas, y también una de las más gratificantes. En{' '}
      <strong>X Academy</strong>, en <strong>Arroyo Hondo, Santo Domingo</strong>, ofrecemos
      clases de teatro musical para niños y teens que desean desarrollar todas sus habilidades
      artísticas en un mismo espacio.
    </p>
    <p>
      Nuestra metodología integra la técnica actoral, el trabajo vocal y el movimiento escénico
      en clases dinámicas donde los estudiantes aprenden a habitar personajes, proyectar la voz,
      desplazarse en el escenario y trabajar en equipo. El proceso culmina en montajes y
      presentaciones que les dan la experiencia de actuar ante un público real.
    </p>
    <p>
      Génesis Brito, actriz y bailarina graduada de la Academia de Formación Artística (AFA) y
      con Licenciatura en Teatro de la UASD, conduce estas clases con rigor artístico y calidez
      humana. Sus estudiantes no solo aprenden a actuar: aprenden a expresarse con autenticidad.
    </p>
  </>
);

const beneficios = [
  { icon: '🎤', title: 'Voz y proyección', desc: 'Aprende a usar la voz correctamente: proyección, dicción, entonación y expresión.' },
  { icon: '🎭', title: 'Actuación y presencia escénica', desc: 'Desarrolla la capacidad de habitar personajes y comunicar emociones genuinas en escena.' },
  { icon: '💃', title: 'Movimiento y coreografía', desc: 'El teatro musical combina técnicas de danza adaptadas al contexto dramático.' },
  { icon: '🤝', title: 'Trabajo en equipo', desc: 'Los montajes colectivos enseñan responsabilidad, colaboración y escucha activa.' },
  { icon: '🌟', title: 'Confianza y seguridad', desc: 'Presentarse ante un público transforma la timidez en presencia y seguridad.' },
  { icon: '🧠', title: 'Inteligencia emocional', desc: 'El teatro desarrolla la empatía y la capacidad de comprender distintas perspectivas.' },
];

const schedules = [
  { title: 'Teatro Musical Kids',  lines: ['Viernes: 4:30–5:30 PM'] },
  { title: 'Teatro Musical Teens', lines: ['Viernes: 3:30–4:30 PM'] },
];

const instructors = [
  {
    src: '/Genesis.jpg',
    name: 'Genesis Brito',
    role: 'Teatro Musical',
    color: '#5568A9',
    bio: 'Actriz y bailarina, actualmente bailarina principal de la compañía Explicitus. Egresada de la Academia de Formación Artística (AFA) con Licenciatura en Teatro, mención Actuación, en la UASD. Combina danza contemporánea y actuación con una presencia escénica irresistible.',
  },
];

const relatedLinks = [
  { label: 'Ballet',          emoji: '🩰', href: '/ballet',              color: '#ec1763' },
  { label: 'Hip Hop',         emoji: '🎤', href: '/hip-hop',             color: '#f37826' },
  { label: 'Contemporánea',   emoji: '💫', href: '/danza-contemporanea', color: '#5568A9' },
  { label: 'Canto',           emoji: '🎵', href: '/canto',               color: '#8fae00' },
];

export default function TeatroMusical() {
  return (
    <DisciplinaLayout
      seoTitle="Clases de Teatro Musical en Santo Domingo | X Academy"
      seoDesc="Clases de teatro musical para niños y teens en X Academy, Arroyo Hondo, Santo Domingo. Actuación, canto y danza integrados con Genesis Brito, actriz y bailarina profesional."
      title="Teatro Musical"
      emoji="🎭"
      subtitle="Actuación · Canto · Danza"
      heroDesc="El teatro musical es el arte completo: actuación, canto y movimiento en un solo espacio creativo. En X Academy, Arroyo Hondo, desarrollamos artistas integrales desde niños."
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
