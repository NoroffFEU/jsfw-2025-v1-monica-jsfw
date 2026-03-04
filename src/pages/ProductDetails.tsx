import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/api";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";

function formatPrice(value: number) {
  return value.toFixed(2);
}

function getDiscountPercent(price: number, discountedPrice: number) {
  if (discountedPrice >= price) return 0;
  return Math.round(((price - discountedPrice) / price) * 100);
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        const result = await getProductById(id);
        setProduct(result.data);
      } catch {
        setError("Could not load product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Loading product...</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;
  if (!product) return <p style={{ padding: 20 }}>Product not found.</p>;

  const discountPercent = getDiscountPercent(product.price, product.discountedPrice);
  const hasDiscount = discountPercent > 0;

  return (
    <div style={{ padding: 20 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Link to="/" style={{ color: "inherit" }}>
          ← Back to products
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
            marginTop: 16,
          }}
        >
          {/* Image */}
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 16,
              overflow: "hidden",
              background: "var(--card)",
            }}
          >
            <img
              src={product.image.url}
              alt={product.image.alt}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Info */}
          <div style={{ display: "grid", gap: 12 }}>
            <h1 style={{ margin: 0 }}>{product.title}</h1>

            <div style={{ color: "var(--muted)" }}>Rating: {product.rating}</div>

            {/* Price */}
            <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
              {hasDiscount ? (
                <>
                  <span style={{ fontWeight: 800, fontSize: 20 }}>
                    {formatPrice(product.discountedPrice)}
                  </span>
                  <span style={{ textDecoration: "line-through", color: "var(--muted)" }}>
                    {formatPrice(product.price)}
                  </span>
                  <span
                    style={{
                      marginLeft: 8,
                      background: "var(--text)",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    -{discountPercent}%
                  </span>
                </>
              ) : (
                <span style={{ fontWeight: 800, fontSize: 20 }}>
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <p style={{ margin: 0, lineHeight: 1.6 }}>{product.description}</p>

            {/* Tags */}
            {product.tags?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      padding: "6px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Add to cart button (we wire it later) */}
            <button
              type="button"
              style={{
                marginTop: 8,
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid var(--text)",
                background: "var(--text)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer",
              }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop: 28 }}>
          <h2 style={{ marginBottom: 10 }}>Reviews</h2>

          {product.reviews?.length > 0 ? (
            <div style={{ display: "grid", gap: 12 }}>
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: 14,
                    background: "var(--card)",
                    padding: 14,
                  }}
                >
                  <div style={{ fontWeight: 700 }}>
                    {review.username} <span style={{ color: "var(--muted)" }}>· {review.rating}/5</span>
                  </div>
                  <p style={{ margin: "8px 0 0", lineHeight: 1.5 }}>{review.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--muted)" }}>No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Simple responsive tweak */}
      <style>
        {`
          @media (min-width: 900px) {
            div[style*="grid-template-columns: 1fr"] {
              grid-template-columns: 1.05fr 0.95fr !important;
              align-items: start;
            }
          }
        `}
      </style>
    </div>
  );
}