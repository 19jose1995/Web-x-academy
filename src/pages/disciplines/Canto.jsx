import DisciplinaLayout from './DisciplinaLayout';

const about = (
  <>
    <p>
      El canto es una de las formas más naturales de expresión humana y, al mismo tiempo, una
      disciplina que requiere técnica, dedicación y guía profesional para desarrollarse correctamente.
      En <strong>X Academy</strong>, en <strong>Arroyo Hondo, Santo Domingo</strong>, ofrecemos
      clases de canto para niños y teens orientadas al desarrollo vocal integral, la técnica y la
      expresión escénica.
    </p>
    <p>
      Nuestra vocal coach Paola Prado trabaja cada voz de manera individual, entendiendo que no
      existen dos instrumentos iguales. Las clases cubren respiración diafragmática, extensión de
      registro, afinación, dicción, interpretación y presencia en el escenario, preparando a los
      estudiantes para actuar en presentaciones, espectáculos y audiciones.
    </p>
    <p>
      Ya sea que tu hijo quiera cantar en un musical, en un coro o simplemente descubrir su voz,
      en X Academy encontrará el espacio seguro y profesional para hacerlo. El canto también es
      una herramienta poderosa de autoconocimiento y bienestar emocional.
    </p>
  </>
);

const beneficios = [
  { icon: '🎵', title: 'Desarrollo de la voz', desc: 'Técnica vocal personalizada para fortalecer, ampliar y proteger la voz de cada estudiante.' },
  { icon: '🫁', title: 'Respiración y control', desc: 'Aprende respiración diafragmática, la base de una técnica vocal saludable y potente.' },
  { icon: '🎯', title: 'Afinación y oído musical', desc: 'Desarrolla el oído musical y la capacidad de cantar en sintonía con precisión.' },
  { icon: '🌟', title: 'Expresión e interpretación', desc: 'Más allá de las notas: aprende a transmitir emociones y conectar con el público.' },
  { icon: '💪', title: 'Confianza al cantar', desc: 'Supera la timidez y desarrolla seguridad para actuar y cantar ante otros.' },
  { icon: '🎭', title: 'Preparación para el escenario', desc: 'Formación orientada a presentaciones, musicales, audiciones y espectáculos.' },
];

const schedules = [
  { title: 'Canto Kids',  lines: ['Viernes: 3:30–4:30 PM'] },
  { title: 'Canto Teens', lines: ['Viernes: 4:30–5:30 PM'] },
];

const instructors = [
  {
    src: '/Paola.jpeg',
    name: 'Paola Prado',
    role: 'Vocal Coach · Canto',
    color: '#ec1763',
    bio: 'Cantante, vocal coach, directora coral y docente especializada en teatro musical. Estudiante de Licenciatura en Música Contemporánea en la UNPHU. Fundadora del Estudio Musical Paola Prado y profesora de canto e interpretación en la Academia Amaury Sánchez desde 2018.',
  },
];

const relatedLinks = [
  { label: 'Ballet',          emoji: '🩰', href: '/ballet',              color: '#ec1763' },
  { label: 'Hip Hop',         emoji: '🎤', href: '/hip-hop',             color: '#f37826' },
  { label: 'Contemporánea',   emoji: '💫', href: '/danza-contemporanea', color: '#5568A9' },
  { label: 'Teatro Musical',  emoji: '🎭', href: '/teatro-musical',      color: '#7c8fd4' },
];

export default function Canto() {
  return (
    <DisciplinaLayout
      seoTitle="Clases de Canto en Santo Domingo | X Academy"
      seoDesc="Clases de canto para niños y teens en X Academy, Arroyo Hondo, Santo Domingo. Técnica vocal, respiración, afinación e interpretación con Paola Prado, vocal coach profesional."
      title="Canto"
      emoji="🎵"
      subtitle="Técnica · Expresión · Escena"
      heroDesc="Descubre el poder de tu voz. En X Academy, Arroyo Hondo, clases de canto para niños y teens con una vocal coach que trabaja cada instrumento de manera personalizada."
      from="#8fae00"
      to="#cdd629"
      about={about}
      beneficios={beneficios}
      schedules={schedules}
      instructors={instructors}
      relatedLinks={relatedLinks}
    />
  );
}
