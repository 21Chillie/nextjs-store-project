import { searchProducts } from "@/actions/product";
import ButtonToggleView from "@/components/products/button-toggle-view";
import ProductList from "@/components/products/product-list";
import ProductsGrid from "@/components/products/products-grid";
import { Separator } from "@/components/ui/separator";
import { SearchProps } from "@/types/global.type";

export default async function ProductsContainer({ searchParams }: SearchProps) {
  const params = await searchParams;
  const { query, view } = {
    query: params.query || "",
    view: params.view || "grid",
  };

  const products = await searchProducts(query);

  return (
    <section>
      <header className="flex items-center justify-between gap-6">
        <h4 className="text-foreground/60 text-base">
          {products.length} product found
        </h4>

        <ButtonToggleView view={view} />
      </header>

      <Separator className={"my-6"} />

      {view === "grid" ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductList products={products} />
      )}
    </section>
  );
}
