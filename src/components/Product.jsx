import { useContext } from "react";
import { Portcontext } from "./Portcontext";
import Card from "react-bootstrap/Card";
function Product() {
  const { Product, Compra, Token, closenewproduct } = useContext(Portcontext);
  return (
    <>
      <section className="Product-Title">
        <h3>Productos</h3>
        {Token && (
          <button onClick={closenewproduct} id="Add" variant="outline-success">
            +
          </button>
        )}
      </section>
      <div className="Conteiner-Product">
        <div className="Product">
          {Product.map((product, index) => {
            return (
              <Card
                style={{ width: "18rem" }}
                key={index}
                onClick={() => Compra(product)}
              >
                <Card.Img
                  variant="top"
                  src={product.imagen}
                  className="card-imagen"
                />
                <Card.Body>
                  <Card.Title>{product.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {`${product.costo} $`}
                  </Card.Subtitle>
                  <Card.Text id="detail">{product.descripcion}</Card.Text>
                </Card.Body>
                <section className="action">+</section>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Product;
