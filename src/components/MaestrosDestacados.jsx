import { useState } from 'react';

export default function MaestrosDestacados() {
  const maestros = [
    {
      src: '/Isabel.jpg',
      name: 'Isabel Martínez',
      role: 'Directora Artística',
      color: '#ec1763',
      resumen:
        'Isabel Martínez es bailarina, coreógrafa, docente y gestora cultural con más de 20 años en la danza. Inició su formación a los 3 años y la formalizó graduándose de la Escuela Nacional de danza (ENDANZA) en el 2017. Hoy es directora y fundadora de X Academy y de la compañía Explicitus…',
    },
    {
      src: '/Yngrid.jpg',
      name: 'Yngrid Canela',
      role: 'Hip Hop',
      color: '#ceeaee',
      resumen:
        'Yngrid Canela, Licenciada en Negocios Internacionales. Apasionada de las artes, coreografa, bailarina , Maestra y actriz. Desde los 13 años en los estudios de las artes. Ha sido Coreografa de espectáculos como premios heat y coreografiado conciertos y artistas Dominicanos . Actualmente es coreografa de la compañía de danza contemporánea Explicitus.',
    },  
    {
      src: '/Melody.jpg',
      name: 'Melody Santelises',
      role: 'Heels',
      color: '#ff1414',
      resumen:
        'Yngrid es especialista en coreografías urbanas y baile callejero para todas las edades.',
    },    
    {
      src: '/Cristian.jpg',
      name: 'Cristian Hazin',
      role: 'Danza contemporánea',
      color: '#cdd629',
      resumen:
        'Cristian Omar Hazin Garrido, Bailarín profesional, coreógrafo y maestro. Inició su formación en Balleteatro Dominicano, años después ingresó al Conservatorio Nacional de Danza, llegando a formar parte de la compañía juvenil.Licenciado en Coreografía e Interpretación de la Danza por el Instituto de Danza Alicia Alonso en la Universidad Rey Juan Carlos, Madrid, España. Coreógrafo de la compañía de danza Explicitus desde el 2023.',
    },
    {
      src: '/Genesis.jpg',
      name: 'Genesis Brito',
      role: 'Teatro Musical',
      color: '#5568A9',
      resumen:
        'Génesis Brito es actriz y bailarina, y actualmente se desempeña como bailarina principal de la compañía de danza contemporánea Explicitus. Comenzó su formación a los 10 años con Doris Infante, luego continuó en la escuela María Trinidad Sánchez con la profesora María Cristina, y más adelante en la escuela de ballet Venus con docentes como Arianna Roblejo. Su primer acercamiento a la danza contemporánea fue en Ballet Concierto Dominicano con la profesora Alicia Campillo. Es egresada de la Academia de Formación Artística (AFA) y tiene una Licenciatura en Teatro, mención Actuación, en la UASD.',
    },
    {
      src: '/Isaura.jpg',
      name: 'Isaura Abreu',
      role: 'Movimiento creativo & Pre ballet',
      color: '#5568A9',
      resumen:
        'Alba Isaura es bailarina dominicana, graduada en Bachillerato Técnico en Artes (mención Danza) en 2024. Forma parte de la compañía Explicitus…',
    },
    {
      src: '/Paola.jpeg',
      name: 'Paola Prado',
      role: 'Canto',
      color: '#f37826',
      resumen:
        'Paola Prado es cantante, vocal coach, maquilladora, directora coral y docente especializada en teatro musical…',
    },
  ];

  const [open, setOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  const handleClick = (m) => {
    setSeleccionado(m);
    setOpen(true);
  };

  return (
    <>
      <section
        id="maestros"
        className="py-20 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Conoce a Nuestros Maestros
        </h2>

        {/* Primer bloque: primeros 4 maestros */}
        <div
          className="
            grid gap-10
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
            max-w-screen-xl
            mx-auto
          "
        >
          {maestros.slice(0, 4).map((m) => (
            <div
              key={m.name}
              onClick={() => handleClick(m)}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-95 transition-transform cursor-pointer"
              style={{ borderLeftWidth: '4px', borderLeftColor: m.color }}
            >
              <img
                src={m.src}
                alt={m.name}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <div>
                  <h3 className="text-white text-2xl font-semibold">
                    {m.name}
                  </h3>
                  <p className="text-white text-sm">{m.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Segundo bloque: siguientes 4 maestros */}
        <div
          className="
            grid gap-10 mt-12
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
            max-w-screen-xl
            mx-auto
          "
        >
          {maestros.slice(4).map((m) => (
            <div
              key={m.name}
              onClick={() => handleClick(m)}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-95 transition-transform cursor-pointer"
              style={{ borderLeftWidth: '4px', borderLeftColor: m.color }}
            >
              <img
                src={m.src}
                alt={m.name}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                <div>
                  <h3 className="text-white text-2xl font-semibold">
                    {m.name}
                  </h3>
                  <p className="text-white text-sm">{m.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {open && seleccionado && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-2">{seleccionado.name}</h3>
            <p className="text-gray-700">{seleccionado.resumen}</p>
          </div>
        </div>
      )}
    </>
  );
}
