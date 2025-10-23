// components/HomeCarousel.tsx
"use client"; // ¡Importante! El carrusel es interactivo

import { Carousel, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function HomeCarousel() {
  return (
    <div className="main-container">
      <div className="row">
        {/* Tu sección de texto */}
        <div className="text-content">
          <h3>¡Destacados de la semana!</h3>
          <p>
            Descubre los juegos más populares y mejor calificados por nuestra
            comunidad. No te pierdas las últimas novedades en la galería.
          </p>

          {/* Botón/Link corregido */}
          <Link href="/juegos" legacyBehavior passHref>
            <Button className="btn-1">Ver Productos</Button>
          </Link>
        </div>

        {/* Tu carrusel */}
        <div className="carousel-wrapper">
          <Carousel id="customCarousel" interval={5000}>
            <Carousel.Item>
              <Link href="/infohollowknight">
                <Image
                  src="/hollowknight.jpg"
                  width={900}
                  height={500}
                  alt="Hollow Knight - Destacado" // Alt descriptivo
                  className="d-block w-100"
                  priority
                />
              </Link>
            </Carousel.Item>

            <Carousel.Item>
              <Link href="/">
                <Image
                  src="/hellisus.jpg"
                  width={900}
                  height={500}
                  alt="Hell is Us - Destacado"
                  className="d-block w-100"
                />
              </Link>
            </Carousel.Item>

            <Carousel.Item>
              <Link href="/infodungeons">
                <Image
                  src="/dungeions.jpg"
                  width={900}
                  height={500}
                  alt="Dungeons and Dragons - Destacado"
                  className="d-block w-100"
                />
              </Link>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
