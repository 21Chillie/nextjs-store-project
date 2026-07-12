import ProductDetails from "@/components/products/product-details";
import ProductDetailsSkeleton from "@/components/products/product-details-skeleton";
import { Suspense } from "react";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      {params.then(({ id }) => (
        <ProductDetails id={id} />
      ))}
    </Suspense>
  );
}
