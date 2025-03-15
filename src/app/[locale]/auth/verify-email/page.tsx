import Image from "next/image";
import FormVerifiCation from "./FormVerifiCation";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("login");
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0  -z-10">
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

      <div className="h-full flex flex-col lg:flex-row justify-center items-center lg:gap-[30rem] gap-2 z-10 px-4">
        <div className="text-accent text-2xl md:text-3xl font-bold order-1 md:order-1">
          JOB SEEKING
        </div>
        <div className="order-2 md:order-2">
          <FormVerifiCation />
        </div>
      </div>
    </div>
  );
}
