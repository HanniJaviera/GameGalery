"use client";

import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { Juego } from "@/app/juegos";

interface GameCardProps {
  juego: Juego;
}

const GameCard: React.FC<GameCardProps> = ({ juego }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={juego.imageSrc}
          alt={juego.title}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title as="h5">{juego.title}</Card.Title>
          <Card.Text as="h6" className="text-muted">
            USD {juego.price.toFixed(2)}
          </Card.Text>

          {/* CORRECCIÓN: 
            Asegúrate de que no haya NADA (ni espacios, ni saltos de línea,
            ni comentarios) entre el <Link> y el <Button>.
          */}
          <Link href={juego.infoPage} passHref legacyBehavior>
            <Button variant="primary" className="mt-auto">
              Ver más
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameCard;
