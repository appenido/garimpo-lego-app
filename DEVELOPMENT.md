# 🛠️ Guia de Desenvolvimento - Garimpo LEGO Brasil

Este documento contém informações técnicas para desenvolvedores que desejam entender ou modificar o projeto.

---

## 🏗️ Arquitetura

### Next.js 14 App Router

O projeto usa o novo App Router do Next.js 14 com Server Components e Client Components estrategicamente separados:

- **Server Components** (padrão): Layout raiz, páginas estáticas
- **Client Components** (`'use client'`): Componentes interativos, hooks, estado

### Fluxo de Autenticação

```
Usuario → Login → Supabase Auth → Middleware → Dashboard
                                     ↓
                              Verifica sessão
                                     ↓
                              Redireciona se necessário
```

O middleware (`src/middleware.ts`) protege todas as rotas do dashboard automaticamente.

### Fluxo de Busca

```
SearchBar → API Route (/api/search) → Mock Data / DB
                ↓
          Jackpot Engine
                ↓
          Resultados Ordenados → Results Page
```

---

## 📦 Estrutura de Dados

### Tipos Principais

```typescript
// Listing (Anúncio)
interface Listing {
  id: string
  title: string
  description: string
  price: number
  condition: 'new' | 'used' | 'unknown'
  permalink: string
  marketplaceName: string
  pieceCount: number | null
  hasMinifigs: boolean | null
  theme: string | null
  itemType: 'set' | 'lot' | 'pieces' | 'minifig' | 'accessory'
}

// Jackpot Analysis
interface JackpotAnalysis {
  score: number // 0-100
  confidence: 'high' | 'medium' | 'low'
  discountPercent: number | null
  jackpotReason: string
  matchedKeywords: string[]
  pricePerPiece: number | null
}
```

### Banco de Dados (Supabase)

Todas as tabelas possuem Row Level Security (RLS) configurada:

- **public**: `marketplaces`, `listings`, `jackpot_scores`
- **user-specific**: `saved_searches`, `alerts`, `favorites`, `search_history`, `user_settings`

---

## 🎨 Sistema de Design

### Tema de Cores

```css
--lego-yellow: #FFD700;      /* Amarelo LEGO oficial */
--lego-yellow-dark: #FFC700; /* Hover states */
--lego-black: #000000;       /* Textos principais */
--lego-red: #D42323;         /* Jackpots/alertas */
--lego-blue: #0055BF;        /* Links/ações */
```

### Classes Utilitárias Personalizadas

```css
.btn-primary     /* Botão amarelo LEGO */
.btn-secondary   /* Botão branco com borda */
.btn-danger      /* Botão vermelho */
.card            /* Card com sombra */
.input-field     /* Input padronizado */
.badge           /* Badge arredondado */
.skeleton        /* Loading skeleton */
```

### Responsividade

Mobile-first com breakpoints Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 🧪 Motor de Jackpot (Algoritmo)

### Função Principal: `calculateJackpotScore()`

Localização: `src/lib/jackpot-engine.ts`

#### Entradas
- Título do anúncio
- Descrição
- Preço
- Condição (novo/usado)
- Quantidade de peças (opcional)
- Presença de minifiguras (opcional)
- Tema (opcional)
- Tipo de item

#### Saídas
- Score 0-100
- Confiança (high/medium/low)
- Percentual de desconto estimado
- Motivo técnico do jackpot
- Palavras-chave encontradas
- Preço por peça

#### Lógica de Pontuação

```javascript
Score = 
  + vagueKeywords (35 pontos máx)
  + valuableTheme (30 pontos)
  + typos (20 pontos)
  + minifigs (15 pontos)
  + vagueTitle (15 pontos)
  + lotOrPieces (10 pontos)
  + usedLowPrice (15 pontos)
  + BONUS: vague + valuable (25 pontos)

Score final = Score × themeMultiplier (1.0 - 2.5x)
```

### Customização

Para adicionar novos padrões de jackpot:

```typescript
// src/lib/jackpot-engine.ts

// 1. Adicionar palavras-chave
const VAGUE_KEYWORDS = [
  'sua nova palavra',
  // ...
]

// 2. Adicionar tema valioso
const VALUABLE_THEMES = [
  {
    name: 'Novo Tema',
    keywords: ['palavra1', 'palavra2'],
    multiplier: 2.0
  },
  // ...
]

// 3. Ajustar pesos no cálculo
score += vagueMatches.length * 10 // Ajuste o multiplicador
```

---

## 🔌 API Routes

### GET /api/search

Busca anúncios com filtros e scoring.

**Query Parameters:**
- `query`: string (termo de busca)
- `jackpot`: boolean (modo jackpot ativo)
- `marketplaces`: string[] (comma-separated)
- `minPrice`, `maxPrice`: number
- `condition`: string[] (comma-separated)
- `itemType`: string[] (comma-separated)
- `themes`: string[] (comma-separated)
- `minJackpotScore`: number (0-100)

