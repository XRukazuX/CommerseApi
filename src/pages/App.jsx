import "../styles/App.css";
import { useContext } from "react";
import { Portcontext } from "../components/Portcontext";
function App() {
  const { test1 } = useContext(Portcontext);
  return (
    <>
      <div className="conteiner">
        <div className="Nav">
          <h3>⚡ Volt ⚡</h3>
          <div>
            <section>register</section>
            <section>login</section>
            <section>cart</section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
