import { useState } from "react";
export default function Notification() {
  const [close, Useclose] = useState(true);
  return (
    <>
      {close && (
        <div className="init-notification">
          <div className="demo-notice">
            <strong>⚠️ Aviso de demostración</strong>
            <p>
              Este sitio es una demo creada únicamente con fines de prueba.
              Utiliza un correo ficticio;
              <strong>
                no introduzcas datos personales, reales ni de terceros
              </strong>
              .
            </p>
            <p>
              <strong>No utilices contraseñas reales.</strong>
              Las cuentas solo sirven para probar el registro, inicio de sesión
              y carrito.
              <strong>No se realizan compras ni pagos reales.</strong>
            </p>
            <button className="entendido" onClick={() => Useclose(!close)}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
