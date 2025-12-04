"use client";

import { Container } from "react-bootstrap";
import GameCategory from "@/components/GameCategory";

export default function CategoriaPage() {
  return (
    <Container style={{ paddingTop: "100px", minHeight: "100vh" }}>
      <div className="text-center mb-5">
        <h1 className="text-white fw-bold display-4">Explora por Categoría</h1>
        <p className="text-white-50 lead">
          Filtra nuestra colección completa desde la base de datos
        </p>
      </div>

      <GameCategory />
    </Container>
  );
}
