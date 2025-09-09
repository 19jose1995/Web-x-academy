import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from 'react';
import Gallery from './components/Gallery';
import ScrollIndicator from './components/ScrollIndicator';
import Header from './components/Header';
import MaestrosDestacados from './components/MaestrosDestacados';
import PackagesSection from "./components/PackagesSection.jsx";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Base para rutas (soporta subcarpeta)
  const BASE = import.meta.env.BASE_URL || '/';

  // --- Estados del formulario
const [birthDate, setBirthDate] = useState("");
const [isMinor, setIsMinor] = useState(false);  // ✅
const [selectedClass, setSelectedClass] = useState("");


  // --- Envío
  const [submitting, setSubmitting] = useState(false);

  // --- Modal
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formRef = useRef(null);
  const selectRef = useRef(null);

  // Helpers fecha
  const todayStr = () => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  };

  const calcIsMinor = (isoDate) => {
    if (!isoDate) return false;
    const dob = new Date(isoDate);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age < 18;
  };

  const handleBirthChange = (e) => {
    const value = e.target.value;
    setBirthDate(value);
    setIsMinor(calcIsMinor(value));
  };

  // Modal abrir
  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    setIsModalOpen(true);
  };

  // Modal confirmar
  const handleConfirm = () => {
    setSelectedClass(selectedOption || "");
    setIsModalOpen(false);
    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => selectRef.current?.focus(), 300);
  };

  // Submit con redirección a gracias.html
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);
      const res = await fetch(`${BASE}send_email.php`, {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        window.location.href = `${BASE}gracias.html`;
        return;
      }
      const txt = await res.text();
      alert('No se pudo enviar el formulario. Intenta de nuevo.\n' + (txt || ''));
    } catch (err) {
      alert('Error de red: ' + (err?.message || 'Intenta de nuevo'));
    } finally {
      setSubmitting(false);
    }
  };

  const clases = [
    { name: 'Open Class Especial', horarios: ['Viernes: 7:30PM'], openClass: true },
    { name: 'Pre Ballet (6 - 8 años)', horarios: ['Lun/Mar/Mié/Jue: 3:30–4:30 PM','Viernes: 3:30–5:00 PM','Sáb: 9:30–11:30 AM'] },
    { name: 'Movimiento Creativo (3 - 5 años)', horarios: ['Lun/Mié: 3:30–4:30 PM', 'Sáb: 9:30–11:00 AM'] },
    { name: 'Ballet 1', horarios: ['Lun/Mié: 4:30–5:30 PM', 'Sáb: 4:30–5:30 AM'] },
    { name: 'Danza Contempo 1', horarios: ['Lun/Mié: 5:30–6:30 PM'] },
    { name: 'Danza Contempo 2', horarios: ['Mar/Jue: 5:30–6:30 PM'] },
    { name: 'Danza Contempo 3', horarios: ['Sáb: 11:00–12:30 PM'] },
    { name: 'Ballet Adultos', horarios: ['Lun/Mié: 7:00–8:00 PM'] },
    { name: 'Heels', horarios: ['Miércoles: 6:00–7:30 PM'] },
    { name: 'Salsa Básica', horarios: ['Mar/Jue: 7:00–8:00 PM','Viernes: 6:30–8:00 PM'] },
    { name: 'Jazz Kids', horarios: ['Lun/Mié: 4:30–5:30 PM'] },
    { name: 'Hip Hop Kids', horarios: ['Mar/Jue: 4:30–5:30 PM'] },
    { name: 'Hip Hop Teens', horarios: ['Mar/Jue: 5:30–6:30 PM'] },
    { name: 'Hip Hop Adultos', horarios: ['Mar/Jue: 6:30–7:30 PM'] },
    { name: 'Canto kids', horarios: ['Viernes: 3:30–4:30 PM'] },
    { name: 'Canto teens', horarios: ['Viernes: 4:30–5:30 PM'] },
    { name: 'Teatro Musical(Teens)', horarios: ['Viernes: 3:30–4:30 PM'] },
    { name: 'Teatro Musical(Kids)', horarios: ['Viernes: 4:30–5:30 PM'] },
    { name: 'Movimiento creativo', horarios: ['Lun/Mar/Mié/Jue: 3:30–4:30 PM','Viernes: 3:30–5:00 PM',' Sáb: 9:30–11:00 AM'] },
    { name: 'Jazz Teen +', horarios: ['Mar/Jue: 4:30–5:30 PM'] },
  ];

  const packageOptions = ['Stage Star', 'Arte en Movimiento', 'Pequeños en Escena', 'Street Vibes'];

  // Opciones del select: paquetes + nombres exactos de clases
  const selectOptions = Array.from(new Set([...packageOptions, ...clases.map(c => c.name)]));

  // Logo (coloca el archivo en public/img/logo.png)
  const heroLogoUrl = `${BASE}img/logo.png`;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <ScrollIndicator />
      <Header />

      {/* HERO */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]"
        data-aos="fade-up"
      >
        <img src={heroLogoUrl} alt="X Academy" className="h-40 w-auto md:h-56 mb-8 select-none" />
        <h1 className="font-extrabold leading-tight tracking-tight text-[#2b2b2b] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Descubre tu talento
          <br className="hidden sm:block" />
          <span className="block mt-2">
            en{' '}
            <span className="bg-gradient-to-r from-[#6b86c7] to-[#5568A9] bg-clip-text text-transparent">
              X Academy
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-[#404040] text-base sm:text-lg md:text-xl lg:text-2xl">
          Una academia de artes donde el canto, el teatro y la danza se convierten en experiencias inolvidables.
        </p>
        <a
          href="#registro"
          className="mt-8 inline-flex items-center justify-center px-8 py-3 rounded-full text-white text-lg font-semibold bg-[#f37826] hover:bg-[#ec1763] transition shadow-[0_10px_30px_rgba(243,120,38,0.35)]"
        >
          Inscríbete Ahora
        </a>
      </section>

      {/* Clases */}
      <section id="clases" className="scroll-mt-24 py-20 px-6 bg-gradient-to-r from-[#ceeaee] via-[#f8c9dd] to-[#fff4f0]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-[#5568af] mb-12">Clases en X Academy</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="relative bg-white p-8 pl-12 rounded-2xl shadow-lg border-l-8 border-[#ec1763]" data-aos="zoom-in">
            <h3 className="text-2xl font-semibold mb-2 text-[#ec1763]">Danza</h3>
            <p>Desde ballet hasta danza urbana, para todas las edades.</p>
          </div>
          <div className="relative bg-white p-8 pl-12 rounded-2xl shadow-lg border-l-8 border-[#cdd629]" data-aos="zoom-in">
            <h3 className="text-2xl font-semibold mb-2 text-[#cdd629]">Canto</h3>
            <p>Desarrolla tu voz con técnicas vocales profesionales.</p>
          </div>
          <div className="relative bg-white p-8 pl-12 rounded-2xl shadow-lg border-l-8 border-[#5568A9]" data-aos="zoom-in">
            <h3 className="text-2xl font-semibold mb-2 text-[#5568A9]">Teatro</h3>
            <p>Explora la actuación, expresión corporal y escénica.</p>
          </div>
        </div>
      </section>

      {/* Maestros */}
      <section id="maestros" className="scroll-mt-24">
        <MaestrosDestacados />
      </section>

      <Gallery />

      {/* Paquetes */}
      <PackagesSection onOptionClick={handleOptionClick} />

      {/* Horarios */}
      <section id="horarios" className="scroll-mt-24 py-20 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5568af]">Clases y Horarios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {clases.map((clase, idx) => {
            const base = 'relative p-6 rounded-xl shadow transition-transform hover:scale-[1.02] cursor-pointer';
            return (
              <div
                key={idx}
                className={`${base} ${clase.openClass ? 'overflow-hidden bg-gradient-to-br from-[#5568A9] to-[#ec1763] border-4 border-white animate-pulse' : 'bg-white border-l-4 border-[#5568af]'}`}
                onClick={() => handleOptionClick(clase.name)}
              >
                {clase.openClass && (
                  <span className="absolute top-4 right-4 bg-white text-[#ec1763] text-xs font-bold uppercase px-2 py-1 rounded">
                    Open Class
                  </span>
                )}
                <h3 className={`${clase.openClass ? 'text-2xl font-bold mb-4 text-white' : 'text-xl font-bold mb-2 text-[#5568af]'}`}>{clase.name}</h3>
                <ul className={`${clase.openClass ? 'text-white' : 'text-gray-700'} text-sm space-y-1`}>
                  {clase.horarios.map((h, i) => <li key={i}>📅 {h}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* REGISTRO */}
      <section id="registro" ref={formRef} className="scroll-mt-24 py-20 px-6 bg-[#ceeaee]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center mb-12">Formulario de Registro</h2>

        <form className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Nombre completo" className="p-4 rounded-xl border border-gray-300" required />

          {/* Fecha de nacimiento */}
          <div className="flex flex-col">
            <label htmlFor="birthday" className="text-sm font-medium text-gray-700">Fecha de nacimiento</label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              max={todayStr()}
              value={birthDate}
              onChange={handleBirthChange}
              className="p-3 rounded-xl border border-gray-300 focus:ring-[#5568A9]"
              required
            />
            {birthDate && (
              <span className="mt-1 text-xs text-gray-500">
                {isMinor ? 'Menor de 18 años (se requiere tutor legal)' : 'Mayor de 18 años'}
              </span>
            )}
          </div>

          {/* Tutor legal solo si es menor */}
          {isMinor && (
            <input
              name="guardian"
              placeholder="Nombre tutor legal"
              className="p-4 rounded-xl border border-gray-300 md:col-span-2"
              type="text"
              required
            />
          )}

          <input name="interests" placeholder="Áreas de interés" className="p-4 rounded-xl border border-gray-300 md:col-span-2" type="text" />
          <input name="email" placeholder="Correo electrónico" className="p-4 rounded-xl border border-gray-300" required type="email" />
          <input name="phone" placeholder="Teléfono" className="p-4 rounded-xl border border-gray-300" required type="tel" />

          {/* Select con todos los paquetes + clases */}
          <select
            ref={selectRef}
            name="class"
            className="p-4 rounded-xl border border-gray-300 md:col-span-2"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            <option value="">Selecciona una clase</option>
            {selectOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={submitting}
            className={`col-span-full bg-[#f37826] text-white py-3 rounded-xl transition
              ${submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#ec1763]'}`}
          >
            {submitting ? 'Enviando…' : 'Enviar'}
          </button>
        </form>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
            <p className="text-lg">
              ¿Deseas inscribirte en <span className="font-semibold">{selectedOption}</span>?
            </p>
            <div className="mt-6 flex items-center justify-end gap-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition">Cancelar</button>
              <button onClick={handleConfirm} className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-[#f37826] to-[#ec1763] hover:opacity-90 transition">Sí</button>
            </div>
          </div>
        </div>
      )}

      {/* Contacto */}
      <section id="contacto" className="py-20 px-6 bg-[#fff4f0]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-[#5568af] mb-12">Contáctanos</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4 text-gray-700">
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/xacademyarts/" target="_blank" rel="noopener noreferrer" className="text-[#ec1763] hover:text-[#f37826] text-2xl flex items-center gap-2">Instagram</a>
              <a href="https://wa.me/8294513903" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 text-2xl flex items-center gap-2">WhatsApp</a>
            </div>
            <p>📍 Dirección: Club Arroyo Hondo, Calle Dr. José Antonio Polanco Billini 10</p>
            <p>📞 Teléfono: +1 (829) 451-3903</p>
            <p>📧 Email: info@xacademy.com.do</p>
          </div>
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow">
            <iframe
              title="Ubicación X Academy"
              src="https://maps.google.com/maps?q=18.497711865550226,-69.93789295203626&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <footer className="text-center p-6 text-sm text-gray-500 bg-white border-t border-gray-200">
        © 2025 X Academy. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
