export interface Juego {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
  infoPage: string;
  categoria: string;
  description: string;
  gallery: string[];
}

export const juegosData: Juego[] = [
  {
    id: 1,
    title: "DOOM",
    price: 59.99,
    imageSrc: "/doom.avif",
    infoPage: "/paginas/info/doom",
    categoria: "Shooter",
    description:
      "Lucha contra hordas de demonios en este shooter en primera persona aclamado por la crítica. Velocidad, armas brutales y un combate intenso te esperan.",
    gallery: ["/doom1.jpg", "/doom2.jpg", "/doom3.jpg", "/doom4.jpg"],
  },
  // --- Juego 2: Dead by Daylight ---
  {
    id: 2,
    title: "Dead by Daylight",
    price: 12.6,
    imageSrc: "/dbd.jpg",
    infoPage: "/paginas/info/dbd",
    categoria: "Terror",
    description:
      "Un juego de terror multijugador 4 contra 1 donde un jugador asume el rol de un asesino salvaje, y los otros cuatro juegan como supervivientes.",
    gallery: ["/dbd1.jpg", "/dbd2.jpg", "/dbd3.jpg", "/dbd4.jpg"],
  },
  // --- Juego 3: Halo Infinite ---
  {
    id: 3,
    title: "Halo Infinite",
    price: 19.99,
    imageSrc: "/haloinfite.jpg",
    infoPage: "/paginas/info/halo",
    categoria: "Shooter",
    description:
      "El Jefe Maestro regresa en la campaña de Halo más expansiva hasta la fecha. Explora el anillo de Zeta Halo y enfréntate a los Desterrados.",
    gallery: ["/halo1.jpg", "/halo2.jpg", "/halo3.jpg", "/halo4.jpg"],
  },
  // --- Juego 4: Peak ---
  {
    id: 4,
    title: "Peak",
    price: 4.6,
    imageSrc: "/peak.jpg",
    infoPage: "/paginas/info/peak",
    categoria: "Indie",
    description:
      "Un juego indie de plataformas y puzzles con un estilo visual único. Supera desafíos ingeniosos y descubre una historia emotiva.",
    gallery: ["/peak1.jpg", "/peak2.jpg", "/peak3.jpg", "/peak4.jpg"],
  },
  // --- Juego 5: Hollow Knight: SilkSong ---
  {
    id: 5,
    title: "Hollow Knight: SilkSong",
    price: 14.6,
    imageSrc: "/hollowknight.jpg",
    infoPage: "/paginas/info/hollowknight",
    categoria: "Aventura",
    description:
      "Juega como Hornet, princesa protectora de Hallownest, y explora un reino completamente nuevo acechado por la seda y la canción.",
    gallery: ["/hollow1.jpg", "/hollow2.jpg", "/hollow4.jpg"],
  },
  // --- Juego 6: Counter Strike 2 ---
  {
    id: 6,
    title: "Counter Strike 2",
    price: 15.23,
    imageSrc: "/counterstrike.jpg",
    infoPage: "/paginas/info/cs2",
    categoria: "Shooter",
    description:
      "La siguiente evolución del shooter táctico en primera persona. CS2 introduce nuevos mapas, físicas realistas y un motor gráfico actualizado.",
    gallery: [
      "/cs1.jpg",
      "/cs2.jpg", // La ruta aquí tenía un error, la corregí
      "/cs3.jpg",
      "/cs4.jpg",
    ],
  },
  // --- Juego 7: NBA 2K26 ---
  {
    id: 7,
    title: "NBA 2K26",
    price: 73.54,
    imageSrc: "/NBA.jpg",
    infoPage: "/paginas/info/nba",
    categoria: "Deportes",
    description:
      "Vive el sueño de la NBA con gráficos hiperrealistas, físicas mejoradas y todos tus equipos y jugadores favoritos actualizados.",
    gallery: ["/NBA1.jpg", "/NBA2.jpg", "/NBA3.jpg", "/NBA4.jpg"],
  },
  // --- Juego 8: METAL GEAR SOLID Δ ---
  {
    id: 8,
    title: "METAL GEAR SOLID Δ: SNAKE EATER",
    price: 52.53,
    imageSrc: "/metalgear.jpg",
    infoPage: "/paginas/info/metalgear",
    categoria: "Acción",
    description:
      "Revive la legendaria misión de Naked Snake en este remake de Metal Gear Solid 3. Gráficos de última generación y sigilo táctico en la jungla.",
    gallery: [
      "/metalgear1.jpg",
      "/metalgear2.jpg",
      "/metalgear3.jpg",
      "/metalgear4.jpg",
    ],
  },
  // --- Juego 9: Borderlands 4 ---
  {
    id: 9,
    title: "Borderlands 4",
    price: 66.19,
    imageSrc: "/bonder.jpg",
    infoPage: "/paginas/info/borderlands",
    categoria: "Acción",
    description:
      "Borderlands 4 es un shooter de botín cargado de caos, repleto de miles de millones de armas, enemigos letales y una intensa acción cooperativa.",
    gallery: [
      "/bonderlands1.jpg",
      "/bonderlands2.jpg",
      "/bonderlands3.jpg",
      "/bonderlands4.jpg",
    ],
  },
  // --- Juego 10: Hell is US ---
  {
    id: 10,
    title: "Hell is US",
    price: 33.31,
    imageSrc: "/hellisus.jpg",
    infoPage: "/paginas/info/hellisus",
    categoria: "Acción",
    description:
      "Una misteriosa calamidad ha desatado criaturas de otro mundo. Explora una ciudad aislada en este juego de acción y aventura en tercera persona.",
    gallery: ["/hell1.jpg", "/hell2.jpg", "/hell3.jpg", "/hell4.jpg"],
  },
  // --- Juego 11: Dungeons of Eternity ---
  {
    id: 11,
    title: "Dungeons of Eternity",
    price: 14.66,
    imageSrc: "/dungeions.jpg",
    infoPage: "/paginas/info/dungeons",
    categoria: "RPG",
    description:
      "Adéntrate en mazmorras generadas proceduralmente en este RPG de acción. Lucha contra monstruos, recoge botín y mejora a tu héroe.",
    gallery: [
      "/dungeons1.jpg",
      "/dungeons2.jpg",
      "/dungeons3.jpg",
      "/dungeons4.jpg",
    ],
  },
];
