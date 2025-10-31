"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Button, Form } from "react-bootstrap";
import { Juego } from "../../juegos";

// Definimos un tipo para el item del carrito, que es un Juego + cantidad
interface CartItem extends Juego {
  cantidad: number;
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // --- Cargar Carrito desde LocalStorage ---
  // Este useEffect se ejecuta solo una vez, cuando el componente se monta
  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(carritoGuardado);
    calcularTotal(carritoGuardado);
  };

  // --- Calcular Total ---
  const calcularTotal = (items: CartItem[]) => {
    const nuevoTotal = items.reduce(
      (acc, item) => acc + item.price * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  };

  // --- Guardar y Actualizar ---
  // Esta función actualiza el estado, el total, y el localStorage
  const guardarCarrito = (items: CartItem[]) => {
    localStorage.setItem("carrito", JSON.stringify(items));
    setCarrito(items);
    calcularTotal(items);
    // Dispara un evento para que el Navbar actualice su contador
    window.dispatchEvent(new Event("storage"));
  };

  // --- Funciones del Carrito ---

  const handleUpdateCantidad = (id: number, nuevaCantidad: number) => {
    if (nuevaCantidad < 1) {
      handleRemoveItem(id); // Elimina si la cantidad es 0 o menos
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

  // --- Renderizado ---
  return (
    <main className="container" style={{ paddingTop: "100px" }}>
      <h1 className="cart-title">Mi carrito de compras</h1>

      <div className="cart-container">
        {/* --- Columna de Items --- */}
        <div className="cart-items">
          {carrito.length === 0 ? (
            <p style={{ color: "white" }}>Tu carrito está vacío.</p>
          ) : (
            carrito.map((item) => (
              <div className="cart-item" key={item.id}>
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="cart-img"
                />
                <div className="cart-info">
                  <Link href={item.infoPage}>
                    <h3>{item.title}</h3>
                  </Link>
                  <span className="cart-price" data-price={item.price}>
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

        {/* --- Columna de Resumen --- */}
        <div className="cart-summary">
          <h3>TOTAL: ${total.toFixed(2)}</h3>
          <Form.Control
            type="text"
            id="cupon"
            placeholder="Ingrese el cupón de descuento"
          />
          <Button className="btn-aplicar w-100">APLICAR</Button>
          <Button className="btn-pagar w-100">PAGAR</Button>
        </div>
      </div>
    </main>
  );
}
