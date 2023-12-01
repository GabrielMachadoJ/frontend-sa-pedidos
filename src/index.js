import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ScreenSizeProvider } from "./context/useScreenSize";
import { PedidoProvider } from "./context/usePedido";
import { RestauranteProvider } from "./context/useRestaurante";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RestauranteProvider>
    <ScreenSizeProvider>
      <PedidoProvider>
          <App />
      </PedidoProvider>
    </ScreenSizeProvider>
  </RestauranteProvider>
);
