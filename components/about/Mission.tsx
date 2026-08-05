import { DraftingCompass, Drill, Hammer } from "lucide-react";

const ourMission = [
  {
    title: "The Dovetail",
    description:
      "Our signature interlocking joints require no screws or adhesives, ensuring longevity that spans generations.",
    icon: <Drill className="text-primary size-8" />,
  },

  {
    title: "Architectural Logic",
    description:
      "Each piece is mathematically optimized for weight distribution, resulting in a visual lightness that defies physics.",
    icon: <DraftingCompass className="text-primary size-8" />,
  },

  {
    title: "Hand Finished",
    description:
      "Final surfacing is performed by master artisans using organic oils, preserving the wood's ability to breathe.",
    icon: <Hammer className="text-primary size-8" />,
  },
];

export default function Mission() {
  return (
    <>
      <section id="section-company-mission">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Precision in Every Millimeter
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {ourMission.map((item) => {
            const { title, description, icon } = item;
            return (
              <article
                key={title}
                className="bg-secondary rounded-xl p-6">
                <span>{icon}</span>
                <h3 className="mt-3 mb-2 text-2xl font-bold tracking-tighter md:text-3xl">
                  {title}
                </h3>

                <p className="text-muted-foreground text-base leading-relaxed">
                  {description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
