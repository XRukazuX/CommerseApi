import { useState } from "react";
export default function Notification() {
  const [close, Useclose] = useState(true);
  return (
    <>
      {close && (
        <div>
          <div className="demo-notice">
            <h4>⚠️ Aviso de demostración</h4>

            <p>
              Este sitio es una demo creada únicamente con fines de prueba.
              Utiliza un correo ficticio o de prueba y no introduzcas datos
              personales de otras personas.
            </p>

            <p>
              No utilices contraseñas reales. Las cuentas solo sirven para
              probar el registro, inicio de sesión y carrito. No existen compras
              ni pagos reales.
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
