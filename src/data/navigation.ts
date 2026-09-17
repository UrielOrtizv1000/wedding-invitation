export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "inicio", label: "Inicio" },
  { id: "historia", label: "Historia" },
  { id: "detalles", label: "Detalles" },
  { id: "galeria", label: "Galería" },
  { id: "rsvp", label: "RSVP" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
