import AboutCompany from "@/components/about/AboutCompany";
import Mission from "@/components/about/Mission";
import OurStore from "@/components/about/OurStore";
import Sustainability from "@/components/about/Sustainability";

export default async function About() {
  return (
    <div className="flex flex-col gap-12">
      <AboutCompany />
      <OurStore />
      <Mission />
      <Sustainability />
    </div>
  );
}
