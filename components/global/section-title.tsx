import { Separator } from "@/components/ui/separator";

export default function SectionTitle({ title }: { title: string }) {
  return (
    <header className="space-y-4">
      <h2 className="text-3xl font-medium tracking-tight capitalize">
        {title}
      </h2>
      <Separator />
    </header>
  );
}
