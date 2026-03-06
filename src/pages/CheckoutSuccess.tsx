import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1>Checkout Success! </h1>

        <p style={{ marginTop: 10, color: "var(--muted)" }}>
          Thank you for your purchase. Your order has been completed and your cart has been cleared.
        </p>

        <Link to="/" style={{ marginTop: 20, display: "inline-block" }}>
          ← Back to products
        </Link>
      </div>
    </div>
  );
}