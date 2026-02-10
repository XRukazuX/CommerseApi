import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { GrUserAdd } from "react-icons/gr";
//Direcciones para el providers
import { useContext, useState } from "react";
import { Portcontext } from "./Portcontext";
import "../styles/Register.css";
function Register() {
  const { handleChange, register } = useContext(Portcontext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos recogidos por el formulario", register);
  };
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
          <div id="conteiner-form">
            <form onSubmit={handleSubmit} id="Formulario" autoComplete="off">
              <section>
                <label htmlFor="username">Nombre:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="off"
                  placeholder="Nombre"
                  maxLength="10"
                  value={register.username}
                  onChange={handleChange}
                  required
                />
              </section>

              <section>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  maxLength="30"
                  value={register.email}
                  onChange={handleChange}
                  required
                />
              </section>

              <section>
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  maxLength="15"
                  minLength="4"
                  placeholder="Contraseña (min:4 caracteres)"
                  value={register.password}
                  onChange={handleChange}
                  required
                />
              </section>

              <Button variant="outline-primary" type="submit">
                Primary
              </Button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Register;
