// 1. Definimos la interfaz (el "molde") con el nombre en español
export interface Juego {
  id: number;
  title: string;
  price: number;
  imageSrc: string; // Ruta de la imagen en /public
  infoPage: string; // Ruta interna de Next.js
}

// 2. Creamos la lista de juegos (asegúrate que las rutas de imagen sean correctas)
// (Usé los datos y rutas que me pasaste)
export const juegosData: Juego[] = [
  {
    id: 1,
    title: "DOOM",
    price: 59.99,
    imageSrc: "/doom.avif",
    infoPage: "/info/doom",
  },
  {
    id: 2,
    title: "Dead by Daylight",
    price: 12.6,
    imageSrc: "/dbd.jpg",
    infoPage: "/info/dbd",
  },
  {
    id: 3,
    title: "Halo Infinite",
    price: 19.99,
    imageSrc: "/haloinfite.jpg",
    infoPage: "/info/halo",
  },
  {
    id: 4,
    title: "Peak",
    price: 4.6,
    imageSrc: "/peak.jpg",
    infoPage: "/info/peak",
  },
  {
    id: 5,
    title: "Hollow Knight: SilkSong",
    price: 14.6,
    imageSrc: "/hollowknight.jpg",
    infoPage: "/info/hollowknight",
  },
  {
    id: 6,
    title: "Counter Strike 2",
    price: 15.23,
    imageSrc: "/counterstrike.jpg",
    infoPage: "/info/cs2",
  },
  {
    id: 7,
    title: "NBA 2K26",
    price: 73.54,
    imageSrc: "/NBA.jpg", // Asumí que las rutas que tenías están bien
    infoPage: "/info/nba",
  },
  {
    id: 8,
    title: "METAL GEAR SOLID Δ: SNAKE EATER",
    price: 52.53,
    imageSrc: "/metalgear.jpg",
    infoPage: "/info/metalgear",
  },
  {
    id: 9,
    title: "Bonderlands 4",
    price: 66.19,
    imageSrc: "/bonder.jpg",
    infoPage: "/info/borderlands",
  },
  {
    id: 10,
    title: "Hell is US",
    price: 33.31,
    imageSrc: "/hellisus.jpg",
    infoPage: "/info/hellisus",
  },
  {
    id: 11,
    title: "Dungeons of Eternity",
    price: 14.66,
    imageSrc: "/dungeions.jpg",
    infoPage: "/info/dungeons",
  },
];
