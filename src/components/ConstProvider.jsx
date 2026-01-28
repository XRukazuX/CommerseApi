import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Portcontext } from "./Portcontext";
function ConstProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [Product, setProduct] = useState([]); //Constante donde se guardara los datos de product
  const [Token, setToken] = useState(""); //Cuando obtenga un token este se guardara aqui
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState({ email: "", password: "" });
  const [cart, userCart] = useState([]);
  const handleRegister = async () => {
    if (!register.username || !register.email || !register.password) {
      console.log("Faltan datos");
      return;
    }

    try {
      const res = await axios.post(
        "https://apicommerce.onrender.com/api/register",
        register,
      );

      console.log(res.data);
    } catch (error) {
      console.error("Error POST:", error.response?.data || error.message);
    }
  }; //Colocar en un boton y solo cargar los datos si existen las cosas de register
  useEffect(() => {
    axios
      .get("https://apicommerce.onrender.com/api/product")
      .then((res) => setProduct(res.data))
      .catch((error) => console.log(error));
  }, []); //Obteniendo Productos
  console.log(Product);

  return <Portcontext.Provider value={{}}>{children}</Portcontext.Provider>;
}

export default ConstProvider;
