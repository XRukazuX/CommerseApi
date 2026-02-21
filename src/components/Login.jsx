import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useContext } from "react";
import { GrUser } from "react-icons/gr";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
//Direcciones para el providers
import { Portcontext } from "./Portcontext";
function Login() {
  const [eye, setEye] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { handleChangelogin, user, login, loadinglogin } =
    useContext(Portcontext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  return (
    <>
      <Button
        variant="outline-primary"
        className="icons-nav"
        onClick={handleShow}
      >
        <GrUser />
      </Button>
      <Offcanvas id="canvas" show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Login</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="canvasbody">
          <div id="conteiner-form">
            <form onSubmit={handleSubmit} id="Formulario" autoComplete="off">
              <section>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  maxLength="30"
                  value={user.email}
                  onChange={handleChangelogin}
                  required
                />
              </section>
              <section className="visible">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type={eye ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  maxLength="15"
                  minLength="4"
                  value={user.password}
                  onChange={handleChangelogin}
                  required
                />
                {eye ? (
                  <FaEye onClick={() => setEye(!eye)} className="eyes" />
                ) : (
                  <FaEyeSlash onClick={() => setEye(!eye)} className="eyes" />
                )}
              </section>
              <Button
                variant="outline-light"
                type="submit"
                disabled={loadinglogin === true}
              >
                Enviar
              </Button>
              {loadinglogin ? (
                <Button variant="secondary" disabled>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually">
                    {loadinglogin !== true ? loadinglogin : "Cargando ..."}
                  </span>
                </Button>
              ) : (
                ""
              )}
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Login;
