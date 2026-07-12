import { ProductsTableGhost } from "@/components/admin/products-table-ghost";
import { ProductsFavorite } from "@/components/products/products-favorite";
import { Suspense } from "react";

export default async function Favorites() {
  return (
    <Suspense fallback={<ProductsTableGhost rowLength={6} />}>
      <ProductsFavorite />
    </Suspense>
  );
}
