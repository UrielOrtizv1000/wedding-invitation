export interface WeddingImage {
  src: string;
  alt: string;
  objectPosition: string;
}

/**
 * Todas las fotografías centralizadas aquí. Para sustituirlas por las
 * definitivas basta con cambiar `src` (y ajustar `alt`/`objectPosition` si
 * cambia el encuadre) — nunca hay que tocar un componente.
 *
 * Placeholders: fotografías editoriales de Unsplash, licencia libre.
 */
function unsplash(id: string, w = 1600): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
}

export const heroImage: WeddingImage = {
  src: unsplash("1519741497674-611481863552", 2000),
  alt: "Novios abrazados a contraluz sujetando un ramo de flores blancas al atardecer",
  objectPosition: "center 35%",
};

export const coupleImage: WeddingImage = {
  src: unsplash("1550005809-91ad75fb315f"),
  alt: "Novios abrazados sosteniendo un ramo de rosas en tonos salvia y durazno",
  objectPosition: "center 30%",
};

export const storyImage: WeddingImage = {
  src: unsplash("1544078751-58fee2d8a03b"),
  alt: "Novios caminando abrazados por una playa de arena volcánica junto al mar",
  objectPosition: "center 40%",
};

export const ceremonyImage: WeddingImage = {
  src: unsplash("1523438885200-e635ba2c371e"),
  alt: "Kiosco clásico con columnas decorado con flores, listo para la ceremonia al aire libre",
  objectPosition: "center 30%",
};

export const receptionImage: WeddingImage = {
  src: unsplash("1519225421980-715cb0215aed"),
  alt: "Mesa larga de recepción vestida en blanco con centros de flores y servilletas azules",
  objectPosition: "center 45%",
};

export const dressCodeImage: WeddingImage = {
  src: unsplash("1509927083803-4bd519298ac4"),
  alt: "Zapatos de la novia y el novio uno junto al otro sobre un piso de madera",
  objectPosition: "center 60%",
};

export const footerImage: WeddingImage = {
  src: unsplash("1520854221256-17451cc331bf"),
  alt: "Manos de los novios a punto de entrelazarse, proyectando una sombra sobre el pasto",
  objectPosition: "center 40%",
};

export const galleryImages: WeddingImage[] = [
  {
    src: unsplash("1519741497674-611481863552"),
    alt: "Novios abrazados a contraluz sujetando un ramo de flores blancas al atardecer",
    objectPosition: "center 35%",
  },
  {
    src: unsplash("1522673607200-164d1b6ce486"),
    alt: "Dos sillas decoradas con flores frente a un cuerpo de agua, listas para la ceremonia",
    objectPosition: "center 55%",
  },
  {
    src: unsplash("1583939003579-730e3918a45a"),
    alt: "Novios besándose mientras los invitados lanzan pétalos blancos",
    objectPosition: "center 35%",
  },
  {
    src: unsplash("1523438885200-e635ba2c371e"),
    alt: "Kiosco clásico con columnas decorado con flores, listo para la ceremonia al aire libre",
    objectPosition: "center 30%",
  },
  {
    src: unsplash("1519225421980-715cb0215aed"),
    alt: "Mesa larga de recepción vestida en blanco con centros de flores y servilletas azules",
    objectPosition: "center 45%",
  },
  {
    src: unsplash("1591604466107-ec97de577aff"),
    alt: "Novios sonriendo junto a un lago rodeado de árboles, ella con ramo de flores",
    objectPosition: "center 35%",
  },
  {
    src: unsplash("1465495976277-4387d4b0b4c6"),
    alt: "Manos entrelazadas de los novios sobre un ramo de rosas y peonías con anillos",
    objectPosition: "center 40%",
  },
  {
    src: unsplash("1544078751-58fee2d8a03b"),
    alt: "Novios caminando abrazados por una playa de arena volcánica junto al mar",
    objectPosition: "center 40%",
  },
];
