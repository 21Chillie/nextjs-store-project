import ProductsContainer from "@/components/products/products-container";
import { SearchProps } from "@/types/global.type";
import { Suspense } from "react";

export default async function Products({ searchParams }: SearchProps) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ProductsContainer searchParams={searchParams} />
    </Suspense>
  );
}
