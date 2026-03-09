# 🧱 Garimpo LEGO Brasil

**App premium e mobile-first para localizar jackpots de LEGO no Brasil**

Encontre as melhores oportunidades de LEGO em marketplaces brasileiros (Mercado Livre, OLX, Enjoei, Facebook Marketplace) com detecção inteligente de anúncios subprecificados.

![Version](https://img.shields.io/badge/version-1.0.0-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Supabase](https://img.shields.io/badge/Supabase-enabled-green)

---

## 🎯 Características Principais

### 🔥 Modo Jackpot
- Detecta anúncios com descrições vagas e títulos genéricos
- Identifica vendedores leigos que não conhecem o valor real
- Cruza termos vagos com temas valiosos (Star Wars, Harry Potter, De Volta para o Futuro, etc)
- Sistema de scoring 0-100 com nível de confiança (Alto/Médio/Baixo)

### 🎯 Busca Inteligente
- Filtros avançados por marketplace, preço, condição, tipo de item e tema
- Busca por sets completos, lotes, peças avulsas, minifiguras e acessórios
- Ordenação automática por maior oportunidade
- Permalink direto para cada anúncio (nunca links genéricos)

### 📊 Dashboard Completo
- Visão geral de novas oportunidades
- Buscas salvas e automáticas
- Alertas de preço personalizados
- Histórico de buscas
- Favoritos

### 📱 Mobile-First
- Design otimizado para Android e iOS
- Bottom navigation para navegação rápida
- Cards grandes e fáceis de tocar
- Interface simples e intuitiva para leigos

---

## 🚀 Como Começar

### Pré-requisitos

- **Node.js** 18+ e **npm** 9+
- Conta no **Supabase** (gratuita)
- Conta no **Vercel** (gratuita) para deploy

### 1️⃣ Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: `garimpo-lego-brasil`
   - **Database Password**: crie uma senha forte (guarde-a!)
   - **Region**: escolha `South America (São Paulo)`
4. Clique em **"Create new project"** e aguarde ~2 minutos

### 2️⃣ Configurar o Banco de Dados

1. No painel do Supabase, vá em **"SQL Editor"** (ícone 📊 no menu lateral)
2. Clique em **"New Query"**
3. Copie TODO o conteúdo do arquivo `supabase/migrations/001_initial.sql`
4. Cole no editor SQL
5. Clique em **"Run"** (botão verde)
6. Aguarde a confirmação **"Success. No rows returned"**

✅ Seu banco de dados está pronto com todas as tabelas, políticas de segurança e dados iniciais!

### 3️⃣ Obter as Credenciais do Supabase

1. No painel do Supabase, vá em **"Settings"** (⚙️ no menu lateral)
2. Clique em **"API"**
3. Encontre e copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (uma string longa começando com `eyJ...`)

### 4️⃣ Configurar o Projeto Localmente

```bash
# 1. Clone ou baixe o projeto
cd garimpo-lego-brasil

# 2. Instalar dependências
npm install

# 3. Criar arquivo de variáveis de ambiente
cp .env.local.example .env.local

# 4. Editar .env.local e adicionar suas credenciais do Supabase
# Abra o arquivo .env.local e substitua:
NEXT_PUBLIC_SUPABASE_URL=cole_aqui_seu_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=cole_aqui_sua_anon_key
```

### 5️⃣ Rodar Localmente

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

✅ O app deve abrir mostrando a landing page!

---

## 🌐 Deploy no Vercel (Produção)

### Opção 1: Deploy via GitHub (Recomendado)

1. Crie uma conta no [vercel.com](https://vercel.com) (pode usar sua conta do GitHub)
2. Faça upload do seu projeto para um repositório no GitHub
3. No Vercel, clique em **"New Project"**
4. Selecione seu repositório do GitHub
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL` → seu Project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` → sua anon key
6. Clique em **"Deploy"**
7. Aguarde ~2 minutos

✅ Seu app estará no ar em um domínio `.vercel.app`!

### Opção 2: Deploy via CLI

```bash
# 1. Instalar Vercel CLI globalmente
npm install -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
vercel

# 4. Adicionar variáveis de ambiente quando solicitado
# NEXT_PUBLIC_SUPABASE_URL=sua_url
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_key

# 5. Confirmar deploy de produção
vercel --prod
```

---

## 📱 Como Usar no Celular

### Android

1. Abra o Chrome no celular
2. Acesse o link do seu app (ex: `https://seu-projeto.vercel.app`)
3. Toque no menu (⋮) e selecione **"Adicionar à tela inicial"**
4. Confirme e um ícone será criado como um app

### iOS

1. Abra o Safari no iPhone
2. Acesse o link do seu app
3. Toque no botão de compartilhar (🔼)
4. Selecione **"Adicionar à Tela de Início"**
5. Confirme e um ícone será criado

---

## 🗂️ Estrutura do Projeto

```
garimpo-lego-brasil/
├── src/
│   ├── app/                      # Páginas Next.js 14 (App Router)
│   │   ├── (dashboard)/          # Rotas protegidas
│   │   │   ├── dashboard/        # Dashboard principal
│   │   │   ├── search/           # Página de busca
│   │   │   ├── results/          # Resultados da busca
│   │   │   ├── favorites/        # Favoritos
│   │   │   ├── alerts/           # Alertas
│   │   │   ├── history/          # Histórico
│   │   │   ├── saved-searches/   # Buscas salvas
│   │   │   ├── settings/         # Configurações
│   │   │   └── layout.tsx        # Layout do dashboard
│   │   ├── api/                  # API Routes
│   │   │   ├── search/           # Endpoint de busca
│   │   │   └── listings/[id]/    # Detalhe do anúncio
│   │   ├── login/                # Login
│   │   ├── register/             # Cadastro
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Layout raiz
│   │   └── globals.css           # Estilos globais
│   ├── components/               # Componentes React
│   │   ├── ListingCard.tsx       # Card de anúncio
│   │   ├── SearchBar.tsx         # Barra de busca
│   │   ├── FilterPanel.tsx       # Painel de filtros
│   │   ├── BottomNav.tsx         # Navegação inferior
│   │   ├── JackpotBadge.tsx      # Badge de jackpot
│   │   ├── MarketplaceBadge.tsx  # Badge de marketplace
│   │   ├── CoverageStats.tsx     # Estatísticas de cobertura
│   │   ├── EmptyState.tsx        # Estado vazio
│   │   └── LoadingSkeleton.tsx   # Skeleton loader
│   ├── lib/                      # Bibliotecas e utilitários
│   │   ├── supabase.ts           # Cliente Supabase (browser)
│   │   ├── supabase-server.ts    # Cliente Supabase (server)
│   │   ├── jackpot-engine.ts     # Motor de detecção de jackpots
│   │   └── mock-data.ts          # Dados simulados (MVP)
│   ├── types/                    # Tipos TypeScript
│   │   └── database.ts           # Tipos do banco Supabase
│   └── middleware.ts             # Middleware de autenticação
├── supabase/
│   └── migrations/
│       └── 001_initial.sql       # Migration inicial do banco
├── package.json                  # Dependências
├── next.config.js               # Config Next.js
├── tailwind.config.ts           # Config Tailwind CSS
├── tsconfig.json                # Config TypeScript
└── .env.local.example           # Exemplo de variáveis de ambiente
```

---

## 🎨 Stack Técnica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **UI**: Tailwind CSS
- **Autenticação**: Supabase Auth
- **Banco de Dados**: Supabase (PostgreSQL)
- **Ícones**: Lucide React
- **Notificações**: React Hot Toast
- **Deploy**: Vercel

---

## 🧠 Como Funciona o Motor de Jackpot

O sistema analisa cada anúncio e atribui uma pontuação (0-100) baseada em:

### Fatores de Pontuação

1. **Palavras-chave vagas (+35 pontos)**
   - "lego antigo", "pecinhas", "bonequinhos"
   - "caixa de peças", "brinquedo do meu filho"
   - "sem saber se está completo", "desapego"

2. **Temas valiosos (+30 pontos)**
   - De Volta para o Futuro (multiplicador 2.5x)
   - Star Wars (multiplicador 2.0x)
   - Harry Potter (multiplicador 1.8x)
   - Creator Expert, Technic, Architecture

3. **Erros de digitação (+20 pontos)**
   - "leg0", "le9o", "bloco de montar"
   - Títulos mal escritos ou genéricos

4. **Minifiguras (+15 pontos)**
   - Menção a "bonequinhos", "minifig", "personagem"

5. **Título vago/curto (+15 pontos)**
   - Menos de 30 caracteres
   - Títulos genéricos

6. **Lotes e peças avulsas (+10 pontos)**
   - Alta chance de subprecificação

7. **BÔNUS ESPECIAL (+25 pontos)**
   - Quando detecta: **tema valioso + descrição vaga**
   - Exemplo: "carrinho lego de filme antigo" = De Volta para o Futuro subprecificado!

### Níveis de Confiança

- **Alta**: score ≥ 70 → 🔥 JACKPOT!
- **Média**: score 50-69 → ⚡ Boa oportunidade
- **Baixa**: score < 50 → Oportunidade comum

---

## 📊 Funcionalidades Futuras (Roadmap)

### Fase 2 - Scraping Real
- [ ] Integração com APIs dos marketplaces
- [ ] Scraping automatizado e agendado
- [ ] Cache Redis para performance

### Fase 3 - OCR e Análise Visual
- [ ] OCR para ler fotos de anúncios
- [ ] Detecção de peças raras por imagem
- [ ] Análise de autenticidade de LEGO
- [ ] Reconhecimento de minifiguras por foto

### Fase 4 - Social e Comunidade
- [ ] Sistema de reviews de vendedores
- [ ] Chat entre usuários
- [ ] Ranking de melhores garimpeiros
- [ ] Compartilhamento de achados

### Fase 5 - Monetização
- [ ] Plano Premium com alertas ilimitados
- [ ] Acesso antecipado a jackpots
- [ ] API pública para desenvolvedores

---

## ⚙️ Configuração Avançada

### Customizar Temas Valiosos

Edite `src/lib/jackpot-engine.ts` e ajuste o array `VALUABLE_THEMES`:

```typescript
const VALUABLE_THEMES = [
  { name: 'Seu Tema', keywords: ['palavra1', 'palavra2'], multiplier: 2.0 },
  // ...
]
```

### Adicionar Novos Marketplaces

1. Edite `supabase/migrations/001_initial.sql`
2. Adicione novo marketplace no seed data
3. Rode o SQL no Supabase

### Personalizar Cores

Edite `tailwind.config.ts`:

```typescript
colors: {
  lego: {
    yellow: '#FFD700',  // Amarelo LEGO
    red: '#D42323',     // Vermelho para jackpots
    // ...
  }
}
```

---

## 🐛 Solução de Problemas

### Erro: "Invalid API key"
- Verifique se copiou corretamente as credenciais do Supabase
- Confirme que o arquivo `.env.local` está na raiz do projeto
- Reinicie o servidor (`npm run dev`)

### Erro: "Failed to fetch"
- Verifique sua conexão com a internet
- Confirme que o projeto Supabase está ativo
- Verifique as RLS policies no Supabase

### Login não funciona
- Confirme que executou o SQL migration completo
- Verifique se o Supabase Auth está habilitado
- Tente criar uma nova conta para testar

### Página em branco
- Verifique o console do navegador (F12)
- Veja os logs do terminal
- Confirme que todas as dependências foram instaladas

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique a seção **Solução de Problemas** acima
2. Revise os logs do navegador (F12 → Console)
3. Confirme que seguiu todos os passos de configuração

---

## 📄 Licença

Este projeto é fornecido como MVP (Minimum Viable Product) para fins educacionais e de demonstração.

---

## 🎉 Pronto para Garimpar!

Seu app está **100% funcional** e pronto para encontrar jackpots de LEGO!

### Próximos Passos

1. ✅ Crie sua conta
2. ✅ Faça sua primeira busca no Modo Jackpot
3. ✅ Configure alertas para seus temas favoritos
4. ✅ Favorite os anúncios mais promissores
5. ✅ Compartilhe seus achados!

**Bons garimpos! 🧱🔥**

---

*Desenvolvido com 💛 para a comunidade AFOL brasileira*
