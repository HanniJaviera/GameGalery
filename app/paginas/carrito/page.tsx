"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { Juego } from "@/app/juegos";

interface CartItem extends Juego {
  cantidad: number;
}

// Interfaz flexible para evitar errores si las propiedades cambian de nombre
interface User {
  nombre?: string;
  nombreUsuario?: string; // Agregado por si el backend lo envía así
  correo: string;
  region?: string;
  comuna?: string;
  telefono?: string;
  direccion?: string;
  [key: string]: any; // Permite otras propiedades dinámicas
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isLoggedIn = !!currentUser;

  const baseUrl =
    process.env.NEXT_PUBLIC_API_PRODUCTS ||
    "https://ms-products-db-production.up.railway.app";

  useEffect(() => {
    cargarCarrito();

    try {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        const localUser = JSON.parse(storedUser);
        console.log("Usuario Local:", localUser); // 🔍 Revisa en consola qué nombre tiene aquí
        setCurrentUser(localUser);

        if (localUser.correo) {
          obtenerDatosUsuarioDesdeBackend(localUser.correo, localUser);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      localStorage.removeItem("usuario");
    }
  }, []);

  const obtenerDatosUsuarioDesdeBackend = async (
    correo: string,
    usuarioLocal: User
  ) => {
    try {
      const response = await fetch(
        `${baseUrl}/usuarios/buscar?correo=${correo}`
      );

      if (response.ok) {
        const datosBackend = await response.json();
        console.log("Datos Backend:", datosBackend); // 🔍 Revisa si aquí viene 'nombre' o 'nombreUsuario'

        setCurrentUser({
          ...usuarioLocal,
          ...datosBackend,
        });
      } else {
        console.warn(
          "No se pudo obtener información adicional del usuario desde el backend."
        );
      }
    } catch (error) {
      console.error("Error conectando con el servicio de usuarios:", error);
    }
  };

  const handleCloseCheckout = () => setShowCheckoutModal(false);
  const handleShowCheckout = () => setShowCheckoutModal(true);

  const redirectToLogin = () => {
    handleCloseCheckout();
    window.location.href = "/paginas/iniciarsesion";
  };

  const handlePurchaseSuccess = async () => {
    if (!currentUser) return;

    setIsProcessing(true);

    try {
      // Intentamos obtener el nombre de cualquiera de las dos propiedades posibles
      const nombreFinal =
        currentUser.nombre || currentUser.nombreUsuario || "Usuario";

      const ventaData = {
        nombreUsuario: nombreFinal,
        correoUsuario: currentUser.correo,
        direccion: currentUser.direccion || "Sin dirección registrada",
        comuna: currentUser.comuna || "N/A",
        region: currentUser.region || "N/A",
        total: total,
      };

      console.log("Enviando venta al backend:", ventaData);

      const response = await fetch(`${baseUrl}/ventas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      if (response.ok) {
        const ventaGuardada = await response.json();

        alert(
          `✅ Compra realizada con éxito.\n\n` +
            `Nº de Orden: ${ventaGuardada.id || ventaGuardada.numeroVenta}\n` +
            `Cliente: ${ventaGuardada.nombreUsuario}\n` +
            `Enviado a: ${ventaGuardada.direccion || currentUser.direccion}`
        );

        guardarCarrito([]);
        handleCloseCheckout();
      } else {
        alert("❌ Error al procesar la compra en el servidor.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error de conexión al guardar la venta.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoGuardado);
    calcularTotal(carritoGuardado);
  };

  const calcularTotal = (items: CartItem[]) => {
    const nuevoTotal = items.reduce(
      (acc, item) => acc + item.price * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  };

  const guardarCarrito = (items: CartItem[]) => {
    localStorage.setItem("carrito", JSON.stringify(items));
    setCarrito(items);
    calcularTotal(items);
    window.dispatchEvent(new Event("storage"));
  };

  const handleUpdateCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) {
      handleRemoveItem(id);
      return;
    }
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    );
    guardarCarrito(nuevoCarrito);
  };

  const handleRemoveItem = (id: number) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    guardarCarrito(nuevoCarrito);
  };

  return (
    <main
      className="container"
      style={{ paddingTop: "100px", minHeight: "80vh" }}
    >
      <h1 className="cart-title">Mi carrito de compras</h1>

      <div className="cart-container">
        <div className="cart-items">
          {carrito.length === 0 ? (
            <p style={{ color: "white" }}>Tu carrito está vacío.</p>
          ) : (
            carrito.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="cart-img"
                  style={{ objectFit: "cover" }}
                />
                <div className="cart-info">
                  <a href={item.infoPage} className="text-decoration-none">
                    <h3>{item.title}</h3>
                  </a>
                  <span className="cart-price">
                    USD {item.price.toFixed(2)}
                  </span>
                </div>
                <div className="cart-actions">
                  <Button
                    className="btn-minus"
                    onClick={() =>
                      handleUpdateCantidad(item.id, item.cantidad - 1)
                    }
                  >
                    ➖
                  </Button>
                  <input
                    type="text"
                    value={item.cantidad}
                    readOnly
                    className="cart-qty"
                  />
                  <Button
                    className="btn-plus"
                    onClick={() =>
                      handleUpdateCantidad(item.id, item.cantidad + 1)
                    }
                  >
                    ➕
                  </Button>
                  <Button
                    className="btn-remove"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    🗑
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h3>TOTAL: ${total.toFixed(2)}</h3>
          <Form.Control
            type="text"
            id="cupon"
            placeholder="Ingrese el cupón de descuento"
          />
          <Button className="btn-aplicar w-100 mb-2">APLICAR</Button>

          <Button
            className="btn-pagar w-100"
            onClick={handleShowCheckout}
            disabled={carrito.length === 0}
          >
            PAGAR
          </Button>
        </div>
      </div>

      <Modal
        show={showCheckoutModal}
        onHide={handleCloseCheckout}
        centered
        dialogClassName="modal-dark"
      >
        <Modal.Header closeButton className="border-secondary">
          <Modal.Title className="text-white">
            {isLoggedIn ? "Finalizar Compra" : "Acceso Requerido"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoggedIn && currentUser ? (
            <div className="text-white">
              <h4 className="text-center text-success mb-4">
                Confirmar Compra
              </h4>

              <div className="mb-4 p-3 bg-dark rounded border border-secondary">
                <h5>Datos del Comprador</h5>
                <p className="mb-1">
                  {/* Aquí mostramos nombre O nombreUsuario O un texto por defecto */}
                  <strong>Nombre:</strong>{" "}
                  {currentUser.nombre ||
                    currentUser.nombreUsuario ||
                    "Sin Nombre Registrado"}
                </p>
                <p className="mb-1">
                  <strong>Correo:</strong> {currentUser.correo}
                </p>
                <p className="mb-1">
                  <strong>Dirección:</strong>{" "}
                  {currentUser.direccion || "Cargando..."}
                </p>
                {/* SE ELIMINÓ LA SECCIÓN "UBICACIÓN" (COMUNA/REGIÓN) */}
              </div>

              <div className="mb-4">
                <h5>Resumen</h5>
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>TOTAL A PAGAR:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="success"
                onClick={handlePurchaseSuccess}
                className="w-100"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Procesando...
                  </>
                ) : (
                  "Confirmar y Finalizar"
                )}
              </Button>
            </div>
          ) : (
            <div className="d-grid gap-2">
              <p className="text-white text-center mb-4 fs-5">
                Necesitas iniciar sesión para poder comprar.
              </p>
              <Button variant="primary" size="lg" onClick={redirectToLogin}>
                Ir a Iniciar Sesión
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
}
