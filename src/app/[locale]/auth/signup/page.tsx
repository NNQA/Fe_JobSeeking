import Image from "next/image";
import FormSignup from "./FormSignUp";

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/aaa.jpg"
          alt="Image of tropical jungle"
          fill={true}
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content container */}
      <div className="h-full w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 z-10 px-4">
        <div className="text-accent text-2xl md:text-3xl font-bold order-1 md:order-1">
          JOB SEEKING
        </div>
        <div className="order-2 md:order-2">
          <FormSignup />
        </div>
      </div>
    </div>
  );
}
