"use client";
import { useState } from "react";

interface User {
  nombre: string;
  correo: string;
  password: string;
}

export default function RegistroForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    confirmCorreo: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    region: "",
    comuna: "",
  });

  const [errors, setErrors] = useState<{
    correo?: string;
    confirmCorreo?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    let valid = true;
    const newErrors: typeof errors = {};
    const correoRegex =
      /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (!correoRegex.test(formData.correo)) {
      newErrors.correo =
        "Correo inválido. Solo se permite @duoc.cl, @profesor.duoc.cl o @gmail.com";
      valid = false;
    }

    if (formData.correo !== formData.confirmCorreo) {
      newErrors.confirmCorreo = "Los correos no coinciden.";
      valid = false;
    }

    if (formData.password.length < 4 || formData.password.length > 10) {
      newErrors.password = "La contraseña debe tener entre 4 y 10 caracteres.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    // ✅ Guardar usuario en localStorage
    const newUser: User = {
      nombre: formData.nombre,
      correo: formData.correo,
      password: formData.password,
    };

    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("registeredUsers") || "[]"
    );

    const userExists = storedUsers.some(
      (user) => user.correo === newUser.correo
    );

    if (userExists) {
      alert("❌ Este correo ya está registrado.");
      return;
    }

    storedUsers.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(storedUsers));

    alert(
      `✅ ¡Registro exitoso!\nNombre: ${newUser.nombre}\nCorreo: ${newUser.correo}`
    );
    window.location.href = "/paginas/iniciarsesion";
  };

  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre completo</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        maxLength={100}
      />

      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        id="correo"
        name="correo"
        value={formData.correo}
        onChange={handleChange}
        required
        maxLength={100}
        pattern="^[a-zA-Z0-9._%+-]+@(duoc\\.cl|profesor\\.duoc\\.cl|gmail\\.com)$"
      />
      {errors.correo && <div className="error">{errors.correo}</div>}

      <label htmlFor="confirmCorreo">Confirmar correo</label>
      <input
        type="email"
        id="confirmCorreo"
        name="confirmCorreo"
        value={formData.confirmCorreo}
        onChange={handleChange}
        required
        maxLength={100}
      />
      {errors.confirmCorreo && (
        <div className="error">{errors.confirmCorreo}</div>
      )}

      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={4}
        maxLength={10}
      />
      {errors.password && <div className="error">{errors.password}</div>}

      <label htmlFor="confirmPassword">Confirmar contraseña</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        minLength={4}
        maxLength={10}
      />
      {errors.confirmPassword && (
        <div className="error">{errors.confirmPassword}</div>
      )}

      <label htmlFor="telefono">Teléfono (opcional)</label>
      <input
        type="tel"
        id="telefono"
        name="telefono"
        value={formData.telefono}
        onChange={handleChange}
        pattern="[0-9]{9}"
      />

      <label htmlFor="region">Región</label>
      <select
        id="region"
        name="region"
        value={formData.region}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione la región --</option>
        <option value="RM">Región Metropolitana de Santiago</option>
        <option value="V">Región de Valparaíso</option>
        <option value="VIII">Región del Biobío</option>
        <option value="X">Región de Los Lagos</option>
        <option value="IX">Región de La Araucanía</option>
        <option value="VII">Región del Maule</option>
      </select>

      <label htmlFor="comuna">Comuna</label>
      <select
        id="comuna"
        name="comuna"
        value={formData.comuna}
        onChange={handleChange}
        required
      >
        <option value="">-- Seleccione la comuna --</option>
        <option value="Santiago">Santiago</option>
        <option value="Las Condes">Las Condes</option>
        <option value="Providencia">Providencia</option>
        <option value="Puente Alto">Puente Alto</option>
        <option value="Valparaíso">Valparaíso</option>
        <option value="Viña del Mar">Viña del Mar</option>
        <option value="Concepción">Concepción</option>
        <option value="Talcahuano">Talcahuano</option>
        <option value="Puerto Montt">Puerto Montt</option>
        <option value="Temuco">Temuco</option>
        <option value="Talca">Talca</option>
      </select>

      <button type="submit" style={{ marginTop: "1rem" }}>
        Registrar
      </button>
    </form>
  );
}
