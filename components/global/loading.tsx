import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="grid place-items-center py-8 md:py-12">
      <Spinner />
    </div>
  );
}
