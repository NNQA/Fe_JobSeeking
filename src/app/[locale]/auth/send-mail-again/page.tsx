import Image from "next/image";
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Send mail agian',
  description: 'This is the send mail again page',
}
const ServerFormSendMailAgain = dynamic(() => import('./_component/FormSendMail'));

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/aaa.webp"
          alt="Image of tropical jungle"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="h-full flex flex-col lg:flex-row justify-center items-center lg:gap-[20rem] gap-2 z-10 px-4">
        <div className="order-1 md:order-1 bg-secondary-foreground dark:bg-secondary rounded-sm shadow-md p-3">
          <p className="text-2xl md:text-3xl font-bold text-secondary dark:text-secondary-foreground inset-0 z-1 
               drop-shadow-lg tracking-wide">
            JOB SEEKING
          </p>
        </div>

        <div className="order-2 md:order-2">
          <ServerFormSendMailAgain />
        </div>
      </div>
    </div>
  );
}
