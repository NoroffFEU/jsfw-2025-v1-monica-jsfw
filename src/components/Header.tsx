import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: "none",
  color: "inherit",
  fontWeight: isActive ? 800 : 600,
  opacity: isActive ? 1 : 0.85,
});

export default function Header() {

  const { itemCount } = useCart();

  return (
    <header
  style={{
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "var(--bg)",
    borderBottom: "1px solid var(--border)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  }}
>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            letterSpacing: "0.10em",
            fontWeight: 700,
         }}
>
  <h2 style={{ margin: 0 }}>LUMET</h2>
</Link>

        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <NavLink to="/" style={linkStyle}>
            Products
          </NavLink>
          <NavLink to="/contact" style={linkStyle}>
            Contact
          </NavLink>
        </nav>

        <NavLink to="/cart" style={linkStyle}>
          🛒 Cart{" "}
          <span
            style={{
              marginLeft: 8,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 24,
              height: 24,
              padding: "0 8px",
              borderRadius: 999,
              background: "var(--text)",
              color: "white",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {itemCount}
          </span>
        </NavLink>
      </div>
    </header>
  );
}