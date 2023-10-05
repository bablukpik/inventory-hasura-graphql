import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "../components/Products";

export default function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/add-product" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
