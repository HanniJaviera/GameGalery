"use client";

import { useState, useEffect } from "react";
import GameCard from "@/components/GameCard";
import { Juego } from "@/app/juegos"; // Importamos la interfaz
import { Spinner, Alert } from "react-bootstrap";

export default function GameCategory() {
  const [todosLosJuegos, setTodosLosJuegos] = useState<Juego[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_PRODUCTS}/api/product`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Error al cargar juegos");

        const data = await response.json();
        setTodosLosJuegos(data);

        if (data.length > 0) {
          // AQUÍ ESTABA EL ERROR: Cambiamos 'any' por 'Juego'
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

  // ... (El resto del código sigue igual)

  const listaCategorias = Array.from(
    new Set(todosLosJuegos.map((j) => j.categoria || "Otros"))
  );

  const juegosAmostrar = todosLosJuegos.filter(
    (j) => (j.categoria || "Otros") === categoriaSeleccionada
  );

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
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
      <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
        {listaCategorias.map((catNombre) => {
          const juegoEjemplo = todosLosJuegos.find(
            (j) => (j.categoria || "Otros") === catNombre
          );
          const imagenMiniatura = juegoEjemplo?.imageSrc || "/placeholder.jpg";

          return (
            <div
              key={catNombre}
              className={`text-center border rounded p-2 shadow-sm cursor-pointer ${
                categoriaSeleccionada === catNombre
                  ? "border-primary bg-light"
                  : "border-light"
              }`}
              style={{
                width: "120px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => setCategoriaSeleccionada(catNombre)}
            >
              <div
                className="d-flex align-items-center justify-content-center mx-auto mb-2 rounded"
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundImage: `url(${imagenMiniatura})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#eee",
                }}
              />
              <p
                className="mb-0 fw-semibold text-capitalize"
                style={{ fontSize: "0.9rem" }}
              >
                {catNombre}
              </p>
            </div>
          );
        })}
      </div>

      <h3 className="mb-4 text-primary border-bottom pb-2 d-inline-block">
        {categoriaSeleccionada}
      </h3>

      <div className="row g-4">
        {juegosAmostrar.length > 0 ? (
          juegosAmostrar.map((juego) => (
            <div key={juego.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <GameCard juego={juego} />
            </div>
          ))
        ) : (
          <p className="text-muted">No hay juegos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}
