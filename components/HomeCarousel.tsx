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
          {/* Tu botón "btn-1" convertido a componente Button/Link */}
          <Button as={Link} href="/juegos" className="btn-1">
            {" "}
            Ver Productos
          </Button>
        </div>

        {/* Tu carrusel, traducido a react-bootstrap */}
        <div className="carousel-wrapper">
          <Carousel id="customCarousel" interval={5000}>
            <Carousel.Item>
              <Link href="/infohollowknight">
                {/* Ruta corregida a / (public) */}
                <Image
                  src="/hollowknight.jpg"
                  width={900}
                  height={500} // Asigna un tamaño (puedes ajustarlo)
                  alt="Juego 1"
                  className="d-block w-100"
                  priority // Carga esta imagen primero
                />
              </Link>
            </Carousel.Item>

            <Carousel.Item>
              <Link href="/">
                <Image
                  src="/hellisus.jpg"
                  width={900}
                  height={500}
                  alt="Juego 2"
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
                  alt="Juego 3"
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
