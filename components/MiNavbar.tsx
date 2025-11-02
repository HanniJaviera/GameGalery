"use client";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MiNavbar() {
  const [cartCount, setCartCount] = useState(0);
  const [usuario, setUsuario] = useState<any>(null);
  const router = useRouter();

  // --- Contador del carrito ---
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

  // --- Detectar usuario logueado ---
  const checkUser = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("usuario");
      if (user) {
        setUsuario(JSON.parse(user));
      } else {
        setUsuario(null);
      }
    }
  };

  useEffect(() => {
    updateCartCount();
    checkUser();

    const handleStorageChange = () => {
      updateCartCount();
      checkUser();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // --- Manejar login / logout ---
  const handleAuth = () => {
    if (usuario) {
      // Cerrar sesión
      localStorage.removeItem("usuario");
      setUsuario(null);
      router.push("/"); // redirige al inicio
    } else {
      // Ir a iniciar sesión
      router.push("/paginas/iniciarsesion");
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar-white navbar-transparent">
      <Container fluid>
        <Navbar.Brand as={Link} href="/" className="jersey-10-regular">
          GAME GALERY
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
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
          {/* 🔁 Botón dinámico: Iniciar/Cerrar sesión */}
          <Button className="btn-2" onClick={handleAuth}>
            {usuario ? "Cerrar Sesión" : "Iniciar Sesión"}
          </Button>

          {/* Solo mostrar registro si no hay sesión */}
          {!usuario && (
            <Link href="/paginas/registrase" legacyBehavior passHref>
              <Button className="btn-3 ms-2">Registrar Usuario</Button>
            </Link>
          )}

          {/* Icono del carrito */}
          <Link href="/paginas/carrito" className="cart-icon ms-3">
            🛒 Cart (<span id="cart-count">{cartCount}</span>)
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}
