import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import { OrderWithItems } from "@/types/global.type";
import { Eye } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import OrderDetailAction from "./order-detail-action";
import OrderDetailItems from "./order-detail-items";

type Props = {
  order: OrderWithItems;
};

export default function OrderDetail({ order }: Props) {
  const {
    id,
    status,
    createdAt,
    orderTotal,
    numItemsInCart,
    orderItems,
    name,
    address,
    city,
    country,
    email,
    subTotal,
    shipping,
    tax,
    paidAt,
  } = order;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            size={"icon"}
            variant={"secondary"}
          />
        }>
        <Eye />
      </DialogTrigger>
      <DialogContent className={"md:max-w-xl"}>
        <DialogHeader>
          <DialogTitle className={"font-bold"}>Order Details</DialogTitle>
          <DialogDescription>
            {status === "COMPLETED" && paidAt
              ? `Purchased on ${formatDate(paidAt)}`
              : `Placed on ${formatDate(createdAt)}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-secondary flex items-start justify-between gap-4 rounded-md p-4">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Status</span>
              <Badge
                className={`font-medium ${status === "PENDING" && "text-foreground hover:text-foreground bg-amber-200 hover:bg-amber-300"}`}
                variant={
                  (status === "CANCELED" && "destructive") ||
                  (status === "COMPLETED" && "default") ||
                  "ghost"
                }>
                {status}
              </Badge>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-muted-foreground">Total Amount</span>
              <h4 className="text-base font-bold md:text-lg">
                {formatCurrency(orderTotal)}
              </h4>
            </div>
          </div>

          <OrderDetailItems
            orderItems={orderItems}
            numItemsInCart={numItemsInCart}
          />

          <div className="flex flex-col items-start gap-6 max-sm:hidden md:flex-row md:justify-between">
            <div className="space-y-4">
              <p className="text-muted-foreground uppercase">Shipping Info</p>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold">{name}</p>
                <p className="text-xs">{address}</p>
                <p className="text-xs">
                  {city}, {country}
                </p>
                <p className="font-mono text-xs">{email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground uppercase">Payment Summary</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-xs">Subtotal</p>
                  <p className="text-xs"> {formatCurrency(subTotal)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-xs">Shipping</p>
                  <p className="text-xs">{formatCurrency(shipping)}</p>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <p className="text-muted-foreground text-xs">Tax</p>
                  <p className="text-xs">{formatCurrency(tax)}</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs font-bold">Total</p>
                  <p className="text-xs font-black">
                    {formatCurrency(orderTotal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <OrderDetailAction orderId={id} status={status} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
