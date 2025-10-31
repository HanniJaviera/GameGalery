"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { juegosData, Juego } from "../../../juegos";
import GameCard from "../../../../components/GameCard";

export default function JuegoDetallePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const juego: Juego | undefined = juegosData.find(
    (j) => j.infoPage === `/paginas/info/${slug}`
  );

  const [mainImage, setMainImage] = useState(juego?.imageSrc);

  useEffect(() => {
    if (juego) {
      setMainImage(juego.imageSrc);
    }
  }, [juego]);

  const handleImageClick = (newSrc: string) => {
    setMainImage(newSrc);
  };

  // --- FUNCIÓN DE LOCALSTORAGE ---
  const handleAddToCart = (juego: Juego) => {
    // 1. Obtenemos el carrito actual de localStorage
    const carritoActual = JSON.parse(localStorage.getItem("carrito") || "[]");

    // 2. Buscamos si el juego ya existe
    const productoExistente = carritoActual.find(
      (p: Juego) => p.id === juego.id
    );

    if (productoExistente) {
      // 3. Si existe, incrementamos la cantidad
      productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
      // 4. Si no existe, lo añadimos con cantidad 1
      carritoActual.push({ ...juego, cantidad: 1 });
    }

    // 5. Guardamos el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    // 6. Opcional: Actualizamos el contador del Navbar
    window.dispatchEvent(new Event("storage"));

    // 7. Redirigimos al carrito
    router.push("/paginas/carrito");
  };
  // --- FIN DE LA FUNCIÓN DE LOCALSTORAGE ---

  if (!juego) {
    return (
      <Container style={{ paddingTop: "100px", color: "white" }}>
        <h2>Juego no encontrado</h2>
        <p>No se pudo encontrar el juego en la ruta: /paginas/info/{slug}</p>
        <Link href="/paginas/catalogo">Volver al catálogo</Link>
      </Container>
    );
  }

  const relatedGames = juegosData.filter((j) => j.id !== juego.id).slice(0, 4);

  return (
    <>
      <Container className="juego-detail-container">
        <Row>
          <Col md={7}>
            <Image
              src={mainImage || "/placeholder.jpg"}
              alt={juego.title}
              width={700}
              height={400}
              className="main-image"
              priority
            />
          </Col>
          <Col md={5} className="text-content-juego">
            <h2>{juego.title}</h2>
            <p>{juego.description}</p>
            <div className="btn-and-price">
              <Button
                className="btnAñadir"
                onClick={() => handleAddToCart(juego)}
              >
                Añadir al carro
              </Button>
              <span className="price">USD {juego.price.toFixed(2)}</span>
            </div>
            <div className="image-gallery">
              {juego.gallery.map((imgSrc, index) => (
                <Image
                  key={index}
                  src={imgSrc}
                  alt={`Galería ${juego.title} ${index + 1}`}
                  width={100}
                  height={75}
                  className="gallery-thumbnail"
                  onClick={() => handleImageClick(imgSrc)}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="related-games-container">
        <h2 className="text-center text-white mb-4">
          También te puede interesar
        </h2>
        <Row className="flex-nowrap overflow-auto g-4 horizontal-scroll-row">
          {relatedGames.map((relatedJuego) => (
            <Col xs={10} sm={6} md={4} lg={3} key={relatedJuego.id}>
              <GameCard juego={relatedJuego} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
