/* ─── CATÁLOGO X WEAR ─────────────────────────────────────────────
   Para agregar, cambiar o agotar un producto, edita esta lista.
   - price: en pesos dominicanos (RD$)
   - sizes: tallas disponibles; deja [] si es talla única
   - soldOut: true para mostrarlo como agotado
   - image: ruta dentro de /public
   PRODUCTOS DE EJEMPLO: reemplazar con el catálogo real.
──────────────────────────────────────────────────────────────────── */

export const CATEGORIES = ['Todo', 'Ballet', 'Hip Hop', 'Contemporánea', 'Accesorios'];

export const PRODUCTS = [
  {
    id: 'leotardo-clasico',
    name: 'Leotardo clásico X',
    category: 'Ballet',
    price: 1800,
    sizes: ['4', '6', '8', '10', 'S', 'M', 'L'],
    image: '/xwear-tema.jpg',
    description: 'Leotardo de tirantes en tela suave con logo X Academy.',
  },
  {
    id: 'mallas-ballet',
    name: 'Mallas de ballet',
    category: 'Ballet',
    price: 650,
    sizes: ['Niña', 'Adulto'],
    image: '/xwear-tema.jpg',
    description: 'Mallas rosadas convertibles para clase y presentación.',
  },
  {
    id: 'hoodie-x',
    name: 'Hoodie X Wear',
    category: 'Hip Hop',
    price: 2500,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/xwear-tema.jpg',
    description: 'Hoodie oversize negro con logo rosado.',
  },
  {
    id: 'jogger-x',
    name: 'Jogger X Wear',
    category: 'Hip Hop',
    price: 1900,
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/xwear-tema.jpg',
    description: 'Jogger cómodo para ensayar y entrenar.',
  },
  {
    id: 'top-contemporaneo',
    name: 'Top deportivo',
    category: 'Contemporánea',
    price: 1200,
    sizes: ['XS', 'S', 'M', 'L'],
    image: '/xwear-tema.jpg',
    description: 'Top de soporte medio, ideal para piso y contemporáneo.',
    soldOut: true,
  },
  {
    id: 'bolso-x',
    name: 'Bolso X Academy',
    category: 'Accesorios',
    price: 1500,
    sizes: [],
    image: '/xwear-tema.jpg',
    description: 'Bolso amplio para llevar todo a clase.',
  },
];

export const formatPrice = (n) => `RD$${n.toLocaleString('es-DO')}`;
