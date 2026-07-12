"use client";

import image1 from "@/public/images/image-1.webp";
import image2 from "@/public/images/image-2.webp";
import image3 from "@/public/images/image-3.webp";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

const images = [image1, image2, image3];

export default function HeroCarousel() {
  return (
    <Carousel
      className="bg-foreground/10 hidden rounded-xl p-2 md:block"
      plugins={[Autoplay({ delay: 3000 })]}>
      <CarouselContent>
        {images.map((img, i) => {
          return (
            <CarouselItem key={i}>
              <figure className="relative aspect-square">
                <Image
                  className="w-full rounded-xl object-cover"
                  src={img}
                  alt="product image carousel"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                />
              </figure>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
