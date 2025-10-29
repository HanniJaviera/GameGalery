import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="inicio-container"
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

      <h2>Iniciar sesión</h2>
      <LoginForm />

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        ¿No tienes cuenta? <a href="paginas/registrase">Regístrate aquí</a>
      </p>
    </div>
  );
}
