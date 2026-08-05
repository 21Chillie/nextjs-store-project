import Loading from "@/components/global/loading";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function SignUpPage() {
  return (
    <Suspense fallback={<Loading />}>
      <section
        id="section-sign-up"
        className="grid place-items-center">
        <SignUp />
      </section>
    </Suspense>
  );
}
