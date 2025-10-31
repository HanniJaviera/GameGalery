import RegistroForm from "@/components/RegistroForm";

export default function RegistroPage() {
  return (
    <div
      className="registro-container"
      style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <div className="logo-container" style={{ textAlign: "center" }}>
        <img
          src="/icono2.png"
          alt="Logo de la empresa"
          className="logo"
          style={{ width: 100 }}
        />
        <h1 className="company-name">Game Gallery</h1>
      </div>

      <h2>Registro de usuario</h2>

      <RegistroForm />

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        ¿Ya tienes cuenta?{" "}
        <a href="/paginas/iniciarsesion">Inicia sesión aquí</a>
      </p>
    </div>
  );
}
