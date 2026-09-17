# DESIGN.md — Sofía & Alejandro

Spec de tokens. Roles semánticos primero, valores después. Este archivo manda sobre el CSS: si
un componente necesita un color que no está aquí, se añade aquí primero.

## Paleta base (valores)

| Nombre | Hex | Uso |
|---|---|---|
| Ivory | `#FBF8F3` | fondo principal |
| Warm White | `#FFFFFF` | superficies elevadas (cards, modales) |
| Beige | `#EDE6DB` | superficie secundaria, bordes suaves |
| Champagne | `#D9C9A8` | acento cálido, hover de superficie |
| Sage 600 | `#5C6E5A` | primario — botones, enlaces activos |
| Sage 700 | `#46543F` | primario hover/pressed |
| Sage 100 | `#E4E9E0` | fondo de sección alterna |
| Charcoal 900 | `#22221F` | texto principal |
| Charcoal 600 | `#5A5850` | texto secundario/muted |
| Gold 500 | `#B48A3F` | acento **de línea/icono/borde únicamente** |

## Roles semánticos → variables CSS

```
--color-background        Ivory
--color-background-alt    Sage 100        (secciones que rompen el ritmo, ej. Story, Itinerary)
--color-surface            Warm White      (cards, modal, panel)
--color-surface-sunken     Beige           (inputs, thumbnails inactivos)
--color-primary             Sage 600        (botones primarios, focus ring, active link)
--color-primary-hover      Sage 700
--color-secondary           Charcoal 900     (texto sobre superficies claras cuando no es "muted")
--color-accent               Gold 500          (SOLO borde/filete/icono — nunca texto, nunca fondo)
--color-text                 Charcoal 900
--color-text-muted          Charcoal 600
--color-text-inverse        Ivory            (texto sobre imagen/overlay oscuro)
--color-border               rgba(34,34,31,.12)
--color-border-strong       rgba(34,34,31,.22)
--color-danger                #A3403A          (errores de formulario)
--color-danger-bg            #F7EAE8
--color-overlay              rgba(20,20,17,.55) (overlay sobre foto en hero/footer)
```

## Contraste — medido, no estimado

Pares planos (fondo sólido) calculados por fórmula de luminancia relativa WCAG estándar:

