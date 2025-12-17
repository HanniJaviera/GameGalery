"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook para redireccionar

export default function RegistroForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para los campos del formulario
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

  // Estados para los errores de validación
  const [errors, setErrors] = useState<{
    correo?: string;
    confirmCorreo?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  // Manejador de cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    // --- 1. VALIDACIONES DEL FRONTEND ---
    let valid = true;
    const newErrors: typeof errors = {};

    // Validación de correo institucional o gmail
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

    if (!valid) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // --- 2. PREPARAR DATOS PARA EL BACKEND (Mapeo) ---
    // Ajustamos los nombres para que coincidan con la Entidad Java
    const usuarioParaBackend = {
      nombreUsuario: formData.nombre,
      correo: formData.correo,
      celular: formData.telefono,
      // Unimos Comuna y Región en un solo string para 'direccion'
      direccion: `${formData.comuna}, ${formData.region}`,
      // Enviamos la contraseña (Asegúrate de haber actualizado tu Java Entity)
      password: formData.password,
    };

    try {
      // --- 3. ENVIAR A RAILWAY ---
      // Usamos la variable de entorno definida en Vercel
      const url = `${process.env.NEXT_PUBLIC_API_PRODUCTS}/usuarios`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioParaBackend),
      });

      if (response.ok) {
        // ÉXITO
        alert("✅ ¡Usuario registrado exitosamente!");
        // Redirigir al login
        router.push("/paginas/iniciarsesion");
      } else {
        // ERROR DEL SERVIDOR
        const errorText = await response.text();
        console.error("Error del backend:", errorText);
        setErrors({
          general: "Hubo un error al guardar el usuario. Inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrors({
        general: "No se pudo conectar con el servidor. Revisa tu conexión.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDERIZADO DEL FORMULARIO ---
  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      {/* Mensaje de error general (si falla la API) */}
      {errors.general && (
        <div
          className="alert alert-danger text-center p-2 mb-3"
          style={{ color: "red", fontWeight: "bold" }}
        >
          {errors.general}
        </div>
      )}

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
        pattern="^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$"
      />
      {errors.correo && (
        <div className="error" style={{ color: "red" }}>
          {errors.correo}
        </div>
      )}

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
        <div className="error" style={{ color: "red" }}>
          {errors.confirmCorreo}
        </div>
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
      {errors.password && (
        <div className="error" style={{ color: "red" }}>
          {errors.password}
        </div>
      )}

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
        <div className="error" style={{ color: "red" }}>
          {errors.confirmPassword}
        </div>
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

      <button
        type="submit"
        style={{ marginTop: "1rem" }}
        disabled={isSubmitting} // Deshabilita el botón mientras carga
      >
        {isSubmitting ? "Registrando..." : "Registrar"}
      </button>
    </form>
  );
}
