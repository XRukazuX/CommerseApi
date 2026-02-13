import "../styles/App.css";
import Nav from "../components/Nav";
import FooterVolt from "../components/FooterVolt";
import Local from "../assets/Local.png";
import Local2 from "../assets/Local2.png";
//Boostrap componente
import Product from "../components/Product";
function App() {
  return (
    <>
      <div className="conteiner">
        <Nav />
        <picture>
          <source srcSet={Local2} media="(min-width: 600px)" />
          <img src={Local} alt="Imagen del local" className="local" />
        </picture>
        <Product />
        <FooterVolt />
      </div>
    </>
  );
}

export default App;
