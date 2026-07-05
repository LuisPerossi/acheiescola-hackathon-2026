import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lista from './pages/Lista';
import Espera from './pages/Espera';
import Home from './pages/Home';
import Notificacoes from './pages/Notificacoes';
import Perfil from './pages/Perfil';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota 1: Quando acessar localhost:5173/ (A página inicial, para os pais) */}
        <Route path="/lista" element={<Lista />} />
        <Route path="/espera" element={<Espera />} />
        <Route path="/" element={<Home />} />
        <Route path="/not" element={<Notificacoes />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* Rota 2: Quando a escola acessar localhost:5173/admin */}
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;