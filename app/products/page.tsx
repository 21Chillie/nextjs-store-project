import Loading from "@/components/global/loading";
import ProductsContainer from "@/components/products/products-container";
import { SearchProps } from "@/types/global.type";
import { Suspense } from "react";

export default async function Products({ searchParams }: SearchProps) {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsContainer searchParams={searchParams} />
    </Suspense>
  );
}
