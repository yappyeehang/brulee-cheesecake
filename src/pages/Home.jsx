import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="home-hero">

        {/* LEFT — text */}
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="eyebrow-line"></span>
            Artisan Burnt Cheesecake · Bukit Jalil, KL
          </div>
          <h1 className="hero-h1">
            The art of<br />
            the <em>perfect</em><br />
            brûlée
          </h1>
          <p className="hero-desc">
            Handcrafted in small batches. Baked until the top caramelises
            into a deep, dark crown of flavour. Made to order, collected fresh.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn-primary">Explore the Menu</Link>
            <Link to="/cart" className="btn-ghost">Place an Order →</Link>
          </div>
        </div>

        {/* RIGHT — full-height image panel */}
        <div className="hero-visual">
          {/* Replace /images/hero.jpg with your own photo */}
          <img
            src="/images/hero.jpg"
            alt="Brûlée burnt cheesecake"
            className="hero-cake-img"
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
          {/* SVG fallback if no image */}
          <div className="hero-cake-circle" style={{ display: "none" }}>
            <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="cakeBg" cx="50%" cy="60%" r="65%">
                  <stop offset="0%" stopColor="#E8C882"/>
                  <stop offset="100%" stopColor="#A8763C"/>
                </radialGradient>
                <radialGradient id="cakeBurn" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#1E0E05"/>
                  <stop offset="55%" stopColor="#3D1C02"/>
                  <stop offset="100%" stopColor="#6B3318"/>
                </radialGradient>
              </defs>
              <circle cx="180" cy="180" r="170" fill="url(#cakeBg)" opacity="0.2"/>
              <ellipse cx="180" cy="270" rx="125" ry="22" fill="#C4974A"/>
              <rect x="55" y="155" width="250" height="118" rx="4" fill="#D4A866"/>
              <ellipse cx="180" cy="155" rx="125" ry="22" fill="#E8C882"/>
              <ellipse cx="180" cy="152" rx="125" ry="22" fill="url(#cakeBurn)"/>
              <path d="M120 142 Q145 132 165 139 Q182 145 198 135 Q215 125 232 134" stroke="#0D0600" strokeWidth="1.2" fill="none" opacity="0.55"/>
              <circle cx="158" cy="143" r="5" fill="#160800" opacity="0.7"/>
              <circle cx="195" cy="139" r="3.5" fill="#160800" opacity="0.6"/>
              <circle cx="178" cy="147" r="5.5" fill="#1E0C04" opacity="0.65"/>
            </svg>
          </div>

          {/* BADGES — overlaid on image */}
          <div className="hero-badges">
            <div className="badge-top">
              <span className="badge-num">5</span>
              <span className="badge-label">Flavours</span>
            </div>
            <div className="badge-bottom">
              <span className="star">★</span>
              <div>
                <div className="badge-num">4.9</div>
                <div className="badge-label">Customer Love</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAGLINE STRIP */}
      <div className="tagline-strip">
        <div className="tagline-inner">
          {["Handcrafted", "·", "Pre-order", "·", "Bukit Jalil", "·", "Made Fresh", "·", "Pickup Only", "·",
            "Handcrafted", "·", "Pre-order", "·", "Bukit Jalil", "·", "Made Fresh", "·", "Pickup Only", "·"].map((t, i) => (
            <span key={i} style={t === "·" ? { opacity: 0.4 } : {}}>{t}</span>
          ))}
        </div>
      </div>

      {/* HOW WE BAKE */}
      <section className="home-process">
        <div className="process-header">
          <div className="section-label">The Craft</div>
          <h2 className="section-title">How we <em>bake</em></h2>
        </div>
        <div className="process-grid">
          {[
            { n: "01", title: "Select & Source", desc: "Full-fat cream cheese and fresh local eggs in every batch. No shortcuts, no substitutes." },
            { n: "02", title: "Hand-mixed Batter", desc: "Each batch is folded by hand to preserve air and ensure that signature silky, slightly jiggly interior." },
            { n: "03", title: "The Brûlée Bake", desc: "High heat, no water bath. We watch each cake until the top reaches that perfect deep-brown hue — never burnt, always brûlée." },
          ].map(s => (
            <div className="process-step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="section-label">Ready?</div>
        <h2 className="section-title">Order your <em>Brûlée</em> today</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.92rem" }}>
          Pre-order required · Pickup at Vista Komanwel B, Bukit Jalil
        </p>
        <Link to="/menu" className="btn-primary">View the Menu</Link>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-logo">Brûlée<span>.</span></div>
        <div className="footer-copy">© 2025 Brûlée Artisan Cheesecakes · Bukit Jalil, KL</div>
      </footer>

    </div>
  );
}
