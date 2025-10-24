import React from "react";

//CSS

// Componentes
import MiNavbar from "../../../components/MiNavbar";
import MiFooter from "../../../components/MiFooter";

// Usamos el nombre del componente 'BlogsPage' o 'Page' (depende de tu convención, usaremos Page)
const Page: React.FC = () => {
  return (
    <div id="pagina-nosotros">
      <main>
        <h1 className="titulo-noticias">NOTICIAS IMPORTANTES</h1>

        {/* Noticia 1: Honkai: Star Rail 3.6 */}
        <section className="noticia">
          <div className="noticia-texto">
            <h2>Honkai: Star Rail 3.7</h2>
            <p>
              Honkai: Star Rail 3.7 se lanzará el 4 de noviembre de 2025 para el
              servidor de Norteamérica y el 5 de noviembre de 2025 para los
              servidores de Europa y Asia. Consulta los banners, personajes,
              noticias de marketing y otras novedades sobre la versión 3.7.
            </p>
            {/* Consejo: Reemplazar con <Link to="/blogs/honkai"> */}
            <a href="/paginas/bloghonkai">
              <button className="btn-ver-nt1">VER MÁS</button>
            </a>
          </div>
          <div className="noticia-imagen">
            <img
              src="https://fastcdn.hoyoverse.com/content-v2/hkrpg/159409/39aae3f9287ec90fd5f9d1dcbe113bad_1446011171349407682.jpg"
              alt="Imagen noticia 1"
            />
          </div>
        </section>

        {/* Noticia 2: Hollow Knight: Silksong */}
        <section className="noticia">
          <div className="noticia-texto">
            <h2>Hollow Knight: Silksong</h2>
            <p>
              Hollow Knight: Silksong ya está disponible a partir del 4 de
              septiembre de 2025. Su lanzamiento fue simultáneo a nivel mundial
              en todas las plataformas.
            </p>
            {/* Consejo: Reemplazar con <Link to="/blogs/silksong"> */}
            <a href="/paginas/blogsilksong">
              <button className="btn-ver-nt2">VER MÁS</button>
            </a>
          </div>
          <div className="noticia-imagen">
            <img
              src="https://lootlevelchill.com/wp-content/uploads/2025/04/Hollow-Knight-Silksong.webp"
              alt="Imagen noticia 2"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
