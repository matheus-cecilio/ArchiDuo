# 🚀 Como Iniciar o Projeto ArchiDuo

## 📋 Pré-requisitos

- Node.js instalado
- Docker Desktop instalado e **rodando** (aberto)

## ⚡ Início Rápido (Comando Único!)

```bash
npm run startup
```

**Pronto!** 🎉 Este comando faz tudo automaticamente:
- ✅ Inicia o Docker com PostgreSQL
- ✅ Aguarda o banco ficar pronto
- ✅ Roda as migrations
- ✅ Popula o banco (se vazio)
- ✅ Inicia o Next.js

Acesse: http://localhost:3000

---

## 🔧 Modo Manual (Passo a Passo)

Se preferir rodar cada etapa separadamente:

### 1. Iniciar o Banco de Dados (PostgreSQL)

```bash
npm run docker:up
```

### 2. Rodar as Migrações do Prisma

```bash
npm run db:migrate
```

### 3. Popular o Banco com Dados Iniciais (Seed)

```bash
npm run db:seed
```

### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

## 🔐 Credenciais de Login

**Email:** `matheus@archiduo.com` ou `arquiteta@archiduo.com`  
**Senha:** `senhasegura123`

## 📦 Comandos Úteis

### Docker
- `npm run docker:up` - Inicia o banco de dados
- `npm run docker:down` - Para o banco de dados
- `npm run docker:logs` - Ver logs do PostgreSQL

### Banco de Dados
- `npm run db:generate` - Gera o Prisma Client
- `npm run db:push` - Sincroniza o schema sem criar migrations
- `npm run db:migrate` - Cria e aplica novas migrações
- `npm run db:seed` - Popula o banco com dados iniciais
- `npm run db:reset` - Reseta o banco (CUIDADO: apaga tudo!)
- `npm run db:studio` - Abre o Prisma Studio (GUI para o banco)

---

## 🛠️ Desenvolvimento e Mundanças no Banco

Se você alterar o arquivo `prisma/schema.prisma` (adicionar campos, tabelas, remover coisas), você deve garantir que o banco e o código estejam sincronizados:

1. **Se o servidor estiver rodando, PARE** (Ctrl+C).
   - O Prisma precisa atualizar arquivos (`@prisma/client`) que não podem ser sobrescritos enquanto usados pelo servidor.

2. **Crie a migração**:
   ```bash
   npm run db:migrate
   ```
   (Isso vai pedir um nome para a migração e atualizar o banco).

3. **Reinicie o servidor**:
   ```bash
   npm run startup
   ```

## 🐛 Troubleshooting

### Erro: "Can't reach database server"
- Verifique se o Docker Desktop está rodando
- Execute `npm run docker:up`
- Aguarde alguns segundos para o banco inicializar

### Resetar tudo do zero
```bash
npm run docker:down
npm run docker:up
# Aguarde 5-10 segundos
npm run db:migrate
npm run db:seed
```
