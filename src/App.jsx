import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ballet from './pages/disciplines/Ballet';
import HipHop from './pages/disciplines/HipHop';
import DanzaContemporanea from './pages/disciplines/DanzaContemporanea';
import TeatroMusical from './pages/disciplines/TeatroMusical';
import Canto from './pages/disciplines/Canto';
import ComoElegirPrimeraClaseBallet from './pages/blog/ComoElegirPrimeraClaseBallet';
import BeneficiosDanzaNinos from './pages/blog/BeneficiosDanzaNinos';
import BlogIndex from './pages/blog/BlogIndex';
import Galeria from './pages/Galeria';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/ballet" element={<Ballet />} />
      <Route path="/hip-hop" element={<HipHop />} />
      <Route path="/danza-contemporanea" element={<DanzaContemporanea />} />
      <Route path="/teatro-musical" element={<TeatroMusical />} />
      <Route path="/canto" element={<Canto />} />
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/como-elegir-primera-clase-ballet" element={<ComoElegirPrimeraClaseBallet />} />
      <Route path="/blog/beneficios-de-la-danza-para-ninos" element={<BeneficiosDanzaNinos />} />
    </Routes>
  );
}
