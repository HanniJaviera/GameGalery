"use client";
import GameCard from "../../../components/GameCard";
import { juegosData } from "../../juegos";
import { Container, Row, Col } from "react-bootstrap";

export default function CatalogoPage() {
  return (
    <Container style={{ paddingTop: "80px" }}>
      <h1 className="text-center my-4 white">Catálogo de Juegos</h1>
      <Row className="justify-content-center g-4">
        {juegosData.map((juego) => (
          <Col lg={3} md={4} sm={6} xs={12} key={juego.id}>
            <GameCard juego={juego} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
