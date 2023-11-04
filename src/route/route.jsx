import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import Restaurant from "../pages/restaurant";

export function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/home" element={<Home />} />
        <Route index path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
  );
}
