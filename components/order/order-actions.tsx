import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { Ellipsis } from "lucide-react";
import { Activity } from "react";
import OrderActionCancel from "./order-action-cancel";
import OrderActionDelete from "./order-action-delete";
import OrderActionPay from "./order-action-pay";

type Props = {
  orderId: string;
  status: OrderStatus;
};

export default function OrderActions({ status, orderId }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={"secondary"}
            size={"icon"}
          />
        }>
        <Ellipsis />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <Activity mode={status === "PENDING" ? "visible" : "hidden"}>
            <OrderActionPay orderId={orderId} />
          </Activity>

          <Activity mode={status === "PENDING" ? "visible" : "hidden"}>
            <OrderActionCancel orderId={orderId} />
          </Activity>

          <Activity
            mode={
              status === "CANCELED" || status === "COMPLETED"
                ? "visible"
                : "hidden"
            }>
            <OrderActionDelete
              orderId={orderId}
              status={status}
            />
          </Activity>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
