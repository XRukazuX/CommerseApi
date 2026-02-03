import { useContext } from "react";
import { Portcontext } from "./Portcontext";
//uso icons

//Componentes externos
import Canvascart from "./CanvasCart";
import Register from "./Register";
import Login from "./Login";
function Nav() {
  const { cart } = useContext(Portcontext);
  return (
    <div className="Nav">
      <h3 className="title">
        <span>⚡</span> Volt <span>⚡</span>
      </h3>
      <div className="user">
        <Canvascart prop={cart} />
        <Register />
        <Login />
      </div>
    </div>
  );
}
export default Nav;
