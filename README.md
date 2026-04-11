# 🎮 gamedeal_api

Aplicação web para pesquisar e comparar preços de jogos em várias lojas (Steam, Epic, GOG), com sistema de watchlist pessoal por utilizador.

---

## 🗂️ Estrutura do Projeto

```
gamedeal/
├── gamedeal_api/          # API REST em Ruby/Sinatra
└── frontend/         # Interface em Next.js
```

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Backend | Ruby + Sinatra |
| Base de dados | PostgreSQL |
| Autenticação | bcrypt + rack-session |
| Preços | IsThereAnyDeal API |
| Frontend | Next.js + React |
| OAuth | NextAuth (Google/GitHub) |

---

## ⚙️ Requisitos

- Ruby >= 3.x
- PostgreSQL >= 14
- Node.js >= 18
- Conta na [IsThereAnyDeal API](https://isthereanydeal.com/dev/app/)

---

## 🚀 Instalação

### 1. Base de dados

```bash
psql -U postgres -c "CREATE DATABASE gamedeal_db;"
psql -U postgres -d gamedeal_db -f gamedeal_api/schema.sql
```

### 2. Backend

```bash
cd gamedeal_api
bundle install
```

Cria o ficheiro `.env` na pasta `gamedeal_api/`:

```env
DB_HOST=localhost
DB_NAME=gamedeal_db
DB_USER=postgres
DB_PASSWORD=a_tua_password
SESSION_SECRET=secret_com_minimo_64_caracteres_gerado_com_securerandom
ITAD_API_KEY=a_tua_api_key
```

Corre o servidor:

```bash
ruby app.rb
# http://localhost:4567
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```


### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/register` | Criar conta |
| POST | `/login` | Iniciar sessão |
| POST | `/logout` | Terminar sessão |
| GET | `/me` | Utilizador atual |

### Jogos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/games/search?q=` | Pesquisar jogos |
| GET | `/games/:id` | Detalhe + preços por loja |

### Watchlist *(requer login)*

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/watchlist` | Lista de jogos guardados |
| POST | `/watchlist` | Adicionar jogo |
| DELETE | `/watchlist/:id` | Remover jogo |

---

## 📁 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `DB_HOST` | Host do PostgreSQL |
| `DB_NAME` | Nome da base de dados |
| `DB_USER` | Utilizador do PostgreSQL |
| `DB_PASSWORD` | Password do PostgreSQL |
| `SESSION_SECRET` | Secret para encriptar sessões (>=64 chars) |
| `ITAD_API_KEY` | Chave da API do IsThereAnyDeal |
