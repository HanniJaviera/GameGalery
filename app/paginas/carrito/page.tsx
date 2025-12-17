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
  // Nuevo estado para mostrar errores de clima en pantalla
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const isLoggedIn = !!currentUser;

  // URL de tu Backend Java (Railway)
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

  // --- 2. INTEGRACIÓN CLIMA (SEGURA VÍA BACKEND) ---
  const fetchWeather = useCallback(
    async (city: string) => {
      // Validaciones básicas
      if (!city || city === "N/A" || city === "Cargando...") {
        setWeatherError(
          "No hay una comuna válida registrada para consultar el clima."
        );
        return;
      }

      setWeatherLoading(true);
      setWeatherData(null);
      setWeatherError(null);

      // Limpiamos el nombre de la ciudad
      const cleanedCity = city.split(",")[0].trim();

      try {
        // CORRECCIÓN DE SEGURIDAD:
        // Llamamos a TU backend Java, no a OpenWeatherMap directamente.
        // Así la API Key se queda oculta en el servidor.
        const response = await fetch(
          `${baseUrl}/clima?ciudad=${encodeURIComponent(cleanedCity)}`
        );

        if (response.ok) {
          const data = await response.json();

          // Mapeamos la respuesta que viene de Java
          if (data.main && data.weather) {
            setWeatherData({
              temp: Math.round(data.main.temp),
              description: data.weather[0].description,
              icon: data.weather[0].icon,
              city: data.name,
            });
            console.log("☁️ Clima obtenido desde Java para:", cleanedCity);
          } else {
            setWeatherError(
              "Datos de clima incompletos recibidos del servidor."
            );
          }
        } else {
          console.warn(`Backend no pudo obtener clima para ${cleanedCity}`);
          setWeatherError(
            `No se pudo cargar el clima (Error ${response.status}). Revisa si el Backend está actualizado.`
          );
        }
      } catch (error) {
        console.error("❌ Error servicio clima:", error);
        setWeatherError("Error de conexión al cargar el clima.");
      } finally {
        setWeatherLoading(false);
      }
    },
    [baseUrl]
  );

  // --- 3. INTEGRACIÓN USUARIOS (BACKEND) ---
  const obtenerDatosUsuarioDesdeBackend = useCallback(
    async (correo: string, usuarioLocal: User) => {
      console.log("🔍 Buscando datos frescos en BBDD para:", correo);
      try {
        const response = await fetch(
          `${baseUrl}/usuarios/buscar?correo=${correo}`
        );

        if (response.ok) {
          const datosBackend = await response.json();
          console.log("✅ Datos recibidos del backend:", datosBackend);

          const usuarioCompleto = {
            ...(usuarioLocal || {}),
            ...datosBackend,
          } as User;

          setCurrentUser(usuarioCompleto);

          // Si el usuario tiene comuna, cargamos el clima automáticamente
          if (usuarioCompleto.comuna) {
            fetchWeather(usuarioCompleto.comuna);
          }
        } else {
          console.warn("⚠️ No se encontró información extra en el backend.");
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
    // Intentamos recargar el clima al abrir el modal si ya tenemos datos
    if (currentUser?.comuna) {
      console.log("Intentando cargar clima para comuna:", currentUser.comuna);
      fetchWeather(currentUser.comuna);
    } else {
      console.log("No hay comuna registrada en el usuario actual.");
      setWeatherError("Agrega una comuna a tu perfil para ver el clima.");
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
        typeof currentUser.direccion === "string"
          ? currentUser.direccion
          : "Sin dirección registrada";

      const ventaData = {
        nombreUsuario: nombreFinal,
        correoUsuario: currentUser.correo,
        direccion: direccionFinal,
        comuna: currentUser.comuna || "N/A",
        region: currentUser.region || "N/A",
        total: total,
      };

      const response = await fetch(`${baseUrl}/ventas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const renderSafe = (value: unknown, fallback: string) => {
    if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    return fallback;
  };

  // --- WIDGET CLIMA ---
  const WeatherWidget = () => {
    if (weatherLoading) {
      return (
        <div className="text-center text-info mb-3">
          <Spinner size="sm" animation="border" /> Cargando clima en tu zona...
        </div>
      );
    }

    // Si hay error, lo mostramos en rojo claro
    if (weatherError) {
      return (
        <div className="alert alert-warning text-center small mb-3 p-2">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {weatherError}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt="Icono clima"
              width={50}
              height={50}
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

              {/* Widget de Clima */}
              <WeatherWidget />

              <div className="mb-4 p-3 bg-dark rounded border border-secondary">
                <h5>Datos del Comprador</h5>
                <p className="mb-1">
                  <strong>Nombre:</strong>{" "}
                  {renderSafe(
                    currentUser.nombre || currentUser.nombreUsuario,
                    "Sin Nombre Registrado"
                  )}
                </p>
                <p className="mb-1">
                  <strong>Correo:</strong> {renderSafe(currentUser.correo, "")}
                </p>
                <p className="mb-1">
                  <strong>Dirección:</strong>{" "}
                  {renderSafe(currentUser.direccion, "Cargando...")}
                  {currentUser.comuna ? ` (${currentUser.comuna})` : ""}
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
