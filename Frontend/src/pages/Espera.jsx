import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Espera.css';
import Navbar from './Navbar'; // Ajuste o caminho se a sua Navbar estiver em outro lugar

function Espera() {
  const [listaEspera, setListaEspera] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Função para buscar os dados detalhados da lista no Banco
  const buscarDetalhes = async () => {
    try {
      // Exemplo: buscando a lista específica pelo ID da escola
      const resposta = await fetch('http://localhost:3001/espera/1'); 
      const dados = await resposta.json();
      setListaEspera(dados);
    } catch (erro) {
      console.log("Backend offline. Usando dados de teste (Mock)...");
      // Dados exatamente iguais aos da sua imagem
      setListaEspera([
        { id: 1, posicao: 1, nome: "*****************", pontos: 14 },
        { id: 2, posicao: 2, nome: "Felipe L. A. Costa", pontos: 10 },
        { id: 3, posicao: 3, nome: "*****************", pontos: 9 },
        { id: 4, posicao: 4, nome: "*****************", pontos: 6 },
        { id: 5, posicao: 5, nome: "*****************", pontos: 5 },
        { id: 6, posicao: 6, nome: "*****************", pontos: 5 },
        { id: 7, posicao: 7, nome: "*****************", pontos: 5 },
        { id: 8, posicao: 8, nome: "*****************", pontos: 4 },
        { id: 9, posicao: 9, nome: "*****************", pontos: 4 },
        { id: 10, posicao: 10, nome: "*****************", pontos: 3 },
        { id: 11, posicao: 11, nome: "*****************", pontos: 1 },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDetalhes();
  }, []);

  return (
    <div className="tela-mobile">
      
      {/* CABEÇALHO ESPECÍFICO DESTA TELA */}
      <header className="cabecalho-espera">
        <Link to="/" className="btn-voltar">
          &lt;
        </Link>
        <h1>Visualizar lista de espera</h1>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo">
        <div className="cartao-detalhe">
          <h2 className="escola-titulo">EMEI/EMEF Benedito Inacio Soares</h2>
          <h3 className="escola-subtitulo">Lista de Espera</h3>

          {carregando ? (
            <p>Carregando posições...</p>
          ) : (
            <div className="caixa-lista">
              {/* Título das colunas */}
              <div className="linha-cabecalho">
                <span className="col-n">Nº</span>
                <span className="col-nome">Nome</span>
                <span className="col-pts">Pts.</span>
              </div>

              {/* Lista mapeada do banco/mock */}
              {listaEspera.map((item) => (
                <div className="linha-item" key={item.id}>
                  <span className="col-n">{item.posicao}º</span>
                  <span className="col-nome">{item.nome}</span>
                  <span className="col-pts">{item.pontos}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Navbar />
    </div>
  );
}

export default Espera;