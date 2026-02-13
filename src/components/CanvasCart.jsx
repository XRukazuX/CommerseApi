import { useContext } from "react";
import { Portcontext } from "./Portcontext";
import { useState } from "react";
import "../styles/CanvasCart.css";
//dependencias externas
import { FaShoppingCart } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
function Canvascart({ prop }) {
  const {
    eliminarProducto,
    quitarProducto,
    Compra,
    total,
    handleSaveCart,
    Token,
    saving,
  } = useContext(Portcontext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        variant="outline-primary"
        className="icons-nav"
        onClick={handleShow}
      >
        <FaShoppingCart />
        <span>{`: ${prop.length}`}</span>
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end" id="carrito">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>

          {Token && (
            <Button
              variant="outline-success"
              onClick={handleSaveCart}
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar carrito"}
            </Button>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body className="cart-body">
          {prop.length == 0 ? (
            "Carrito vacio"
          ) : (
            <>
              {prop.map((product, index) => {
                return (
                  <Card style={{ width: "18rem" }} key={index}>
                    <Card.Img
                      variant="top"
                      src={product.imagen}
                      className="card-imagen"
                    />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {`${product.subtotal.toFixed(2)}$ `}
                      </Card.Subtitle>
                      <Card.Text>
                        <Button
                          variant="outline-warning"
                          onClick={() => quitarProducto(product._id)}
                        >
                          −
                        </Button>
                        <span>{product.cantidad}</span>
                        <Button
                          variant="outline-success"
                          onClick={() => Compra(product)}
                        >
                          +
                        </Button>
                      </Card.Text>
                    </Card.Body>
                    <button
                      className="Eliminar"
                      onClick={() => eliminarProducto(product._id)}
                    >
                      X
                    </button>
                  </Card>
                );
              })}
              <Button variant="outline-success">{`Total: ${total} $`}</Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Canvascart;
