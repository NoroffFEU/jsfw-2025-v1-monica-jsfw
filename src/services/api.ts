import type { ProductsResponse, ProductResponse } from "../types/product";

const BASE_URL = "https://v2.api.noroff.dev/online-shop";

// Fetch all products
export async function getProducts(): Promise<ProductsResponse> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

// Fetch single product by ID
export async function getProductById(id: string): Promise<ProductResponse> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}