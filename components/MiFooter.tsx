// components/MiFooter.tsx
import Image from "next/image";

export default function MiFooter() {
  return (
    <footer>
      <div className="footer-left">
        <div className="payment-icons">
          {/* Rutas corregidas: apuntan a la raíz "/" */}
          <Image
            src="/visa.png"
            alt="Visa"
            width={50}
            height={31}
            className="visa"
          />
          <Image
            src="/mastercard.png"
            alt="Mastercard"
            width={50}
            height={31}
            className="master"
          />
          <Image
            src="/paypal.png"
            alt="PayPal"
            width={50}
            height={31}
            className="paypal"
          />
        </div>
        <p className="derechos">
          &copy; {new Date().getFullYear()} GAME GALLERY. Todos los derechos
          reservados.
        </p>
      </div>

      <div className="contact-group">
        <p className="username">@gamegallery</p>
        <div className="social-icons">
          <Image
            src="/iconowsp.webp"
            alt="icono WhatsApp"
            width={24}
            height={24}
            className="iconowsp"
          />
          <Image
            src="/iconoig.png"
            alt="icono Instagram"
            width={24}
            height={24}
            className="iconoig"
          />
          <Image
            src="/iconox.webp"
            alt="icono X"
            width={24}
            height={24}
            className="iconox"
          />
        </div>
        <p className="phone-number">+56911118888</p>
      </div>

      <div className="newsletter-group">
        <p>Suscríbete a Novedades</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Tu correo electrónico" />
          <button type="submit">Suscribir</button>
        </form>
      </div>
    </footer>
  );
}