**Response:**
```json
{
  "listings": [...],
  "total": 42,
  "coverage_stats": [...],
  "search_id": "uuid",
  "query": "star wars",
  "filters": {...}
}
```

### GET /api/listings/[id]

Detalhes de um anúncio específico.

**Response:**
```json
{
  "id": "...",
  "title": "...",
  "jackpot": {...},
  "priceHistory": [...]
}
```

---

## 🔐 Segurança

### Row Level Security (RLS)

Todas as tabelas possuem policies configuradas:

```sql
-- Exemplo: Favoritos
CREATE POLICY "Users can view their own favorites" 
ON favorites FOR SELECT 
USING (auth.uid() = user_id);
```

### Variáveis de Ambiente

**Nunca commite** o arquivo `.env.local`! Ele contém credenciais sensíveis.

**Safe**:
- `NEXT_PUBLIC_*` → Expostas no browser (OK para URLs públicas)

**Sensitive** (não usar no frontend):
- Chaves privadas, secrets, API keys privadas

---

## 🚀 Otimizações

### Performance

1. **Server Components**: Sempre que possível, prefira Server Components
2. **Dynamic Imports**: Para componentes pesados
3. **Image Optimization**: Use `next/image` para imagens externas
4. **API Caching**: Considere adicionar cache no futuro

### SEO

```typescript
// src/app/page.tsx
export const metadata = {
  title: 'Garimpo LEGO Brasil',
  description: '...',
  keywords: '...'
}
```

### Mobile Performance

- CSS: Tailwind tree-shaking automático
- JS: Code splitting automático pelo Next.js
- Fonte: Google Fonts otimizada via next/font

---

## 🧩 Adicionando Novas Funcionalidades

### Exemplo: Nova Página

```typescript
// 1. Criar src/app/(dashboard)/nova-pagina/page.tsx
'use client'

export default function NovaPaginaPage() {
  return (
    <div>
      <h1>Nova Página</h1>
    </div>
  )
}

// 2. Adicionar ao BottomNav (se necessário)
// src/components/BottomNav.tsx
const navItems = [
  // ...
  { href: '/nova-pagina', icon: NewIcon, label: 'Nova' }
]
```

### Exemplo: Nova API Route

```typescript
// src/app/api/nova-rota/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Sua lógica aqui
  return NextResponse.json({ data: 'resultado' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Processar dados
  return NextResponse.json({ success: true })
}
```

---

## 🐛 Debug

### Browser DevTools

```javascript
// Habilitar logs verbose
localStorage.setItem('debug', 'garimpo:*')

// Ver estado do Supabase
console.log(supabase.auth.getSession())
```

### Server Logs

```bash
# Desenvolvimento
npm run dev

# Ver todos os logs
DEBUG=* npm run dev
```

### Erros Comuns

**"Module not found"**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**"Hydration mismatch"**
- Verifique se há diferenças entre HTML server/client
- Certifique-se de usar `'use client'` onde necessário

**"Supabase session not found"**
- Limpe cookies: DevTools → Application → Cookies
- Re-faça login

---

## 📚 Recursos Úteis

### Documentação Oficial

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Comunidades

- [Next.js Discord](https://discord.gg/nextjs)
- [Supabase Discord](https://discord.supabase.com/)
- [LEGO AFOL Brasil Facebook](https://facebook.com/groups/legoafol)

---

## 🎯 Roadmap Técnico

### Curto Prazo
- [ ] Implementar testes unitários (Jest)
- [ ] Adicionar testes E2E (Playwright)
- [ ] Configurar CI/CD completo
- [ ] Adicionar Sentry para error tracking

### Médio Prazo
- [ ] Migrar dados mockados para scraping real
- [ ] Implementar queue system (Bull/Redis)
- [ ] Adicionar WebSockets para notificações real-time
- [ ] PWA completo (service workers, offline)

### Longo Prazo
- [ ] Microserviços para scraping
- [ ] ML/AI para melhor detecção de jackpots
- [ ] Sistema de reputação de vendedores
- [ ] API pública RESTful

---

## 🤝 Contribuindo

### Code Style

```bash
# Formatar código
npm run format

# Lint
npm run lint
```

### Commit Messages

Use Conventional Commits:
```
feat: adiciona busca por código do set
fix: corrige cálculo de desconto
docs: atualiza README
style: formata componentes
refactor: simplifica jackpot engine
```

### Pull Requests

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📞 Contato Técnico

Para questões técnicas ou discussões sobre arquitetura, abra uma issue no GitHub ou entre em contato.

---

*Happy coding! 🧱💛*
