// components/MiNavbar.tsx
"use client"; // Necesario para la interactividad (menú hamburguesa)

import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";

export default function MiNavbar() {
  return (
    // Usamos las clases de tu HTML: fixed="top" y className para las tuyas
    <Navbar expand="lg" fixed="top" className="navbar-white navbar-transparent">
      <Container fluid>
        {/* Brand/Logo: Usamos "as={Link}" para que sea un link de Next.js */}
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
            <Nav.Link as={Link} href="/juegos">
              JUEGOS
            </Nav.Link>
            <Nav.Link as={Link} href="/nosotros">
              NOSOTROS
            </Nav.Link>
            <Nav.Link as={Link} href="/blogs">
              BLOGS
            </Nav.Link>
            <Nav.Link as={Link} href="/contacto">
              CONTACTO
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Contenedor de Botones y Carrito */}
        {/* Usamos "d-flex align-items-center" de Bootstrap para alinearlos */}
        <div className="botones-container d-flex align-items-center">
          {/* Botón de Iniciar Sesión */}
          <Button
            as={Link}
            href="/iniciarSesion"
            className="btn-2" // Tu clase personalizada
          >
            Iniciar sesión
          </Button>

          {/* Botón de Registro */}
          <Button
            as={Link}
            href="/registroUsuario"
            className="btn-3 ms-2" // Tu clase + un margen
          >
            Registrar Usuario
          </Button>

          {/* Icono de Carrito */}
          <Link href="/carritoCompra" className="cart-icon ms-3">
            🛒 Cart (<span id="cart-count">0</span>)
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}
