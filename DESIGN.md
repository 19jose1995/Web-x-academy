---
name: X Academy
description: Landing page de una academia de artes escénicas en Santo Domingo — danza, canto y teatro musical.
colors:
  spotlight-magenta: "#ec1763"
  company-blue: "#5568A9"
  rehearsal-green: "#cdd629"
  curtain-orange: "#f37826"
  night-void: "#0f0c29"
  deep-violet: "#302b63"
  ink-navy: "#1a1a2e"
  ink-slate: "#1e293b"
  muted-slate: "#64748b"
  paper-white: "#ffffff"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.15
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.25
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.05em"
rounded:
  sm: "12px"
  md: "16px"
  lg: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.curtain-orange}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "#ff8a3d"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  chip-active:
    backgroundColor: "{colors.spotlight-magenta}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  chip-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  card-horario:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-slate}"
    rounded: "{rounded.md}"
    padding: "20px"
  input-field:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-slate}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
---

# Design System: X Academy

## 1. Overview

**Creative North Star: "El Escenario Encendido"**

X Academy vive el segundo antes de salir a escena: las luces ya están encendidas, el elenco espera entre bastidores, hay energía en el aire pero todavía hay disciplina y orden — nadie está gritando a la vez. El sistema traduce eso en un solo tono tipográfico llevado a sus extremos (negro grueso para el titular, regular para todo lo demás) y cuatro colores de reflector, cada uno asignado a una disciplina, en vez de un arcoíris decorativo sin significado.

Este sistema rechaza explícitamente el "scaffold" visual genérico de interfaces generadas por IA: texto con gradiente como recurso de énfasis, glassmorphism decorativo en cada tarjeta, emojis haciendo de iconografía funcional, "blobs" desenfocados repetidos en cada esquina, y grids de tarjetas idénticas por pereza compositiva. Nada de eso construye identidad de marca; todo eso es ruido de plantilla. La marca ya tiene una paleta y una voz propias — este documento existe para depurar la ejecución, no para reemplazarla.

**Key Characteristics:**
- Un solo tipo de letra (Inter) llevado de 400 a 900 — contraste por peso, no por mezcla de fuentes.
- Cuatro acentos de marca, cada uno ligado a una disciplina (danza / canto / teatro / llamado a la acción), nunca intercambiables.
- Fondos oscuros (`night-void` → `deep-violet` → `ink-navy`) para las secciones "backstage" (stats, horarios, footer); fondos claros para las secciones de contenido informativo.
- Sombra funcional, no decorativa: la profundidad se reserva para lo que de verdad flota sobre la página.

## 2. Colors: The Curtain-Call Palette

Estrategia de **paleta completa**: cuatro acentos saturados, cada uno con un rol fijo, sobre una base de neutros oscuros y claros. Ningún acento se usa "porque queda bonito" — cada uno es la respuesta visual a una pregunta concreta (¿qué disciplina es esta clase? ¿dónde está el llamado a la acción?).

