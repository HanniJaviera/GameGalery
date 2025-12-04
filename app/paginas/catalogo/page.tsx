"use client";
import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import GameCard from "../../../components/GameCard";
import { Juego } from "@/app/juegos";

export default function CatalogoPage() {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {

        const url = `${process.env.NEXT_PUBLIC_API_PRODUCTS}/api/productos`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }

        const data = await response.json();

        setJuegos(data);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema cargando el catálogo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading)
    return (
      <Container style={{ paddingTop: "100px", textAlign: "center" }}>
        <Spinner animation="border" variant="light" />
        <h3 className="text-white mt-3">Cargando...</h3>
      </Container>
    );

  if (error)
    return (
      <Container style={{ paddingTop: "100px" }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container style={{ paddingTop: "80px" }}>
      <h1 className="text-center my-4 text-white">Catálogo de Juegos</h1>
      <Row className="justify-content-center g-4">
        {juegos.length > 0 ? (
          juegos.map((juego) => (
            <Col lg={3} md={4} sm={6} xs={12} key={juego.id}>
              <GameCard juego={juego} />
            </Col>
          ))
        ) : (
          <div className="text-white text-center">
            No hay productos disponibles.
          </div>
        )}
      </Row>
    </Container>
  );
}
