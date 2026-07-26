import HeroCarousel from "@/components/home/hero-carousel";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="section-hero"
      className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex items-center">
        <div>
          <h1 className="text-foreground mb-3 text-4xl font-bold tracking-tight md:text-5xl">
            Spaces That Spark Joy, Prices That Make Sense.
          </h1>

          <p className="text-foreground/60 mb-4 max-w-[90%] text-sm leading-normal text-pretty md:text-base">
            Your home should work for you, not the other way around. We combine
            minimalist Scandinavian design principles with smart modern utility,
            ensuring every piece maximizes your space without draining your
            wallet.
          </p>

          <Link
            href={"/products"}
            className={buttonVariants({ size: "lg", variant: "default" })}>
            Explore our collections <ArrowRight />
          </Link>
        </div>
      </div>

      <HeroCarousel />
    </section>
  );
}
