"use client";

import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { Juego } from "@/app/juegos";

interface GameCardProps {
  juego: Juego;
}

const GameCard: React.FC<GameCardProps> = ({ juego }) => {
  return (
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

        <Link href={juego.infoPage} passHref legacyBehavior>
          <Button variant="primary" className="mt-auto">
            Ver más
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
