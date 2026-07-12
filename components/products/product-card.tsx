import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/lib/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const { id, image, name, description, price } = product;
  return (
    <article>
      <Card className="group relative mx-auto w-full max-w-sm pt-0 transition-all duration-500 hover:shadow-xl">
        <figure className="relative aspect-square w-full overflow-hidden">
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            src={image}
            alt={`${name} product`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
          />
        </figure>

        <CardHeader>
          <CardTitle className="line-clamp-1">{name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>

          <div className="mt-4 text-xl font-bold">
            <h3>{formatCurrency(price)}</h3>
          </div>
        </CardHeader>

        <Link
          href={`/products/${id}`}
          className="absolute inset-0 z-1"
          aria-label={`View details for ${name}`}
        />
      </Card>
    </article>
  );
}
