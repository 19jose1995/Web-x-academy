import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
const Ballet = lazy(() => import('./pages/disciplines/Ballet'));
const HipHop = lazy(() => import('./pages/disciplines/HipHop'));
const DanzaContemporanea = lazy(() => import('./pages/disciplines/DanzaContemporanea'));
const TeatroMusical = lazy(() => import('./pages/disciplines/TeatroMusical'));
const Canto = lazy(() => import('./pages/disciplines/Canto'));
const ComoElegirPrimeraClaseBallet = lazy(() => import('./pages/blog/ComoElegirPrimeraClaseBallet'));
const BeneficiosDanzaNinos = lazy(() => import('./pages/blog/BeneficiosDanzaNinos'));
const BlogIndex = lazy(() => import('./pages/blog/BlogIndex'));
const Galeria = lazy(() => import('./pages/Galeria'));
const XWear = lazy(() => import('./pages/XWear'));

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1a2e]" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/xwear" element={<XWear />} />
        <Route path="/ballet" element={<Ballet />} />
        <Route path="/hip-hop" element={<HipHop />} />
        <Route path="/danza-contemporanea" element={<DanzaContemporanea />} />
        <Route path="/teatro-musical" element={<TeatroMusical />} />
        <Route path="/canto" element={<Canto />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/como-elegir-primera-clase-ballet" element={<ComoElegirPrimeraClaseBallet />} />
        <Route path="/blog/beneficios-de-la-danza-para-ninos" element={<BeneficiosDanzaNinos />} />
      </Routes>
    </Suspense>
  );
}
