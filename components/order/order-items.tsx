import { Activity } from "react";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar";

type Props = {
  data: {
    id: string;
    productName: string;
    image: string;
  }[];

  numItemsInCart: number;
};

export function OrderItems({ data, numItemsInCart }: Props) {
  return (
    <AvatarGroup>
      {data.slice(0, 3).map(({ id, productName, image }, idx) => {
        return (
          <Avatar key={`${productName}-${id}`}>
            <AvatarImage
              src={image}
              alt={productName}
            />
            <AvatarFallback>{idx}</AvatarFallback>
          </Avatar>
        );
      })}

      <Activity mode={numItemsInCart > 3 ? "visible" : "hidden"}>
        <Avatar>
          <AvatarFallback>{numItemsInCart - 3}+</AvatarFallback>
        </Avatar>
      </Activity>
    </AvatarGroup>
  );
}
