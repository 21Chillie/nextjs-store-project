import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Product } from "@/lib/generated/prisma/client";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <ItemGroup className="gap-4">
        {products.map(({ id, name, image, price, company }) => (
          <Item
            key={id}
            variant="outline"
            role="listitem"
            render={
              <Link href={`/products/${id}`}>
                <ItemMedia
                  className="relative size-16 md:size-48"
                  variant="image">
                  <Image
                    src={image}
                    alt={name}
                    width={512}
                    height={512}
                    className="object-cover"
                  />
                </ItemMedia>

                <ItemContent>
                  <ItemTitle className="line-clamp-1">{name}</ItemTitle>
                  <ItemDescription>By {company}</ItemDescription>
                </ItemContent>

                <ItemContent className="justify-between">
                  <h3 className="text-base font-medium md:text-xl">
                    {formatCurrency(price)}
                  </h3>
                </ItemContent>
              </Link>
            }
          />
        ))}
      </ItemGroup>
    </div>
  );
}
