import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ScreenSizeProvider } from "./context/useScreenSize";
import { PedidoProvider } from "./context/usePedido";
import { CupomProvider } from "./context/useCupom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ScreenSizeProvider>
    <CupomProvider>
      <PedidoProvider>
        <App />
      </PedidoProvider>
    </CupomProvider>
  </ScreenSizeProvider>
);
