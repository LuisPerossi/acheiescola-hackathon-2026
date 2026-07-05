# AcheiEscola

Aplicação para ajudar **responsáveis** a acompanhar a posição dos filhos em filas de espera de matrícula escolar e para **escolas** gerenciarem essas filas. Projeto desenvolvido no Hackathon 2026.

O repositório é um monorepo com duas partes independentes:

- **`Frontend/`** — aplicativo web (mobile-first) em React + Vite, usado pelos responsáveis e pela escola (painel admin).
- **`api/`** — backend serverless em Cloudflare Workers (Hono) com banco de dados Cloudflare D1 (SQLite).

---

## Sumário

- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Requisitos mínimos](#requisitos-mínimos)
- [Etapas de instalação](#etapas-de-instalação)
- [Links de acesso](#links-de-acesso)
- [Credenciais / dados de teste](#credenciais--dados-de-teste)
- [Instruções básicas de utilização](#instruções-básicas-de-utilização)
- [Endpoints da API](#endpoints-da-api)
- [Observações e limitações conhecidas](#observações-e-limitações-conhecidas)
- [Deploy em produção (opcional)](#deploy-em-produção-opcional)

---

## Tecnologias utilizadas

**Frontend**
- React 19 + React Router DOM 7
- Vite 8
- ESLint

**Backend**
- Hono 4 (framework web)
- Cloudflare Workers + Cloudflare D1 (banco de dados)
- Wrangler 4 (CLI de desenvolvimento/deploy)
- JavaScript

**Prototipação**
- Figma

**Controle de versionamento**
- Git
- Github

---

## Estrutura do projeto

```
acheiescola-hackathon-2026-main/
├── api/                       # Backend – Cloudflare Worker (Hono + D1)
│   ├── src/
│   │   ├── index.ts           # Ponto de entrada, CORS e registro das rotas
│   │   └── routes/
│   │       └── waitlist.ts    # CRUD da fila de espera
│   ├── schema.sql             # Schema do banco (tabelas users e waitlist) + dados de teste
│   └── wrangler.jsonc         # Configuração do Worker / binding do D1
│
└── Frontend/                  # Frontend – React + Vite
    └── src/
        ├── App.jsx            # Rotas da aplicação
        └── pages/
            ├── Home.jsx          # Busca de escolas (responsável)
            ├── Lista.jsx         # "Minhas listas de espera"
            ├── Espera.jsx        # Consulta de posição por CPF
            ├── Notificacoes.jsx  # Notificações
            ├── Perfil.jsx        # Perfil do usuário
            ├── Navbar.jsx        # Barra de navegação inferior
            └── Admin.jsx         # Painel da escola (CRUD da fila)
```

---

## Requisitos mínimos

- **Node.js 22 ou superior** (exigido pelo Wrangler 4; recomenda-se usar [nvm](https://github.com/nvm-sh/nvm))
- **npm 10+** (já vem instalado junto com o Node.js)
- **Git** (opcional, apenas se for clonar o repositório em vez de extrair o `.zip`)
- Navegador atualizado (Chrome, Edge ou Firefox)
- Conexão com a internet (para instalar as dependências e para o mapa embutido do Google Maps na Home)
- **Conta Cloudflare** — **não é necessária para rodar localmente**; só é preciso caso queira publicar o backend em produção (ver seção de [Deploy](#deploy-em-produção-opcional))


---

## Etapas de instalação

### 1. Obtenha o código

Extraia o `.zip` ou clone o repositório e entre na pasta do projeto:

```bash
cd acheiescola-hackathon-2026-main
```

### 2. Backend (`api/`)

Em um terminal:

```bash
cd api
npm install

# Cria as tabelas no banco D1 local e insere os dados de teste
npm run setup

# Inicia a API em http://localhost:3001
npm run dev
```

Deixe esse terminal aberto — o frontend depende dessa API estar rodando.

### 3. Frontend (`Frontend/`)

Em um **novo terminal** (sem fechar o da API):

```bash
cd Frontend
npm install

# Inicia o site em http://localhost:5173
npm run dev
```

### 4. Acesse a aplicação

Abra no navegador o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

> ⚠️ As telas **Espera** e **Admin** chamam a API usando a URL fixa `http://localhost:3001`. Se essa porta já estiver em uso e o Wrangler escolher outra automaticamente, será preciso atualizar essa URL em `Frontend/src/pages/Espera.jsx` e `Frontend/src/pages/Admin.jsx`.

---

## Links de acesso

Rodando localmente com as portas padrão:

| Aplicação | URL |
|---|---|
| App do responsável (home) | http://localhost:5173/ |
| Minhas listas de espera | http://localhost:5173/lista |
| Consulta de posição na fila | http://localhost:5173/espera |
| Notificações | http://localhost:5173/not |
| Perfil | http://localhost:5173/perfil |
| **Painel da escola (admin)** | http://localhost:5173/admin |
| API (backend) | http://localhost:3001/waitlist |

---

## Credenciais / dados de teste

⚠️ **A aplicação ainda não possui tela de login.** O acesso ao painel `/admin` é feito diretamente pela URL, sem usuário/senha. A tabela `users` (CPF, e-mail e senha) e a dependência `bcryptjs` já estão no projeto, mas ainda não há rotas de autenticação nem tela de login implementadas no frontend.

O que existe hoje como "dado de teste" são os registros já inseridos no banco local pelo comando `npm run setup` (arquivo `api/schema.sql`), usados para consultar a fila em **Espera** (`/espera`):

| CPF | Nome | Pontos |
|---|---|---|
| 12332478901 | Felipe Leandro | 12 |
| 00000000000 | Lucas Sabugosa | 5 |
| 12332478921 | Luis Leandro | 4 |
| 12332478903 | Rafael Leandro | 3 |

Digite qualquer um desses CPFs no campo da tela `/espera` para ver a posição correspondente na fila.

---

## Instruções básicas de utilização

### Perfil "Responsável" (pai/mãe)

1. **Home (`/`)** — mapa com escolas próximas e lista de escolas com número de vagas e tamanho da fila (dados de exemplo, fixos no código).
2. **Lista (`/lista`)** — mostra "minhas listas de espera" (dados de exemplo). Cada cartão tem um botão **Detalhes** que leva para a tela Espera.
3. **Espera (`/espera`)** — digite um dos CPFs de teste acima para consultar, em tempo real (via API/banco), a posição na fila. Os nomes de outros participantes aparecem ocultos (`******`) por privacidade; apenas o CPF pesquisado revela o nome correspondente.
4. **Notificações (`/not`)** — liga/desliga notificações e visualiza avisos em formato de acordeão (dados de exemplo).
5. **Perfil (`/perfil`)** — dados do usuário e opções de conta (tela pronta, ainda sem lógica de backend).
6. Navegue entre essas telas pela barra inferior (ícones Início, Lista, Notificações, Perfil).

### Perfil "Escola" (gestor / admin)

- **Admin (`/admin`)** — acesse diretamente pela URL. O painel exibe a fila de espera completa (nome, CPF e pontuação) e permite:
  - **Criar** um novo registro (botão "+ Criar/Adicionar"): informe CPF, nome completo e pontuação.
  - **Editar** um registro existente (o campo CPF fica bloqueado durante a edição).
  - **Excluir** um registro (com confirmação antes de remover).
  - A lista é sempre reordenada por pontuação — quanto maior a pontuação, melhor a posição.

---

## Endpoints da API

URL base local: `http://localhost:3001`

| Método | Rota | Descrição | Body (JSON) |
|---|---|---|---|
| `GET` | `/waitlist` | Lista completa ordenada por pontuação. Nomes e CPFs de terceiros ficam ocultos (`******`) | — |
| `GET` | `/waitlist/:cpf` | Mesma lista, revelando o nome referente ao CPF informado | — |
| `GET` | `/waitlist?admin=true` | Retorna nomes e CPFs completos de todos os registros (usado pelo painel admin) | — |
| `POST` | `/waitlist` | Cria um novo registro na fila | `{ "cpf": "...", "name": "...", "points": 0 }` |
| `PATCH` | `/waitlist/:cpf` | Atualiza nome/pontuação de um registro | `{ "cpf": "...", "name": "...", "points": 0 }` |
| `DELETE` | `/waitlist/:cpf` | Remove um registro da fila | — |

Todas as respostas seguem o formato: `{ "success": boolean, "message": string, "data"?: [...] }`.

---

## Observações e limitações conhecidas

- **Sem autenticação/autorização**: qualquer pessoa com a URL `/admin` tem acesso total ao CRUD da fila de espera. Não utilizar em produção sem implementar login antes.
- **Dados de exemplo (mock)**: as telas Home, Lista, Notificações e Perfil usam dados fixos no componente (`useState`), não vindos do banco. Apenas **Espera** e **Admin** já conversam com a API real.
