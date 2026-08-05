"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function protectRoute() {
  const { userId, isAuthenticated, redirectToSignIn } = await auth();

  if (!userId || !isAuthenticated) {
    return redirectToSignIn();
  }

  return userId;
}

export async function protectAdminRoute() {
  const { userId, isAuthenticated } = await auth();
  const isAdminUser = userId === process.env.ADMIN_USER_ID;

  if (!isAuthenticated || !isAdminUser) {
    return redirect("/error/unauthorized");
  }

  return userId;
}
