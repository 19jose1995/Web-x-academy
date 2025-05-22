// src/components/MaestrosDestacados.jsx
import { useState } from 'react';

export default function MaestrosDestacados() {
  const maestros = [
    {
      src: '/Isabel.jpg',
      name: 'Isabel Martínez',
      role: 'Directora Artística',
      color: '#ec1763',
      resumen:
        'Isabel Martínez es bailarina, coreógrafa, docente y gestora cultural con más de 20 años en la danza. Inició su formación a los 3 años y la formalizó graduándose de la Escuela Nacional de danza (ENDANZA) en el 2017 y hoy es directora y fundadora de X Academy y de la compañía Explicitus, con la cual ha creado piezas reconocidas como Her Crown, Juanita y Work to Do, obra con la que ganó el primer lugar como coreógrafa en los Premios Clara Elena Ramírez y fue nominada a los Premios Soberano.'
,
    },
    {
      src: '/Yngrid.jpg',
      name: 'Yngrid Canela',
      role: 'Hip Hop',
      color: '#ff1414',
      resumen:
        'Yngrid Canela, Licenciada en Negocios Internacionales. Apasionada de las artes, coreografa, bailarina , Maestra y actriz. Desde los 13 años en los estudios de las artes. Ha sido Coreografa de espectáculos como premios heat y coreografiado conciertos y artistas Dominicanos . Actualmente es coreografa de la compañía de danza contemporánea Explicitus.',
    },    
    {
      src: '/Cristian.jpg',
      name: 'Cristian Hazin',
      role: 'Danza contemporánea',
      color: '#cdd629',
      resumen:
        'Cristian Hazin es bailarín y coreógrafo de danza contemporánea, con amplia experiencia en compañías nacionales e internacionales…',
    },
    {
      src: '/Isaura.jpg',
      name: 'Isaura Abreu',
      role: 'Movimiento creativo & Pre ballet',
      color: '#5568A9',
      resumen:
        'Alba Isaura es una joven bailarina dominicana, graduada en 2024 del Bachillerato Técnico en Artes, mención Danza. Actualmente forma parte de la compañía de danza contemporánea Explicitus, donde se ha destacado como intérprete en piezas de repertorio contemporáneo. Su formación técnica ha sido guiada por maestros como Isabel Martínez, Cristian Hazin, Doris Infante y su paso por el Ballet Teatro Dominicano. Se especializa en danza clásica y contemporánea, y también se desempeña como docente, enfocada en el desarrollo técnico y creativo de sus estudiantes.',
    },
    {
      src: '/Paola.jpeg',
      name: 'Paola Prado',
      role: 'Canto',
      color: '#f37826',
      resumen:
        'Paola Prado es cantante, vocal coach, maquilladora, directora coral y docente especializada en teatro musical. Estudia Licenciatura en Música Contemporánea en la UNPHU y cuenta con formación en canto lírico y dirección coral en Venezuela, incluyendo el Conservatorio Simón Bolívar y el Sistema Nacional de Coros. Es fundadora del Estudio Musical Paola Prado y profesora de canto e interpretación en la Academia Amaury Sánchez desde 2018. Ha sido directora coral en diversos proyectos en Venezuela y República Dominicana, y ha participado como soprano en prestigiosas agrupaciones como Koribe y el Coral Nacional Simón Bolívar. En teatro musical, ha trabajado en dirección vocal y producción de obras como In The Heights, Rock of Ages, Hairspray y En el Bosque, además de actuar en montajes como La Jaula de las Locas y La Casa de Bernarda Alba. Su trayectoria combina excelencia artística con una sólida vocación docente.',
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

        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
            max-w-screen-xl
            mx-auto
          "
        >
          {maestros.map((m) => (
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
