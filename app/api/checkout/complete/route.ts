import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { message: "Session ID is required" },
      { status: 400 }
    );
  }

  let orderId: string;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status !== "complete") {
      redirect("/orders");
    }

    orderId = session.metadata?.orderId ?? "";

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID not found in session metadata." },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "COMPLETED",
        isPaid: true,
        paidAt: new Date(),
        paymentIntentId: session.payment_intent as string,
      },
    });
  } catch (error) {
    console.error("Checkout completion failed:", error);

    return NextResponse.json(
      { message: "Failed to complete checkout." },
      { status: 500 }
    );
  } finally {
    revalidatePath("/orders");
    revalidatePath("/admin/sales");
  }

  redirect(`/orders/${orderId}/complete`);
}
