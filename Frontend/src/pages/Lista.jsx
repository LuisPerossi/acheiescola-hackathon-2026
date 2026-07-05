import { useState, useEffect } from 'react';
import './css/Lista.css'; 
import logo from '../assets/logo.png';
import Navbar from './Navbar'; 
import { Link } from 'react-router-dom';

function Lista() {
  const [listas, setListas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Função para buscar os dados do Banco (localhost:3001)
  const buscarDados = async () => {
    setListas([
        {
          id: 1,
          escola: "EMEI/EMEF Benedito Inacio Soares",
          aluno: "Felipe L. A. Costa",
          posicao: 2
        }
      ])
    setCarregando(false);
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <div className="tela-mobile">
      {/* CABEÇALHO */}
      <header className="cabecalho">
       <img src={logo} alt="logo" className="logo" />
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo">
        
        {/* Banner de Aviso */}
        <div className="banner-aviso">
          <p>* As listas de espera seguem alguns critérios de colocação determinados pela Secretaria de Educação.</p>
          <button className="btn-saiba-mais">Saiba Mais</button>
        </div>

        <h2 className="titulo-secao">Minhas listas de espera</h2>

        {/* LISTA DE CARTÕES PUXADOS DO BANCO */}
        {carregando ? (
          <p>Carregando listas...</p>
        ) : (
          <div className="lista-cartoes">
            {listas.map((item) => (
              <div className="cartao" key={item.id}>
                <h3 className="escola-nome">{item.escola}</h3>
                <div className="info-aluno">
                  <p>ALUNO: {item.aluno}</p>
                  <p>POSIÇÃO: {item.posicao}º COLOCADO</p>
                </div>
               <div className="cartao-rodape">
  <Link to="/espera">
    <button className="btn-detalhes">Detalhes</button>
  </Link>
</div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* COMPONENTE DA BARRA DE NAVEGAÇÃO INFERIOR */}
      <Navbar />
    </div>
  );
}

export default Lista;