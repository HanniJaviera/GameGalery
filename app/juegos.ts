// 1. Definimos la interfaz (el "molde") con el nombre en español
export interface Juego {
  id: number;
  title: string;
  price: number;
  imageSrc: string; // Ruta de la imagen en /public
  infoPage: string; // Ruta interna de Next.js
  categoria: string; // categoría agregada
}

// 2. Lista completa de juegos con sus categorías
export const juegosData: Juego[] = [
  {
    id: 1,
    title: "DOOM",
    price: 59.99,
    imageSrc: "/doom.avif",
    infoPage: "/info/doom",
    categoria: "Shooter",
  },
  {
    id: 2,
    title: "Dead by Daylight",
    price: 12.6,
    imageSrc: "/dbd.jpg",
    infoPage: "/info/dbd",
    categoria: "Terror",
  },
  {
    id: 3,
    title: "Halo Infinite",
    price: 19.99,
    imageSrc: "/haloinfite.jpg",
    infoPage: "/info/halo",
    categoria: "Shooter",
  },
  {
    id: 4,
    title: "Peak",
    price: 4.6,
    imageSrc: "/peak.jpg",
    infoPage: "/info/peak",
    categoria: "Indie",
  },
  {
    id: 5,
    title: "Hollow Knight: SilkSong",
    price: 14.6,
    imageSrc: "/hollowknight.jpg",
    infoPage: "/info/hollowknight",
    categoria: "Aventura",
  },
  {
    id: 6,
    title: "Counter Strike 2",
    price: 15.23,
    imageSrc: "/counterstrike.jpg",
    infoPage: "/info/cs2",
    categoria: "Shooter",
  },
  {
    id: 7,
    title: "NBA 2K26",
    price: 73.54,
    imageSrc: "/NBA.jpg",
    infoPage: "/info/nba",
    categoria: "Deportes",
  },
  {
    id: 8,
    title: "METAL GEAR SOLID Δ: SNAKE EATER",
    price: 52.53,
    imageSrc: "/metalgear.jpg",
    infoPage: "/info/metalgear",
    categoria: "Acción",
  },
  {
    id: 9,
    title: "Bonderlands 4",
    price: 66.19,
    imageSrc: "/bonder.jpg",
    infoPage: "/info/borderlands",
    categoria: "Acción",
  },
  {
    id: 10,
    title: "Hell is US",
    price: 33.31,
    imageSrc: "/hellisus.jpg",
    infoPage: "/info/hellisus",
    categoria: "Acción",
  },
  {
    id: 11,
    title: "Dungeons of Eternity",
    price: 14.66,
    imageSrc: "/dungeions.jpg",
    infoPage: "/info/dungeons",
    categoria: "RPG",
  },
];
