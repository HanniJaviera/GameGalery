"use client";
import Link from "next/link";
import HomeCarousel from "../components/HomeCarousel"; // Importa tu carrusel
import GameCard from "../components/GameCard"; // 1. IMPORTAMOS EL GAMECARD
import { juegosData } from "../app/juegos"; // 2. IMPORTAMOS LOS DATOS

// --- 1. COMPONENTE BANNER (sin cambios) ---
function Banner() {
  return (
    <Link href="/info/borderlands" className="header-link">
      {" "}
      {/* Ruta actualizada */}
      <header className="header">
        <video autoPlay muted loop className="video-background">
          {/* Asegúrate que este video esté en /public/videoheader.webm */}
          <source src="/videoheader.webm" type="video/webm" />
          Tu navegador no soporta el video.
        </video>
      </header>
    </Link>
  );
}

// --- 2. COMPONENTE LISTA DE TARJETAS (REFACTORIZADO) ---
function ProductCards() {
  // 3. Tomamos solo los primeros 8 juegos para la página de inicio
  const featuredGames = juegosData.slice(0, 8);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Juegos Destacados</h2>
      <div className="row">
        {/* 4. Mapeamos los juegos y creamos una GameCard para cada uno */}
        {featuredGames.map((juegos) => (
          <GameCard key={juegos.id} juego={juegos} />
        ))}
      </div>
    </div>
  );
}

// --- PÁGINA PRINCIPAL (Home) ---
export default function Home() {
  return (
    <>
      <Banner />
      <HomeCarousel />
      <ProductCards />
    </>
  );
}
