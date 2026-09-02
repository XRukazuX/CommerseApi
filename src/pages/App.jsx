import "../styles/App.css";
import Nav from "../components/Nav";
import FooterVolt from "../components/FooterVolt";
import Local from "../assets/Local.png";
import Local2 from "../assets/Local2.png";
//Boostrap componente
import Notification from "../components/Notification";
import Product from "../components/Product";
import PostNewProduct from "../components/PostNewProduct";
import LoadingPage from "../components/Loadingpage";
import DeleteProductos from "../components/DeleteProductos";
function App() {
  return (
    <>
      <div className="conteiner">
        <Nav />
        <Notification />
        <picture>
          <source srcSet={Local2} media="(min-width: 600px)" />
          <img src={Local} alt="Imagen del local" className="local" />
        </picture>
        <Product />
        <FooterVolt />
        <PostNewProduct />
        <LoadingPage />
        <DeleteProductos />
      </div>
    </>
  );
}

export default App;
