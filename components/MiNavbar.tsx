"use client";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";

export default function MiNavbar() {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    if (typeof window !== "undefined") {
      const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
      const totalItems = carrito.reduce(
        (acc: number, item: { cantidad: number }) => acc + (item.cantidad || 0),
        0
      );
      setCartCount(totalItems);
    }
  };

  useEffect(() => {
    updateCartCount();

    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Navbar expand="lg" fixed="top" className="navbar-white navbar-transparent">
      <Container fluid>
        <Navbar.Brand as={Link} href="/" className="jersey-10-regular">
          GAME GALERY
        </Navbar.Brand>

        {/* Botón Hamburguesa: react-bootstrap lo maneja solo */}
        <Navbar.Toggle aria-controls="navbarNav" />

        {/* Contenedor Colapsable */}
        <Navbar.Collapse id="navbarNav">
          {/* Links de Navegación: Usamos Nav.Link con "as={Link}" */}
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">
              INICIO
            </Nav.Link>
            <Nav.Link as={Link} href="/paginas/categoria">
              CATEGORIA
            </Nav.Link>
            <Nav.Link as={Link} href="/paginas/catalogo">
              JUEGOS
            </Nav.Link>
            <Nav.Link as={Link} href="/paginas/nosotros">
              NOSOTROS
            </Nav.Link>
            <Nav.Link as={Link} href="/paginas/blog">
              BLOGS
            </Nav.Link>
            <Nav.Link as={Link} href="/paginas/contacto">
              CONTACTO
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="botones-container d-flex align-items-center">
          {/* Botón de Iniciar Sesión */}
          <Link href="/paginas/iniciarsesion" legacyBehavior passHref>
            <Button className="btn-2 ">Iniciar Sesion</Button>
          </Link>

          {/* Botón de Registro  */}
          <Link href="/paginas/registrase" legacyBehavior passHref>
            <Button className="btn-3 ms-2">Registrar Usuario</Button>
          </Link>

          {/* Icono de Carrito */}
          <Link href="/paginas/carrito" className="cart-icon ms-3">
            🛒 Cart (<span id="cart-count">{cartCount}</span>)
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}
