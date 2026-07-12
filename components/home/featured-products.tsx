import { getFeaturedProduct } from "@/actions/product";
import SectionTitle from "@/components/global/section-title";
import ProductsGrid from "@/components/products/products-grid";

export default async function FeaturedProducts() {
  const products = await getFeaturedProduct();

  return (
    <section id="section-featured-products">
      <SectionTitle title="Featured Products" />

      <div className="mt-6">
        <ProductsGrid products={products} />
      </div>
    </section>
  );
}
