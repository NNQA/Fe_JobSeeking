import Image from "next/image";
import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import Logo from "@/components/svg/Logo";

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is the login page',
}


const LoginDynamic = dynamic(() => import("./FormLogin"), {
  loading: () => (
    <div className="bg-background rounded-md shadow-xl flex flex-col gap-4">
      <div className="grid place-content-center">
        <Skeleton className="w-2/3 h-2/3" />
      </div>
    </div>
  ),
});

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background" >
      <Logo />

      <div className="h-full w-full flex items-center justify-center z-10">
        <LoginDynamic />
      </div>
    </div>
  );
}
