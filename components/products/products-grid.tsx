import { Product } from "@/lib/generated/prisma/client";
import { ProductCard } from "./product-card";

export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            product={product}
          />
        );
      })}
    </div>
  );
}
