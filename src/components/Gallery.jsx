import React, { useState } from 'react';

// Coloca tus imágenes en public/gallery/
const images = [
  '/Gallery/img1.jpg',
  '/Gallery/img1 (2).jpg',
  '/Gallery/img1 (3).jpg',
  '/Gallery/img1 (5).jpg',
  '/Gallery/img1 (6).jpg',
  '/Gallery/img1 (7).jpg',
  '/Gallery/img1 (8).jpg',
  '/Gallery/img1 (9).jpg',
  '/Gallery/img1 (10).jpg',
  '/Gallery/img1 (11).jpg',
  '/Gallery/img1 (12).jpg',
  '/Gallery/img1 (13).jpg',
  '/Gallery/img1 (14).jpg',
  '/Gallery/img1 (15).jpg',
  '/Gallery/img1 (16).jpg',
  '/Gallery/img1 (17).jpg', 
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="galeria" className="py-20 px-6 bg-white" data-aos="fade-up">
      <h2 className="text-4xl font-bold text-center mb-12">Galería</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Galería ${idx + 1}`}
            className="object-cover w-full h-48 rounded-lg cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setSelected(idx)}
          />
        ))}
      </div>

      {selected !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setSelected(null)}
          >
            &times;
          </button>
          <img
            src={images[selected]}
            alt={`Galería ${selected + 1}`}
            className="max-h-[90%] max-w-[90%] rounded-lg"
          />
        </div>
      )}
    </section>
  );
}
