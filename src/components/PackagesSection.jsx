import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic2, Music2, Sparkles, Flame, X } from 'lucide-react';

const packages = [
  {
    icon: Mic2,
    title: 'Stage Star',
    price: 'RD$5,990',
    subtitle: 'Ideal para quienes aman brillar en escena',
    items: ['Canto', 'Teatro', 'Jazz'],
    color: '#ec1763',
  },
  {
    icon: Music2,
    title: 'Arte en Movimiento',
    price: 'RD$6,990',
    subtitle: 'Una formación sólida para futuros artistas escénicos',
    items: ['Ballet Clásico', 'Danza Contemporánea', 'Jazz'],
    color: '#5568A9',
  },
  {
    icon: Sparkles,
    title: 'Pequeños en Escena',
    price: 'RD$4,990',
    subtitle: 'Para niños y niñas desde los 4 años: diversión y expresión corporal',
    items: ['Preballet / Movimiento Creativo', 'Jazz / Hip Hop Kids'],
    color: '#cdd629',
  },
  {
    icon: Flame,
    title: 'Street Vibes',
    price: 'RD$6,990',
    subtitle: 'Para los que llevan el ritmo en las venas y pisan fuerte con estilo',
    items: ['Hip Hop', 'Jazz', 'Heels'],
    color: '#f37826',
  },
];

export default function PackagesSection() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="paquetes" className="mx-auto max-w-6xl px-6 py-20">
        <div data-aos="fade-up" className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
            Nuestros <span style={{ color: '#ec1763' }}>Paquetes</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto">
            Combinaciones pensadas para cada etapa y estilo artístico.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-3xl p-6 flex flex-col text-white shadow-xl"
              style={{ background: pkg.color }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 border border-white/25 mb-4">
                <pkg.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-extrabold">{pkg.title}</h3>
              <div className="text-2xl font-black mt-1 mb-2">{pkg.price}</div>
              <p className="text-white/80 text-sm mb-4">{pkg.subtitle}</p>
              <ul className="text-sm text-white/90 space-y-1 flex-1 mb-4">
                {pkg.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelected(pkg)}
                className="mt-auto rounded-full bg-white/15 border border-white/30 py-2.5 font-bold text-sm transition hover:bg-white/25 hover:scale-105"
              >
                Inscríbete
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && <OrderModal pkg={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

function OrderModal({ pkg, onClose }) {
  const [form, setForm] = useState({ name: '', contact: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const body = new URLSearchParams({
        type: 'pedido',
        package: pkg.title,
        name: form.name,
        contact: form.contact,
      });
      const res = await fetch('/send_email.php', { method: 'POST', body });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'sent' ? (
          <div className="text-center py-6">
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">¡Pedido recibido!</h3>
            <p className="text-slate-500 text-sm">
              Te contactaremos pronto para coordinar los detalles y el pago.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-full bg-[#5568A9] text-white px-6 py-2.5 text-sm font-bold hover:bg-[#44558a] transition"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: pkg.color }}
              >
                {pkg.title}
              </div>
              <div className="text-lg font-extrabold text-slate-800">{pkg.price}</div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Nombre completo
              </span>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5568A9]/30 focus:border-[#5568A9]/60"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Teléfono o correo electrónico
              </span>
              <input
                name="contact"
                type="text"
                required
                value={form.contact}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5568A9]/30 focus:border-[#5568A9]/60"
              />
            </label>

            {status === 'error' && (
              <p className="text-sm text-red-600">
                Hubo un problema enviando tu pedido.{' '}
                <a
                  href={`https://wa.me/18093815369?text=${encodeURIComponent(
                    `Hola, quiero el paquete ${pkg.title}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-semibold"
                >
                  Escríbenos por WhatsApp
                </a>{' '}
                o intenta de nuevo.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-full bg-[#f37826] text-white py-3 font-bold text-sm hover:bg-orange-500 transition disabled:opacity-60"
            >
              {status === 'sending' ? 'Enviando…' : 'Enviar pedido'}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
