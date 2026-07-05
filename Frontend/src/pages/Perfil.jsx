import './css/Perfil.css';
import Navbar from './Navbar'; 
import logo from '../assets/logo.png'; 

function Perfil() {
  return (
    <div className="tela-mobile">
      
      {/* CABEÇALHO (Reaproveitando o mesmo estilo das outras telas) */}
      <header className="cabecalho-home">
        <div className="logo-circulo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="conteudo">
        <h2 className="titulo-sessao" style={{ marginBottom: '25px' }}>Meu perfil</h2>

        {/* ÁREA DO AVATAR E NOME */}
        <div className="perfil-header">
          <div className="avatar-css">
            <div className="avatar-cabeca"></div>
            <div className="avatar-corpo"></div>
          </div>
          <span className="perfil-nome">Felipe L. A. Costa</span>
        </div>

        {/* MENU DE OPÇÕES */}
        <div className="menu-opcoes">
          <button className="opcao-item">
            <span>Informações</span>
            <span className="seta-direita">&gt;</span>
          </button>
          
          <button className="opcao-item">
            <span>Uso de dados</span>
            <span className="seta-direita">&gt;</span>
          </button>
          
          <button className="opcao-item">
            <span>Termos de uso</span>
            <span className="seta-direita">&gt;</span>
          </button>
        </div>

        {/* BOTÃO SAIR */}
        <button className="btn-sair">Sair</button>

      </main>

      <Navbar />
    </div>
  );
}

export default Perfil;