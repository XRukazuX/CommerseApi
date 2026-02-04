import "../styles/App.css";
import Nav from "../components/Nav";
import { useContext } from "react";
import { Portcontext } from "../components/Portcontext";
import Local from "../assets/Local.png";
import Local2 from "../assets/Local2.png";
//Boostrap componente
import Card from "react-bootstrap/Card";
function App() {
  const { Product } = useContext(Portcontext);
  console.log("Producto", Product);
  return (
    <>
      <Nav />
      <picture>
        <source srcSet={Local2} media="(min-width: 600px)" />
        <img src={Local} alt="Imagen del local" className="local" />
      </picture>
      <div className="conteiner">
        <div className="Product">
          {Product.map((product, index) => {
            return (
              <Card style={{ width: "18rem" }} key={index}>
                <Card.Img variant="top" src={product.imagen} />
                <Card.Body>
                  <Card.Title>{product.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {`${product.costo} $`}
                  </Card.Subtitle>
                  <Card.Text>{product.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
