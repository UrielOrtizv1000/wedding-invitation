import type { WeddingData } from "./types";

/**
 * Fuente única de verdad. Ningún componente debe escribir nombres, fechas o
 * lugares literalmente — todo se lee de aquí.
 */
export const wedding: WeddingData = {
  brideName: "Sofía",
  groomName: "Alejandro",
  coupleHashtag: "#SofíaYAlejandro2026",
  weddingDate: "2026-11-14T17:00:00-06:00",
  rsvpDeadline: "2026-10-15",
  city: "Aguascalientes, México",

  welcomeQuote: "Hay momentos que se viven una vez, pero permanecen para siempre.",
  welcomeText:
    "Después de compartir tantos momentos juntos, queremos celebrar el comienzo de una nueva etapa rodeados de las personas que forman parte de nuestra historia.",
  welcomeClosing: "Nos encantará compartir este día contigo.",

  ceremony: {
    name: "Templo de San Antonio",
    address: "Jardín de San Marcos s/n, Centro",
    city: "Aguascalientes, México",
    time: "5:00 PM",
    mapsUrl: "https://maps.google.com/?q=Templo+de+San+Antonio+Aguascalientes",
  },
  reception: {
    name: "Hacienda Los Olivos",
    address: "Carretera a San Francisco de los Romo km 8",
    city: "Aguascalientes, México",
    time: "7:00 PM",
    mapsUrl: "https://maps.google.com/?q=Hacienda+Los+Olivos+Aguascalientes",
  },

  story: {
    heading: "Nuestra historia",
    text: "Dos caminos que se cruzaron sin planearlo y que, con el tiempo, aprendieron a andar juntos. Esta es la versión corta de una historia que seguimos escribiendo cada día.",
    timeline: [
      {
        year: "2019",
        title: "Nos conocimos",
        description: "Una presentación casual que terminó en una conversación de horas.",
      },
      {
        year: "2021",
        title: "Nuestra primera aventura",
        description: "El primer viaje juntos confirmó lo que ya sospechábamos.",
      },
      {
        year: "2025",
        title: "Dijimos sí",
        description: "Una propuesta íntima, rodeados de las personas que más queremos.",
      },
      {
        year: "2026",
        title: "Nuestra boda",
        description: "El día en que celebramos todo lo vivido y lo que sigue.",
      },
    ],
  },

  itinerary: [
    { time: "5:00 PM", title: "Ceremonia", icon: "rings" },
    { time: "6:30 PM", title: "Cóctel", icon: "cocktail" },
    { time: "7:30 PM", title: "Cena", icon: "utensils" },
    { time: "9:00 PM", title: "Primer baile", icon: "music" },
    { time: "9:30 PM", title: "Fiesta", icon: "party" },
  ],

  dressCode: {
    level: "Formal / Etiqueta",
    description:
      "Queremos que la noche se sienta tan cuidada como se ve. Te pedimos vestir formal, con libertad para interpretarlo a tu estilo.",
    guidelines: [
      {
        audience: "Caballeros",
        points: ["Traje oscuro o smoking", "Camisa de vestir", "Corbata o moño opcional"],
      },
      {
        audience: "Damas",
        points: ["Vestido largo o midi formal", "Evitar blanco, ivory y tonos muy claros", "Calzado cómodo para jardín"],
      },
    ],
    suggestedColors: ["Verde salvia", "Champagne", "Terracota", "Azul noche", "Burdeos"],
    considerations: [
      "La ceremonia y la recepción son en espacios abiertos; considera el calzado.",
      "Por la noche baja la temperatura, un abrigo ligero es buena idea.",
    ],
  },

  giftRegistry: {
    intro:
      "Tu presencia es nuestro mejor regalo. Si además deseas tener un detalle con nosotros, hemos preparado estas opciones.",
    options: [
      {
        id: "liverpool",
        label: "Liverpool",
        description: "Mesa de regalos con número de evento.",
        href: "https://www.liverpool.com.mx/tienda/mesaderegalos",
      },
      {
        id: "amazon",
        label: "Amazon",
        description: "Lista de regalos disponible en línea.",
        href: "https://www.amazon.com.mx",
      },
      {
        id: "bank",
        label: "Datos bancarios",
        description: "Si prefieres un detalle en efectivo.",
      },
    ],
  },

  bankDetails: {
    bankName: "BBVA México",
    accountHolder: "Sofía y Alejandro",
    clabe: "012180001234567895",
    accountNumber: "0123456789",
  },

  guestInformation: [
    {
      id: "hospedaje",
      title: "Hospedaje",
      summary: "Hoteles recomendados cerca de la recepción.",
      details: [
        "Hotel Fiesta Americana — 10 min de la Hacienda, tarifa preferencial con el código BODA2026.",
        "Hotel Francia — opción céntrica, 20 min de la recepción.",
        "Se recomienda reservar antes de octubre por disponibilidad limitada.",
      ],
    },
    {
      id: "transporte",
      title: "Transporte",
      summary: "Cómo llegar y opciones de traslado.",
      details: [
        "Habrá transporte disponible desde el Hotel Fiesta Americana a las 4:15 PM.",
        "Estacionamiento gratuito y con vigilancia en la Hacienda.",
        "El regreso al hotel sede sale a las 12:30 AM y 1:30 AM.",
      ],
    },
    {
      id: "informacion",
      title: "Información importante",
      summary: "Detalles que te ayudarán a planear tu día.",
      details: [
        "El evento es al aire libre; por la noche la temperatura baja considerablemente.",
        "Por espacio, el evento es para adultos.",
        "Cualquier duda, contáctanos directamente por WhatsApp.",
      ],
    },
  ],

  socialLinks: [
    { id: "instagram", label: "Instagram", href: "https://instagram.com" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/5210000000000" },
  ],
};
