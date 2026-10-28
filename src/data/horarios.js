/* Horarios oficiales (actualizados por Jose el 2026-10-28).
   Una sola fuente para el inicio, las páginas de disciplinas y el formulario. */

export const BALLET = [
  { title: "Baby Ballet (3–5 años)", lines: ["Lun/Mié: 4:30–5:30 PM", "Mar/Jue: 3:30–4:30 PM", "Sáb: 9:30–11:00 AM"] },
  { title: "Pre-Ballet (6–9 años)", lines: ["Lun/Mié: 4:30–5:30 PM", "Mar/Jue: 3:30–4:30 PM", "Sáb: 9:30–11:00 AM"] },
  { title: "Ballet 1 (9–12 años)", lines: ["Lun/Mié: 5:00–6:00 PM"] },
  { title: "Ballet 2 (13–16 años)", lines: ["Mar/Jue: 4:30–5:30 PM"] },
  { title: "Ballet Adultos (17+ años)", lines: ["Martes: 6:00–7:30 PM"] },
];

export const HIP_HOP = [
  { title: "Hip Hop Kids (6–10 años)", lines: ["Mar/Jue: 4:30–5:30 PM"] },
  { title: "Hip Hop Teens (11–15 años)", lines: ["Mar/Jue: 5:30–6:30 PM"] },
  { title: "Hip Hop Adultos (16+ años)", lines: ["Mar/Jue: 6:30–7:30 PM"] },
];

export const HEELS = [
  { title: "Heels (16+ años)", lines: ["Miércoles: 7:00–8:30 PM"] },
];

export const JAZZ = [
  { title: "Jazz Teens (11–15 años)", lines: ["Lun/Mié: 5:00–6:00 PM"] },
  { title: "Jazz Adultos (16+ años)", lines: ["Lun/Mié: 6:00–7:00 PM"] },
];

export const CONTEMPORANEA = [
  { title: "Contemporánea Teens", lines: ["Mar/Jue: 6:30–7:30 PM"] },
  { title: "Contemporánea Adultos", lines: ["Jueves: 6:00–7:30 PM", "Sáb: 11:00 AM–12:30 PM"] },
];

// Teatro musical incluye canto, danza y teatro
export const TEATRO_MUSICAL = [
  { title: "Teatro Musical Kids (6–10 años)", lines: ["Mié: 4:30–5:30 PM canto · 5:30–6:30 PM danza", "Vie: 5:00–6:15 PM teatro"] },
  { title: "Teatro Musical Teens", lines: ["Mié: 5:00–6:00 PM danza · 6:00–7:00 PM canto", "Vie: 5:00–6:15 PM teatro"] },
  { title: "Teatro Musical Adultos", lines: ["Lun: 6:00–7:00 PM danza · 7:00–8:00 PM canto", "Vie: 6:15–7:30 PM teatro"] },
];

// El canto se da dentro de Teatro Musical
export const CANTO = [
  { title: "Canto · Teatro Musical Kids", lines: ["Miércoles: 4:30–5:30 PM"] },
  { title: "Canto · Teatro Musical Teens", lines: ["Miércoles: 6:00–7:00 PM"] },
  { title: "Canto · Teatro Musical Adultos", lines: ["Lunes: 7:00–8:00 PM"] },
];

export const GRUPOS = [
  { id: "ballet", label: "Ballet", color: "#ec1763", clases: BALLET },
  { id: "urbano", label: "Hip Hop y Heels", color: "#f37826", clases: [...HIP_HOP, ...HEELS] },
  { id: "jazz", label: "Jazz", color: "#cdd629", clases: JAZZ },
  { id: "contemporanea", label: "Danza Contemporánea", color: "#7c8fd4", clases: CONTEMPORANEA },
  { id: "teatro", label: "Teatro Musical (canto, danza y teatro)", color: "#5568A9", clases: TEATRO_MUSICAL },
];

export const OPCIONES_REGISTRO = [
  "Open Class Especial",
  ...[BALLET, HIP_HOP, HEELS, JAZZ, CONTEMPORANEA, TEATRO_MUSICAL].flat().map((c) => c.title),
];
