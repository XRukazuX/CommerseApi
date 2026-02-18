import { useContext } from "react";
import { Portcontext } from "./Portcontext";
import Button from "react-bootstrap/Button";
import "../styles/DeleteProductos.css";
function DeleteProductos() {
  const {
    deleteproduct,
    showDelete,
    nameprod,
    setNameprod,
    deleteProdBackend,
  } = useContext(Portcontext);
  console.log(nameprod.nombre);
  return (
    <>
      {deleteproduct && (
        <div className="newprod">
          <div className="form-delete">
            <h4>Eliminar Producto</h4>
            <p>Escribe el nombre exacto del producto para confirmar:</p>
            <input
              type="text"
              id="Nombre"
              value={nameprod.nombre}
              onChange={(e) => setNameprod({ nombre: e.target.value })}
              placeholder="Nombre del producto"
            />

            <Button
              variant="outline-light"
              onClick={() => deleteProdBackend(nameprod.nombre)}
              disabled={!nameprod.nombre.trim()}
            >
              Confirmar Eliminación
            </Button>
            <Button variant="outline-light" onClick={showDelete}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
export default DeleteProductos;
