"use client";
import React, { useState } from "react";
import { juegosData } from "@/app/juegos";

export default function Page() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("Acción");

  const categorias = Array.from(new Set(juegosData.map((j) => j.categoria)));
  const juegosFiltrados = juegosData.filter(
    (juego) => juego.categoria === categoriaSeleccionada
  );

  const imagenCategoria = juegosFiltrados[0]?.imageSrc;

  return (
    <div>
      {/* Imagen superior de categoría */}
      <div
        className="categoria-banner"
        style={{ backgroundImage: `url(${imagenCategoria})` }}
      >
        <h2>{categoriaSeleccionada}</h2>
      </div>

      {/* Botones de categorías */}
      <div className="categorias">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`categoria-btn ${
              cat === categoriaSeleccionada ? "activa" : ""
            }`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tarjetas de juegos */}
      <div className="row">
        {juegosFiltrados.map((juego) => (
          <div key={juego.id} className="card" style={{ width: "18rem" }}>
            <img
              src={juego.imageSrc}
              className="card-img-top"
              alt={juego.title}
            />
            <div className="card-body">
              <h5 className="card-title">{juego.title}</h5>
              <p className="card-text text-muted">${juego.price.toFixed(2)}</p>
              <a href={juego.infoPage} className="btn btn-primary">
                Ver más
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
