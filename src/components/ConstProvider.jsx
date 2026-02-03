import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Portcontext } from "./Portcontext";
function ConstProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [Product, setProduct] = useState([]); //Constante donde se guardara los datos de product
  const [dateuser, setDateUser] = useState({});
  const [Token, setToken] = useState(""); //Cuando obtenga un token este se guardara aqui
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState({ email: "", password: "" });
  const [cart, setCart] = useState([]);
  const Compra = (id) => {
    //Se Comprueba que el contenido no este ya en la lista
    setCart((cart) => {
      const existe = cart.find((p) => p.id === id);

      if (existe) {
        return cart.map((p) =>
          p.id === id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
                subtotal: (p.cantidad + 1) * p.price,
              }
            : p,
        );
      }

      return [
        ...cart,
        {
          ...producto,
          cantidad: 1,
          subtotal: producto.price,
        },
      ];
    });
  };
  const eliminarProducto = (id) => {
    setCart((cart) => cart.filter((p) => p.id !== id));
  };
  const quitarProducto = (id) => {
    setCart((cart) =>
      cart
        .map((p) =>
          p.id === id
            ? {
                ...p,
                cantidad: p.cantidad - 1,
                subtotal: (p.cantidad - 1) * p.price,
              }
            : p,
        )
        .filter((p) => p.cantidad > 0),
    );
  };
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
  const login = async () => {
    if (!user.email || !user.password) {
      console.log("Faltan datos");
      return;
    }

    try {
      const res = await axios.post(
        "https://apicommerce.onrender.com/api/login",
        user,
      );

      console.log(res.data);
      const token = res.data.token; // 👈 depende del backend
      setToken(token);

      // opcional: persistir
      localStorage.setItem("token", token);
      console.log("Login OK, token guardado");
    } catch (error) {
      console.error("Error POST:", error.response?.data || error.message);
    }
  }; //Colocar en un boton y solo cargar los datos si existen las cosas de register
  const loginOff = () => {
    if (Token) {
      localStorage.removeItem("Token");
      setRegister({ email: "", password: "" });
      setDateUser({});
    }
  };
  useEffect(() => {
    axios
      .get("https://apicommerce.onrender.com/api/product")
      .then((res) => setProduct(res.data))
      .catch((error) => console.log(error));
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []); //Obteniendo Productos
  useEffect(() => {
    if (!Token) return; // evita hacer la request sin token

    axios
      .get("https://apicommerce.onrender.com/api/profile", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setDateUser(res.data.user); // si quieres guardar los datos del usuario
        setCart(res.data.user.cart);
      })
      .catch((err) => {
        console.error(
          "Error al obtener perfil:",
          err.response?.data || err.message,
        );
      });
  }, [Token]); // Si se tiene token o obtiene iniciara login y obtendra los datos del usuario y su carrito ya registrado
  console.log(Token);
  console.log(Product);
  //usuario de prueba esta en mongo, pass :"hola"
  return (
    <Portcontext.Provider value={{ cart }}>{children}</Portcontext.Provider>
  );
}

export default ConstProvider;
