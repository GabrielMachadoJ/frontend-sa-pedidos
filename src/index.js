import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ScreenSizeProvider } from "./context/useScreenSize";
import { PedidoProvider } from "./context/usePedido";
import { CupomProvider } from "./context/useCupom";
import { AdressProvider } from "./context/useAdress";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ScreenSizeProvider>
    <CupomProvider>
      <PedidoProvider>
        <AdressProvider>
          <App />
        </AdressProvider>
      </PedidoProvider>
    </CupomProvider>
  </ScreenSizeProvider>
);
