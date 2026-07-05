import { useState, useEffect } from 'react';
import './css/Admin.css';
import logo from '../assets/logo.png'; 

function Admin() {
  const [listaEspera, setListaEspera] = useState([]);
  const [acordeonAberto, setAcordeonAberto] = useState(true);

  // Estados para o Modal de CRUD
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [form, setForm] = useState({ cpf: '', name: '', points: 0 });

  const urlBase = 'http://localhost:3001/waitlist'; 

  // --- FUNÇÕES DE API ---

  // GET: Buscar lista informando que é o Admin para receber os dados completos
  const buscarLista = async () => {
    try {
      // Adicionando a query ?admin=true que você configurou no backend
      const res = await fetch(`${urlBase}?admin=true`);
      const json = await res.json();
      if (json.success) {
        setListaEspera(json.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    buscarLista();
  }, []);

  // POST / PATCH: Salvar ou Editar Aluno
  const salvarAluno = async (e) => {
    e.preventDefault();
    const metodo = modoEdicao ? 'PATCH' : 'POST';
    const url = modoEdicao ? `${urlBase}/${form.cpf}` : urlBase;

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      
      if (json.success) {
        fecharModal();
        buscarLista(); // Recarrega a tabela com os novos dados
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  // DELETE: Excluir Aluno
  const excluirAluno = async (cpf) => {
    if (!window.confirm("Tem certeza que deseja remover este aluno da lista?")) return;
    
    try {
      // Agora o cpf real será passado para a rota de deleção
      const res = await fetch(`${urlBase}/${cpf}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        buscarLista();
      } else {
        alert(json.message);
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  // --- FUNÇÕES DE INTERFACE ---

  const abrirModalCriar = () => {
    setForm({ cpf: '', name: '', points: 0 });
    setModoEdicao(false);
    setModalAberto(true);
  };

  const abrirModalEditar = (aluno) => {
    // Como o admin=true retorna o CPF real, a edição agora funcionará 100%
    setForm({ cpf: aluno.cpf, name: aluno.name, points: aluno.points });
    setModoEdicao(true);
    setModalAberto(true);
  };

  const fecharModal = () => setModalAberto(false);

  return (
    <div className="admin-layout">
      {/* SIDEBAR AMARELA */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-circulo-admin">
            <img src={logo} alt="Logo" className="logo-img-admin" />
          </div>
        </div>
        <nav className="sidebar-menu">
          <a href="#" className="menu-item">Escolas <span className="seta">&gt;</span></a>
          <a href="#" className="menu-item active">Listas <span className="seta">&gt;</span></a>
          <a href="#" className="menu-item">Turmas <span className="seta">&gt;</span></a>
        </nav>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="admin-content">
        <h1 className="admin-titulo">Lista de espera</h1>

        {/* ACORDEON / CARTÃO DA LISTA */}
        <div className="acordeon">
          <div className="acordeon-header" onClick={() => setAcordeonAberto(!acordeonAberto)}>
            <h2>3º ano - EMEI/EMEF Benedito Inacio Soares</h2>
            <div className="acordeon-acoes">
              <span className="acordeon-icone">{acordeonAberto ? '˄' : '˅'}</span>
            </div>
          </div>

          {acordeonAberto && (
            <div className="acordeon-body">
              <table className="tabela-admin">
                <thead>
                  <tr>
                    <th>Colocação</th>
                    <th>Aluno</th>
                    <th>CPF</th>
                    <th>Pontuação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {listaEspera.length === 0 ? (
                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Nenhum aluno na lista.</td></tr>
                  ) : (
                    listaEspera.map((aluno) => (
                      <tr key={aluno.position}>
                        <td>{aluno.position}º</td>
                        <td>{aluno.name}</td>
                        <td>{aluno.cpf}</td>
                        <td>{aluno.points}</td>
                        <td className="acoes-celula">
                          <button onClick={() => abrirModalEditar(aluno)} className="btn-acao txt-azul">Editar</button>
                          <button onClick={() => excluirAluno(aluno.cpf)} className="btn-acao txt-vermelho">Excluir</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* BOTÃO CRIAR LISTA / ADICIONAR ALUNO */}
        <div className="area-botao-criar">
          <button className="btn-criar-lista" onClick={abrirModalCriar}>
            + Criar / Adicionar
          </button>
        </div>
      </main>

      {/* MODAL DE CRUD */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modoEdicao ? 'Editar Aluno' : 'Adicionar Aluno'}</h3>
            <form onSubmit={salvarAluno} className="form-modal">
              <input 
                type="text" placeholder="CPF (Somente números)" required
                disabled={modoEdicao} /* Bloqueia o CPF na edição para não quebrar o banco */
                value={form.cpf} onChange={(e) => setForm({...form, cpf: e.target.value})}
              />
              <input 
                type="text" placeholder="Nome Completo" required
                value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
              />
              <input 
                type="number" placeholder="Pontuação" required
                value={form.points} onChange={(e) => setForm({...form, points: Number(e.target.value)})}
              />
              <div className="modal-acoes">
                <button type="button" onClick={fecharModal} className="btn-cancelar">Cancelar</button>
                <button type="submit" className="btn-salvar">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Admin;