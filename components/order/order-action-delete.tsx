"use client";
import { deleteUserOrder } from "@/actions/order";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import type { OrderStatus } from "@/lib/generated/prisma/browser";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  orderId: string;
  status: OrderStatus;
};

export default function OrderActionDelete({ orderId, status }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
    startTransition(async () => {
      const res = await deleteUserOrder({ orderId, status });

      if (res.success) {
        toast.success(res.message, {
          description: (
            <p className="text-muted-foreground">Order ID: {orderId}</p>
          ),
        });
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <DropdownMenuItem
      onClick={handleAction}
      disabled={isPending}
      className={"cursor-pointer"}
      variant="destructive">
      {isPending ? (
        <>
          Deleting <Spinner />
        </>
      ) : (
        "Delete order"
      )}
    </DropdownMenuItem>
  );
}
