// src/components/InteractiveMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icono personalizado en tu color principal (#5568af)
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
  className: 'filter-primary' // luego definimos un filtro CSS
});

// Filtro CSS para recolorear el marcador
// en tu index.css o componente global añade:
// .filter-primary {
//   filter: invert(31%) sepia(66%) saturate(302%) hue-rotate(200deg) brightness(90%) contrast(90%);
// }

export default function InteractiveMap() {
  const position = [18.4992324, -69.9407505];

  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Mosaicos CartoDB Positron, muy ligeros y claros */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &copy; CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <Marker position={position} icon={customIcon}>
          <Popup className="text-sm">
            📍 X Academy<br />
            Calle N No.7B, Sector Arroyo Hondo
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
