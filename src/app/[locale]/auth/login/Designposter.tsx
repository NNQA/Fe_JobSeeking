import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Designposter({ linkGGLogin }: { linkGGLogin: string }) {
  return (
    <div className="flex flex-col gap-[12px]">
      <Button
        asChild
        variant={"secondary"}
        className="flex gap-2 items-center"
      >
        <Link href={linkGGLogin ?? "/"} className="">
          <EnvelopeClosedIcon className="w-5 h-5 text-red-500"></EnvelopeClosedIcon>
          <p className="font-medium">Continue with Google</p>
        </Link>
      </Button>
      <Button
        asChild
        variant={"secondary"}
        className="flex gap-2 items-center"
      >
        <Link href={linkGGLogin ?? "/"} className="">
          <LinkedInLogoIcon className="w-5 h-5 text-blue-500"></LinkedInLogoIcon>
          <p className="font-medium">Continue with Linkin</p>
        </Link>
      </Button>
      <Button
        asChild
        variant={"secondary"}
        className="flex gap-2 items-center"
      >
        <Link href={linkGGLogin ?? "/"} className="">
          <GitHubLogoIcon className="w-5 h-5"></GitHubLogoIcon>
          <p className="font-medium">Continue with Github</p>
        </Link>
      </Button>
    </div >
  );
}

export default Designposter