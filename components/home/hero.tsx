import HeroCarousel from "@/components/home/hero-carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="section-hero"
      className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div>
        <h1 className="text-foreground mb-3 text-4xl md:text-5xl font-bold tracking-tight">
          Spaces That Spark Joy, Prices That Make Sense.
        </h1>

        <p className="text-foreground/60 mb-4 text-sm md:text-base leading-normal text-pretty">
          Your home should work for you, not the other way around. We combine
          minimalist Scandinavian design principles with smart modern utility,
          ensuring every piece maximizes your space without draining your
          wallet.
        </p>

        <Button
          size={"lg"}
          className={"flex cursor-pointer items-center gap-2"}>
          <span>Explore our collections</span>
          <ArrowRight />
        </Button>
      </div>

      <HeroCarousel />
    </section>
  );
}
