export type ProductImage = {
  url: string;
  alt: string;
};

export type Review = {
  id: string;
  username: string;
  rating: number;
  description: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: ProductImage;
  rating: number;
  tags: string[];
  reviews: Review[];
};

export type ProductsResponse = {
  data: Product[];
  meta: Record<string, unknown>;
};

export type ProductResponse = {
  data: Product;
  meta: Record<string, unknown>;
};