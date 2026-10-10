# Amoxtli Website (Next.js + i18next)

Single-page redesign for Amoxtli with bilingual content (EN/ES), Space Grotesk typography, and a minimalist editorial layout.

## Requirements

- Node.js 18+
- npm, yarn, or pnpm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
npm run start
```

## Project Notes

- App Router with semantic HTML sections.
- i18next translations in `src/locales/en/translation.json` and `src/locales/es/translation.json`.
- Theme tokens in `src/theme/tokens.ts` and CSS variables in `src/app/globals.css`.
- Images served via `next/image` for performance.

## Rediseño (rama `dev`)

Sitio estático en Next.js 15: `/` (español) y `/en` (inglés). Textos en `src/locales/es.ts` (fuente) y `en.ts`.

### Variables de entorno
| Variable | Uso |
|---|---|
| `SENDGRID_API_KEY` | Envío de leads desde `/api/lead` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp (formato internacional, sin `+`) |
| `NEXT_PUBLIC_WHATSAPP_MESSAGE` | Mensaje precargado |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (por defecto `https://www.amoxtli.tech`) |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Token de verificación de Search Console |
| `SITE_NOINDEX=1` | Fuerza `noindex` |

Los deploys de preview (Vercel `VERCEL_ENV` ≠ `production`, o Netlify `CONTEXT` ≠ `production`) se publican con `noindex` automáticamente. La rama `dev` se revisa en el preview de Vercel.
