
const packages = [
  {
    emoji: '🎤',
    title: 'Stage Star',
    price: 'RD$5,990',
    subtitle: 'Ideal para quienes aman brillar en escena',
    items: ['Canto', 'Teatro', 'Jazz'],
    color: '#ec1763', // rosa fuerte
  },
  {
    emoji: '🩰',
    title: 'Arte en Movimiento',
    price: 'RD$6,990',
    subtitle: 'Una formación sólida para futuros artistas escénicos',
    items: ['Ballet Clásico', 'Danza Contemporánea', 'Jazz'],
    color: '#5568af', // azul de la paleta para mejor contraste
  },
  {
    emoji: '🌟',
    title: 'Pequeños en Escena',
    price: 'RD$4,990',
    subtitle: 'Para niños y niñas desde los 4 años: diversión y expresión corporal',
    items: ['Preballet / Movimiento Creativo', 'Jazz / Hip Hop Kids'],
    color: '#ff8c00', // verde lima
  },
  {
    emoji: '🔥',
    title: 'Street Vibes',
    price: 'RD$6,990',
    subtitle: 'Para los que llevan el ritmo en las venas y pisan fuerte con estilo',
    items: ['Hip Hop', 'Jazz', 'Heels'],
    color: '#f37826', // naranja
  },
];

export default function PackagesSection({ onOptionClick }) {
  return (
    <section
      id="paquetes"
      className="py-20 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]"
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-[#5568af]">
        Nuestros Paquetes
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4">
        {packages.map((pkg, i) => {
          const bgColor = `${pkg.color}20`; // opacidad ligera
          return (
            <div
              key={i}
              onClick={() => onOptionClick(pkg.title)}
              className="rounded-2xl p-6 flex flex-col hover:shadow-2xl hover:-translate-y-2 transform transition cursor-pointer"
              style={{
                border: `4px solid ${pkg.color}`,
                backgroundColor: bgColor,
              }}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl">{pkg.emoji}</span>
                <h3 className="ml-3 text-2xl font-semibold" style={{ color: pkg.color }}>
                  {pkg.title}
                </h3>
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: pkg.color }}>
                {pkg.price}
              </div>
              <p className="text-gray-800 mb-4">{pkg.subtitle}</p>
              <ul className="list-disc list-inside flex-1 mb-4 space-y-1 text-gray-900">
                {pkg.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOptionClick(pkg.title);
                }}
                className="mt-auto text-white py-2 rounded-xl shadow-lg hover:opacity-90 transition"
                style={{
                  background: `linear-gradient(to right, ${pkg.color}, ${pkg.color}cc)`
                }}
              >
                Inscribirme
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}