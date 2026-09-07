<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ARREGLA — contexto permanente

## Qué es

Landing de captación por WhatsApp para personas y empresas en Colombia con riesgo de embargo, secuestro o remate. El objetivo de conversión es abrir una conversación contextualizada con el número oficial de ARREGLA.

Repositorio: `proyectotureporte/arregla` · rama: `main` · servidor: alias SSH `restaurar` · ruta `/var/www/arregla` · PM2 `arregla` · puerto `4006`.

## Stack y comandos

- Next.js 16 App Router, React 19 y TypeScript estricto.
- CSS propio en `app/globals.css`; iconos Lucide; fuentes Bricolage Grotesque + Hanken Grotesk mediante `next/font`.
- Este repositorio usa npm porque el artefacto fuente trae `package-lock.json`: `npm ci`, `npm run dev`, `npm run typecheck`, `npm run build`, `npm run start`.
- `npm run start` lee `PORT` de entorno. Healthcheck: `GET /api/health`.
- CI/CD: `.github/workflows/deploy-vps.yml` despliega cada push a `main`; `deploy.sh` compila, recarga PM2 y verifica salud.

## Estructura esencial

- Página y layout: `app/page.tsx`, `app/layout.tsx`.
- API: `app/api/health/route.ts`.
- Secciones y comportamiento: `components/`.
- Copy, navegación, teléfono y mensajes de WhatsApp: `content/sitio.ts`.
- Tipos de contenido: `lib/types.ts`.
- Sistema visual: `app/globals.css` y `docs/DESIGN.md`.
- Mapa profundo: `docs/PROJECT-MAP.md`.

## Reglas de este proyecto

- Antes de push: `npm run typecheck`, `npm run build`, `npm audit` y QA visual en escritorio/móvil.
- Todo cambio de copy o WhatsApp parte de `content/sitio.ts`; no dupliques el número en componentes.
- El diseño es deliberadamente solo claro. No reintroducir modo oscuro sin aprobación: fue retirado por petición de marca.
- `Interactions` controla los reveals de todas las secciones; un cambio en sus selectores exige verificar la página completa haciendo scroll.
- No versionar `.env`, `.next`, `node_modules` ni credenciales. La app actual no necesita variables de entorno funcionales.
- No asumir que `arregla.vercel.app` corresponde a esta marca: a 2026-09-07 sirve una aplicación ajena de servicios en Puerto Rico.
- Cualquier operación en el VPS `restaurar` exige inventario, healthcheck, plan aprobado, backup y verificación posterior. `viis` usa el puerto `4005` y es otra app: no tocarla al operar ARREGLA.
