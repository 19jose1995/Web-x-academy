import DisciplinaLayout from './DisciplinaLayout';

const about = (
  <>
    <p>
      El ballet clásico es una de las formas de arte escénico más antiguas y refinadas del mundo.
      Fundado en técnica, elegancia y disciplina, el ballet desarrolla postura, coordinación,
      fuerza y expresión artística desde una edad temprana. En <strong>X Academy</strong>, nuestra
      academia ubicada en <strong>Arroyo Hondo, Santo Domingo</strong>, ofrecemos clases de ballet
      diseñadas para cada etapa del desarrollo.
    </p>
    <p>
      Desde el <em>Movimiento Creativo</em> para niños de 3 a 5 años —donde el juego y la
      exploración del cuerpo son protagonistas— hasta el <em>Pre-Ballet</em>, el <em>Ballet 1</em>{' '}
      y el <em>Ballet Adultos</em>, cada nivel está pensado para acompañar el crecimiento artístico
      con metodología pedagógica de primer nivel. Nuestras maestras están graduadas de la Escuela
      Nacional de Danza (ENDANZA) y tienen amplia experiencia en danza clásica profesional.
    </p>
    <p>
      En X Academy creemos que el ballet no es solo una disciplina: es una forma de vida. La
      rigurosidad, el trabajo en equipo, la perseverancia y la belleza de cada movimiento forman
      el carácter y la personalidad de nuestros estudiantes, sin importar la edad o el nivel de
      experiencia con que comiencen.
    </p>
  </>
);

const beneficios = [
  { icon: '🧘', title: 'Postura y porte', desc: 'Corrige la columna y desarrolla un porte elegante que se mantiene en la vida diaria.' },
  { icon: '🧠', title: 'Disciplina y constancia', desc: 'Aprende a trabajar con constancia y a superar retos a través de la práctica.' },
  { icon: '🤸', title: 'Flexibilidad y coordinación', desc: 'Mejora la coordinación motriz y la flexibilidad desde los primeros años.' },
  { icon: '🎨', title: 'Expresión artística', desc: 'Desarrolla la capacidad de comunicar emociones a través del movimiento.' },
  { icon: '💪', title: 'Fuerza y equilibrio', desc: 'El ballet trabaja grupos musculares profundos que fortalecen todo el cuerpo.' },
  { icon: '⭐', title: 'Confianza y autoestima', desc: 'Cada logro en el ballet refuerza la seguridad y el amor propio.' },
];

const schedules = [
  { title: 'Movimiento Creativo (3–5 años)', lines: ['Lun/Mié: 3:30–4:30 PM', 'Sáb: 9:30–11:00 AM'] },
  { title: 'Pre Ballet (6–8 años)',          lines: ['Lun/Mar/Mié/Jue: 3:30–4:30 PM', 'Viernes: 3:30–5:00 PM', 'Sáb: 9:30–11:30 AM'] },
  { title: 'Ballet 1',                       lines: ['Lun/Mié: 4:30–5:30 PM', 'Sáb: 4:30–5:30 PM'] },
  { title: 'Ballet Adultos',                 lines: ['Lun/Mié: 7:00–8:00 PM'] },
];

const instructors = [
  {
    src: '/Isabel.jpg',
    name: 'Isabel Martínez',
    role: 'Directora Artística · Ballet',
    color: '#ec1763',
    bio: 'Bailarina, coreógrafa y docente con más de 20 años en la danza. Graduada de ENDANZA en 2017, fundadora de X Academy y de la compañía Explicitus. Ganadora del primer lugar en los Premios Clara Elena Ramírez y nominada a los Premios Soberano.',
  },
  {
    src: '/Isaura.jpg',
    name: 'Isaura Abreu',
    role: 'Movimiento Creativo & Pre Ballet',
    color: '#f37826',
    bio: 'Graduada del Bachillerato Técnico en Artes, mención Danza (2024). Parte de la compañía Explicitus. Especialista en danza clásica y contemporánea, con vocación pedagógica para los más pequeños.',
  },
];

const relatedLinks = [
  { label: 'Hip Hop',          emoji: '🎤', href: '/hip-hop',             color: '#f37826' },
  { label: 'Contemporánea',    emoji: '💫', href: '/danza-contemporanea', color: '#5568A9' },
  { label: 'Teatro Musical',   emoji: '🎭', href: '/teatro-musical',      color: '#7c8fd4' },
  { label: 'Canto',            emoji: '🎵', href: '/canto',               color: '#8fae00' },
];

export default function Ballet() {
  return (
    <DisciplinaLayout
      seoTitle="Clases de Ballet en Santo Domingo | X Academy"
      seoDesc="Aprende ballet clásico en X Academy, ubicada en Arroyo Hondo, Santo Domingo. Clases para niños desde 3 años hasta adultos, con maestras certificadas por ENDANZA."
      title="Ballet"
      emoji="🩰"
      subtitle="Clásico · Elegante · Transformador"
      heroDesc="El ballet es la base de toda danza. Ofrecemos clases para niños desde 3 años, teens y adultos en nuestra academia de Arroyo Hondo, con maestras graduadas de la Escuela Nacional de Danza."
      from="#ec1763"
      to="#ff6b9d"
      about={about}
      beneficios={beneficios}
      schedules={schedules}
      instructors={instructors}
      relatedLinks={relatedLinks}
    />
  );
}
