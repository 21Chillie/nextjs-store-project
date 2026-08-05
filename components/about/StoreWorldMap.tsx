import worldMapLight from "@/public/images/world-map-light.webp";
import Image from "next/image";

// Continental Data
const CONTINENTS = [
  { name: "North America", count: 24, top: "25%", left: "15%" },
  { name: "South America", count: 12, top: "70%", left: "25%" },
  { name: "Europe", count: 70, top: "25%", left: "52%" },
  { name: "Africa", count: 21, top: "60%", left: "52%" },
  { name: "Asia", count: 85, top: "40%", left: "75%" },
  { name: "Oceania", count: 67, top: "75%", left: "85%" },
];

export default function WorldDotMap() {
  return (
    <div className="text-foreground">
      {/* Map Container */}
      <div className="relative aspect-2/1 min-h-75 w-full">
        <figure className="relative aspect-video w-full">
          <Image
            src={worldMapLight}
            sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            alt="World map"
          />
        </figure>

        {/* Continental Badges (Absolute Positioning) */}
        {CONTINENTS.map((continent) => (
          <div
            key={continent.name}
            style={{ top: continent.top, left: continent.left }}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 transform cursor-default flex-col items-center">
            {/* Relative wrapper to contain the ping and the badge */}
            <div className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
              {/* Animate ping */}
              <span className="bg-primary absolute inline-flex h-14 w-14 animate-ping rounded-full opacity-75 md:h-16 md:w-16"></span>

              <div className="bg-primary text-primary-foreground relative flex h-full w-full flex-col items-center justify-center rounded-full shadow-lg">
                <div className="px-1 text-center text-[10px] leading-tight font-bold md:text-xs">
                  {continent.name.split(" ").map((word, i) => (
                    <p key={i}>
                      {word}
                      <br />
                    </p>
                  ))}
                </div>
                <p className="text-sm font-bold md:text-2xl">
                  {continent.count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
