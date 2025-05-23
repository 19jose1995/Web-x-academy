// src/components/Gallery.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const images = [
  '/Gallery/img1 (17).jpg',
  '/Gallery/img1 (2).jpg',
  '/Gallery/img1 (3).jpg',
  '/Gallery/img1 (5).jpg',
  '/Gallery/img1 (6).jpg',
  '/Gallery/img1 (7).jpg',
  '/Gallery/img1 (8).jpg',
  '/Gallery/img1 (9).jpg',
];

export default function Gallery() {
  return (
    <section
      id="galeria"
      className="py-20 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]"
      data-aos="fade-up"
    >
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5568af]">
          Galería
        </h2>

        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          }}
          className="overflow-visible"
          breakpoints={{
            // < 640px: 1.2 slides, un poco de peek, menos separación
            0: {
              slidesPerView: 1.2,
              spaceBetween: -20,
            },
            // ≥640px: 2 slides, espacio ajustado
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            // ≥768px: 3 slides
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // ≥1024px: 4 slides
            1024: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <img
                src={src}
                alt={`Galería ${idx + 1}`}
                className="object-cover w-full max-w-xs sm:max-w-sm md:max-w-md h-64 sm:h-80 rounded-2xl shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
