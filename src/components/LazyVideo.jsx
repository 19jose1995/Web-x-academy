import { useEffect, useRef } from 'react';

/**
 * Video decorativo (sin audio, en loop) que solo se descarga y reproduce
 * cuando está en pantalla, y se pausa al salir.
 */
export default function LazyVideo({ src, poster, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      style={style}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
