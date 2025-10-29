"use client";
import { useState } from "react";

interface User {
  nombre: string;
  correo: string;
  password: string;
}

export default function LoginForm() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!correo || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );
    const userFound = storedUsers.find(
      (user) => user.correo === correo && user.password === password
    );

    if (userFound) {
      alert(`✅ ¡Bienvenido, ${userFound.nombre}!`);
      window.location.href = "/";
    } else {
      setError("❌ Correo o contraseña incorrectos.");
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
        pattern="^[a-zA-Z0-9._%+-]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$"
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

      <button type="submit" style={{ marginTop: "1rem" }}>
        Ingresar
      </button>
    </form>
  );
}