### Primary
- **Magenta de Reflector** (#ec1763): el acento más repetido del sitio — categoría Danza, arranque del degradado del hero, badges destacados. Es el color que dice "esto es X Academy" antes que cualquier otro.

### Secondary
- **Azul Compañía** (#5568A9): estructura e información — encabezados de sección, categoría Teatro, iconos de contacto, tab "Todos". Es el azul de "esto es serio y confiable", no decorativo.

### Tertiary
- **Verde Ensayo** (#cdd629): categoría Canto y tercer punto del degradado del hero. Se usa en dosis pequeñas — nunca como fondo dominante de una sección completa.
- **Naranja Telón** (#f37826): el color que pide acción — botón principal "Inscríbete Ahora", categoría de clases especiales/Open Class. Es el único acento reservado casi en exclusiva para conversión.

### Neutral
- **Noche de Función** (#0f0c29): el negro más profundo del sistema — menú móvil, fondo del showcase de video.
- **Violeta Profundo** (#302b63): socio de degradado de los fondos oscuros (stats, horarios, footer).
- **Tinta Navy** (#1a1a2e): el otro extremo del degradado oscuro — misma familia que Noche de Función y Violeta Profundo.
- **Tinta Pizarra** (#1e293b / Tailwind slate-800): texto de cuerpo sobre fondo claro.
- **Pizarra Apagada** (#64748b / Tailwind slate-500): texto secundario, descripciones, metadatos.
- **Blanco Papel** (#ffffff): tarjetas sobre fondo oscuro, texto sobre fondo de color.

### Named Rules
**The Four-Light Rule.** Los cuatro acentos de marca (magenta, azul, verde, naranja) no son decoración intercambiable — cada uno está atado a exactamente una disciplina o propósito. Si un usuario aprende que naranja = "inscríbete" y verde = "canto", reasignar esos colores en una sección nueva rompe el código visual que el resto del sitio ya enseñó.

**The One-Gradient Rule.** El degradado de marca (magenta → naranja → verde) es un activo reservado para el fondo de botones CTA sólidos de dos-tres tonos (ej. el botón de WhatsApp) y para el logo. **Nunca** se usa como `background-clip: text` — un titular con "texto arcoíris" es el tell más reconocible de una interfaz genérica de IA y está prohibido en este sistema.

## 3. Typography

**Display Font:** Inter (con system-ui, sans-serif como respaldo)
**Body Font:** Inter — misma familia, pesos más bajos

**Character:** Una sola tipografía llevada a sus extremos de peso (900 para gritar, 400 para hablar) en vez de mezclar dos familias. Mantiene una voz joven, enérgica y de cartel de teatro sin que dos marcas tipográficas compitan entre sí.

**Deriva corregida:** `tailwind.config.js` declaraba `fontFamily.sans: ['Poppins', 'sans-serif']`, aplicado vía `font-sans` en el `div` raíz de `App.jsx` — esa clase gana la cascada sobre la regla base de `html`. Poppins sí se cargaba (vía `<link>` de Google Fonts en `index.html`), pero solo en pesos 400/600/700; los titulares piden 800/900 (`font-extrabold`/`font-black`), que el navegador sintetizaba (faux-bold) al no existir esa cara real. Se corrigió apuntando `fontFamily.sans` a Inter (que sí carga 400–900 vía `@import` en `index.css`) y se retiró el `<link>` de Poppins, ahora huérfano. **Inter es la tipografía canónica de este sistema.**

### Hierarchy
- **Display** (900, `clamp(2.5rem, 6vw, 4.5rem)`, line-height 1.05): el titular del hero. Aparece una sola vez por página.
- **Headline** (800, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.15): título de cada sección ("Clases en X Academy", "Horarios", etc.).
- **Title** (800, 1.5rem, line-height 1.25): títulos de tarjeta (nombre de clase, nombre de maestro).
- **Body** (400–500, 1rem, line-height 1.6, máx. ~65ch): párrafos descriptivos.
- **Label** (700, 0.75rem, tracking 0.05em): etiquetas de metadato — categoría, badge "OPEN CLASS", encabezados de contacto.

### Named Rules
**The Shout-and-Speak Rule.** Los titulares comprometen 800–900 de peso a tamaño grande; todo lo demás se queda en 400–600. No existen titulares de peso medio (500–600) — el contraste entre "gritar" y "hablar" es todo el sistema de jerarquía; un peso intermedio lo diluye.

## 4. Elevation

El sistema usa **sombra funcional, un solo brillo por página** — no capas planas, pero tampoco el blur/glow decorativo que hoy se repite en cada tarjeta. La profundidad se reserva para elementos que de verdad "flotan" sobre el flujo de la página: tarjetas de contenido sobre un fondo de color, el nav fijo al hacer scroll, modales. El resto de la separación entre secciones viene del color de fondo (los bloques oscuros de Stats/Horarios/Footer ya hacen esto bien sin sombra).

**Corrección pendiente:** hoy existen círculos desenfocados (`blur-xl`, `blur-2xl`) repetidos detrás de casi cada tarjeta (Clases, Horarios, panel de Registro) — eso es ruido decorativo, no elevación. Deben eliminarse o reducirse a un único acento de brillo por sección como máximo.

### Shadow Vocabulary
- **card-lift** (`box-shadow: 0 20px 40px -12px rgba(15,12,41,0.25)`): tarjetas de contenido sobre fondo claro u oscuro que necesitan leerse como "objeto flotante" (panel de registro, tarjeta destacada de Open Class).
- **nav-scrolled** (`backdrop-filter: blur(16px)` + `background: rgba(15,12,41,0.88)`): el único uso de blur que se conserva — es funcional (legibilidad del nav fijo sobre contenido que se desplaza debajo), no decorativo.

### Named Rules
**The One-Glow Rule.** Como máximo un elemento por sección puede llevar un halo de color (`box-shadow` de color o `blur` de acento). Si dos o más elementos de la misma sección brillan a la vez, ninguno se lee como especial.

## 5. Components

### Buttons
- **Shape:** píldora completa (`border-radius: 9999px`).
- **Primary** (`button-primary`): fondo Naranja Telón sólido, texto blanco, padding `14px 32px`, peso 700. Es el único botón que pide conversión directa ("Inscríbete Ahora").
- **CTA de degradado** (WhatsApp): fondo con el degradado de dos tonos magenta→naranja — uso permitido del degradado de marca porque es relleno sólido de botón, no texto.
- **Ghost** (`button-ghost`): fondo blanco al 10%, borde blanco al 30%, texto blanco — para acciones secundarias sobre fondo oscuro/imagen ("Ver clases").
- **Hover/Focus:** `scale(1.05)` + oscurecer ligeramente el fondo; nunca solo opacidad (debe sentirse "presionable").

### Chips (tabs de categoría)
- **Estilo activo:** fondo sólido del color de la categoría, texto blanco, sombra de color sutil.
- **Estilo inactivo:** fondo blanco al 8%, borde blanco al 12%, texto blanco al 60%.
- **Corrección pendiente:** hoy cada chip lleva un emoji como icono (🎪💃🎤🎭); sustituir por los iconos de línea de `lucide-react` que la app ya importa (`Music2`, `Mic2`, `Theater`) para consistencia con el resto del sitio.

### Cards / Containers
- **Corner Style:** `rounded-3xl` (24px) para paneles grandes (Clases, Registro); `rounded-2xl` (16px) para tarjetas de grid (Horarios).
- **Background:** color sólido de categoría (Clases) o blanco/tintado (Horarios), nunca degradado decorativo sin propósito informativo.
- **Shadow Strategy:** ver Elevation — `card-lift` únicamente en tarjetas que genuinamente destacan (featured, panel flotante sobre imagen).
- **Border:** borde de 1px al 15–25% de opacidad del color de categoría en tarjetas no destacadas, en vez de sombra.
- **Internal Padding:** `{spacing.lg}` (32px) en paneles grandes, `{spacing.sm}`–`{spacing.md}` (16–24px) en tarjetas de grid.

### Inputs / Fields
- **Style:** borde `slate-200`, fondo blanco, `rounded-xl` (12px).
- **Focus:** anillo de 2px en Azul Compañía al 30% + borde Azul Compañía al 60% — sin glow ni blur.

### Navigation
- **Style:** fijo (`position: fixed`), transparente sobre el hero; al hacer scroll pasa a `rgba(15,12,41,0.88)` + `backdrop-filter: blur(16px)` — el único glassmorphism del sistema, y es funcional (legibilidad sobre contenido en movimiento), por eso se conserva.
- **Typography:** enlaces en label/body, subrayado animado en el color de marca al hover.
- **Mobile:** menú de pantalla completa con enlaces gigantes (`text-4xl font-black`) y CTA de WhatsApp fijo abajo — coherente con el North Star ("las luces ya están encendidas").

### Schedule Grid (componente distintivo)
Sistema de tabs de categoría + grid filtrado de tarjetas de horario. Es la interfaz de decisión principal del sitio (el usuario elige disciplina, ve horarios, decide inscribirse), así que su jerarquía debe ser la más limpia del sitio: sin blobs, sin degradado de texto en el título de sección, borde superior de color como único acento por tarjeta.

## 6. Do's and Don'ts

### Do:
- **Do** mantener el código de cuatro colores (magenta/azul/verde/naranja) atado a su disciplina — ver The Four-Light Rule.
- **Do** usar rellenos sólidos de color de marca en tarjetas y botones; reservar el degradado de dos tonos exclusivamente para el fondo de botones CTA (nunca para texto).
- **Do** conservar el blur del nav al hacer scroll — es el único glassmorphism funcional del sistema.
- **Do** limitar sombra/brillo a elementos que genuinamente flotan sobre la página (The One-Glow Rule).
- **Do** reemplazar cada emoji usado como icono funcional por los iconos de línea de `lucide-react` (la librería ya está instalada y en uso en `App.jsx`).
- **Do** cumplir contraste WCAG AA (texto ≥4.5:1, texto grande ≥3:1) en todo texto sobre fondo de color o degradado.

### Don't:
- **Don't** usar `background-clip: text` con degradado — presente hoy en el titular del hero, "Horarios" y "Sede Física". Sustituir por color sólido; el énfasis viene de peso/tamaño, no de arcoíris.
- **Don't** usar emoji como iconografía funcional — presente hoy en las stats del hero, tabs de categoría, tarjetas de contacto, iconos sociales del footer y todo el "chrome" del falso perfil de Instagram.
- **Don't** repetir círculos desenfocados ("blobs") detrás de cada tarjeta — presentes hoy en las tarjetas de Clases, el fondo de Horarios y el panel de Registro. Máximo un brillo por sección.
- **Don't** clonar la interfaz de Instagram (anillo de perfil, botón "Seguir", header de perfil) para mostrar videos propios — es una imitación, no una identidad. Diseñar un "detrás de cámaras" honesto, o insertar el embed real de Instagram si el objetivo es tráfico social.
- **Don't** dejar `<video>` apuntando a archivos que no existen en el repo (`/videos/*.MOV`, usado en el Hero, la sección Sede y todo el componente de Instalaciones) — hoy se ve como un recuadro negro roto en las tres secciones.
- **Don't** repetir la misma plantilla de tarjeta (icono + título + párrafo, mismo tamaño) sin diferenciar estructura — presente en la grid de 3 Clases; si sigue siendo una grid de 3, que al menos una destaque con jerarquía distinta.
