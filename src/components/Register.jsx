import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { GrUserAdd } from "react-icons/gr";
function Register() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="icons-nav" onClick={handleShow}>
        <GrUserAdd />
      </button>
      <Offcanvas
        className="canvas"
        show={show}
        onHide={handleClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Registro</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>Registro</div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Register;
