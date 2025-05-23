import { useState, useEffect } from 'react';
import ConfettiButton from './ConfettiButton';

export default function RegistrationForm({ initialSelection }) {
  const [form, setForm] = useState({
    name: '',
    birthday: '',
    guardian: '',
    email: '',
    phone: '',
    class: '',
  });

  // Cuando cambie la selección inicial (paquete o clase), preselecciona el dropdown
  useEffect(() => {
    if (initialSelection) {
      setForm(f => ({ ...f, class: initialSelection }));
    }
  }, [initialSelection]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const getAge = (dob) => {
    if (!dob) return null;
    const diff = Date.now() - new Date(dob).getTime();
    return new Date(diff).getUTCFullYear() - 1970;
  };

  const age = getAge(form.birthday);
  const isMinor = age !== null && age < 18;

  // Combos y clases unificados
  const classOptions = [
    'Stage Star',
    'Arte en Movimiento',
    'Pequeños en Escena',
    'Street Vibes',
    'Open Class Especial',
    'Pre Ballet (6 - 8 años)',
    'Movimiento Creativo (3 - 5 años)',
    'Ballet 1',
    'Danza Contempo 1',
    'Danza Contempo 2',
    'Danza Contempo 3',
    'Ballet Adultos',
    'Salsa Básica',
    'Jazz Kids',
    'Hip Hop Kids',
    'Hip Hop Teens',
    'Hip Hop Adultos',
    'Canto kids',
    'Canto teens',
    'Teatro Musical(Teens)',
    'Teatro Musical(Kids)',
    'Movimiento creativo',
    'Jazz Teen +',
  ];

  return (
    <section id="registro" className="py-16 bg-[#ceeaee]" data-aos="fade-up">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#5568af] mb-8">
        Formulario de Registro
      </h2>

      <form
        action="/send_email.php"
        method="POST"
        className="max-w-3xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={(e) => {
          if (!e.currentTarget.checkValidity()) return;
          e.preventDefault();
          // Lógica de confeti si deseas
          e.currentTarget.submit();
        }}
      >
        {/* Dropdown unificado de paquetes y clases */}
        <select
          name="class"
          className="w-full p-3 rounded-xl border border-gray-300"
          required
          value={form.class}
          onChange={handleChange}
        >
          <option value="" disabled>
            Selecciona un paquete o clase
          </option>
          {classOptions.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>

        {/* Nombre completo */}
        <input
          name="name"
          type="text"
          placeholder="Nombre completo"
          className="w-full p-3 rounded-xl border border-gray-300"
          required
          value={form.name}
          onChange={handleChange}
        />

        {/* Fecha de nacimiento */}
        <div className="flex flex-col">
          <label htmlFor="birthday" className="mb-1 text-sm font-medium text-gray-700">
            Fecha de nacimiento
          </label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            className="w-full bg-white appearance-none p-3 rounded-xl border border-gray-300 focus:ring focus:ring-[#5568A9]/30"
            required
            value={form.birthday}
            onChange={handleChange}
          />
        </div>

        {/* Tutor legal si menor de 18 */}
        {isMinor && (
          <input
            name="guardian"
            type="text"
            placeholder="Nombre tutor legal"
            className="w-full p-3 rounded-xl border border-gray-300"
            required
            value={form.guardian}
            onChange={handleChange}
          />
        )}

        {/* Correo electrónico */}
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-3 rounded-xl border border-gray-300"
          required
          value={form.email}
          onChange={handleChange}
        />

        {/* Teléfono */}
        <input
          name="phone"
          type="tel"
          placeholder="Teléfono"
          pattern="\d{7,15}"
          title="Introduce entre 7 y 15 dígitos"
          className="w-full p-3 rounded-xl border border-gray-300"
          required
          value={form.phone}
          onChange={handleChange}
        />

        {/* Botón de envío */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f37826] to-[#ec1763] text-white py-3 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
}
