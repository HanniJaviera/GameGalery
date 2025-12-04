"use client";

import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { Juego } from "@/app/juegos";

interface GameCardProps {
  juego: Juego;
}

const GameCard: React.FC<GameCardProps> = ({ juego }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        // PROTECCIÓN 1: Si no hay imagen, no se rompe
        src={juego.imageSrc || "/placeholder.jpg"}
        alt={juego.title || "Imagen del juego"}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        {/* PROTECCIÓN 2: Título por defecto */}
        <Card.Title as="h5">{juego.title || "Sin Título"}</Card.Title>

        <Card.Text as="h6" className="text-muted">
          {/* PROTECCIÓN 3 (CRÍTICA): Evita el crash si el precio es null */}
          USD {juego.price != null ? juego.price.toFixed(2) : "0.00"}
        </Card.Text>

        {/* PROTECCIÓN 4: Evita enlace roto */}
        <Link href={juego.infoPage || "#"} passHref legacyBehavior>
          <Button variant="primary" className="mt-auto">
            Ver más
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
