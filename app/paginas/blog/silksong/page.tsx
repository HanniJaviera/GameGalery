import React from "react";

// Renombramos la constante de 'BlogSilksong' a 'Page' por convención del App Router de Next.js
const Page: React.FC = () => {
  return (
    <div className="blog-silksong-page">
      <main className="blog-detalle">
        <a href="/paginas/blog" className="btn-volver">
          ← Volver a Blogs
        </a>

        <article>
          <h2>Hollow Knight: Silksong</h2>

          <img
            src="/silksongimage2.jpg"
            alt="Hollow Knight Silksong"
            className="blog-img"
          />

          <p>
            ¡Encarnando a la letal cazadora Hornet, explora un reino de
            gobernado por la seda y el canto! Tras ser capturada y llevada a un
            mundo desconocido, prepárate para luchar contra poderosos enemigos y
            resolver misterios mientras asciendes en un peregrinaje mortal hasta
            la cima del reino.
          </p>

          <p>
            Además, te enfrentarás a más de 40 jefes legendarios en combates
            épicos que definirán el destino del reino y podrás poner a prueba
            tus habilidades en el modo Alma de acero una vez conquistado. La
            experiencia se complementa con una impresionante partitura orquestal
            del galardonado compositor Christopher Larkin.
          </p>
        </article>

        <section className="blog-seccion">
          <h3>Hollow Knight Silksong estrena su parche 2</h3>

          <img
            src="/silksongup.jpg"
            alt="Hollow Knight Silksong estrena su parche 2"
            className="blog-img"
          />

          <p>
            <strong>Team Cherry</strong> lanza la segunda actualización de{" "}
            <strong>Hollow Knight Silksong</strong> a través de la beta pública
            de Steam: esto es todo lo que cambia en el juego.
          </p>

          <img
            src="/silksong.gif"
            alt="Hollow Knight Silksong estrena su parche 2"
            className="blog-img"
          />

          <p>
            A pesar de todo, el metroidvania de <strong>Team Cherry</strong>{" "}
            <em>no es perfecto</em>. Muchos se han quejado por su extrema
            dificultad, así que el estudio ha lanzado <em>un primer parche</em>{" "}
            que nerfea a los primeros jefes de la aventura.
          </p>

          <img
            src="/silksongimage.jpg"
            alt="Hollow Knight Silksong estrena su parche 2"
            className="blog-img"
          />
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
              />
            </div>

            <button type="submit" className="btn-2">
              Enviar
            </button>
          </form>

          {/* Lista de comentarios */}
          <div className="comentario">
            <img
              src="https://i.pinimg.com/736x/97/b8/33/97b8332facafa2cab4793e651a2e8c0e.jpg"
              alt="Foto de perfil"
              className="foto-perfil"
            />
            <div className="contenido-comentario">
              <span className="nombre-usuario">Patrick</span>
              <p>
                Gracias a dios por la actualización, me cuesta pasarme los jefes
                finales.
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
