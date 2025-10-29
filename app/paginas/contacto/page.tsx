import ContactoForm from "@/components/ContactoForm";

export default function ContactoPage() {
  return (
    <div
      className="contact-container"
      style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <div
        className="contact-header"
        style={{ textAlign: "center", marginBottom: "1.5rem" }}
      >
        <img
          src="/icono2.png"
          alt="Logo de la empresa"
          className="logo"
          style={{ width: 100 }}
        />
        <h2>Game Gallery</h2>
      </div>

      <h3 style={{ textAlign: "center" }}>Formulario de contacto</h3>
      <ContactoForm />
    </div>
  );
}
