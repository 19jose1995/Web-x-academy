import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const classOptions = [
  'Open Class Especial',
  'Pre Ballet (6 - 8 años)',
  'Movimiento Creativo (3 - 5 años)',
  'Ballet 1',
  'Danza Contempo 1',
  'Danza Contempo 2',
  'Danza Contempo 3',
  'Ballet Adultos',
  'Heels',
  'Salsa Básica',
  'Jazz Kids',
  'Jazz Teen +',
  'Hip Hop Kids',
  'Hip Hop Teens',
  'Hip Hop Adultos',
  'Canto Kids',
  'Canto Teens',
  'Teatro Musical (Kids)',
  'Teatro Musical (Teens)',
];

function getAge(dob) {
  if (!dob) return null;
  const diff = Date.now() - new Date(dob).getTime();
  return new Date(diff).getUTCFullYear() - 1970;
}

function Field({ label, icon, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">
        <span>{icon}</span> {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-[#5568A9]/30 focus:border-[#5568A9]/60';

export default function RegistrationForm({ initialSelection }) {
  const [form, setForm] = useState({
    name: '', birthday: '', guardian: '', areas: '', email: '', phone: '', class: '',
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (initialSelection) setForm(f => ({ ...f, class: initialSelection }));
  }, [initialSelection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const age = getAge(form.birthday);
  const isMinor = age !== null && age < 18;

  const handleSubmit = (e) => {
    if (!e.currentTarget.checkValidity()) return;
    setSent(true);
  };

  return (
    <section
      id="registro"
      className="py-24 px-4 sm:px-8"
      style={{ background: 'linear-gradient(160deg, #eef2ff 0%, #fce7f3 50%, #ecfdf5 100%)' }}
      data-aos="fade-up"
    >
      <div className="mx-auto max-w-5xl">

        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
            Formulario de{' '}
            <span style={{ color: '#ec1763' }}>Registro</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-md mx-auto text-sm sm:text-base">
            Completa tus datos y nos pondremos en contacto contigo.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 items-start">

          {/* ── Panel izquierdo decorativo ── */}
          <div
            className="md:col-span-2 rounded-3xl p-8 text-white flex flex-col gap-6 min-h-[420px] relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #5568A9, #302b63)' }}
          >
            <img src="/logo.png" alt="X Academy" className="h-14 object-contain brightness-0 invert" />

            <div>
              <h3 className="text-2xl font-extrabold leading-tight">¡Únete a<br />X Academy!</h3>
              <p className="mt-3 text-white/65 text-sm leading-relaxed">
                Inscríbete hoy y forma parte de nuestra comunidad de artistas.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-white/80">
              {[
                '🎓 Maestros certificados y con experiencia escénica',
                '🎭 Danza, canto y teatro para todas las edades',
                '📅 Horarios flexibles entre semana y fines de semana',
                '🏆 Presentaciones y eventos durante el año',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span>{item.slice(0, 2)}</span>
                  <span>{item.slice(3)}</span>
                </li>
              ))}
            </ul>

            {/* Blobs decorativos */}
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#ec1763]/25 blur-2xl" />
            <div className="pointer-events-none absolute -top-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-xl" />
          </div>

          {/* ── Formulario ── */}
          <div className="md:col-span-3 bg-white rounded-3xl shadow-xl p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="text-5xl">🎉</div>
                  <h3 className="text-2xl font-extrabold text-slate-800">¡Registro enviado!</h3>
                  <p className="text-slate-500 text-sm max-w-xs">
                    Gracias por tu interés. Nos pondremos en contacto contigo pronto.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name:'',birthday:'',guardian:'',areas:'',email:'',phone:'',class:'' }); }}
                    className="mt-2 rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                  >
                    Nuevo registro
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  action="/send_email.php"
                  method="POST"
                  className="flex flex-col gap-5"
                  onSubmit={(e) => { handleSubmit(e); }}
                >
                  {/* Nombre + Fecha */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nombre completo" icon="👤">
                      <input name="name" type="text" placeholder="Ej. María López"
                        className={inputCls} required value={form.name} onChange={handleChange} />
                    </Field>
                    <Field label="Fecha de nacimiento" icon="🎂">
                      <input name="birthday" type="date"
                        className={inputCls} required value={form.birthday} onChange={handleChange} />
                    </Field>
                  </div>

                  {/* Tutor si es menor */}
                  <AnimatePresence>
                    {isMinor && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <Field label="Tutor legal" icon="🧑‍🤝‍🧑">
                          <input name="guardian" type="text" placeholder="Nombre del tutor o representante"
                            className={inputCls} required value={form.guardian} onChange={handleChange} />
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email + Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Correo electrónico" icon="✉️">
                      <input name="email" type="email" placeholder="correo@ejemplo.com"
                        className={inputCls} required value={form.email} onChange={handleChange} />
                    </Field>
                    <Field label="Teléfono" icon="📞">
                      <input name="phone" type="tel" placeholder="809-000-0000"
                        pattern="\d{7,15}" title="Introduce entre 7 y 15 dígitos"
                        className={inputCls} required value={form.phone} onChange={handleChange} />
                    </Field>
                  </div>

                  {/* Clase */}
                  <Field label="Clase de interés" icon="🎭">
                    <select name="class" className={inputCls} required value={form.class} onChange={handleChange}>
                      <option value="" disabled>Selecciona una clase</option>
                      {classOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Áreas adicionales */}
                  <Field label="Comentarios o áreas de interés" icon="💬">
                    <textarea name="areas" rows={3} placeholder="Cuéntanos más sobre lo que buscas..."
                      className={inputCls + ' resize-none'} value={form.areas} onChange={handleChange} />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full rounded-xl py-3.5 font-bold text-white text-sm tracking-wide transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]"
                    style={{ background: 'linear-gradient(135deg, #ec1763, #f37826)', boxShadow: '0 4px 20px rgba(236,23,99,0.30)' }}
                  >
                    Enviar registro →
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
