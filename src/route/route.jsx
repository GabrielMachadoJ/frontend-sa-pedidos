import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

export function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
