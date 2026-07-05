import { useState } from 'react';
import './css/Notificacoes.css';
import Navbar from './Navbar'; 
import logo from '../assets/logo.png'; 

function Notificacoes() {
  // Estado para o botão de liga/desliga geral
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  // Estado para controlar quais cartões estão abertos (guardamos os IDs)
  // Deixei o 1, 3 e 4 abertos por padrão igual ao seu print
  const [cartoesAbertos, setCartoesAbertos] = useState([1, 3, 4]);

  // Função para abrir/fechar um cartão específico
  const alternarCartao = (id) => {
    if (cartoesAbertos.includes(id)) {
      // Se já está aberto, remove da lista (fecha)
      setCartoesAbertos(cartoesAbertos.filter(cartaoId => cartaoId !== id));
    } else {
      // Se está fechado, adiciona na lista (abre)
      setCartoesAbertos([...cartoesAbertos, id]);
    }
  };

  // Mock de dados inspirado no seu print
  const listaNotificacoes = [
    {
      id: 1,
      titulo: "Você está em 11º",
      conteudo: <>O aluno <strong>"Felipe"</strong> está em 11º colocação na lista de espera em <strong>EMEF Prof Auracy Mansano</strong>.</>
    },
    {
      id: 2,
      titulo: "Lista de espera atualizada",
      conteudo: <>A sua lista de espera passou por uma atualização recente. Clique para ver os detalhes completos.</>
    },
    {
      id: 3,
      titulo: "Você está em 12º",
      conteudo: <>O aluno <strong>"Felipe"</strong> está em 12º colocação na lista de espera em <strong>EMEF Prof Auracy Mansano</strong>.</>
    },
    {
      id: 4,
      titulo: "Novas vagas disponiveis",
      conteudo: <>A <strong>EMEF Prof Auracy Mansano</strong> está com novas vagas disponiveis.</>
    }
  ];

  return (
    <div className="tela-mobile">
      
      {/* CABEÇALHO (Reaproveitando o estilo da Home) */}
      <header className="cabecalho-home">
        <div className="logo-circulo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      </header>

      <main className="conteudo">
        <h2 className="titulo-sessao" style={{ marginBottom: '20px' }}>Notificações</h2>

        {/* SWITCH LIGA/DESLIGA */}
        <div className="switch-container">
          <span className="switch-texto">Notificações</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={notificacoesAtivas}
              onChange={() => setNotificacoesAtivas(!notificacoesAtivas)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* LISTA DE NOTIFICAÇÕES (ACCORDION) */}
        <div className="lista-notificacoes">
          {listaNotificacoes.map((item) => {
            const estaAberto = cartoesAbertos.includes(item.id);

            return (
              <div className="notificacao-cartao" key={item.id}>
                
                {/* Parte superior que é clicável */}
                <div 
                  className="notificacao-cabecalho" 
                  onClick={() => alternarCartao(item.id)}
                >
                  <span className="notificacao-titulo">{item.titulo}</span>
                  {/* Troca a setinha dependendo se está aberto ou fechado */}
                  <span className="notificacao-icone">
                    {estaAberto ? 'v' : '>'}
                  </span>
                </div>

                {/* Conteúdo que só aparece se estiver aberto */}
                {estaAberto && (
                  <div className="notificacao-conteudo">
                    <div className="linha-divisoria"></div>
                    <p>{item.conteudo}</p>
                  </div>
                )}
                
              </div>
            );
          })}
        </div>

      </main>

      <Navbar />
    </div>
  );
}

export default Notificacoes;