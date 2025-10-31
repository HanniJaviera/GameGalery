"use client";
import Link from "next/link";
import { Container, Row } from "react-bootstrap";
import HomeCarousel from "../components/HomeCarousel";
import GameCard from "../components/GameCard";
import { juegosData } from "../app/juegos";

function Banner() {
  return (
    <Link href="/info/borderlands" className="header-link">
      {" "}
      <header className="header">
        <video autoPlay muted loop className="video-background">
          <source src="/videoheader.webm" type="video/webm" />
          Tu navegador no soporta el video.
        </video>
      </header>
    </Link>
  );
}

function ProductCards() {
  const featuredGames = juegosData.slice(0, 8);

  return (
    <Container className="my-5 pt-5">
      <h2 className="mb-4 text-center text-white">Juegos Destacados</h2> 
      <Row className="justify-content-center g-4">
        {featuredGames.map((juego) => (
          <div key={juego.id} className="col-lg-3 col-md-4 col-sm-6">
            <GameCard juego={juego} />
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default function Home() {
  return (
    <>
      <Banner />
      <HomeCarousel />
      <ProductCards />
    </>
  );
}
