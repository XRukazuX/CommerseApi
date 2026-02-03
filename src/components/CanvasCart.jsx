import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
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
        <Offcanvas.Body>Items de carrito</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Canvascart;
