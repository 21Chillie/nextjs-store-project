import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto max-w-6xl max-xl:px-4 xl:max-w-7xl", className)}>
      {children}
    </div>
  );
}
