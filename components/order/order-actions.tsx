import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { Ellipsis } from "lucide-react";
import { Activity } from "react";

type Props = {
  status: OrderStatus;
};

export default function OrderActions({ status }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={"ghost"}
            size={"icon"}
          />
        }>
        <Ellipsis />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Activity mode={status === "PENDING" ? "visible" : "hidden"}>
          <DropdownMenuItem className={"cursor-pointer"}>
            Payment
          </DropdownMenuItem>
        </Activity>

        <Activity
          mode={
            status === "CANCELED" || status === "COMPLETED"
              ? "visible"
              : "hidden"
          }>
          <DropdownMenuItem className={"cursor-pointer"}>
            Cancel order
          </DropdownMenuItem>
        </Activity>

        <Activity
          mode={
            status === "CANCELED" || status === "PENDING" ? "visible" : "hidden"
          }>
          <DropdownMenuItem className={"cursor-pointer"}>
            Delete order
          </DropdownMenuItem>
        </Activity>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
