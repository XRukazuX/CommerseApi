import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { GrUserAdd } from "react-icons/gr";
//Direcciones para el providers
import { useContext } from "react";
import { Portcontext } from "./Portcontext";
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
          <div>
            <form onSubmit={handleSubmit} id="Formulario">
              <div>
                <section>
                  <label>Nombre:</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Nombre"
                    value={register.username}
                    onChange={handleChange}
                    required
                  />
                </section>
                <section>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email: xxxx@gmail.com"
                    value={register.email}
                    onChange={handleChange}
                    required
                  />
                </section>
                <section>
                  <label>Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={register.password}
                    onChange={handleChange}
                    required
                  />
                </section>
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Register;
