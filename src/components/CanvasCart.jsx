import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Card from "react-bootstrap/Card";
function Canvascart({ prop }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(prop);
  return (
    <>
      <button className="icons-nav" onClick={handleShow}>
        <FaShoppingCart />
        <span>{`:${prop.length}`}</span>
      </button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
                        {`${product.costo} $`}
                      </Card.Subtitle>
                      <Card.Text>{product.descripcion}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Canvascart;
