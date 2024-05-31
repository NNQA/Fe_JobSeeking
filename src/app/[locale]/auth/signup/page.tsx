import Image from "next/image";
import FormSignup from "./FormSignUp";

export default function Page() {
  return (
    <div className="h-[calc(100vh-3rem)] w-screen flex justify-center items-center gap-[30rem]">
      <div className="text-accent">JOB SEEKING</div>
      <FormSignup />
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
