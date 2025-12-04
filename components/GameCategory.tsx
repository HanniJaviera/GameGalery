"use client";

import { useState, useEffect } from "react";
import GameCard from "@/components/GameCard";
import { Juego } from "@/app/juegos"; // Importamos la interfaz
import { Spinner, Alert } from "react-bootstrap";

export default function GameCategory() {
  // 1. Estados para datos, carga y selección
  const [todosLosJuegos, setTodosLosJuegos] = useState<Juego[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch de datos al montar el componente
  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_PRODUCTS}/api/product`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Error al cargar juegos");

        const data = await response.json();
        setTodosLosJuegos(data);

        // Seleccionamos la primera categoría disponible por defecto
        if (data.length > 0) {
          const primera = data.some((j: Juego) => j.categoria === "Acción")
            ? "Acción"
            : data[0].categoria || "General";
          setCategoriaSeleccionada(primera);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las categorías.");
      } finally {
        setLoading(false);
      }
    };

    fetchJuegos();
  }, []);

  // 3. Extraer categorías únicas dinámicamente
  const listaCategorias = Array.from(
    new Set(todosLosJuegos.map((j) => j.categoria || "Otros"))
  );

  // 4. Filtrar los juegos según la selección
  const juegosAmostrar = todosLosJuegos.filter(
    (j) => (j.categoria || "Otros") === categoriaSeleccionada
  );

  // --- RENDERIZADO ---

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="light" />
      </div>
    );
  if (error)
    return (
      <Alert variant="danger" className="m-4">
        {error}
      </Alert>
    );

  return (
    <div className="container py-4">
      {/* === SECCIÓN DE CATEGORÍAS (BOTONES SIMPLES) === */}
      {/* Volvemos al diseño original de botones claros */}
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
        {listaCategorias.map((catNombre) => (
          <button
            key={catNombre}
            // Usamos clases de Bootstrap para botones sólidos o de contorno
            className={`btn px-4 py-2 fw-bold ${
              categoriaSeleccionada === catNombre
                ? "btn-primary" // Botón azul sólido si está activo
                : "btn-outline-light" // Botón con borde claro si no está activo (para fondo oscuro)
            }`}
            onClick={() => setCategoriaSeleccionada(catNombre)}
          >
            {catNombre}
          </button>
        ))}
      </div>

      {/* TÍTULO DE LA SECCIÓN SELECCIONADA */}
      <h3 className="mb-4 text-white border-bottom border-light pb-2 d-inline-block">
        {categoriaSeleccionada}
      </h3>

      {/* GRILLA DE JUEGOS */}
      <div className="row g-4">
        {juegosAmostrar.length > 0 ? (
          juegosAmostrar.map((juego) => (
            <div key={juego.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <GameCard juego={juego} />
            </div>
          ))
        ) : (
          <p className="text-white-50">No hay juegos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
