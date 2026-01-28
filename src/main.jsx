import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ConstProvider from "./components/ConstProvider.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./pages/App.jsx";

createRoot(document.getElementById("root")).render(
  <ConstProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ConstProvider>,
);
