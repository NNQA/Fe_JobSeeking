import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DesignposterProps {
  textGoogle: string;
  textLinkin: string;
  textGithub: string;
}
function Designposter({ textGithub, textGoogle, textLinkin }: DesignposterProps) {
  const linkGGLogin = `${process.env.NEXT_PUBLIC_API_GG}/${"vi"}${process.env.NEXT_PUBLIC_GOOGLE_CLIENT}`;
  return (
    <div className="flex flex-col gap-[12px]">
      <Button
        asChild
        variant={"outlineVariant"}
        className="flex gap-2 items-center"
      >
        <Link href={"/"} className="text-foreground hover:no-underline">
          <EnvelopeClosedIcon className="w-5 h-5 text-red-500"></EnvelopeClosedIcon>
          <p className="font-medium">{textGoogle}</p>
        </Link>
      </Button>
      <Button
        asChild
        variant={"outlineVariant"}
        className="flex gap-2 items-center"
      >
        <Link href={"/"} className="text-foreground hover:no-underline">
          <LinkedInLogoIcon className="w-5 h-5 text-blue-500"></LinkedInLogoIcon>
          <p className="font-medium">{textLinkin}</p>
        </Link>
      </Button>
      <Button
        asChild
        variant={"outlineVariant"}
        className="flex gap-2 items-center"
      >
        <Link href={"/"} className="text-foreground hover:no-underline">
          <GitHubLogoIcon className="w-5 h-5"></GitHubLogoIcon>
          <p className="font-medium">{textGithub}</p>
        </Link>
      </Button>
    </div >
  );
}

export default Designposter