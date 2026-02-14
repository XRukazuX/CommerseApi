import "../styles/App.css";
import Nav from "../components/Nav";
import FooterVolt from "../components/FooterVolt";
import Local from "../assets/Local.png";
import Local2 from "../assets/Local2.png";
//Boostrap componente
import Product from "../components/Product";

import { useContext } from "react";
import { Portcontext } from "../components/Portcontext";
import Button from "react-bootstrap/Button";

function App() {
  const { newProd, closenewproduct, addproduct, handleChangeprod } =
    useContext(Portcontext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos recogidos por el formulario", addproduct);
  };
  return (
    <>
      <div className="conteiner">
        <Nav />
        <picture>
          <source srcSet={Local2} media="(min-width: 600px)" />
          <img src={Local} alt="Imagen del local" className="local" />
        </picture>
        <Product />
        <FooterVolt />
        {newProd && (
          <div className="newprod">
            <div className="Form-prod">
              <button className="EliminarAddprod" onClick={closenewproduct}>
                X
              </button>
              <div className="content-vista">
                {addproduct.imagen ? (
                  <img
                    src={addproduct.imagen}
                    alt="Imagen del producto"
                    className="vistaprevia"
                    onError={(e) => {
                      e.target.style.display = "none"; // oculta si falla
                    }}
                  />
                ) : (
                  <span className="text-previa">Vista Previa</span>
                )}
              </div>
              <h3>Datos del Producto</h3>
              <form id="addnew" onSubmit={handleSubmit}>
                <div className="datos">
                  <section>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      autoComplete="off"
                      placeholder="Nombre"
                      maxLength="20"
                      value={addproduct.nombre}
                      onChange={handleChangeprod}
                      required
                    />
                  </section>
                  <section>
                    <label htmlFor="costo">Precio:</label>
                    <input
                      type="number"
                      id="costo"
                      name="costo"
                      autoComplete="off"
                      placeholder="Nombre"
                      maxLength="6"
                      value={addproduct.costo}
                      onChange={handleChangeprod}
                      required
                    />
                  </section>
                  <section>
                    <label htmlFor="imagen">Link de Imagen:</label>
                    <input
                      type="text"
                      id="imagen"
                      name="imagen"
                      autoComplete="off"
                      placeholder="Link de Imagen"
                      value={addproduct.imagen}
                      onChange={handleChangeprod}
                      required
                    />
                  </section>
                  <section>
                    <label htmlFor="descripcion">{`Descripcion ${addproduct.descripcion.length}/150 :`}</label>
                    <textarea
                      type="text"
                      id="descripcion"
                      name="descripcion"
                      autoComplete="off"
                      placeholder="Descripcion"
                      maxLength="150"
                      value={addproduct.descripcion}
                      onChange={handleChangeprod}
                      required
                    />
                  </section>
                </div>
                <Button variant="outline-success" type="submit">
                  Publicar
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
