"use client";
import { updateOrderStatus } from "@/actions/order";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  orderId: string;
};

export default function OrderActionCancel({ orderId }: Props) {
  const [isPending, startTransition] = useTransition();
  const customMessage = `Order is successfully canceled`;

  const handleAction = () => {
    startTransition(async () => {
      const res = await updateOrderStatus({
        status: "CANCELED",
        orderId,
        customMessage,
      });

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
          Cancelling <Spinner />
        </>
      ) : (
        "Cancel order"
      )}
    </DropdownMenuItem>
  );
}
