import React from "react";
import BlogCarousel from "@/components/BlogCarousel";

// Primer Carrusel (Fase 1)
const phase1Images = [
  { src: "/hsrbannerhy.jpg", alt: "HSR 3.7 Banner Fase 1 - Hyacine" },
  { src: "/hsrbannercas.jpg", alt: "HSR 3.7 Banner Fase 1 - Castorice" },
  { src: "/hsrbannertri.jpg", alt: "HSR 3.7 Banner Fase 1 - Tribbie" },
];

// Segundo Carrusel (Fase 2)
const phase2Images = [
  { src: "/hsrbannerpha.jpg", alt: "HSR 3.7 Banner Fase 2 - Phainon" },
  { src: "/hsrbannercip.jpg", alt: "HSR 3.7 Banner Fase 2 - Cipher" },
  { src: "/hsrbannermy.jpg", alt: "HSR 3.7 Banner Fase 2 - Mydei" },
];

const Page: React.FC = () => {
  return (
    <div className="blog-honkaistarrail-page">
      <main className="blog-detalle">
        <a href="/paginas/blog" className="btn-volver">
          ← Volver a Blogs
        </a>

        <article>
          <h2>Honkai: Star Rail – Una nueva aventura galáctica</h2>

          <img
            src="/hsrbanner37.jpg"
            alt="Honkai Star Rail"
            className="blog-img"
          />

          <p>
            <strong>Honkai: Star Rail</strong> es uno de los título de HoYoverse,
            creadores de
            <em>Genshin Impact</em> y <em>Honkai Impact 3rd</em>. Este RPG por
            turnos nos lleva a un viaje intergaláctico lleno de mundos únicos,
            personajes carismáticos y batallas estratégicas.
          </p>

          <p>
            La historia sigue al Viajero Estelar, quien despierta a bordo del
            Astral Express, un tren espacial que recorre diferentes planetas y
            civilizaciones. A lo largo del camino, el jugador conocerá a un
            elenco variado de personajes, cada uno con su propia personalidad,
            habilidades y secretos por descubrir.
          </p>

          <p>
            Uno de los grandes atractivos del juego es su
            <strong>sistema de combate por turnos</strong>, que combina
            estrategia clásica con animaciones espectaculares. Cada personaje
            pertenece a un “Camino” (clase) y un “Elemento”, lo que abre un
            sinfín de combinaciones para armar tu equipo ideal.
          </p>

          <p>
            Además, la ambientación mezcla ciencia ficción con fantasía, lo que
            convierte cada mundo en un lugar sorprendente para explorar. Desde
            ciudades futuristas hasta ruinas antiguas, el juego mantiene un
            ritmo narrativo envolvente que engancha desde el principio.
          </p>
        </article>

        <section className="blog-seccion">
          <h3>Fecha de lanzamiento de Honkai: Star Rail 3.7</h3>

          <img
            src="/hsrcontent.jpg"
            alt="Honkai Star Rail 3.7 Banner"
            className="blog-img"
          />

          <p>
            Durante toda la fase de Honkai: Star Rail 3.7, el Banner de
            <strong>Cyrene</strong> estará disponible a partir del
            <strong> 4 de noviembre de 2025</strong> para el servidor de
            Norteamérica y el <strong>5 de noviembre de 2025</strong> para
            Europa y Asia. El Banner de Cyrene finalizará el
            <strong>16 de diciembre de 2025 </strong>
            para todos los servidores junto con su Cono de luz
            <strong>Este Amor, Para Siempre.</strong>
          </p>
          <p>
            Los personajes de <em>4 estrellas destacados</em> en el banner de
            <strong> Cyrene</strong> <em>son Moze, Lynx y Pela.</em>
          </p>

          <img
            src="/hsrbannercy.jpg"
            alt="Honkai Star Rail 3.7 Banner"
            className="blog-img"
          />

          <h3>Banners de la versión 3.7</h3>

          <p>
            La primera fase de Honkai: Star Rail 3.7, también contará con los
            reruns de los personajes
            <strong> Hyacine , Castorice y Tribbie</strong> desde el
            <strong>4 de noviembre de 2025</strong> hasta el
            <strong>26 de noviembre de 2025.</strong> junto con los mismos 4
            estrellas.
          </p>

          <p>
            Tambien vendra los reruns de los conos de luz tendrá repeticiones de
            <strong>
              Arcoíris de Largo Mayo Adornan el Cielo , Embellecen las
              Despedidas y Si el Tiempo Fuera una Flor.
            </strong>
            De los personajes mencionados anteriormente.
          </p>

          <BlogCarousel images={phase1Images} />

          <p>
            La segunda fase de Honkai: Star Rail 3.7, también contará con los
            reruns de los personajes
            <strong> Phainon , Cipher y Mydei</strong> desde el
            <strong>26 de noviembre de 2025</strong> hasta el
            <strong>16 de diciembre de 2025.</strong> junto con 4 estrellas{" "}
            <em>son Moze, Lynx y Pela.</em>.
          </p>

          <p>
            Tambien vendra los reruns de los conos de luz tendrá repeticiones de
            <strong>
              Arcoíris de Largo Mayo Adornan el Cielo , Embellecen las
              Despedidas y Si el Tiempo Fuera una Flor.
            </strong>
            De los personajes mencionados anteriormente.
          </p>

          <BlogCarousel images={phase2Images} />
        </section>

        {/* ===== COMENTARIOS ===== */}
        <section className="comentarios">
          <h3>Comentarios</h3>

          <form className="form-comentarios" id="form-comentarios">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">
                Comentario:
              </label>
              <textarea
                id="comentario"
                name="comentario"
                rows={3}
                className="form-control"
                placeholder="Escribe tu comentario..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-2">
              Enviar
            </button>
          </form>

          {/* Lista de comentarios */}
          <div className="comentario">
            <img
              src="/hsricon.jpg"
              alt="Foto de perfil"
              className="foto-perfil"
            />
            <div className="contenido-comentario">
              <span className="nombre-usuario">Ana</span>
              <p>
                Todos mis jades para Cyrene con su cono y Phainon, los amo 😍
              </p>
              <div className="acciones">
                <a href="#">Responder</a> | <a href="#">❤️ Like</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
