export default function InteractiveMap() {
  return (
    <div className="w-full h-64 md:h-72 rounded-xl overflow-hidden shadow-lg">
      <iframe
        src="https://maps.google.com/maps?q=X+Academy+Arroyo+Hondo+Santo+Domingo&z=17&output=embed&hl=es"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="X Academy - Ubicación"
        allowFullScreen
      />
    </div>
  );
}
