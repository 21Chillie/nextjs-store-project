import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { formatCurrency } from "@/lib/utils";
import { CartItemWithProduct } from "@/types/global.type";
import Image from "next/image";
import Link from "next/link";
import CartAction from "./cart-action";

type Props = {
  carts: CartItemWithProduct[];
};

export default function CartList({ carts }: Props) {
  return (
    <div className="space-y-6">
      {carts.map(({ id, cartId, product, amount }) => {
        return (
          <Item
            className="hover:bg-secondary"
            key={`cart-${product.name}`}
            variant={"outline"}>
            <ItemMedia>
              <Image
                className="aspect-square size-22 rounded-md object-cover"
                src={product.image}
                alt={`${product.name} product image`}
                width={80}
                height={80}
                loading="eager"
              />
            </ItemMedia>

            <ItemContent className="space-y-3">
              <div className="space-y-3">
                <Link
                  href={`/products/${product.id}`}
                  className="group flex flex-col items-start space-y-1">
                  <ItemTitle className="line-clamp-2 group-hover:underline">
                    {product.name}
                  </ItemTitle>
                  <ItemDescription>By {product.company}</ItemDescription>
                </Link>
              </div>

              <ItemTitle className="font-bold">
                {formatCurrency(product.price * amount)}
              </ItemTitle>
            </ItemContent>

            <ItemActions>
              <CartAction
                id={id}
                amount={amount}
              />
            </ItemActions>
          </Item>
        );
      })}
    </div>
  );
}
