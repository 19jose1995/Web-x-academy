import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Gallery from './components/Gallery';
import ScrollIndicator from './components/ScrollIndicator';
import Header from './components/Header';
import InteractiveMap from './components/InteractiveMap';



function App()
 {
  
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [modalClass, setModalClass] = useState(null);
  

  return (

    <div className="min-h-screen bg-white text-gray-800 font-sans">     
       {/* Barra de progreso de scroll */}
       <ScrollIndicator />
     {/* Nuevo Header con logo circular y botones estilizados */}
      <Header />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-28 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]" data-aos="fade-up">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Descubre tu talento<br />en <span className="text-[#ffffff]">X Academy</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-2xl">
          Una academia de artes donde el canto, el teatro y la danza se convierten en experiencias inolvidables.
        </p>
        <a
          href="#registro"
          className="px-8 py-4 text-lg bg-[#f37826] text-white rounded-full shadow-lg hover:bg-[#ec1763]/90 transition transform hover:scale-105"
        >
          Inscribirse Ahora
        </a>
      </section>      
      {/* Clases */}
      <section id="clases" className="py-20 px-6 bg-gradient-to-r from-[#ceeaee] via-[#f8c9dd] to-[#fff4f0]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center mb-12">Clases en X Academy</h2>
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
      {/* Galería de Maestros Destacados */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]" data-aos="fade-up">
  <h2 className="text-4xl font-bold text-center mb-12">Conoce a Nuestros Maestros</h2>
  <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
    <div className="relative bg-white rounded-2xl shadow-xl border-l-8 border-[#f37826] overflow-hidden hover:scale-105 transition">
      <img src="/maestro1.jpg" alt="María López" className="w-full h-80 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
        <div>
          <h3 className="text-white text-2xl font-semibold">-</h3>
          <p className="text-white text-sm">Especialista en Música</p>
        </div>
      </div>
    </div>
    <div className="relative bg-white rounded-2xl shadow-xl border-l-8 border-[#ec1763] overflow-hidden hover:scale-105 transition">
      <img src="/Maestro3.jpg" alt="Isabel Minguez" className="w-full h-80 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
        <div>
          <h3 className="text-white text-2xl font-semibold">Isabel Minguez</h3>
          <p className="text-white text-sm">Directora de danza</p>
        </div>
      </div>
    </div>
    <div className="relative bg-white rounded-2xl shadow-xl border-l-8 border-[#5568A9] overflow-hidden hover:scale-105 transition">
      <img src="/maestro2.jpg" alt="Carlos Ruiz" className="w-full h-80 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
        <div>
          <h3 className="text-white text-2xl font-semibold">-</h3>
          <p className="text-white text-sm">Instructor de Pintura</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Calendario */}      
      <section className="py-20 px-6 bg-gradient-to-br from-[#ceeaee] via-[#f8c9dd] to-[#cdd629]" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#5568af]">Clases y Horarios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            
            {
              name: 'Pre Ballet',
              horarios: ['Lun/Mié/Jue: 3:30–4:30 PM', 'Sábado: 9:30–11:30 AM']
            },
            {
              name: 'Movimiento Creativo',
              horarios: ['Lun/Mié: 3:30–4:30 PM', 'Sábado: 9:30–11:00 AM']
            },
            {
              name: 'Ballet 1',
              horarios: ['Lun/Mié: 4:30–5:30 PM', 'Sábado: 4:30–5:30 AM']
            },
            {
              name: 'Contempo 1',
              horarios: ['Lun/Mié: 5:30–6:30 PM']
            },
            {
              name: 'Jazz Kids',
              horarios: ['Lun/Mié: 4:30–5:30 PM']
            },
            {
              name: 'Hip Hop Teens',
              horarios: ['Mar/Jue: 5:30–6:30 PM']
            },
            {
              name: 'Teatro Musical',
              horarios: ['Viernes: 4:30–5:30 PM']
            },
            {
              name: 'Danza Contempo 3',
              horarios: ['Sábado: 11:00–12:30 PM']
            }
          ].map((clase, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow border-l-4 border-[#5568af] hover:scale-[1.02] transition">
              <h3 className="text-xl font-bold mb-2 text-[#5568af]">{clase.name}</h3>
              <ul className="text-gray-700 text-sm space-y-1">
                {clase.horarios.map((hora, i) => (
                  <li key={i}>📅 {hora}</li>
                ))}
              </ul>
            </div>
          ))}
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
  <h2 className="text-4xl font-bold text-center mb-12">Contáctanos</h2>
  <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
    <div className="space-y-4 text-gray-700">
      <div className="flex space-x-4 mt-6">
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
    </div><div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow">
    <InteractiveMap />
      <iframe
        title="Ubicación X Academy"
        src="…"
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


      {/* Footer */}
      <footer className="text-center p-6 text-sm text-gray-500 bg-white border-t border-gray-200">
        © 2025 X Academy. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
