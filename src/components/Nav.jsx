import { useContext } from "react";
import { Portcontext } from "./Portcontext";
//uso icons
import { FaRegUserCircle } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
//Componentes externos
import Canvascart from "./CanvasCart";
import Register from "./Register";
import Login from "./Login";
function Nav() {
  const { cart, dateuser } = useContext(Portcontext);
  console.log("datos:", dateuser);
  return (
    <div className="Nav">
      <h3 className="title">
        <span>⚡</span> Volt <span>⚡</span>
      </h3>
      <div className="user">
        <Canvascart prop={cart} />
        {dateuser?.username ? (
          <>
            <Button variant="outline-success" className="icons-nav">
              <FaRegUserCircle />
              <span>{`  ${dateuser.username} `}</span>
              <FaPowerOff />
            </Button>
          </>
        ) : (
          <>
            <Register />
            <Login />
          </>
        )}
      </div>
    </div>
  );
}
export default Nav;
