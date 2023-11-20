import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ScreenSizeProvider } from "./context/useScreenSize";
import { PedidoProvider } from "./context/usePedido";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ScreenSizeProvider>
    <PedidoProvider>
    <App />
    </PedidoProvider>
  </ScreenSizeProvider>
);
