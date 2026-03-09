# ⚡ Início Rápido - 5 Minutos

Este guia te leva do zero ao app funcionando em **5 minutos**.

---

## Passo 1: Configurar Supabase (2 min)

### 1.1 Criar Projeto
1. Acesse: https://supabase.com
2. Faça login ou crie conta
3. Clique em **"New Project"**
4. Preencha:
   - Nome: `garimpo-lego`
   - Senha: crie uma senha forte
   - Região: **South America (São Paulo)**
5. Clique **"Create"** e aguarde ~2 min

### 1.2 Rodar SQL
1. Abra **SQL Editor** (menu lateral)
2. Clique **"New Query"**
3. Abra o arquivo `supabase/migrations/001_initial.sql`
4. Copie TODO o conteúdo
5. Cole no editor
6. Clique **"Run"** ▶️

✅ Aguarde "Success. No rows returned"

### 1.3 Copiar Credenciais
1. Vá em **Settings** → **API**
2. Copie:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public**: `eyJxxx...` (chave longa)

---

## Passo 2: Configurar Projeto (1 min)

```bash
# Entrar na pasta
cd garimpo-lego-brasil

# Instalar
npm install

# Criar .env.local
cp .env.local.example .env.local
```

Abra `.env.local` e cole suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJxxx...
```

---

## Passo 3: Rodar! (1 min)

```bash
npm run dev
```

Abra: **http://localhost:3000**

---

## ✅ Testando

1. Clique em **"Cadastrar"**
2. Digite um email (pode ser fictício: `teste@test.com`)
3. Senha: `123456` (mínimo 6 caracteres)
4. Clique **"Criar Conta"**

✅ Você será redirecionado ao Dashboard!

### Testar Busca

1. Clique em **"Nova Busca"** ou vá em "Buscar" (menu inferior)
2. Digite: `star wars` ou deixe vazio
3. Ative o **"Modo Jackpot"** 🔥
4. Clique **"Buscar"**

✅ Você verá 20 anúncios simulados ordenados por oportunidade!

---

## 📱 Ver no Celular (Opcional)

### Opção 1: Localhost
```bash
# Ver seu IP local
ipconfig  # Windows
ifconfig  # Mac/Linux

# Acesse no celular (mesma rede Wi-Fi)
http://192.168.x.x:3000
```

### Opção 2: Deploy Vercel (5 min extra)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Adicionar variáveis quando pedido
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...

# Deploy produção
vercel --prod
```

Acesse o link fornecido no celular! 🎉

---

## 🆘 Problemas?

### "Module not found"
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### "Invalid API key"
- Verifique se copiou as credenciais corretas
- Confirme que `.env.local` está na raiz
- Reinicie: `npm run dev`

### "Failed to fetch"
- Confirme que o projeto Supabase está ativo
- Verifique sua internet
- Vá em Supabase → SQL Editor e rode o migration novamente

---

## 🎉 Pronto!

Seu app está rodando! Agora você pode:

- ✅ Fazer buscas
- ✅ Ver jackpots
- ✅ Filtrar resultados
- ✅ Configurar preferências
- ✅ Testar no celular

Para deploy em produção, veja o **README.md** completo.

**Boa garimpo! 🧱🔥**
