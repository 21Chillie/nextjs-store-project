import treeImage from "@/public/images/tree-image.webp";
import { Recycle, TreePine } from "lucide-react";
import Image from "next/image";

export default function Sustainability() {
  return (
    <>
      <section
        id="section-sustainability"
        className="my-12 flex flex-wrap items-center gap-6 max-sm:flex-col">
        <article className="flex-1">
          <header>
            <h3 className="text-2xl leading-relaxed font-bold tracking-tight md:text-3xl">
              Sustainability as Standard
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed tracking-wide text-pretty">
              Every Nextjs store product is born from a circular lifecycle. We source
              exclusively from FSC-certified forests and utilize a zero-waste
              production model where even the smallest offcuts are transformed
              into architectural hardware.
            </p>

            <div className="mt-4 flex gap-3">
              <div className="flex items-center gap-2">
                <Recycle className="text-primary size-6" />
                <p className="font-medium italic">100% Recyclable</p>
              </div>

              <div className="flex items-center gap-2">
                <TreePine className="text-primary size-6" />
                <p className="font-medium italic">Net Zero Carbon</p>
              </div>
            </div>
          </header>
        </article>

        <figure className="relative flex-1">
          <Image
          className="rounded-xl"
            src={treeImage}
            alt="tree"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </figure>
      </section>
    </>
  );
}
