import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await getProducts();
        setProducts(result.data);
      } catch {
        setError("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading products...</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  return (
  <div style={{ padding: 20 }}>
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 16 }}>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
);
}