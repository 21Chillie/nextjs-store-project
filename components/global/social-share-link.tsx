import { buttonVariants } from "@/components/ui/button";
import { SiFacebook, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function SocialShareLink({
  url,
  message,
}: {
  url: string;
  message: string;
}) {
  const encodeMessage = encodeURIComponent(message);
  const encodeUrl = encodeURIComponent(url);

  return (
    <>
      <Link
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        rel="noopener noreferrer"
        target="_blank"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`}>
        <SiFacebook />
      </Link>

      <Link
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        rel="noopener noreferrer"
        target="_blank"
        href={`https://api.whatsapp.com/send?text=${encodeMessage}%20${encodeUrl}`}>
        <SiWhatsapp />
      </Link>

      <Link
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        rel="noopener noreferrer"
        target="_blank"
        href={`mailto:?subject=${encodeURIComponent("Nextjs Store Product")}&body=${encodeMessage.replace(" ", "%20")}%0A%0A${encodeUrl}%0A%0A`}>
        <Mail />
      </Link>
    </>
  );
}
