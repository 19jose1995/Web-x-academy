import DisciplinaLayout from './DisciplinaLayout';

const about = (
  <>
    <p>
      El hip hop es mucho más que un estilo de baile: es una cultura, una forma de expresión y
      una comunidad. Nacido en las calles de Nueva York en los años 70, el hip hop ha evolucionado
      hasta convertirse en uno de los géneros de danza más populares y practicados del mundo.
      En <strong>X Academy</strong>, en <strong>Arroyo Hondo, Santo Domingo</strong>, ofrecemos
      clases de hip hop para todas las edades, desde niños hasta adultos.
    </p>
    <p>
      Nuestras clases combinan técnicas de <em>breaking</em>, <em>popping</em>, <em>locking</em>{' '}
      y <em>freestyle</em> con la creatividad propia de la cultura urbana. Los estudiantes aprenden
      no solo pasos y coreografías, sino también a escuchar la música, a improvisar y a desarrollar
      su propio estilo.
    </p>
    <p>
      Yngrid Canela, nuestra maestra de Hip Hop, ha coreografiado espectáculos de talla
      internacional como los <strong>Premios Heat</strong> y trabajado con artistas dominicanos de
      primer nivel. Su energía y pasión convierten cada clase en una experiencia que los estudiantes
      esperan con ansias cada semana.
    </p>
  </>
);

const beneficios = [
  { icon: '🔥', title: 'Cardio y energía', desc: 'Una clase de hip hop equivale a un entrenamiento cardiovascular completo y divertido.' },
  { icon: '🎶', title: 'Sentido del ritmo', desc: 'Desarrolla la musicalidad y la capacidad de moverse en sincronía con cualquier tipo de música.' },
  { icon: '🌟', title: 'Autoexpresión', desc: 'El hip hop invita a cada bailarín a encontrar y mostrar su propio estilo único.' },
  { icon: '🤝', title: 'Comunidad y pertenencia', desc: 'El hip hop nació como cultura comunitaria. Bailarlo refuerza el sentido de grupo y equipo.' },
  { icon: '💡', title: 'Creatividad e improvisación', desc: 'El freestyle desarrolla la capacidad de pensar en movimiento y reaccionar con creatividad.' },
  { icon: '🏅', title: 'Para todas las edades', desc: 'Clases específicas para Kids, Teens y Adultos con contenidos adaptados a cada grupo.' },
];

const schedules = [
  { title: 'Hip Hop Kids',   lines: ['Mar/Jue: 4:30–5:30 PM'] },
  { title: 'Hip Hop Teens',  lines: ['Mar/Jue: 5:30–6:30 PM'] },
  { title: 'Hip Hop Adultos', lines: ['Mar/Jue: 6:30–7:30 PM'] },
];

const instructors = [
  {
    src: '/Yngrid.jpg',
    name: 'Yngrid Canela',
    role: 'Hip Hop · Coreógrafa',
    color: '#f37826',
    bio: 'Licenciada en Negocios Internacionales. Bailarina, coreógrafa, maestra y actriz con más de 15 años en las artes. Ha coreografiado espectáculos como Premios Heat y conciertos de artistas dominicanos. Coreógrafa de la compañía de danza contemporánea Explicitus.',
  },
];

const relatedLinks = [
  { label: 'Ballet',          emoji: '🩰', href: '/ballet',              color: '#ec1763' },
  { label: 'Contemporánea',   emoji: '💫', href: '/danza-contemporanea', color: '#5568A9' },
  { label: 'Teatro Musical',  emoji: '🎭', href: '/teatro-musical',      color: '#7c8fd4' },
  { label: 'Canto',           emoji: '🎵', href: '/canto',               color: '#8fae00' },
];

export default function HipHop() {
  return (
    <DisciplinaLayout
      seoTitle="Clases de Hip Hop en Santo Domingo | X Academy"
      seoDesc="Clases de hip hop para niños, teens y adultos en X Academy, Arroyo Hondo, Santo Domingo. Aprende con Yngrid Canela, coreógrafa de los Premios Heat."
      title="Hip Hop"
      emoji="🎤"
      subtitle="Urbano · Libre · Auténtico"
      heroDesc="Hip hop para todos los niveles y edades. En X Academy, Arroyo Hondo, aprende con una de las mejores coreógrafas del país en un ambiente energético y lleno de comunidad."
      from="#f37826"
      to="#ec1763"
      about={about}
      beneficios={beneficios}
      schedules={schedules}
      instructors={instructors}
      relatedLinks={relatedLinks}
    />
  );
}
