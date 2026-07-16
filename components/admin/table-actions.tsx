"use client";

import { deleteProductById } from "@/actions/product";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { Activity } from "react";
import { toast } from "sonner";

type Props = {
  productId: string;
  type: "delete" | "edit";
};

export default function TableActions({ productId, type }: Props) {
  const deleteAction = deleteProductById.bind(null, productId);
  const handleDelete = async () => {
    const result = await deleteAction();

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Activity mode={type === "delete" ? "visible" : "hidden"}>
        <Button
          className={"cursor-pointer"}
          type="button"
          variant={"ghost"}
          size={"icon"}
          onClick={handleDelete}>
          <Trash className="text-destructive" />
        </Button>
      </Activity>

      <Activity mode={type === "edit" ? "visible" : "hidden"}>
        <Link
          href={`/admin/products/${productId}/edit`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}>
          <Edit className="text-foreground" />
        </Link>
      </Activity>
    </>
  );
}
