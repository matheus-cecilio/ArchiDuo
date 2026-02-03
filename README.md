# 🏗️ ArchiDuo Portfolio

Site híbrido para arquiteta: **portfólio profissional público** + **área privada "Duo Zone"** com memórias de Fortnite e sistema de presente surpresa.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### Área Pública
- 🏠 Landing page elegante com tema dourado/preto/branco
- 📸 Galeria de projetos com grid masonry
- 🔄 Slider "Antes/Depois" para comparação de imagens
- 📱 Design responsivo e animações suaves
- 📧 Formulário de contato integrado com WhatsApp

### Área Privada (Admin)
- 🔐 Autenticação segura com NextAuth.js v5
- 📊 Dashboard para gerenciamento
- ✏️ CRUD completo de projetos
- 🎨 Customização de aparência (cores, fontes, textos)
- 🎮 **Duo Zone** - Galeria de memórias do Fortnite
- 🎁 **Sistema de Presente** - Supply Drop com animação surpresa

---

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- PostgreSQL (ou conta no Supabase/Neon)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repo>
cd projeto-arq
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.local.example .env.local
# Edite o arquivo com suas credenciais
```

4. **Configure o banco de dados**
```bash
# Gerar cliente Prisma
npm run db:generate

# Criar tabelas no banco
npm run db:push

# Popular com dados iniciais
npm run db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (public)/          # Rotas públicas
│   │   ├── page.tsx       # Home
│   │   ├── projetos/      # Galeria de projetos
│   │   ├── sobre/         # Página sobre
│   │   └── contato/       # Formulário de contato
│   ├── (private)/         # Rotas protegidas
│   │   ├── dashboard/     # Painel admin
│   │   ├── admin/         # Gestão de projetos e aparência
│   │   └── duo/           # Duo Zone + Presente
│   ├── api/               # API Routes
│   └── login/             # Página de login
├── components/
│   ├── ui/                # Componentes base (Button, Input, Card)
│   └── layout/            # Navbar, Footer, AdminSidebar
├── lib/
│   ├── prisma.ts          # Cliente do Prisma
│   ├── auth.ts            # Configuração NextAuth
│   └── utils.ts           # Funções utilitárias
└── types/                 # TypeScript types
```

---

## 🎨 Design System

### Paleta de Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Gold | `#D4AF37` | Cor primária |
| Black | `#0A0A0A` | Cor secundária |
| White | `#FAFAFA` | Cor de destaque |

### Tipografia
- **Títulos:** Playfair Display
- **Corpo:** Inter

---

## 🔐 Credenciais de Teste

Após rodar o seed:
- **Email:** matheus@archiduo.com
- **Senha:** SenhaSegura123!

---

## 📝 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar produção
npm run lint         # Verificar lint
npm run db:generate  # Gerar cliente Prisma
npm run db:push      # Sincronizar schema com banco
npm run db:migrate   # Criar migration
npm run db:seed      # Popular banco com dados iniciais
npm run db:studio    # Abrir Prisma Studio
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Banco de Dados

Recomendamos:
- [Supabase](https://supabase.com) - PostgreSQL + Storage gratuito
- [Neon](https://neon.tech) - PostgreSQL serverless

---

## 💛 Feito com amor

Este projeto é um presente especial. Cada linha de código foi escrita pensando em criar algo único e significativo.

**GG, duo!** 🎮🏆
