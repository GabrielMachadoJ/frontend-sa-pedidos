import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import Restaurant from "../pages/restaurant";
import { useEffect } from "react";
import PedidosPage from "../pages/pedidos";

const isAuthenticated = () => {
  const token = localStorage.getItem("user");
  return token ? true : false;
};

const ProtectedRoute = ({ element, path }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/" replace state={{ from: path }} />
  );
};

export function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route
          index
          path="/home"
          element={<ProtectedRoute element={<Home />} />}
        />
        <Route
          index
          path="/restaurant/:id"
          element={<ProtectedRoute element={<Restaurant />} />}
        />
        <Route
          index
          path="/pedidos"
          element={<ProtectedRoute element={<PedidosPage />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
