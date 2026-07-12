"use client";

import { LayoutGrid, LayoutList } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

export default function ButtonToggleView({
  view = "grid",
}: {
  view?: "grid" | "list";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggleView = (value: typeof view) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("view", value);
    } else {
      params.delete("view");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleToggleView("list")}
        className={"cursor-pointer"}
        size={"icon"}
        variant={view === "list" ? "default" : "outline"}>
        <LayoutList />
      </Button>

      <Button
        onClick={() => handleToggleView("grid")}
        className={"cursor-pointer"}
        size={"icon"}
        variant={view === "grid" ? "default" : "outline"}>
        <LayoutGrid />
      </Button>
    </div>
  );
}
