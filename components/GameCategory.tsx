"use client";

import { useState } from "react";
import GameCard from "@/components/GameCard";
import { Juego, juegosData } from "@/app/juegos";

interface GameCategoryProps {
  categorias: { id: number; nombre: string }[];
}

export default function GameCategory({ categorias }: GameCategoryProps) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(1);

  const juegos: { [key: number]: Juego[] } = {
    1: juegosData.slice(0, 3), // Acción
    2: juegosData.slice(3, 6), // Aventura
    3: juegosData.slice(6, 9), // Deportes
    4: juegosData.slice(9, 11), // Estrategia
  };

  return (
    <div className="container py-4">
      {/* CATEGORÍAS */}
      <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className={`text-center border rounded p-2 shadow-sm cursor-pointer ${
              categoriaSeleccionada === cat.id
                ? "border-primary"
                : "border-light"
            }`}
            style={{ width: "120px" }}
            onClick={() => setCategoriaSeleccionada(cat.id)}
          >
            <div
              className="bg-light d-flex align-items-center justify-content-center"
              style={{ width: "100px", height: "100px" }}
            >
              100 × 100
            </div>
            <p className="mt-2 fw-semibold">{cat.nombre}</p>
          </div>
        ))}
      </div>

      {/* JUEGOS */}
      <h3 className="mb-4">
        {categorias.find((c) => c.id === categoriaSeleccionada)?.nombre}
      </h3>

      <div className="row">
        {juegos[categoriaSeleccionada].map((juego) => (
          <GameCard key={juego.id} juego={juego} />
        ))}
      </div>
    </div>
  );
}
