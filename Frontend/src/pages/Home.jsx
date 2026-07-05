import { useState } from 'react';
import './css/Home.css';
import Navbar from './Navbar';
import logo from '../assets/logo.png'; 
import escola from '../assets/escola.jpg';

function Home() {
  // Dados de teste mockados com base no seu print
  const [escolas] = useState([
    {
      id: 1,
      nome: "EMEF Prof. Auracy Mansano",
      vagas: 0,
      espera: 8,
      imagem: escola
    }
  ]);

  return (
    <div className="tela-mobile">
      
      {/* CABEÇALHO */}
      <header className="cabecalho-home">
        <div className="logo-circulo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo">
        
        {/* SEÇÃO DO MAPA */}
        <h2 className="titulo-sessao">Escolas próximas</h2>
        <div className="mapa-container">
          <iframe
            title="Mapa Escolas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117368.18244976451!2d-45.4851214068369!3d-23.63351221764796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cd6350d65b1695%3A0x67df214b7e807!2sCaraguatatuba%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* SEÇÃO DA LISTA E FILTROS */}
        <h2 className="titulo-sessao mt-20">Todas as escolas</h2>
        
        <div className="filtros-container">
          <div className="input-busca-wrapper">
            <input 
              type="text" 
              placeholder="Buscar escolas..." 
              className="input-busca" 
            />
          </div>
          
          <select className="select-serie">
            <option>Série: 8º Ano</option>
            <option>Série: 9º Ano</option>
            <option>Série: 1º Ano EM</option>
          </select>
        </div>

        {/* LISTA DE CARTÕES */}
        <div className="lista-escolas-home">
          {escolas.map((escola) => (
            <div className="cartao-escola" key={escola.id}>
              <img 
                src={escola.imagem} 
                alt={escola.nome} 
                className="imagem-escola" 
              />
              <div className="info-escola">
                <h3 className="nome-escola">{escola.nome}</h3>
                <p className="dado-escola">Vagas: {escola.vagas}</p>
                <p className="dado-escola">Lista de espera: {escola.espera}</p>
              </div>
            </div>
          ))}
        </div>
        
      </main>

      <Navbar />
    </div>
  );
}

export default Home;