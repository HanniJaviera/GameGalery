import React from "react";

const NosotrosPage: React.FC = () => {
  return (
    <div id="pagina-nosotros">
      <main className="main-content">
        <h1 className="titulo-nosotros">SOBRE NOSOTROS</h1>

        <section className="nosotros">
          <div className="nosotros-texto">
            <h2>GAME GALERY</h2>

            <p>
              En Game Gallery, nuestra misión es conectar a los jugadores con
              las mejores experiencias de videojuegos del mundo. Fundada en
              2025, hemos crecido hasta convertirnos en una plataforma líder
              donde desarrolladores y gamers encuentran un espacio para
              compartir, descubrir y disfrutar de títulos de todos los géneros y
              tamaños.
            </p>
          </div>
          <div className="nosotros-imagen">
            <img src="/icono2.png" alt="Logo" />
          </div>
        </section>

        <section className="desarrolladoras">
          <h2>DESARROLLADORAS</h2>
          <div className="dev-container">
            <div className="dev">
            <a href="https://github.com/HanniJaviera" target="_blank" rel="noopener noreferrer">
                <img src="/JaviRamirez.jpg" alt="Desarrolladora 1" />
            </a>
              <p>Javiera Ramirez</p>
            </div>

            <div className="dev">
            <a href="https://github.com/GenAlarcon" target="_blank" rel="noopener noreferrer">
                <img src="/GenaAlarcon.jpg" alt="Desarrolladora 2" />
            </a>
              <p>Genara Alarcón</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NosotrosPage;
