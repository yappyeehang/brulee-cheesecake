import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const CATEGORY_COLORS = {
  Classic:   "#C47E3A",
  Signature: "#4A6741",
  "Brûlée":  "#D4AF37",
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const accentColor = CATEGORY_COLORS[product.category] ?? "#C47E3A";

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-img" />
        ) : (
          <div className="product-img-placeholder">
            <svg viewBox="0 0 120 90" width="80" opacity="0.25">
              <ellipse cx="60" cy="45" rx="50" ry="20" fill="#2C1810"/>
              <ellipse cx="60" cy="38" rx="50" ry="20" fill="#C47E3A"/>
              <ellipse cx="60" cy="35" rx="50" ry="18" fill="#8B4513"/>
            </svg>
          </div>
        )}
        <div className="product-category-tag" style={{ background: accentColor }}>
          {product.category}
        </div>
      </div>
      <div className="product-body">
        <div className="product-name">{product.name}</div>
        <p className="product-desc">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">RM {product.price}</div>
          <button
            className={`add-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
