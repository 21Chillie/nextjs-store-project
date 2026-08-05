import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin");
    const { orderId, email } = (await req.json()) as {
      orderId: string | null;
      email: string | null;
    };

    console.log(orderId, email);

    if (!orderId || !email) {
      return NextResponse.json(
        { message: "Missing orderId or email" },
        { status: 400, statusText: "Bad Request" }
      );
    }

    const orders = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: { orderItems: { include: { product: true } } },
    });

    if (!origin || !orders) {
      return NextResponse.json(
        { message: "No orders found" },
        { status: 404, statusText: "Not Found" }
      );
    }

    const line_items = orders.orderItems.map(
      ({ quantity, price, productName, productId }) => {
        return {
          quantity,
          price_data: {
            currency: "usd",
            unit_amount: price * 100,
            product_data: {
              name: `${productName} x${quantity}`,
              metadata: {
                productId,
              },
            },
          },
        };
      }
    );

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      customer_email: email,
      metadata: { orderId },
      mode: "payment",
      line_items: [
        ...line_items,
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: (orders.shipping + orders.tax) * 100,
            product_data: {
              name: "Include (Shipping + Tax)",
            },
          },
        },
      ],
      return_url: `${origin}/api/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { message: "Failed to create checkout session" },
        { status: 500, statusText: "Server Error" }
      );
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500, statusText: "Server Error" }
    );
  }
}
