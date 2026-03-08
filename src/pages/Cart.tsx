import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function formatPrice(value: number) {
  return value.toFixed(2);
}

export default function Cart() {
  const navigate = useNavigate();
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1>Your Cart</h1>
          <p style={{ color: "var(--muted)" }}>Your cart is empty.</p>
          <Link to="/" style={{ color: "inherit" }}>
            ← Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1>Your Cart</h1>

        <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: 12,
                alignItems: "center",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 12,
              }}
            >
              <img
                src={item.image.url}
                alt={item.image.alt}
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10 }}
              />

              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontWeight: 800 }}>{item.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 14 }}>
                  Price: {formatPrice(item.discountedPrice)}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "var(--muted)" }}>Qty</span>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    style={{
                      width: 70,
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text)",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  removeFromCart(item.id);
                  toast.success("Item removed");
                }}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            Total: {formatPrice(total)}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={clearCart}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "transparent",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Clear
            </button>

            <button
              type="button"
              onClick={() => {
                clearCart();
                navigate("/checkout-success");
              }}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid var(--text)",
                background: "var(--text)",
                color: "white",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}