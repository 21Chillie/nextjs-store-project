import SectionTitle from "@/components/global/section-title";
import FeaturedProducts from "@/components/home/featured-products";
import Hero from "@/components/home/hero";
import { ProductsSkeletonGrid } from "@/components/products/products-skeleton";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <Suspense
        fallback={
          <div className="space-y-6">
            <SectionTitle title="Featured Products" />
            <ProductsSkeletonGrid amountSkeleton={3} />
          </div>
        }>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
