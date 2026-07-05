import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/Espera.css';
import Navbar from './Navbar'; // Ajuste o caminho se a sua Navbar estiver em outro lugar

function Espera() {
  const [listaEspera, setListaEspera] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [cpf, setCpf]= useState(null)
  // Função para buscar os dados detalhados da lista no Banco
  const buscarDetalhes = async () => {
    try {
      // Exemplo: buscando a lista específica pelo ID da escola ou CPF
      const resposta = await fetch(`http://localhost:3001/waitlist/${cpf}`); 
      const dados = await resposta.json();
      setListaEspera(dados.data);
    } catch (erro) {
      setCpf(null)
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarDetalhes();
  }, [cpf]);

  return (
    <div className="tela-mobile">
      
      {/* CABEÇALHO ESPECÍFICO DESTA TELA */}
      <header className="cabecalho-espera">
        <Link to="/lista" className="btn-voltar">
          &lt;
        </Link>
        <h1>Visualizar lista de espera</h1>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo">

           <div className="cartao-detalhe">
            <input type="text" placeholder='digite seu cpf' onChange={(e)=> setCpf(e.target.value)}/>
           </div>

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

                {/* Lista mapeada usando as propriedades em inglês (position, name, points) */}
                {listaEspera.map((item) => (
                  <div className="linha-item" key={item.position}>
                    <span className="col-n">{item.position}º</span>
                    <span className="col-nome">{item.name}</span>
                    <span className="col-pts">{item.points}</span>
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