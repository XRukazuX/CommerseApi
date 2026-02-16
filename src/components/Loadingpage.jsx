import { useContext } from "react";
import { Portcontext } from "./Portcontext";
import Spinner from "react-bootstrap/Spinner";
import "../styles/Loadingpage.css";
function LoadingPage() {
  const { pageOpen, pageMessage } = useContext(Portcontext);
  return (
    <>
      {pageOpen ? (
        <div className="InitPage">
          <div className="LogoRay">
            <Spinner className="Entrada" animation="border" role="status" />
            <span className="Ray">⚡</span>
          </div>
          <span className="aviso">
            <span className="aviso">{pageMessage}</span>
          </span>
        </div>
      ) : null}
    </>
  );
}
export default LoadingPage;
