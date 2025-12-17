"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { Juego } from "@/app/juegos";

interface CartItem extends Juego {
  cantidad: number;
}

interface User {
  nombre?: string;
  nombreUsuario?: string;
  correo: string;
  region?: string;
  comuna?: string;
  telefono?: string;
  direccion?: string;
  // Campos raw del backend para referencia durante el mapeo
  usuario_direccion?: string;
  usuario_nombre?: string;
  usuario_celular?: string;
  [key: string]: unknown;
}

interface WeatherData {
  temp: number;
  description: string;
  icon: string;
  city: string;
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Estados para el Clima
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const isLoggedIn = !!currentUser;

  // URL ÚNICA DEL BACKEND
  // Ahora este backend maneja Usuarios, Ventas y también el Clima (como proxy)
  const baseUrl = "https://ms-products-db-production.up.railway.app";

  // --- 1. LÓGICA DEL CARRITO ---
  const calcularTotal = useCallback((items: CartItem[]) => {
    const nuevoTotal = items.reduce(
      (acc, item) => acc + item.price * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, []);

  const guardarCarrito = useCallback(
    (items: CartItem[]) => {
      localStorage.setItem("carrito", JSON.stringify(items));
      setCarrito(items);
      calcularTotal(items);
      window.dispatchEvent(new Event("storage"));
    },
    [calcularTotal]
  );

  const cargarCarrito = useCallback(() => {
    try {
      const carritoGuardado = JSON.parse(
        localStorage.getItem("carrito") || "[]"
      );
      setCarrito(carritoGuardado);
      calcularTotal(carritoGuardado);
    } catch (e) {
      console.error("Error cargando carrito:", e);
      setCarrito([]);
    }
  }, [calcularTotal]);

  // --- 2. INTEGRACIÓN CLIMA (VÍA TU BACKEND) ---
  const fetchWeather = useCallback(
    async (city: string) => {
      // Validaciones básicas antes de llamar al servidor
      if (!city || city === "N/A" || city === "Cargando...") {
        setWeatherError("Agrega una dirección para ver el clima.");
        return;
      }

      setWeatherLoading(true);
      setWeatherData(null);
      setWeatherError(null);

      // Limpiamos la ciudad (ej: "Santiago, Chile" -> "Santiago")
      const cleanedCity = city.split(",")[0].trim();

      try {
        console.log(`🌐 Solicitando clima al Backend para: ${cleanedCity}`);

        // Llamada simplificada a tu propio endpoint
        const response = await fetch(
          `${baseUrl}/clima?ciudad=${encodeURIComponent(cleanedCity)}`
        );

        if (response.ok) {
          const data = await response.json();
          console.log("📦 Respuesta del Backend (Clima):", data);

          // Tu servicio Java devuelve una estructura normalizada:
          // { name: "...", main: { temp: X }, weather: [{ description: "...", icon: "..." }] }
          if (data.main) {
            setWeatherData({
              temp: Math.round(data.main.temp),
              description: data.weather?.[0]?.description || "Clima actual",
              icon: data.weather?.[0]?.icon || "01d",
              city: data.name || cleanedCity,
            });
          } else {
            setWeatherError(
              "Datos de clima incompletos recibidos del servidor."
            );
          }
        } else {
          // Manejo de errores HTTP (404 si no encuentra la ciudad, 500 si falla la API externa)
          console.warn(
            `Backend respondió status ${response.status} para clima.`
          );
          setWeatherError(
            `No se pudo obtener el clima para "${cleanedCity}". Verifica que la ciudad exista.`
          );
        }
      } catch (error) {
        console.error("❌ Error de conexión con el backend:", error);
        setWeatherError("Servicio de clima no disponible momentáneamente.");
      } finally {
        setWeatherLoading(false);
      }
    },
    [baseUrl]
  );

  // --- 3. INTEGRACIÓN USUARIOS ---
  const obtenerDatosUsuarioDesdeBackend = useCallback(
    async (correo: string, usuarioLocal: User) => {
      console.log("🔍 Buscando datos frescos en BBDD para:", correo);
      try {
        const response = await fetch(
          `${baseUrl}/usuarios/buscar?correo=${correo}`
        );

        if (response.ok) {
          const datosBackend = await response.json();
          console.log("✅ Datos RAW del backend (UsuarioDTO):", datosBackend);

          // Mapeo defensivo: Tu DTO devuelve campos como 'usuario_celular'
          // Aquí los convertimos al formato que usa el frontend ('telefono')
          const usuarioMapeado = {
            ...usuarioLocal,
            ...datosBackend,
            direccion:
              datosBackend.usuario_direccion ||
              datosBackend.direccion ||
              usuarioLocal.direccion,
            nombreUsuario:
              datosBackend.usuario_nombre ||
              datosBackend.nombreUsuario ||
              usuarioLocal.nombreUsuario,
            correo:
              datosBackend.usuario_correo ||
              datosBackend.correo ||
              usuarioLocal.correo,
            telefono:
              datosBackend.usuario_celular ||
              datosBackend.celular ||
              usuarioLocal.telefono,
            id: datosBackend.usuario_id || datosBackend.id,
          };

          console.log("🔄 Usuario mapeado final:", usuarioMapeado);
          setCurrentUser(usuarioMapeado as User);

          // Si recuperamos una dirección/comuna, cargamos el clima automáticamente
          const ubicacionClima =
            usuarioMapeado.comuna || usuarioMapeado.direccion;
          if (ubicacionClima) {
            fetchWeather(ubicacionClima);
          }
        }
      } catch (error) {
        console.error("❌ Error conectando con la base de datos:", error);
      }
    },
    [baseUrl, fetchWeather]
  );

  // --- EFECTOS ---
  useEffect(() => {
    cargarCarrito();
    try {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser) {
        const localUser = JSON.parse(storedUser);
        setCurrentUser(localUser);
        // Actualizamos datos frescos al cargar la página
        if (localUser.correo) {
          obtenerDatosUsuarioDesdeBackend(localUser.correo, localUser);
        }
      }
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      localStorage.removeItem("usuario");
    }
  }, [cargarCarrito, obtenerDatosUsuarioDesdeBackend]);

  // --- HANDLERS ---
  const handleCloseCheckout = () => setShowCheckoutModal(false);

  const handleShowCheckout = () => {
    setShowCheckoutModal(true);

    // Verificamos si tenemos datos para pedir el clima
    const ubicacionParaClima = currentUser?.comuna || currentUser?.direccion;

    if (ubicacionParaClima) {
      // Solo pedimos si no tenemos datos ya (para no spamear al backend)
      if (!weatherData) fetchWeather(ubicacionParaClima);
    } else {
      setWeatherError("Agrega una dirección a tu perfil para ver el clima.");
    }
  };

  const redirectToLogin = () => {
    handleCloseCheckout();
    window.location.href = "/paginas/iniciarsesion";
  };

  const handlePurchaseSuccess = async () => {
    if (!currentUser) return;
    setIsProcessing(true);

    try {
      const nombreFinal =
        currentUser.nombre || currentUser.nombreUsuario || "Usuario";
      const direccionFinal =
        currentUser.direccion || "Sin dirección registrada";

      // Preparamos el objeto exacto que espera tu VentaDTO
      const ventaData = {
        nombreUsuario: nombreFinal,
        correoUsuario: currentUser.correo,
        direccion: direccionFinal,
        total: total,
      };

      console.log("📤 Enviando VentaDTO:", ventaData);

      const response = await fetch(`${baseUrl}/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventaData),
      });

      if (response.ok) {
        const ventaGuardada = await response.json();
        alert(
          `✅ Compra realizada con éxito.\n\n` +
            `Nº de Orden: ${ventaGuardada.numeroVenta || ventaGuardada.id}\n` +
            `Total: $${ventaGuardada.total}`
        );
        guardarCarrito([]);
        handleCloseCheckout();
      } else {
        const errorText = await response.text();
        console.error("Error servidor venta:", errorText);
        alert("❌ Error al procesar la compra. Revisa tus datos.");
      }
    } catch (error) {
      console.error("Error red venta:", error);
      alert("❌ Error de conexión al procesar la venta.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateCantidad = (id: number, val: number) => {
    if (val < 1) {
      handleRemoveItem(id);
      return;
    }
    const updated = carrito.map((i) =>
      i.id === id ? { ...i, cantidad: val } : i
    );
    guardarCarrito(updated);
  };

  const handleRemoveItem = (id: number) => {
    guardarCarrito(carrito.filter((i) => i.id !== id));
  };

  const renderSafe = (v: unknown, f: string) =>
    typeof v === "string" && v.trim() ? v : f;

  // Widget de Clima
  const WeatherWidget = () => {
    if (weatherLoading) {
      return (
        <div className="text-center text-info mb-3">
          <Spinner size="sm" animation="border" /> Consultando clima...
        </div>
      );
    }

    if (weatherError) {
      return (
        <div className="alert alert-warning text-center small mb-3 p-2">
          <i className="bi bi-exclamation-triangle me-2"></i> {weatherError}
        </div>
      );
    }

    if (weatherData) {
      return (
        <div className="bg-info bg-opacity-25 border border-info rounded p-3 mb-4 d-flex align-items-center justify-content-between">
          <div>
            <h6 className="mb-0 text-white">Clima en {weatherData.city}</h6>
            <small className="text-light text-capitalize">
              {weatherData.description}
            </small>
          </div>
          <div className="d-flex align-items-center">
            {/* Usamos iconos de OpenWeather para consistencia visual */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt="Icono"
              width={50}
              height={50}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="fs-3 fw-bold text-white ms-2">
              {weatherData.temp}°C
            </span>
          </div>
        </div>
      );
    }
    return null;
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="cart-img"
                  width={100}
                  height={100}
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
            placeholder="Ingrese el cupón de descuento"
            className="mb-2"
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

              <WeatherWidget />

              <div className="mb-4 p-3 bg-dark rounded border border-secondary">
                <h5>Datos del Comprador</h5>
                <p className="mb-1">
                  <strong>Nombre:</strong>{" "}
                  {renderSafe(
                    currentUser.nombre || currentUser.nombreUsuario,
                    "N/A"
                  )}
                </p>
                <p className="mb-1">
                  <strong>Correo:</strong> {renderSafe(currentUser.correo, "")}
                </p>
                <p className="mb-1">
                  <strong>Dirección:</strong>{" "}
                  {renderSafe(currentUser.direccion, "Cargando...")}
                </p>
                <p className="mb-1">
                  <strong>Teléfono:</strong>{" "}
                  {renderSafe(currentUser.telefono, "No registrado")}
                </p>
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
