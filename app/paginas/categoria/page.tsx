"use client";
import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Row, Col } from "react-bootstrap";
// Importamos solo la Interfaz, ya no los datos fijos
import { Juego } from "@/app/juegos"; 

export default function Page() {
  // 1. Estados para manejar los datos del Backend
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para la selección (iniciamos vacío hasta que carguen los datos)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("");

  // 2. useEffect para traer los datos al cargar la página
  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_PRODUCTS}/api/product`; // Ojo: /product (singular)
        const response = await fetch(url);

        if (!response.ok) throw new Error("Error al cargar juegos");
        
        const data = await response.json();
        setJuegos(data);

        // Lógica inteligente: Si hay datos, seleccionar la primera categoría disponible por defecto
        if (data.length > 0) {
          // Buscamos si existe "Acción", si no, tomamos la primera que encuentre
          const primeraCat = data.some((j: any) => j.categoria === "Acción") 
            ? "Acción" 
            : data[0].categoria;
          setCategoriaSeleccionada(primeraCat);
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

  // 3. Calculamos las categorías dinámicamente basándonos en los datos de Railway
  const categorias = Array.from(new Set(juegos.map((j) => j.categoria || "General")));
  
  // 4. Filtramos
  const juegosFiltrados = juegos.filter(
    (juego) => (juego.categoria || "General") === categoriaSeleccionada
  );

  // Imagen de fondo (Protegida contra nulos)
  const imagenCategoria = juegosFiltrados[0]?.imageSrc || "/placeholder.jpg";

  // --- RENDERIZADO ---

  if (loading) {
    return (
      <Container style={{ paddingTop: "100px", textAlign: "center" }}>
        <Spinner animation="border" variant="light" />
        <h3 className="text-white mt-3">Cargando categorías...</h3>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ paddingTop: "100px" }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Banner Dinámico */}
      <div
        className="categoria-banner"
        style={{ 
          backgroundImage: `url(${imagenCategoria})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem 0',
          textAlign: 'center',
          color: 'white',
          marginBottom: '2rem'
        }}
      >
        <h2 style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)', fontSize: '3rem' }}>
          {categoriaSeleccionada}
        </h2>
      </div>

      {/* Botones de Filtro */}
      <Container className="mb-4">
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`btn ${cat === categoriaSeleccionada ? "btn-primary" : "btn-outline-light"}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </Container>

      {/* Listado de Tarjetas */}
      <Container>
        <Row className="g-4 justify-content-center">
          {juegosFiltrados.map((juego) => (
            <Col key={juego.id} xs={12} sm={6} md={4} lg={3}>
              <div className="card h-100 shadow-sm">
                <img
                  src={juego.imageSrc || "/placeholder.jpg"}
                  className="card-img-top"
                  alt={juego.title || "Juego"}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{juego.title}</h5>
                  <p className="card-text text-muted">
                    USD {juego.price != null ? juego.price.toFixed(2) : "0.00"}
                  </p>
                  <a href={juego.infoPage || "#"} className="btn btn-primary mt-auto">
                    Ver más
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}