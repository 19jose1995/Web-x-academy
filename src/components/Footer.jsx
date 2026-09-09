export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg,#1a1a2e,#302b63)' }} className="text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <img src="/logo.png" alt="X Academy" className="h-16 object-contain mb-4 brightness-0 invert" />
          <p className="text-sm text-white/50 leading-relaxed">
            Academia de artes escénicas en Santo Domingo, República Dominicana. Danza, canto y teatro para todas las edades.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Navegación</h4>
          <ul className="space-y-2 text-sm text-white/50">
            {[['Clases', '/#clases'], ['Horarios', '/#horarios'], ['Maestros', '/#maestros'], ['Registro', '/#registro'], ['Galería', '/galeria'], ['Blog', '/blog']].map(([label, href]) => (
              <li key={label}><a href={href} className="hover:text-white transition">{label}</a></li>
            ))}
          </ul>
          <h4 className="font-bold text-white/60 mt-5 mb-3 text-xs tracking-widest uppercase">Disciplinas</h4>
          <ul className="space-y-2 text-sm text-white/50">
            {[
              ['Ballet', '/ballet'],
              ['Hip Hop', '/hip-hop'],
              ['Danza Contemporánea', '/danza-contemporanea'],
              ['Teatro Musical', '/teatro-musical'],
              ['Canto', '/canto'],
            ].map(([label, href]) => (
              <li key={label}><a href={href} className="hover:text-white transition">{label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4 text-sm tracking-widest uppercase">Contacto</h4>
          <ul className="space-y-2.5 text-sm text-white/50">
            <li>📞 +1 (809) 381-5369</li>
            <li>✉️ info@xacademy.com.do</li>
            <li>📍 Club Arroyo Hondo, Santo Domingo</li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a href="https://wa.me/18093815369" target="_blank" rel="noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-green-500 transition hover:bg-green-400 hover:scale-110">
              <img src="/whatsapp.png" alt="WhatsApp" className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/xacademyarts" target="_blank" rel="noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white transition hover:scale-110 text-lg">
              📸
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/30">
        © {new Date().getFullYear()} X Academy · Todos los derechos reservados · Hecho con ❤️ en Rep. Dom.
      </div>
    </footer>
  );
}
