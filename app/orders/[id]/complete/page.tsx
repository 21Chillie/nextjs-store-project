import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function CompleteOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const isOrdersComplete = async () => {
    const { id } = await params;
    return await prisma.order.findUnique({
      where: {
        id,
        status: "COMPLETED",
        isPaid: true,
      },
    });
  };

  if (!isOrdersComplete) {
    return redirect("/orders");
  }

  return (
    <Suspense>
      {params.then(() => {
        return (
          <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-2xl font-bold">Purchase Complete</h2>
            <p className="text-muted-foreground max-w-[60%] max-sm:max-w-[90%]">
              Thank you for your order! We received your purchase and are
              preparing it for delivery. You will receive an email confirmation
              with your order details and tracking updates soon.
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
      })}
    </Suspense>
  );
}
