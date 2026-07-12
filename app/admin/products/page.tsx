import ProductsTable from "@/components/admin/products-table";
import { ProductsTableGhost } from "@/components/admin/products-table-ghost";
import { Suspense } from "react";

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<ProductsTableGhost rowLength={10} />}>
      <ProductsTable />
    </Suspense>
  );
}
