"use client";
import { TableCell } from "@/components/ui/table";
import { toast } from "sonner";

export default function OrderIdClipboard({ id }: { id: string }) {
  const handleClipboard = async () => {
    await navigator.clipboard.writeText(id);
    toast.success("Order ID copied to clipboard");
  };

  return (
    <TableCell
      className="cursor-pointer font-mono text-xs whitespace-normal md:max-w-36 md:break-all"
      title="Click to copy ID"
      onClick={handleClipboard}>
      <span>{id}</span>
    </TableCell>
  );
}
