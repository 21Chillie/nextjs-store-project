import { productById } from "@/actions/product";
import { getProductRating } from "@/actions/reviews";
import { ButtonAddCart } from "@/components/global/button-action";
import ShareButton from "@/components/global/share-button";
import ButtonToggleFavorite from "@/components/products/button-toggle-favorite";
import ProductReviews from "@/components/review/product-reviews";
import ReviewContainer from "@/components/review/review-container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export default async function ProductDetails({ id }: { id: string }) {
  const { image, name, company, price, description, featured } =
    await productById(id);
  const { rating, ratingCount } = await getProductRating(id);
  const { userId } = await auth();

  return (
    <>
      <article>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section
            aria-label="Product gallery"
            className="mr-6">
            <div className="bg-foreground/10 rounded-xl p-2">
              <figure className="bg-muted relative aspect-3/4 overflow-hidden rounded-2xl md:aspect-auto md:h-[600px]">
                <Image
                  className="rounded-xl object-cover"
                  src={image}
                  alt={`${name} product`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                />
              </figure>
            </div>
          </section>

          <section aria-label="Product details">
            <header className="mb-4">
              <div className="flex flex-col gap-2">
                {featured && (
                  <Badge
                    variant="secondary"
                    className="shrink-0">
                    Featured
                  </Badge>
                )}

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {name}
                </h1>

                <p>By {company}</p>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <p className="flex items-center text-base">
                  <Star className="mr-2 size-5 fill-amber-400 stroke-amber-300" />
                  {rating.toFixed(1)}
                  <span className="text-muted-foreground ml-1">
                    ({ratingCount} reviews)
                  </span>
                </p>

                <div className="flex gap-3">
                  <ButtonToggleFavorite productId={id} />
                  <ShareButton productId={id} />
                </div>
              </div>
            </header>

            <div className="mb-4">
              <p className="text-2xl font-bold tracking-tight">
                {formatCurrency(price)}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold">Description</h2>
              <Separator className={"my-4"} />

              <div className="prose prose-sm text-muted-foreground max-w-none">
                <p className="mb-4 text-sm text-pretty whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>

            <div>
              {userId ? (
                <ButtonAddCart productId={id} />
              ) : (
                <SignInButton mode="modal">
                  <Button>Sign in to add to cart</Button>
                </SignInButton>
              )}
            </div>
          </section>
        </div>

        <section
          id="customer-review"
          className="mt-12 space-y-6">
          <ProductReviews productId={id} />
          <ReviewContainer productId={id} />
        </section>
      </article>
    </>
  );
}
