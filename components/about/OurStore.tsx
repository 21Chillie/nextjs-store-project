import storeWorldLight from "@/public/images/world-map-fixed.webp";
import { Circle } from "lucide-react";
import Image from "next/image";
import WorldDotMap from "./StoreWorldMap";

const storeHistory = [
  {
    id: "store-history-1",
    item: (
      <p
        className="text-lg text-pretty"
        key={"store-history-1"}>
        <span className="text-primary font-bold">The first</span> Nextjs store
        opened in 2001 in New York, United States.
      </p>
    ),
  },

  {
    id: "store-history-2",
    item: (
      <p
        className="text-lg text-pretty"
        key={"store-history-2"}>
        The <span className="text-primary font-bold">most recent</span> store
        opened is in Singapore.
      </p>
    ),
  },

  {
    id: "store-history-3",
    item: (
      <p
        className="text-lg text-pretty"
        key={"store-history-3"}>
        Indonesia has <span className="text-primary font-bold">the most</span>{" "}
        Nextjs stores in the world.
      </p>
    ),
  },
];

export default function OurStore() {
  return (
    <section id="section-store-world">
      <header className="text-center">
        <h2 className="text-3xl leading-relaxed font-bold tracking-tighter md:text-4xl">
          279 Nextjs Store accross the world
        </h2>

        <p className="text-lg tracking-wide text-muted-foreground">Updated: 15 February 2026</p>
      </header>

      <figure className="relative my-8">
        <Image
          className="hidden object-cover max-sm:block"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          src={storeWorldLight}
          alt="world map store"
        />

        <div className="max-sm:hidden">
          <WorldDotMap />
        </div>
      </figure>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {storeHistory.map((item) => {
          return (
            <article
              key={item.id}
              className="flex items-start gap-3">
              <Circle className="mt-1.5 size-4" />
              {item.item}
            </article>
          );
        })}
      </div>
    </section>
  );
}
