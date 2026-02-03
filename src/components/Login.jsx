import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { GrUser } from "react-icons/gr";
function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button className="icons-nav" onClick={handleShow}>
        <GrUser />
      </button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Login</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>Login form</div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Login;
