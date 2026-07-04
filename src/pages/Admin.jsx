import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import "./Admin.css";

const SHEET_URL = `https://docs.google.com/spreadsheets/d/1GAOkBLngJcf2E87Zmz521-l_mFipc9edRCyMydQb2rc/edit`;

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw]         = useState("");
  const [pwError, setPwError] = useState(false);
  const { products, loading } = useProducts();

  // Simple password — change this to your own
  const PASSWORD = "brulee2025";

  function handleLogin() {
    if (pw === PASSWORD) {
      setAuthed(true);
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  }

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="admin-logo">Brûlée<span>.</span></div>
          <h2>Admin Access</h2>
          <p>Enter your password to continue</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className={pwError ? "error" : ""}
          />
          {pwError && <div className="login-error">Incorrect password</div>}
          <button className="btn-primary" onClick={handleLogin}>Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="admin-logo">Brûlée<span>.</span> Admin</div>
        <button className="btn-ghost" onClick={() => setAuthed(false)}>Log out</button>
      </div>

      <div className="admin-content">
        {/* QUICK STATS */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-num">{products.length}</div>
            <div className="stat-label">Active Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">RM {Math.min(...products.map(p => p.price)) || 0}</div>
            <div className="stat-label">Lowest Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">RM {Math.max(...products.map(p => p.price)) || 0}</div>
            <div className="stat-label">Highest Price</div>
          </div>
        </div>

        {/* MANAGE PRODUCTS */}
        <div className="admin-section">
          <div className="admin-section-header">
            <h3>Manage Products</h3>
            <p>Edit your products directly in Google Sheets. Changes appear on the website automatically.</p>
          </div>

          <a href={SHEET_URL} target="_blank" rel="noopener noreferrer" className="btn-primary sheets-btn">
            Open Google Sheets →
          </a>

          <div className="sheets-guide">
            <h4>How to add a new product:</h4>
            <ol>
              <li>Open Google Sheets using the button above</li>
              <li>Add a new row at the bottom</li>
              <li>Fill in: <code>id</code>, <code>name</code>, <code>category</code>, <code>price</code>, <code>description</code>, <code>available</code></li>
              <li>Set <code>available</code> to <code>TRUE</code> to show it, <code>FALSE</code> to hide it</li>
              <li>For <code>image</code> (column G): paste the URL of your image, or leave blank for a placeholder</li>
              <li>Refresh your website — done! ✓</li>
            </ol>
            <div className="column-ref">
              <div className="col-tag">A: id</div>
              <div className="col-tag">B: name</div>
              <div className="col-tag">C: category</div>
              <div className="col-tag">D: price</div>
              <div className="col-tag">E: description</div>
              <div className="col-tag">F: available</div>
              <div className="col-tag">G: image (optional)</div>
            </div>
          </div>
        </div>

        {/* CURRENT PRODUCTS PREVIEW */}
        <div className="admin-section">
          <h3>Current Products</h3>
          {loading ? (
            <div className="loading-wrap"><div className="spinner"></div></div>
          ) : (
            <div className="admin-products-table">
              <div className="table-header">
                <span>Name</span>
                <span>Category</span>
                <span>Price</span>
                <span>Status</span>
              </div>
              {products.map(p => (
                <div className="table-row" key={p.id}>
                  <span className="product-name-cell">{p.name}</span>
                  <span className="cat-badge" data-cat={p.category}>{p.category}</span>
                  <span>RM {p.price}</span>
                  <span className="status-active">● Active</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* WHATSAPP NUMBER */}
        <div className="admin-section">
          <h3>WhatsApp Number</h3>
          <p className="admin-hint">
            Your current order WhatsApp number is <strong>60164330090</strong>.
            To change it, update it in <code>src/pages/Cart.jsx</code> (search for "wa.me").
          </p>
        </div>
      </div>
    </div>
  );
}
