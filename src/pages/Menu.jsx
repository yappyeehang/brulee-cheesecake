import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "./Menu.css";

const CATEGORIES = ["All", "Classic", "Signature", "Brûlée"];

export default function Menu() {
  const { products, loading, error } = useProducts();
  const { count } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <div className="section-label">Our Collection</div>
        <h1 className="section-title">The <em>Brûlée</em> Menu</h1>
        <p className="menu-subtitle">
          All cakes are handcrafted to order · Pre-order required · 4 inch
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="category-filter">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      {loading && (
        <div className="loading-wrap">
          <div className="spinner"></div>
          <p>Loading menu...</p>
        </div>
      )}
      {error && (
        <div className="loading-wrap">
          <p style={{ color: "#A32D2D" }}>{error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="products-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filtered.length === 0 && (
            <p className="empty-msg">No products in this category yet.</p>
          )}
        </div>
      )}

      {/* STICKY CART BAR */}
      {count > 0 && (
        <div className="sticky-cart-bar">
          <span>{count} item{count > 1 ? "s" : ""} in cart</span>
          <button className="btn-primary" onClick={() => navigate("/cart")}>
            View Cart & Order →
          </button>
        </div>
      )}

      {/* ADD-ON NOTE */}
      <div className="addon-banner">
        Want the <strong>brûlée torch crust</strong> on any flavour?
        Add <strong>+RM 5</strong> — mention it when you order.
      </div>
    </div>
  );
}
