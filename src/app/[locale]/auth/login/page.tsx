import Image from "next/image";
import dynamic from "next/dynamic";

const LoginDynamic = dynamic(() => import("./FormLogin"), {
  loading: () => (
    <div className="h-[600px] w-[510px] bg-background px-12 py-8 rounded-md shadow-xl flex flex-col gap-4">
      <div className="grid place-content-center">
        <Skeleton className="w-2/3 h-2/3" />
      </div>
    </div>
  ),
});
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <div className="h-[calc(100vh-3rem)] w-screen flex justify-center items-center gap-[30rem]">
      <div className="text-accent">JOB SEEKING</div>
      <LoginDynamic />
      <div
        className="bg-img-wrapper"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Image
          src="/aaa.jpg"
          alt="Image of tropical jungle"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
      </div>
    </div>
  );
}
