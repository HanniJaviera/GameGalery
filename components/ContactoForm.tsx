"use client";
import { useState } from "react";

export default function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      setStatus("❌ Por favor, completa todos los campos.");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(email)) {
      setStatus("❌ Ingresa un correo electrónico válido.");
      return;
    }

    // Aquí podrías enviar el mensaje a una API o backend real
    console.log("📩 Mensaje enviado:", { nombre, email, mensaje });

    setStatus("✅ ¡Mensaje enviado con éxito!");
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre completo:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        placeholder="Escribe tu nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <label htmlFor="email">Correo:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Escribe tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="mensaje">Mensaje:</label>
      <textarea
        id="mensaje"
        name="mensaje"
        rows={5}
        maxLength={500}
        placeholder="Escribe tu mensaje"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        required
      />

      <button
        type="submit"
        className="btn-enviar"
        style={{ marginTop: "1rem" }}
      >
        Enviar
      </button>

      {status && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>{status}</div>
      )}
    </form>
  );
}
