import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function Designposter({ linkGGLogin }: { linkGGLogin: string }) {
  return (
    <div className="flex flex-col gap-2 mt-4 mb-2">
      <Button
        asChild
        className="border-2 border-border w-full flex justify-center bg-accent hover:bg-accent text-foreground focus:bg-accent  gap-2 items-center px-2 py-2 rounded-full hover:ring-0 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer"
      >
        <Link href={linkGGLogin ?? "/"} className="">
          <EnvelopeClosedIcon className="w-5 h-5 text-red-500"></EnvelopeClosedIcon>
          <p className="font-medium">Continue with Google</p>
        </Link>
      </Button>
      <div className="border-2 border-border w-full flex justify-center  gap-2 items-center px-2 py-2 rounded-full hover:ring-0 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
        <LinkedInLogoIcon className="w-5 h-5 text-blue-500"></LinkedInLogoIcon>
        <p className="font-medium">Continue with Linkin</p>
      </div>
      <div className="border-2 border-border w-full flex justify-center  gap-2 items-center px-2 py-2 rounded-full hover:ring-0 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
        <GitHubLogoIcon className="w-5 h-5"></GitHubLogoIcon>
        <p className="font-medium">Continue with Github</p>
      </div>
    </div>
  );
}

export default Designposter