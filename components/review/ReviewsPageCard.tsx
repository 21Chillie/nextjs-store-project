import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Product, Review } from "@/lib/generated/prisma/client";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Comment from "./Comment";
import ReviewCardMenu from "./ReviewCardMenu";

export default function ReviewsPageCard({
  review,
}: {
  review: Review & { product: Pick<Product, "id" | "name" | "image"> };
}) {
  const { id, createAt, product, rating, comment } = review;
  const formattedRating = rating.toFixed(1);

  return (
    <Card
      size="sm"
      className="flex min-h-74 flex-col">
      <CardHeader className="flex items-center justify-between border-b">
        <ReviewCardMenu id={id} />

        <div className="flex items-center justify-between gap-3">
          <div className="text-muted-foreground mt-1 flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span className="text-xs">
              {createAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <div className="flex items-center gap-3">
          <Image
            src={product.image}
            alt={`${product.name} product`}
            width={128}
            height={128}
            className="ring-border size-16 rounded-xl object-cover ring-2"
          />

          <div className="space-y-2">
            <p className="text-foreground line-clamp-2 font-bold tracking-wide">
              {product.name}
            </p>

            <div className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 stroke-amber-300" />
              <span className="text-foreground text-sm font-semibold">
                {formattedRating}
              </span>
            </div>
          </div>
        </div>

        <Comment comment={comment || ""} />
      </CardContent>

      <CardFooter className="border-t">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={`/products/${product.id}`}
          className={buttonVariants({
            variant: "default",
            className: "w-full",
          })}>
          See product details
        </Link>
      </CardFooter>
    </Card>
  );
}
