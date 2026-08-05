import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="text-muted-foreground">
        We couldn’t locate the page you requested.
      </p>
      <div className="flex gap-2">
        <Link
          href="/"
          className={buttonVariants({ variant: "default" })}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
