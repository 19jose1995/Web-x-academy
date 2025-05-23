// src/components/ConfettiButton.jsx
import React, { useCallback, useEffect } from 'react';

export default function ConfettiButton({
  children,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  // Carga dinámica del script de confetti si no está disponible
  useEffect(() => {
    if (typeof window.confetti !== 'function') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Función que dispara confetti usando click o hover
  const triggerConfetti = useCallback((e) => {
    if (typeof window.confetti !== 'function') {
      console.warn('Confetti script aún no cargado');
      return;
    }
    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || window.innerHeight / 2;
    const origin = { x: x / window.innerWidth, y: y / window.innerHeight };
    // Debug log
    console.log('Lanzando confetti en', origin);
    window.confetti({
      particleCount: 50,
      spread: 100,
      startVelocity: 40,
      origin,
      colors: ['#f8c9dd', '#ec1763', '#cdd629'],
    });
  }, []);

  // Al hacer click, dispara confetti y luego ejecuta la función onClick original
  const handleClick = (e) => {
    triggerConfetti(e);
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      {...props}
      onClick={handleClick}
      onMouseEnter={triggerConfetti}
      className={`${className} relative inline-block overflow-hidden px-8 py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform hover:scale-105`}
    >
      {/* Capa de gradiente pulsante */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#f37826] to-[#ec1763] opacity-20 animate-pulse" />
      <span className="relative">{children}</span>
    </button>
  );
}