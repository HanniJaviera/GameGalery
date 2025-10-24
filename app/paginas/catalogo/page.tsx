"use client";
// Importamos los componentes que necesitamos
import GameCard from "../../../components/GameCard";
import { juegosData } from "../../juegos";
import { Container, Row, Col } from "react-bootstrap";

export default function CatalogoPage() {
  return (
    // Usamos un Container de Bootstrap y le damos padding superior
    // para que no quede pegado al Navbar fijo
    <Container style={{ paddingTop: "80px" }}>
      <h1 className="text-center my-4 white">Catálogo de Juegos</h1>

      {/* ¡CAMBIOS AQUÍ! */}
      {/* 1. Usamos "justify-content-center" para centrar las tarjetas */}
      {/* 2. Usamos "g-4" (gap) para aplicar el espaciado de 20px que querías */}
      <Row className="justify-content-center g-4">
        {/* 3. Mapeamos (recorremos) la lista de juegos */}
        {juegosData.map((juego) => (
          // 4. Cada tarjeta es una Columna.
          // Quitamos "mb-4" porque "g-4" en el Row ya maneja el espaciado vertical
          <Col lg={3} md={4} sm={6} xs={12} key={juego.id}>
            <GameCard juego={juego} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
