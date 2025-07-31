import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState, useRef } from 'react';
import Gallery from './components/Gallery';
import ScrollIndicator from './components/ScrollIndicator';
import Header from './components/Header';
import InteractiveMap from './components/InteractiveMap';
import MaestrosDestacados from './components/MaestrosDestacados';


function App()
 {
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef(null);

  // Maneja click en paquete o clase
  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    setIsModalOpen(true);
  };

const lat = 18.499407245975924;
const lng = -69.94082110538326;
  
  const handleConfirm = () => {
    if (formRef.current) formRef.current.scrollIntoView({ behavior: 'smooth' });
    setIsModalOpen(false);
  };

  const clases = [
    { name: 'Open Class Especial', horarios: ['Viernes: 7:30PM'], openClass: true },
    { name: 'Pre Ballet (6 - 8 años)', horarios: ['Lun/Mar/Mié/Jue: 3:30–4:30 PM', 'Sáb: 9:30–11:30 AM'] },
    { name: 'Movimiento Creativo (3 - 5 años)', horarios: ['Lun/Mié: 3:30–4:30 PM', 'Sáb: 9:30–11:00 AM'] },
    { name: 'Ballet 1', horarios: ['Lun/Mié: 4:30–5:30 PM', 'Sáb: 4:30–5:30 AM'] },
    { name: 'Danza Contempo 1', horarios: ['Lun/Mié: 5:30–6:30 PM'] },
    { name: 'Danza Contempo 2', horarios: ['Mar/Jue: 5:30–6:30 PM'] },
    { name: 'Danza Contempo 3', horarios: ['Sáb: 11:00–12:30 PM'] },
    { name: 'Ballet Adultos', horarios: ['Lun/Mié: 7:00–8:00 PM'] },
    { name: 'Salsa Básica', horarios: ['Mar/Jue: 7:00–8:00 PM'] },
    { name: 'Jazz Kids', horarios: ['Lun/Mié: 4:30–5:30 PM'] },
    { name: 'Hip Hop Kids', horarios: ['Mar/Jue: 4:30–5:30 PM'] },
    { name: 'Hip Hop Teens', horarios: ['Mar/Jue: 5:30–6:30 PM'] },
    { name: 'Hip Hop Adultos', horarios: ['Mar/Jue: 6:30–7:30 PM'] },
    { name: 'Canto kids', horarios: ['Viernes: 3:30–4:30 PM'] },
    { name: 'Canto teens', horarios: ['Viernes: 4:30–5:30 PM'] },
    { name: 'Teatro Musical(Teens)', horarios: ['Viernes: 3:30–4:30 PM'] },
    { name: 'Teatro Musical(Kids)', horarios: ['Viernes: 4:30–5:30 PM'] },
    { name: 'Movimiento creativo', horarios: ['Lun/Mar/Mié/Jue: 3:30–4:30 PM', 'Sáb: 9:30–11:00 AM'] },
    { name: 'Jazz Teen +', horarios: ['Mar/Jue: 4:30–5:30 PM'] },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <ScrollIndicator />
      <Header />      

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]" data-aos="fade-up">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Descubre tu talento<br />en <span className="text-[#ffffff]">X Academy</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 max-w-2xl text-gray-700">
          Una academia de artes donde el canto, el teatro y la danza se convierten en experiencias inolvidables.
        </p>
        <a
          href="#registro"
          className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-[#f37826] text-white rounded-full shadow-lg hover:bg-[#ec1763]/90 transition transform hover:scale-105"
        >
          Inscríbete Ahora
        </a>
      </section>
       {/* Clases */}
      <section id="clases" className="py-20 px-6 bg-gradient-to-r from-[#ceeaee] via-[#f8c9dd] to-[#fff4f0]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-[#5568af] mb-12">Clases en X Academy</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="relative bg-white p-8 pl-12 rounded-2xl shadow-lg border-l-8 border-[#ec1763] hover:scale-105 transition-transform" data-aos="zoom-in">
            <h3 className="text-2xl font-semibold mb-2 text-[#ec1763]">Canto</h3>
            <p>Desarrolla tu voz con técnicas vocales profesionales.</p>
          </div>
                    <div className="relative bg-white p-8 pl-12 rounded-2xl shadow-lg border-l-8 border-[#cdd629] hover:scale-105 transition-transform" data-aos="zoom-in">
            <h3 className="text-2xl font-semibold mb-2 text-[#cdd629]">Danza</h3>
            <p>Desde ballet hasta danza urbana, para todas las edades.</p>
          </div>
                    <div className="relative bg-white p-8 pl-12 rounded-2xl shadow-lg border-l-8 border-[#5568A9] hover:scale-105 transition-transform" data-aos="zoom-in">
            <h3 className="text-2xl font-semibold mb-2 text-[#5568A9]">Teatro</h3>
            <p>Explora la actuación, expresión corporal y escénica.</p>
          </div>
        </div>
      </section>
       <MaestrosDestacados />

      {/* Packages Section */}
      <PackagesSection onOptionClick={handleOptionClick} />

      {/* Clases y Horarios */}
      <section
        id="horarios"
        className="py-20 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5568af]">
          Clases y Horarios
        </h2>
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
                  {clase.horarios.map((h,i) => <li key={i}>📅 {h}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
      <Gallery/>
            <section id="registro" className="py-20 px-6 bg-[#ceeaee]" data-aos="fade-up">
              <h2 className="text-4xl font-bold text-center mb-12">Formulario de Registro</h2>
              <form className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
                <input type="text" placeholder="Nombre completo" className="p-4 rounded-xl border border-gray-300" />
                <input type="text" placeholder="Fecha de nacimiento" className="p-4 rounded-xl border border-gray-300" />
                <input type="text" placeholder="Nombre tutor legal" className="p-4 rounded-xl border border-gray-300" />
                <input type="text" placeholder="Areas de interes" className="p-4 rounded-xl border border-gray-300" />
                <input type="email" placeholder="Correo electrónico" className="p-4 rounded-xl border border-gray-300" />
                <input type="tel" placeholder="Teléfono" className="p-4 rounded-xl border border-gray-300" />
                <select className="p-4 rounded-xl border border-gray-300">
                  <option>Selecciona una clase</option>
                  <option>Pre Ballet</option>
                  <option>Movimiento Creativo</option>
                  <option>Ballet 1</option>
                  <option>Ballet adultos</option>
                  <option>Danza Contemporanea</option>
                  <option>Teatro</option>
                  <option>Canto</option>
                  <option>Jazz Kids</option>
                  <option>Danza Contemporanea 3</option>
                  <option>Hip Hop Teens</option>
                </select>
                <button className="col-span-full bg-[#f37826] text-white py-3 rounded-xl hover:bg-[#ec1763] transition">Enviar</button>
              </form>
            </section>
          
      <section id="contacto" className="py-20 px-6 bg-[#fff4f0]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center text-[#5568af] mb-12">Contáctanos</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4 text-gray-700">
            <div className="flex space-x-4 mt-6">
              {/* Redes sociales */}
                <a href="https://www.instagram.com/xacademyarts/" target="_blank" rel="noopener noreferrer" className="text-[#ec1763] hover:text-[#f37826] text-2xl flex items-center gap-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z"/></svg>
        Instagram
      </a>
      <a href="https://wa.me/8294513903" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 text-2xl flex items-center gap-2">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 3.5A11.6 11.6 0 0012 .2C5.6.2.4 5.3.4 11.6c0 2 .5 4 1.5 5.8L0 24l6.7-1.7a11.4 11.4 0 005.7 1.5h.1c6.4 0 11.6-5.2 11.6-11.5 0-3.2-1.3-6.3-3.6-8.6zM12 21.3c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-4 .9.9-3.9-.2-.3A9.5 9.5 0 012.4 11.6c0-5.3 4.3-9.6 9.6-9.6 2.6 0 5 1 6.8 2.8s2.8 4.2 2.8 6.8c0 5.3-4.3 9.6-9.6 9.6z"/></svg>
        WhatsApp
      </a>
            </div>
            <p>📍 Dirección: Calle N No.7B, Sector Arroyo Hondo</p>
            <p>📞 Teléfono: +1 (829) 451-3903</p>
            <p>📧 Email: info@xacademy.com.do</p>
          </div>
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow">
            {/* Mapa de Google Embed */}
            <iframe
              title="Ubicación X Academy"
               src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
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