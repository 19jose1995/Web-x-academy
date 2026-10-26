import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSEO } from '../hooks/useSEO';
import { useCart } from '../context/CartContext';
import { CATEGORIES, PRODUCTS, formatPrice } from '../data/xwearProducts';

const PINK = '#e91e8c';
const WHATSAPP = '18093815369';
const BTN_GRADIENT = 'linear-gradient(135deg,#e91e8c,#ec1763)';

/* ─── TARJETA DE PRODUCTO ──────────────────────────────────────── */

function ProductCard({ product, onOpen }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => onOpen(product)}
      className="group text-left rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/25 transition"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${product.soldOut ? 'opacity-40' : ''}`}
        />
        {product.soldOut && (
          <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-black">
            Agotado
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: PINK }}>
          {product.category}
        </p>
        <h3 className="mt-1 font-bold text-white">{product.name}</h3>
        <p className="mt-1 text-white/70">{formatPrice(product.price)}</p>
      </div>
    </motion.button>
  );
}

/* ─── DETALLE DE PRODUCTO ──────────────────────────────────────── */

function ProductModal({ product, onClose, onAdded }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '');
  const [qty, setQty] = useState(1);
  const needsSize = product.sizes.length > 0;
  const canAdd = !product.soldOut && (!needsSize || size);

  const handleAdd = () => {
    add(product, size, qty);
    onAdded();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-neutral-950 border border-white/10 grid sm:grid-cols-2"
      >
        <button onClick={onClose} aria-label="Cerrar" className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white">
          <X size={18} />
        </button>
        <img src={product.image} alt={product.name} className="w-full aspect-[4/5] sm:h-full object-cover" />
        <div className="p-6 sm:p-8 flex flex-col">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: PINK }}>{product.category}</p>
          <h2 className="mt-1 text-2xl font-black text-white">{product.name}</h2>
          <p className="mt-2 text-xl text-white">{formatPrice(product.price)}</p>
          <p className="mt-4 text-white/60 leading-relaxed">{product.description}</p>

          {needsSize && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-white/80 mb-2">Talla</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="min-w-[44px] px-3 py-2 rounded-full border text-sm font-semibold transition"
                    style={
                      size === s
                        ? { background: PINK, borderColor: PINK, color: '#fff' }
                        : { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)' }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <p className="text-sm font-semibold text-white/80">Cantidad</p>
            <div className="flex items-center rounded-full border border-white/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-white" aria-label="Menos"><Minus size={16} /></button>
              <span className="w-8 text-center text-white font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2 text-white" aria-label="Más"><Plus size={16} /></button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className="mt-8 sm:mt-auto rounded-full px-7 py-3.5 font-bold text-white text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: BTN_GRADIENT }}
          >
            {product.soldOut ? 'Agotado' : needsSize && !size ? 'Elige una talla' : 'Agregar al carrito'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── CARRITO + CHECKOUT ───────────────────────────────────────── */

function buildOrderMessage(items, total, form) {
  const lines = [
    '¡Hola! Quiero hacer este pedido de X Wear:',
    '',
    ...items.map((i) => `• ${i.qty} x ${i.name}${i.size ? ` (talla ${i.size})` : ''}: ${formatPrice(i.qty * i.price)}`),
    '',
    `Total: ${formatPrice(total)}`,
    '',
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    `Entrega: ${form.delivery === 'retiro' ? 'Retiro en la academia' : `Envío a ${form.address}`}`,
    `Pago: ${form.payment === 'transferencia' ? 'Transferencia bancaria' : 'Efectivo en la academia'}`,
  ];
  if (form.notes.trim()) lines.push(`Nota: ${form.notes.trim()}`);
  return lines.join('\n');
}

function CartDrawer({ open, onClose }) {
  const { items, setQty, remove, clear, total } = useCart();
  const [step, setStep] = useState('cart');
  const [form, setForm] = useState({ name: '', phone: '', delivery: 'retiro', address: '', payment: 'transferencia', notes: '' });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const formValid = form.name.trim() && form.phone.trim() && (form.delivery === 'retiro' || form.address.trim());

  const handleClose = () => {
    setStep('cart');
    onClose();
  };

  const sendOrder = (e) => {
    e.preventDefault();
    if (!formValid) return;
    const text = encodeURIComponent(buildOrderMessage(items, total, form));
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank', 'noopener');
    clear();
    setStep('sent');
  };

  const field = 'w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/40';

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] bg-black/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleClose}>
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-neutral-950 border-l border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-lg font-black text-white">
                {step === 'checkout' ? 'Datos del pedido' : 'Tu carrito'}
              </h2>
              <button onClick={handleClose} aria-label="Cerrar" className="p-2 text-white/70 hover:text-white"><X size={20} /></button>
            </div>

            {step === 'sent' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <p className="text-2xl font-black text-white">¡Pedido enviado!</p>
                <p className="mt-3 text-white/60">Te abrimos WhatsApp con el resumen. Envía el mensaje y te confirmamos disponibilidad y pago.</p>
                <button onClick={handleClose} className="mt-8 rounded-full px-7 py-3 font-bold text-white text-sm" style={{ background: BTN_GRADIENT }}>
                  Seguir viendo
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 text-white/50">
                <ShoppingBag size={40} className="mb-4" />
                Tu carrito está vacío.
              </div>
            ) : step === 'cart' ? (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-white/10 px-6">
                  {items.map((i) => (
                    <li key={i.key} className="flex gap-4 py-4">
                      <img src={i.image} alt="" className="h-20 w-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{i.name}</p>
                        {i.size && <p className="text-sm text-white/50">Talla {i.size}</p>}
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-white/20">
                            <button onClick={() => setQty(i.key, i.qty - 1)} className="p-1.5 text-white" aria-label="Menos"><Minus size={14} /></button>
                            <span className="w-6 text-center text-sm text-white">{i.qty}</span>
                            <button onClick={() => setQty(i.key, i.qty + 1)} className="p-1.5 text-white" aria-label="Más"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => remove(i.key)} className="text-white/40 hover:text-white" aria-label="Quitar"><Trash2 size={16} /></button>
                        </div>
                      </div>
                      <p className="text-white font-semibold whitespace-nowrap">{formatPrice(i.qty * i.price)}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/10 px-6 py-5">
                  <div className="flex justify-between text-white mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-black">{formatPrice(total)}</span>
                  </div>
                  <button onClick={() => setStep('checkout')} className="w-full rounded-full py-3.5 font-bold text-white text-sm" style={{ background: BTN_GRADIENT }}>
                    Continuar
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={sendOrder} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  <input className={field} placeholder="Nombre completo" value={form.name} onChange={update('name')} required />
                  <input className={field} placeholder="Teléfono / WhatsApp" type="tel" value={form.phone} onChange={update('phone')} required />

                  <fieldset>
                    <legend className="text-sm font-semibold text-white/80 mb-2">Entrega</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {[['retiro', 'Retiro en la academia'], ['envio', 'Envío a domicilio']].map(([v, label]) => (
                        <label key={v} className="cursor-pointer rounded-xl border px-3 py-3 text-sm text-center text-white"
                          style={{ borderColor: form.delivery === v ? PINK : 'rgba(255,255,255,0.15)' }}>
                          <input type="radio" name="delivery" value={v} checked={form.delivery === v} onChange={update('delivery')} className="sr-only" />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {form.delivery === 'envio' && (
                    <textarea className={field} rows={2} placeholder="Dirección de envío" value={form.address} onChange={update('address')} required />
                  )}

                  <fieldset>
                    <legend className="text-sm font-semibold text-white/80 mb-2">Pago</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {[['transferencia', 'Transferencia'], ['efectivo', 'Efectivo en la academia']].map(([v, label]) => (
                        <label key={v} className="cursor-pointer rounded-xl border px-3 py-3 text-sm text-center text-white"
                          style={{ borderColor: form.payment === v ? PINK : 'rgba(255,255,255,0.15)' }}>
                          <input type="radio" name="payment" value={v} checked={form.payment === v} onChange={update('payment')} className="sr-only" />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <textarea className={field} rows={2} placeholder="Nota (opcional)" value={form.notes} onChange={update('notes')} />
                </div>
                <div className="border-t border-white/10 px-6 py-5">
                  <div className="flex justify-between text-white mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-black">{formatPrice(total)}</span>
                  </div>
                  <button type="submit" disabled={!formValid}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-white text-sm disabled:opacity-40"
                    style={{ background: BTN_GRADIENT }}>
                    <img src="/whatsapp.png" alt="" className="h-4 w-4 brightness-0 invert" />
                    Enviar pedido por WhatsApp
                  </button>
                  <button type="button" onClick={() => setStep('cart')} className="mt-3 w-full text-sm text-white/50 hover:text-white">
                    Volver al carrito
                  </button>
                </div>
              </form>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── PÁGINA ───────────────────────────────────────────────────── */

export default function XWear() {
  useSEO({
    title: 'X Wear | Tienda de ropa de baile | X Academy',
    description: 'Ropa y accesorios de baile de X Academy: ballet, hip hop y contemporáneo. Haz tu pedido en línea y retíralo en la academia en Arroyo Hondo.',
  });

  const { count } = useCart();
  const [category, setCategory] = useState('Todo');
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const visible = category === 'Todo' ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <section className="pt-32 pb-12 px-6 text-center">
        <img src="/xwear-logo.jpg" alt="X Wear — Dance · Passion · Style" className="mx-auto w-56 sm:w-72 object-contain" />
        <p className="mt-6 mx-auto max-w-xl text-white/60 text-base sm:text-lg leading-relaxed">
          La tienda de ropa de baile de X Academy. Elige tus piezas, haz tu pedido y retíralo en la academia.
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="text-sm font-bold px-4 py-2 rounded-full border transition"
              style={
                category === c
                  ? { background: PINK, borderColor: PINK, color: '#fff' }
                  : { borderColor: '#e91e8c40', color: PINK }
              }
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence>
            {visible.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 font-bold text-white shadow-lg"
        style={{ background: BTN_GRADIENT, boxShadow: '0 8px 28px rgba(233,30,140,0.35)' }}
        aria-label="Abrir carrito"
      >
        <ShoppingBag size={20} />
        {count > 0 && <span className="text-sm">{count}</span>}
      </button>

      <AnimatePresence>
        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onAdded={() => {
              setSelected(null);
              setCartOpen(true);
            }}
          />
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <Footer />
    </div>
  );
}
