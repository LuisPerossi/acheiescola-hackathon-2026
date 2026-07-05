import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lista from './pages/Lista'; // Importa a tela dos pais que acabamos de criar
import Espera from './pages/Espera';

// Aqui no futuro vocês vão importar a tela do Admin:
// import Admin from './Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota 1: Quando acessar localhost:5173/ (A página inicial, para os pais) */}
        <Route path="/" element={<Lista />} />
        <Route path="/espera" element={<Espera />} />

        {/* Rota 2: Quando a escola acessar localhost:5173/admin */}
        <Route path="/admin" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Painel da Escola</h1>
            <p>Em construção...</p>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;