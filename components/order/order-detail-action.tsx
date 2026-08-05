"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { CreditCard, Printer } from "lucide-react";
import { redirect } from "next/navigation";
import { Activity } from "react";

type Props = {
  orderId: string;
  status: OrderStatus;
};

export default function OrderDetailAction({ orderId, status }: Props) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="outline">
              <Printer /> Print receipt
            </Button>
          }
        />
        <TooltipContent>
          <p>This features not yet available</p>
        </TooltipContent>
      </Tooltip>

      <Activity mode={status !== "COMPLETED" ? "visible" : "hidden"}>
        <Button
          type="button"
          onClick={() => redirect(`/checkout?orderId=${orderId}`)}>
          <CreditCard /> Proceed to pay
        </Button>
      </Activity>
    </>
  );
}
