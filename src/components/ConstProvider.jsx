import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Portcontext } from "./Portcontext";
function ConstProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [deleteproduct, setDeleteproduct] = useState(false);
  const [nameprod, setNameprod] = useState({ nombre: "" });
  const [pageOpen, setPageOpen] = useState(true);
  const [newProd, setNewProd] = useState(false);
  const [newProdLoading, setNewProdLoading] = useState(false);
  const [loadinglogin, setLoadinglogin] = useState(false);
  const [pageMessage, setPageMessage] = useState(
    "Abriendo Volt, Por favor espere un momento.",
  );
  const [Product, setProduct] = useState([]); //Constante donde se guardara los datos de product
  const [dateuser, setDateUser] = useState({});
  const [Token, setToken] = useState(""); //Cuando obtenga un token este se guardara aqui
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addproduct, setAddproduct] = useState({
    nombre: "",
    costo: "",
    descripcion: "",
    imagen: "",
  });
  const [user, setUser] = useState({ email: "", password: "" });
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("Carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const showDelete = () => setDeleteproduct(!deleteproduct);
  const saveCartToBackend = async (updatedCart) => {
    if (!Token) return;

    try {
      await axios.post(
        "https://apicommerce.onrender.com/api/cart",
        { cart: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      );
      console.log("Carrito sincronizado con backend");
    } catch (error) {
      console.error(
        "Error guardando carrito:",
        error.response?.data || error.message,
      );
    }
  };
  const closenewproduct = () => {
    setNewProd(!newProd);
  };
  //Para cambiar cualquier dato en register
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangelogin = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeprod = (e) => {
    const { name, value } = e.target;
    setAddproduct((prev) => ({
      ...prev,
      [name]: name === "costo" ? Number(value) : value,
    }));
  };
  //Funciones para acciones de compra
  const Compra = (product) => {
    //Se Comprueba que el contenido no este ya en la lista
    setCart((cart) => {
      const existe = cart.find((p) => p._id === product._id);

      if (existe) {
        return cart.map((p) =>
          p._id === product._id
            ? {
                ...p,
                cantidad: p.cantidad + 1,
                subtotal: (p.cantidad + 1) * p.costo,
              }
            : p,
        );
      }

      return [
        ...cart,
        {
          ...product,
          cantidad: 1,
          subtotal: product.costo,
        },
      ];
    });
  };
  const eliminarProducto = (id) => {
    setCart((cart) => cart.filter((p) => p._id !== id));
  };
  const quitarProducto = (id) => {
    setCart((cart) =>
      cart
        .map((p) =>
          p._id === id
            ? {
                ...p,
                cantidad: p.cantidad - 1,
                subtotal: (p.cantidad - 1) * p.costo,
              }
            : p,
        )
        .filter((p) => p.cantidad > 0),
    );
  };
  const total = useMemo(
    () => parseFloat(cart.reduce((acc, p) => acc + p.subtotal, 0).toFixed(2)),
    [cart],
  );
  const deleteProdBackend = async () => {
    if (!Token || !nameprod) return;
    try {
      await axios.delete(
        "https://apicommerce.onrender.com/api/deleteproduct",

        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          data: { nombre: nameprod.nombre },
        },
      );
      console.log(`Producto '${nameprod.nombre}' eliminado ✅`);
      addProd();
      showDelete();
    } catch (error) {
      console.error("error", error.response?.data.message || error.message);
      alert("Producto no encontrado");
    } finally {
      setNameprod({ nombre: "" });
    }
  };
  function mergeCarts(localCart, serverCart) {
    // Creamos una copia del carrito local
    const mergedCart = [...localCart];

    serverCart.forEach((serverItem) => {
      // Buscamos si ya existe en el carrito local
      const existingIndex = mergedCart.findIndex(
        (p) => p._id === serverItem._id,
      );

      if (existingIndex !== -1) {
        // Si existe, sumamos cantidades y recalculamos subtotal
        mergedCart[existingIndex].cantidad += serverItem.cantidad;
        mergedCart[existingIndex].subtotal =
          mergedCart[existingIndex].cantidad * mergedCart[existingIndex].costo;
      } else {
        // Si no existe, lo agregamos tal cual
        mergedCart.push(serverItem);
      }
    });

    return mergedCart;
  } //crea un cart unico entre el cart local y el que saldra del api poner las variables dadas
  //console.log(total);
  //Acciones para registro y login
  const handleRegister = async () => {
    if (!register.username || !register.email || !register.password) {
      console.log("Faltan datos");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://apicommerce.onrender.com/api/register",
        register,
      );
      console.log(res.data);
      setLoading(false);
      setRegister({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading("El usuario ya existe");
      console.error("Error POST:", error.response?.data || error.message);
    }
  }; //Colocar en un boton y solo cargar los datos si existen las cosas de register
  const login = async () => {
    if (!user.email || !user.password) {
      console.log("Faltan datos");
      return;
    }
    setLoadinglogin(true);
    try {
      const res = await axios.post(
        "https://apicommerce.onrender.com/api/login",
        user,
      );

      console.log(res.data.message);
      const token = res.data.token; // 👈 depende del backend
      setToken(token);
      setLoadinglogin(false);
      setUser({ email: "", password: "" });
      // opcional: persistir
      localStorage.setItem("Token", token);

      console.log("Login OK, token guardado");
    } catch (error) {
      setLoadinglogin("Datos invalidos.");
      console.error("Error POST:", error.response?.data || error.message);
      console.log(loadinglogin);
    }
  }; //Colocar en un boton y solo cargar los datos si existen las cosas de register
  const [saving, setSaving] = useState(false);

  const handleSaveCart = async () => {
    if (!Token) return;
    setSaving(true);
    try {
      await saveCartToBackend(cart);
      console.log("Carrito guardado en el servidor ✅");
    } catch {
      console.log("No se pudo guardar el carrito 😢");
    } finally {
      setSaving(false);
    }
  };

  const loginOff = async () => {
    if (!Token) return;

    try {
      // Intentamos guardar el carrito actual en el backend
      await saveCartToBackend(cart);
      console.log("Carrito guardado antes de cerrar sesión");
    } catch (error) {
      console.error(
        "No se pudo guardar el carrito antes de cerrar sesión:",
        error,
      );
      // Aquí puedes decidir: ¿cerrar sesión de todos modos o abortar?
      // En este ejemplo, seguimos limpiando aunque falle la sincronización
    } finally {
      // Limpiamos estado y token
      localStorage.removeItem("Token");
      setToken("");
      setRegister({ email: "", password: "" });
      setDateUser({});
      console.log("Usuario deslogueado");
    }
  };
  const addProd = async () => {
    setPageOpen(true);
    setPageMessage("Abriendo Volt, Por favor espere un momento.");
    try {
      const { data } = await axios.get(
        "https://apicommerce.onrender.com/api/product",
      );

      setProduct(data);
      setPageOpen(false);
      const token = localStorage.getItem("Token");
      if (token) {
        setToken(token);
      }
    } catch (error) {
      setPageOpen(true);
      setPageMessage("Error al Abrir la tienda.");
      console.error(error);
    }
  };
  const enviarProducto = async () => {
    if (!Token) return;
    setNewProdLoading(true);
    try {
      const response = await axios.post(
        "https://apicommerce.onrender.com/api/newproduct", // URL de la API
        addproduct, // datos que envías
        {
          headers: {
            Authorization: `Bearer ${Token}`, // ⚡ token en header
            "Content-Type": "application/json", // asegurarse de enviar JSON
          },
        },
      );
      setProduct([]);
      setAddproduct({
        nombre: "",
        costo: 0,
        descripcion: "",
        imagen: "",
      });
      setNewProd(false);
      addProd();
      console.log("Producto creado:", response.data);
    } catch (error) {
      console.error(
        "Error al crear producto:",
        error.response?.data || error.message,
      );
      alert("No se Pudo cargar el nuevo producto");
    } finally {
      setNewProdLoading(false);
    }
  };
  useEffect(() => {
    localStorage.setItem("Carrito", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    addProd();
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
        // carrito del backend
        const serverCart = res.data.user.cart || [];

        // hacemos merge con el cart actual (offline)
        setCart((prevCart) => {
          const merged = mergeCarts(prevCart, serverCart);

          // 🔥 Guardamos UNA sola vez después del merge
          if (JSON.stringify(prevCart) !== JSON.stringify(merged)) {
            saveCartToBackend(merged);
          }

          return merged;
        });
      })
      .catch((err) => {
        console.error(
          "Error al obtener perfil:",
          err.response?.data || err.message,
        );
        localStorage.removeItem("Token");
        setToken("");
        setDateUser({});
      });
  }, [Token]); // Si se tiene token o obtiene iniciara login y obtendra los datos del usuario y su carrito ya registrado.
  console.log(Product);
  return (
    <Portcontext.Provider
      value={{
        dateuser,
        cart,
        Product,
        Compra,
        eliminarProducto,
        quitarProducto,
        handleChange,
        register,
        handleRegister,
        loading,
        handleChangelogin,
        user,
        login,
        loadinglogin,
        loginOff,
        total,
        handleSaveCart,
        Token,
        saving,
        newProd,
        closenewproduct,
        addproduct,
        handleChangeprod,
        enviarProducto,
        newProdLoading,
        pageOpen,
        pageMessage,
        deleteproduct,
        showDelete,
        nameprod,
        setNameprod,
        deleteProdBackend,
      }}
    >
      {children}
    </Portcontext.Provider>
  );
}

export default ConstProvider;
