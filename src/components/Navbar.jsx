import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">Brûlée<span>.</span></Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Order</Link></li>
      </ul>
      <div className="nav-right">
        <button className="nav-cart" onClick={() => navigate("/cart")}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1h2.5l1.7 8.5h9l1.5-6H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="7.5" cy="15" r="1.2" fill="currentColor"/>
            <circle cx="13" cy="15" r="1.2" fill="currentColor"/>
          </svg>
          Cart
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
        <Link to="/menu" className="nav-cta">Order Now</Link>
      </div>
    </nav>
  );
}
