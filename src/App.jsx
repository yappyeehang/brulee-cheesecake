import { HashRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home  from "./pages/Home";
import Menu  from "./pages/Menu";
import Cart  from "./pages/Cart";
import Admin from "./pages/Admin";
import "./index.css";

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          {/* Admin has its own layout (no navbar) */}
          <Route path="/brulee-admin" element={<Admin />} />

          {/* Public pages with Navbar */}
          <Route path="*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/"      element={<Home />} />
                <Route path="/menu"  element={<Menu />} />
                <Route path="/cart"  element={<Cart />} />
              </Routes>
            </>
          } />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}
