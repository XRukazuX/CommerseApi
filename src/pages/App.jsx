import "../styles/App.css";
import { useContext } from "react";
import { Portcontext } from "../components/Portcontext";
//uso icons
import { FaShoppingCart } from "react-icons/fa";
import { GrUserAdd, GrUser } from "react-icons/gr";

function App() {
  const { cart } = useContext(Portcontext);
  return (
    <>
      <div className="conteiner">
        <div className="Nav">
          <h3 className="title">
            <span>⚡</span> Volt <span>⚡</span>
          </h3>
          <div className="user">
            <button className="icons-nav">
              <FaShoppingCart />
              <span>{`:${cart.length}`}</span>
            </button>
            <button className="icons-nav">
              <GrUserAdd />
            </button>
            <button className="icons-nav">
              <GrUser />
            </button>
          </div>
        </div>
        <div className="Product">Product</div>
      </div>
    </>
  );
}

export default App;
