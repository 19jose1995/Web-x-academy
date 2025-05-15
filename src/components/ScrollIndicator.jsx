import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Fija un indicador de progreso de scroll en la parte superior
 */
export default function ScrollIndicator() {
  // Obtiene progreso de scroll entre 0 y 1
  const { scrollYProgress } = useScroll();
  // Suaviza la animación con un spring
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    // motion.div se escala horizontalmente según scroll
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '6px',
        transformOrigin: '0%',
        backgroundColor: '#ff0088',
        zIndex: 9999,
      }}
    />
  );
}
