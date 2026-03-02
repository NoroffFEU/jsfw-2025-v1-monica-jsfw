import { Link } from "react-router-dom";
import type { Product } from "../types/product";

function formatPrice(value: number) {
  return value.toFixed(2);
}

function getDiscountPercent(price: number, discountedPrice: number) {
  if (discountedPrice >= price) return 0;
  return Math.round(((price - discountedPrice) / price) * 100);
}

export default function ProductCard({ product }: { product: Product }) {
  const discountPercent = getDiscountPercent(product.price, product.discountedPrice);
  const hasDiscount = discountPercent > 0;

  return (
    <Link
  to={`/product/${product.id}`}
  style={{
  display: "block",
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: 14,
  overflow: "hidden",
  textDecoration: "none",
  color: "inherit",
  background: "var(--card)",
  position: "relative",
  transition: "transform 0.2s ease",
}}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
  }}
>

      {hasDiscount && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "var(--text)",
            color: "white",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          -{discountPercent}%
        </div>
      )}

      <div style={{ aspectRatio: "1 / 1", background: "rgba(255,255,255,0.06)" }}>
        <img
          src={product.image.url}
          alt={product.image.alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ padding: 12, display: "grid", gap: 8 }}>
        <h2 style={{ fontSize: 16, margin: 0 }}>{product.title}</h2>

        <div style={{ fontSize: 14, color: "var(--muted)" }}>
          Rating: {product.rating}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          {hasDiscount ? (
            <>
              <span style={{ fontWeight: 700 }}>
                {formatPrice(product.discountedPrice)}
              </span>
              <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span style={{ fontWeight: 700 }}>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}