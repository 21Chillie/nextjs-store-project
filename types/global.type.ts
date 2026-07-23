import { CartItem, Product } from "@/lib/generated/prisma/client";

export type SearchProps = {
  searchParams: Promise<{
    query?: string;
    view?: "grid" | "list";
  }>;
};

export type ProductServerResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  inputs?: Record<string, string>;
};

export type CartItemWithProductPrice = CartItem & {
  product: Pick<Product, "price">;
};

export type CartItemWithProduct = CartItem & {
  product: Pick<Product, "id" | "name" | "image" | "company" | "price">;
};