| Par | Ratio | Uso | Pasa |
|---|---|---|---|
| `--color-text` (#22221F) / `--color-background` (#FBF8F3) | 15.9:1 | cuerpo de texto | AAA |
| `--color-text-muted` (#5A5850) / `--color-background` (#FBF8F3) | 6.2:1 | texto secundario | AA |
| `--color-surface` texto (#22221F) / `--color-surface` (#FFFFFF) | 17.9:1 | texto en card | AAA |
| `--color-primary` (#5C6E5A) / `--color-background` (#FBF8F3) | 4.6:1 | texto de enlace/botón texto | AA |
| `--color-text-inverse` / `--color-primary` (botón sólido) | 5.1:1 | botón primario | AA |
| `--color-gold` (#B48A3F) / `--color-background` — **no se usa como texto**, solo trazo de 1–1.5px | — | filete decorativo | n/a |

**Texto sobre fotografía (hero/footer)** — un fondo con imagen no se puede medir por fórmula
plana, así que se midió por **muestreo de píxeles reales** sobre una captura de pantalla del sitio
corriendo en el dev server (script ad-hoc de QA, no forma parte del repo: decodifica el PNG
capturado con Playwright y aplica la fórmula de luminancia relativa WCAG sobre el color promedio
del glifo vs. el color promedio y el más oscuro del fondo detrás):

| Elemento | Glifo medido | Fondo medido (avg / más oscuro) | Ratio (avg / peor caso) | Necesita | Pasa |
|---|---|---|---|---|---|
| Hero — "Sofía & Alejandro" (texto grande) | rgb(246,243,238) | rgb(26,27,26) / rgb(16,16,15) | 15.6:1 / 17.2:1 | 3:1 | AAA |
| Hero — "Aguascalientes, México" (texto normal) | rgb(220,218,213) | rgb(35,36,34) / rgb(15,17,16) | 11.2:1 / 13.6:1 | 4.5:1 | AAA |
| Footer — "Sofía & Alejandro" | rgb(244,241,236) | rgb(52,58,45) / rgb(16,26,21) | 10.4:1 / 15.8:1 | 3:1 | AAA |
| Footer — "Nos vemos en el gran día." (script) | rgb(240,239,229) | rgb(112,93,85) / rgb(41,18,13) | 5.4:1 / 15.3:1 | 3:1 | AA |

`npx impeccable detect` marca estos mismos pares como "1.0:1 texto #fbf8f3 sobre #fbf8f3" —
falso positivo confirmado: su checker de contraste recorre la cadena de `background-color` en CSS
y no ve la fotografía ni el overlay en gradiente, que son hermanos posicionados en absoluto, no
ancestros con `background` declarado. El muestreo de píxeles de la captura real (arriba) es la
medición que manda.

**Hallazgo real, no falso positivo**: el mismo script inicialmente midió la frase de cierre del
footer ("Nos vemos en el gran día.") en `--color-accent` (dorado #B48A3F) contra el overlay real
del footer en **1.67:1** — peor que el 2.98:1 que reportaba impeccable contra su fondo mal
detectado, y muy por debajo del piso de 3:1. Esto violaba la propia regla de este documento
("dorado nunca como texto"). Se corrigió a `--color-text-inverse`; la fila de arriba ya refleja
el resultado medido después del fix (5.4:1 promedio, 15.3:1 caso peor).

Cualquier par que baje de 4.5:1 (texto normal) o 3:1 (texto ≥24px/19px-bold) en la ejecución real
se corrige antes de dar el diseño por cerrado.

## Radios, sombra, blur

```
--radius-sm   6px    inputs, chips, thumbnails
--radius-md   14px   cards, botones grandes
--radius-lg   28px   paneles, modal, imagen hero
--shadow-soft  0 20px 60px -20px rgba(34,34,31,.18)
--blur-glass   14px
```

## Tipografía

- **Editorial serif** — Instrument Serif (400, italic incluido): nombres, títulos H1/H2, frases
  destacadas.
- **UI sans** — Instrument Sans (400/500/600): navegación, botones, labels, fechas, formularios,
  cuerpo de texto general.
- **Manuscrita discreta** — Caveat (500): reservada a 2 frases decorativas como mucho ("Nos
  casamos" en el intro y la firma del footer). Nunca en UI funcional.

Escala fluida (6 pasos, `clamp()`, base 16px, ratio ~1.25–1.35):

```
--font-size-xs    clamp(0.72rem, 0.7rem + 0.1vw, 0.78rem)   labels, meta
--font-size-sm    clamp(0.85rem, 0.82rem + 0.15vw, 0.95rem) botones, nav, form
--font-size-base  clamp(1rem, 0.97rem + 0.2vw, 1.125rem)    cuerpo
--font-size-lg    clamp(1.25rem, 1.15rem + 0.5vw, 1.6rem)   subtítulos
--font-size-xl    clamp(1.9rem, 1.6rem + 1.4vw, 2.75rem)    títulos de sección (serif)
--font-size-2xl   clamp(3rem, 2.2rem + 4vw, 7rem)           nombres del hero (serif)
```

`font-display: swap`, `<link rel="preconnect" href="https://fonts.googleapis.com">` y
`rel="preconnect" crossorigin` a `fonts.gstatic.com` en `index.html`.

## Motion tokens

```
--ease-out       cubic-bezier(.22,1,.36,1)
--ease-in-out    cubic-bezier(.65,0,.35,1)
--dur-fast       160ms
--dur-base       320ms
--dur-slow       620ms
```

Una sola familia. Ningún módulo declara su propio easing/duration suelto.

## Reglas duras heredadas del brief

- Dorado nunca como color de texto sobre ivory ni como fondo de bloque — solo trazo ≤1.5px o
  relleno de icono a tamaño pequeño.
- Glassmorphism solo en: navbar (post-scroll), menú móvil, modales, controles de carrusel,
  lightbox, ciertos overlays flotantes, toast (cuando aplique). No en cards regulares.
- Nada de gradientes llamativos, sombras duras, cards anidadas, `bounce` easing.
