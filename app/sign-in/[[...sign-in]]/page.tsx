import Loading from "@/components/global/loading";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<Loading />}>
      <section
        id="section-sign-in"
        className="grid place-items-center">
        <SignIn />
      </section>
    </Suspense>
  );
}
