import UpdateProductPage from "@/components/admin/update-product-page";
import { Suspense } from "react";

export default function AdminProductsEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense>
      {params.then((p) => (
        <UpdateProductPage id={p.id} />
      ))}
    </Suspense>
  );
}
