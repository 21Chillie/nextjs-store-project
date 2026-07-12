import { cn } from "@/lib/utils";

export default function EmptyList({
  sectionName,
  heading = "No items found.",
  className,
}: {
  sectionName: string;
  heading?: string;
  className?: string;
}) {
  return (
    <section id={sectionName}>
      <header>
        <h4 className={cn("text-xl", className)}>{heading}</h4>
      </header>
    </section>
  );
}
