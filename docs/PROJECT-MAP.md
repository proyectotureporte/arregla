# ARREGLA — mapa del proyecto

Actualizado: 2026-09-07 · Commit: `901e8d8`

## Identidad y stack

ARREGLA es una landing de captación para el mercado colombiano. Ayuda a personas o empresas con dificultades financieras a identificar la urgencia de su caso y contactar por WhatsApp al `+57 315 132 2640`. No procesa pagos, expedientes ni datos personales dentro de la web.

Stack: Next.js 16.3.4 con App Router, React 19.2.8, TypeScript 5.9.3 estricto, CSS propio y `lucide-react` 1.40.0. Las fuentes Bricolage Grotesque y Hanken Grotesk se integran con `next/font`. El gestor efectivo es npm y el lockfile es `package-lock.json`.

## Mapa de rutas

| Ruta | Archivo | Qué muestra | Auth | Datos |
| --- | --- | --- | --- | --- |
| `/` | `app/page.tsx` | Landing completa: cabecera, hero, diagnóstico, propuesta, equipo, confianza, servicios, proceso, CTA y pie | No | Constantes de `content/sitio.ts` |
| `/_not-found` | Generada por Next.js | 404 por defecto | No | Ninguno |

## Endpoints API

| Método y ruta | Archivo | Qué hace | Consumidor | Persistencia |
| --- | --- | --- | --- | --- |
| `GET /api/health` | `app/api/health/route.ts` | Responde `{"status":"ok"}` para monitorización y despliegue | Healthcheck/PM2/proxy | Ninguna |

## Modelo de datos

No hay base de datos ni estado persistido. `lib/types.ts` define solamente las estructuras TypeScript del contenido editorial: `SituacionDiagnostico`, `LineaServicio`, `PasoProceso`, `Correccion` y `MomentoUrgencia`.

## Flujos clave

### Selección de urgencia y WhatsApp

1. `components/HeroSelector.tsx` inicializa el momento seleccionado y renderiza cuatro opciones desde `content/sitio.ts:momentos`.
2. Al pulsar una opción, React actualiza el resumen y los indicadores del panel.
3. `content/sitio.ts:enlaceWhatsapp` construye el enlace con el teléfono canónico y el mensaje codificado.
4. `components/WhatsAppButton.tsx` abre WhatsApp en una pestaña nueva con `noopener noreferrer`.

### Diagnóstico por situación

1. `components/Diagnostico.tsx` recorre `content/sitio.ts:diagnostico`.
2. `components/DiagnosticoIcono.tsx` traduce el tipo editorial a un icono Lucide.
3. Cada tarjeta abre el mensaje específico del caso en WhatsApp.

### Aparición progresiva al hacer scroll

1. `app/page.tsx` monta `components/Interactions.tsx` una vez.
2. `Interactions` observa `.reveal`, `.diag-card`, `.correccion-row` y `.step`.
3. Al entrar en viewport añade `.in`; `app/globals.css` anima opacidad, desplazamiento, iconos y progreso.
4. Si `IntersectionObserver` no existe, los elementos se muestran inmediatamente.

## Dependencias compartidas

- `content/sitio.ts`: fuente única de copy, navegación, servicios, proceso, teléfono y todos los mensajes de WhatsApp. Lo consumen casi todas las secciones.
- `app/globals.css`: tokens, responsive, estados interactivos y motion de toda la aplicación.
- `components/Interactions.tsx`: controla la visibilidad inicial de ocho secciones y el progreso del proceso.
- `components/WhatsAppButton.tsx`: CTA compartido por header, hero y cierre.
- `app/layout.tsx`: fuentes, idioma, metadata e iconos globales.
- `public/logo-icon.png`: logo utilizado en cabecera, pie y metadata; cambiarlo afecta identidad y favicon.

No existen contratos con DB, email, webhooks, pagos, autenticación, localStorage ni sesiones.

## Variables de entorno

La aplicación no requiere variables funcionales. Next.js puede leer `PORT` al ejecutar `npm run start`; producción debe asignarlo al proceso. Cualquier `.env` local heredado está ignorado y no se usa en el código.

## Despliegue conocido

- Repositorio público: `https://github.com/proyectotureporte/arregla`, rama `main`.
- CI/CD: `.github/workflows/deploy-vps.yml` se conecta al alias público del VPS mediante secretos dedicados y actualiza `/var/www/arregla`.
- Runtime: PM2 `arregla`, puerto `4006`, configuración `ecosystem.config.cjs`; `4005` pertenece a `viis` y queda fuera de alcance.
- Proxy: Nginx usa `deploy/nginx.conf` para `arregla.com.co` y `www.arregla.com.co` hacia `127.0.0.1:4006`.
- Primer despliegue verificado el 2026-09-07: workflow `34131004136`, commit `901e8d8`, PM2 online, health directo y por Nginx en `200`. Backup previo: `/var/backups/vps-admin/2026-09-07-135635`.
- El repositorio conserva una publicación legacy de GitHub Pages y una integración histórica de Vercel. No son el destino operativo de ARREGLA. El webhook de Vercel puede ejecutarse tras un push, pero `arregla.vercel.app` sirve una app ajena de servicios en Puerto Rico y nunca debe usarse para verificar este proyecto.
- `arregla.com.co` y `www.arregla.com.co` resuelven a `15.197.172.60` y muestran un lander, no al VPS `restaurar` (`82.223.109.156`).
- No se debe sustituir `restaurar.co`, que pertenece a `tureporte-frontend`, ni `/var/www/viis`, que es otra aplicación.

## Lecciones y gotchas

- 2026-09-07 — La versión anterior tenía `node_modules` y un `.env` versionados. Ambos se eliminaron del índice; `.gitignore` protege `.env*`, dependencias y builds.
- 2026-09-07 — El ZIP fijaba Next 15.5.25 con vulnerabilidades transitivas de PostCSS. Se actualizó a Next 16.3.4; `npm audit` queda en cero.
- 2026-09-07 — Next 16 modifica `tsconfig.json` en el primer build y genera/mantiene el bloque de reglas al inicio de `AGENTS.md`.
- 2026-09-07 — Las capturas full-page deben hacer scroll antes de capturar; de lo contrario `IntersectionObserver` deja las secciones inferiores transparentes y la imagen de QA parece vacía aunque el flujo real funcione.
- 2026-09-07 — La app es solo clara por decisión expresa de marca. La ausencia de dark mode no es un olvido.
- 2026-09-07 — ARREGLA no estaba aprovisionada en el VPS aunque el repositorio tuviera despliegues históricos externos. Su identidad de producción es `/var/www/arregla` + PM2 `arregla` + `:4006` en `restaurar`.
- 2026-09-07 — El servicio está desplegado, pero el dominio público seguirá mostrando el lander de `15.197.172.60` hasta cambiar los registros A del proveedor DNS a `82.223.109.156`; después hay que emitir el certificado de `arregla.com.co` y `www.arregla.com.co` en Nginx.
