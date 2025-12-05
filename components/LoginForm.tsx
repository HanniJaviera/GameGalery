"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importamos useRouter para redirigir mejor

export default function LoginForm() {
  const router = useRouter(); // Hook para navegación
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Para mostrar carga

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!correo || !password) {
      setError("Por favor, completa todos los campos.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Definimos la URL (apuntando a tu backend de Productos)
      // Asegúrate de usar la variable de entorno correcta
      const baseUrl =
        process.env.NEXT_PUBLIC_API_PRODUCTS ||
        "https://ms-products-db-production.up.railway.app";
      const url = `${baseUrl}/usuarios/login`;

      // 2. Hacemos la petición al Backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviamos solo correo y password (el backend espera un objeto Usuario)
        body: JSON.stringify({ correo, password }),
      });

      if (response.ok) {
        // --- ÉXITO: LOGIN CORRECTO ---
        const userFound = await response.json();

        // Guardamos la sesión en localStorage
        localStorage.setItem("usuario", JSON.stringify(userFound));

        alert(
          `✅ ¡Bienvenido de nuevo, ${
            userFound.nombreUsuario || userFound.nombre
          }!`
        ); // Ajusta según como se llame el campo en tu entidad

        // Redirigimos al inicio
        // window.location.href = "/"; // Forma antigua
        router.push("/"); // Forma optimizada de Next.js
      } else {
        // --- ERROR: DATOS INCORRECTOS ---
        if (response.status === 401) {
          setError("❌ Correo o contraseña incorrectos.");
        } else {
          setError("❌ Ocurrió un error en el servidor.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("❌ Error de conexión. Intenta más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <label htmlFor="correo">Correo:</label>
      <input
        type="email"
        id="correo"
        name="correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
        maxLength={100}
        // pattern="^[a-zA-Z0-9._%+-]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$" // Opcional: puedes quitarlo para ser más flexible en login
      />

      <label htmlFor="password">Contraseña:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={4}
        maxLength={10}
      />

      {error && (
        <div style={{ color: "red", marginTop: "0.5rem", fontSize: "0.9rem" }}>
          {error}
        </div>
      )}

      <button type="submit" style={{ marginTop: "1rem" }} disabled={isLoading}>
        {isLoading ? "Verificando..." : "Ingresar"}
      </button>
    </form>
  );
}
