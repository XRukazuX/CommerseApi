import "../styles/App.css";
import Nav from "../components/Nav";
import { useContext } from "react";
import { Portcontext } from "../components/Portcontext";

//Boostrap componente
function App() {
  const { Product } = useContext(Portcontext);
  console.log("Producto", Product);
  return (
    <>
      <Nav />
      <div className="conteiner">
        <div className="Product">
          {Product.map((product, index) => {
            return <img key={index} src={product.imagen}></img>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
