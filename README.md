# Garimpo LEGO PWA (MVP)

## Rodar local
```bash
npm i
cp .env.example .env
npm run dev
```

## Deploy (Cloudflare Pages)
- Build command: `npm run build`
- Output: `dist`
- Env: `VITE_API_BASE=https://api.garimpolego.com.br`

## CORS (na API)
Liberar origin do app:
- https://app.garimpolego.com.br
