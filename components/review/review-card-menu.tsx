"use client";

import { deleteReview } from "@/actions/reviews";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

type Props = {
  id: string;
};

export default function ReviewCardMenu({ id }: Props) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteReview({ id, pathname });

      if (result.success) {
        toast.success("Review deleted successfully");
      } else {
        toast.error("Failed to delete review");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant={"ghost"}
            size={"icon-sm"}
          />
        }>
        <Ellipsis />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Manage reviews</DropdownMenuLabel>

          <DropdownMenuItem
            className={"cursor-pointer"}
            variant={isPending ? "default" : "destructive"}
            onClick={handleDelete}
            disabled={isPending}>
            {isPending ? (
              <>
                <Spinner /> Deleting
              </>
            ) : (
              "Delete"
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
