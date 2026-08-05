"use client";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { OrderItem } from "@/lib/generated/prisma/client";
import { formatCurrency } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  orderItems: OrderItem[];
  numItemsInCart: number;
};

export default function OrderDetailItems({
  orderItems,
  numItemsInCart,
}: Props) {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const limitItem = viewMore ? numItemsInCart : 2;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground uppercase">
          Order Items ({numItemsInCart})
        </p>

        <Button
          type="button"
          variant={"secondary"}
          size={"xs"}
          onClick={() => setViewMore(!viewMore)}>
          {viewMore ? <>View Less</> : <>View More</>}
          <ChevronUp className={viewMore ? "rotate-0" : "rotate-180"} />
        </Button>
      </div>

      <div className="overflow-y-auto max-sm:max-h-[25vh] md:max-h-[40vh]">
        {orderItems
          .slice(0, limitItem)
          .map(({ id, productName, image, quantity, price }) => {
            return (
              <Item
                key={`${productName}-${id}`}
                className="rounded-none px-0">
                <ItemMedia>
                  <Image
                    src={image}
                    alt={productName}
                    className="aspect-square h-full w-full rounded-md object-cover"
                    width={48}
                    height={48}
                  />
                </ItemMedia>

                <ItemContent>
                  <ItemTitle className="font-medium">{productName}</ItemTitle>
                  <ItemDescription>Qty: {quantity}</ItemDescription>
                </ItemContent>

                <ItemContent>
                  <ItemTitle className="text-base font-medium md:text-lg">
                    {formatCurrency(price)}
                  </ItemTitle>
                </ItemContent>
              </Item>
            );
          })}
      </div>
    </div>
  );
}
