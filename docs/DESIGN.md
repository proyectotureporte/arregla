# Sistema visual de ARREGLA

Actualizado: 2026-09-07

## Dirección

Landing editorial, seria y humana. La superficie general es marfil muy claro; coral comunica urgencia y acción, teal comunica protección y confianza. La página alterna bloques sobrios con un único momento oscuro en “Por qué existimos”. El diseño es deliberadamente solo claro por decisión de marca.

## Tokens

Todos viven en `app/globals.css`:

- Superficies: `--paper`, `--paper-raised`, `--line`, `--line-strong`.
- Texto: `--ink`, `--ink-soft`, `--ink-faint`.
- Protección/confianza: `--shelter`, `--shelter-deep`, `--shelter-bright`, `--shelter-soft`.
- Urgencia: `--warm`, `--warm-deep`, `--warm-bright`, `--warm-soft`, `--accent-strong`.
- Apoyo: `--gold`, `--gold-text`, `--gold-soft`.
- Profundidad: `--shadow`, `--shadow-lg`.

`--gold-text` y los tonos secundarios oscuros existen para mantener WCAG AA en texto pequeño sin apagar los dorados decorativos.

## Tipografía

- Display: Bricolage Grotesque (`--font-display`), pesos 500–800.
- Texto: Hanken Grotesk (`--font-sans`), pesos 400–700.
- Escala fluida con `clamp()` en títulos principales y `text-wrap: balance`.

## Elementos firma

- El titular coral partido en dos líneas.
- Las filas de “corrección” que tachan el comportamiento del acreedor y revelan la acción de ARREGLA.
- Las comillas editoriales sobredimensionadas en los dos bloques emocionales.
- El contraste semántico coral (urgencia) / teal (protección).

## Componentes

- `SiteHeader` y `SiteFooter`: navegación anclada, marca y contacto.
- `Hero` + `HeroSelector`: promesa principal y selector interactivo de urgencia.
- `Diagnostico`: cuatro tarjetas de situación con iconografía Lucide consistente.
- `Reconocimiento`, `Aliado`, `Equipo`, `Confianza`: bloques narrativos y de credibilidad.
- `Servicios`, `Proceso`: oferta y secuencia de trabajo.
- `WhatsAppButton`: CTA primario compartido.

## Motion y estados

- Duraciones de 150–500 ms en hovers y entradas; el progreso de pasos dura 1,2 s.
- `Interactions` activa las clases `.in` mediante `IntersectionObserver`.
- El selector de urgencia usa estado local y transición de panel.
- `prefers-reduced-motion: reduce` reduce animaciones y transiciones a una duración casi instantánea.
- Todo elemento interactivo conserva hover y foco visible de alto contraste.

## Responsive

- Contenedor máximo de 1160 px.
- El hero pasa de dos columnas a una en 860 px.
- Tarjetas de cuatro a dos y una columna en 860/540 px.
- La navegación central se oculta bajo 760 px; el logo y el CTA permanecen accesibles.
- El pie pasa a una columna bajo 720 px.
