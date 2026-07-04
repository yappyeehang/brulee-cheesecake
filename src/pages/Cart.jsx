import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const WEEKDAY_SLOTS = ["7:30 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];
const WEEKEND_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM"];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

function getTimeSlots(dateStr) {
  if (!dateStr) return [];
  const [y, m, d] = dateStr.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay();
  return day === 0 || day === 6 ? WEEKEND_SLOTS : WEEKDAY_SLOTS;
}

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, total, count } = useCart();

  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [method, setMethod]   = useState("Pickup");
  const [address, setAddress] = useState("");
  const [date, setDate]       = useState("");
  const [time, setTime]       = useState("");
  const [note, setNote]       = useState("");
  const [error, setError]     = useState("");

  const minDate = getMinDate();
  const timeSlots = getTimeSlots(date);

  function handleDateChange(val) {
    setDate(val);
    setTime("");
  }

  function handleSubmit() {
    if (!name.trim() || !phone.trim()) { setError("Please fill in your name and WhatsApp number."); return; }
    if (cart.length === 0) { setError("Your cart is empty."); return; }
    if (!date || !time) { setError("Please choose a date and time slot."); return; }
    if (method === "Delivery" && !address.trim()) { setError("Please enter your delivery address."); return; }
    if (date < minDate) { setError("Please select a date at least 2 days from today."); return; }
    setError("");

    const formattedDate = new Date(date).toLocaleDateString("en-MY", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
    const orderLines = cart.map(i => `  - ${i.name} x${i.qty} = RM ${i.price * i.qty}`).join("\n");

    const msg = [
      "New Order — Brûlée Cheesecake",
      "------------------------------",
      `Name: ${name}`,
      `WhatsApp: ${phone}`,
      `Order:\n${orderLines}`,
      `Total: RM ${total}`,
      `Method: ${method}`,
      method === "Delivery" ? `Delivery Address: ${address}` : null,
      `Date: ${formattedDate}`,
      `Time: ${time}`,
      note ? `Note: ${note}` : null,
      "------------------------------",
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/60164330090?text=${encodeURIComponent(msg)}`, "_blank");
    clearCart();
  }

  if (count === 0 && cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-inner">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Head to the menu to add some cakes!</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="section-label">Your Order</div>
        <h1 className="section-title">Cart <em>&amp;</em> Checkout</h1>
      </div>

      <div className="cart-layout">
        {/* LEFT — CART ITEMS */}
        <div className="cart-items-section">
          <h3 className="cart-section-title">Order Summary</h3>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">RM {item.price} each</div>
              </div>
              <div className="cart-item-controls">
                <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                <span className="qty-val">{item.qty}</span>
                <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
              </div>
              <div className="cart-item-subtotal">RM {item.price * item.qty}</div>
            </div>
          ))}

          <div className="cart-total-row">
            <span>Total</span>
            <span className="cart-total-price">RM {total}</span>
          </div>

          <div className="brulee-note">
            Want the brûlée torch crust on any flavour? Add <strong>+RM 5</strong> — mention it in the note below.
          </div>
        </div>

        {/* RIGHT — ORDER FORM */}
        <div className="cart-form-section">
          <h3 className="cart-section-title">Your Details</h3>

          <div className="form-row">
            <label>Name</label>
            <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-row">
            <label>WhatsApp Number</label>
            <input type="tel" placeholder="e.g. 0123456789" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <div className="form-row">
            <label>Pickup or Delivery?</label>
            <div className="toggle-group">
              {["Pickup", "Delivery"].map(m => (
                <button
                  key={m}
                  className={`toggle-btn ${method === m ? "active" : ""}`}
                  onClick={() => setMethod(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {method === "Delivery" && (
            <div className="form-row">
              <label>Delivery Address</label>
              <input type="text" placeholder="Full address" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
          )}

          <div className="form-row">
            <label id="date-label">Preferred {method} Date</label>
            <input type="date" min={minDate} value={date} onChange={e => handleDateChange(e.target.value)} />
          </div>

          {date && (
            <div className="form-row">
              <label>Preferred {method} Time</label>
              <select value={time} onChange={e => setTime(e.target.value)}>
                <option value="">Select a time slot</option>
                {timeSlots.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}

          <div className="form-row">
            <label>Special Note (optional)</label>
            <textarea
              placeholder="e.g. Add brûlée crust on Matcha (+RM5), allergies, etc."
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button className="btn-primary submit-btn" onClick={handleSubmit}>
            Send Order via WhatsApp →
          </button>

          <p className="form-note">
            {method === "Pickup"
              ? "Pickup at Vista Komanwel B, Jln Jalil Perkasa 19, Bukit Jalil, 57000 KL"
              : "Delivery via Grab/Lalamove — rider fee borne by customer"}
          </p>
        </div>
      </div>
    </div>
  );
}
