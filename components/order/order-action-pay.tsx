"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";

type Props = {
  orderId: string;
};

export default function OrderActionPay({ orderId }: Props) {
  return (
    <DropdownMenuItem
      onClick={() => redirect(`/checkout?orderId=${orderId}`)}
      className={"cursor-pointer"}>
      Payment
    </DropdownMenuItem>
  );
}
