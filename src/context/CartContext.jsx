import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'xwear-cart';
const CartContext = createContext(null);

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [items]);

  const value = useMemo(() => {
    const keyOf = (id, size) => `${id}::${size || ''}`;

    const add = (product, size, qty = 1) =>
      setItems((prev) => {
        const key = keyOf(product.id, size);
        const found = prev.find((i) => i.key === key);
        if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
        return [...prev, { key, id: product.id, name: product.name, price: product.price, image: product.image, size, qty }];
      });

    const setQty = (key, qty) =>
      setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty } : i))));

    const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
    const clear = () => setItems([]);

    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);

    return { items, add, setQty, remove, clear, count, total };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
