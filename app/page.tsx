// app/page.tsx (COMPLETO)
"use client";
import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import HomeCarousel from "../components/HomeCarousel"; // Importa tu carrusel

// --- 1. COMPONENTE BANNER (con el video) ---
function Banner() {
  return (
    <Link href="/infoBorderlands" className="header-link">
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

// --- 2. COMPONENTE LISTA DE TARJETAS (COMPLETO) ---
function ProductCards() {
  return (
    <>
      {/* Tarjetas 1 */}
      <div className="primera-linea">
        <div className="row">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/doom.avif" alt="doom" />
            <Card.Body>
              <Card.Title>DOOM</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infoDoom" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/dbd.jpg" alt="Dead by Daylight" />
            <Card.Body>
              <Card.Title>Dead by Daylight</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infoDBD" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/haloinfite.jpg" alt="Halo Infinite" />
            <Card.Body>
              <Card.Title>Halo Infinite</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infoHalo" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/peak.jpg" alt="Peak" />
            <Card.Body>
              <Card.Title>Peak</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infoPeak" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Tarjetas 2 */}
      <div className="segunda-linea">
        <div className="row">
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="/hollowknight.jpg"
              alt="Hollow Knight"
            />
            <Card.Body>
              <Card.Title>Hollow Knight: SilkSong</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infohollowknight" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="/counterstrike.jpg"
              alt="Counter Strike"
            />
            <Card.Body>
              <Card.Title>Counter Strike 2</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infoCS" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/NBA.jpg" alt="NBA" />
            <Card.Body>
              <Card.Title>NBA 2K26</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infoNBA" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="/metalgear.jpg" alt="Metal Gear" />
            <Card.Body>
              <Card.Title>METAL GEAR SOLID Δ: SNAKE EATER</Card.Title>
              {/* CAMBIO AQUÍ */}
              <Link href="/infoMetal" passHref legacyBehavior>
                <Button variant="primary">Ver más</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
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
