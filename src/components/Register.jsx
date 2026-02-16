import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { GrUserAdd } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

//Direcciones para el providers
import { useContext, useState } from "react";
import { Portcontext } from "./Portcontext";
import "../styles/Register.css";
function Register() {
  const [eye, setEye] = useState(true);
  const { handleChange, register, handleRegister, loading } =
    useContext(Portcontext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos recogidos por el formulario", register);
    handleRegister();
  };
  const calcularSeguridad = (password) => {
    let puntos = 0;

    if (!password) return 0;

    // Tiene minúsculas
    if (/[a-z]/.test(password)) puntos += 25;

    // Tiene mayúsculas
    if (/[A-Z]/.test(password)) puntos += 25;

    // Tiene números
    if (/[0-9]/.test(password)) puntos += 25;

    // Longitud mínima para maxima
    if (password.length >= 6) puntos += 25;

    return puntos;
  };
  const seguridad = calcularSeguridad(register.password);
  return (
    <>
      <Button
        variant="outline-primary"
        className="icons-nav"
        onClick={handleShow}
      >
        <GrUserAdd />
      </Button>
      <Offcanvas id="canvas" show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Registro</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="canvasbody">
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

              <section className="visible">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type={eye ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="off"
                  maxLength="15"
                  minLength="4"
                  placeholder="Contraseña (Min: 4 caracteres)"
                  value={register.password}
                  onChange={handleChange}
                  required
                />

                {eye ? (
                  <FaEye onClick={() => setEye(!eye)} className="eyes" />
                ) : (
                  <FaEyeSlash onClick={() => setEye(!eye)} className="eyes" />
                )}
              </section>
              {seguridad > 0 && (
                <>
                  <input
                    type="range"
                    name="segurity"
                    id="segurity"
                    min="0"
                    max="100"
                    readOnly
                    value={calcularSeguridad(register.password)}
                    style={{
                      accentColor:
                        seguridad <= 25
                          ? "red"
                          : seguridad <= 50
                            ? "orange"
                            : seguridad <= 75
                              ? "yellow"
                              : "green",
                      background: `linear-gradient(to right, 
      ${
        seguridad <= 25
          ? "red"
          : seguridad <= 50
            ? "orange"
            : seguridad <= 75
              ? "yellow"
              : "green"
      } 
      ${seguridad}%, 
      #ddd ${seguridad}%)`,
                    }}
                  />
                  <span
                    className="nivel"
                    style={{
                      background: `${
                        seguridad <= 25
                          ? "red"
                          : seguridad <= 50
                            ? "orange"
                            : seguridad <= 75
                              ? "yellow"
                              : "green"
                      } `,
                      color: ` ${
                        seguridad <= 25
                          ? "white"
                          : seguridad <= 50
                            ? "white"
                            : seguridad <= 75
                              ? "black"
                              : "white"
                      } `,
                    }}
                  >{` ${
                    seguridad <= 25
                      ? "Insegura"
                      : seguridad <= 50
                        ? "Débil"
                        : seguridad <= 75
                          ? "Buena"
                          : "Fuerte"
                  } `}</span>
                </>
              )}
              <Button
                variant="outline-light"
                type="submit"
                disabled={loading === true}
              >
                Enviar
              </Button>
              {loading ? (
                <Button variant="secondary" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {loading !== true ? loading : "Cargando ..."}
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
export default Register;
