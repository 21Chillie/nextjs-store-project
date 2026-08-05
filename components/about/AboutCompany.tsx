import aboutImg1 from "@/public/images/about-image-1.webp";
import Image from "next/image";

export default function AboutCompany() {
  return (
    <>
      <section id="section-about-company">
        <header className="mb-12">
          <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tighter md:text-5xl">
            The Art of <span className="text-primary">Quiet Intent</span>.
          </h1>

          <p className="text-muted-foreground max-w-3xl text-base leading-relaxed tracking-wide text-pretty md:text-lg">
            At Nextjs Store, we believe furniture should do more than occupy space. It
            should anchor it. Our philosophy merges Scandi functionalism with a
            radical commitment to material honesty.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <figure className="relative md:row-span-2">
            <Image
              src={aboutImg1}
              className="h-full w-full object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="minimalist kitchen"
            />
          </figure>

          <div className="bg-primary text-primary-foreground flex items-end p-6 rounded-xl">
            <div>
              <span className="text-sm font-medium uppercase">Foundation</span>
              <h3 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
                Material Honesty
              </h3>
              <p className="text-primary-foreground/85 text-base leading-relaxed text-pretty md:text-lg">
                We don&apos;t hide grain. We don&apos;t mask knots. We celebrate
                the raw, structural truth of every fiber used in our pieces.
              </p>
            </div>
          </div>

          <div className="bg-accent text-accent-foreground flex items-end p-6 rounded-xl">
            <div>
              <span className="text-sm font-medium uppercase">Philosophy</span>
              <h3 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
                Built To Endure
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed text-pretty md:text-lg">
                Discover the philosophy behind Nextjs Store where utility meets
                longevity in every material.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
