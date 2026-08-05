"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-2xl font-bold">Error</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => unstable_retry()}>
          Try Again
        </Button>

        <Link
          href="/"
          className={buttonVariants({ variant: "default" })}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
