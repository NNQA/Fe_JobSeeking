import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Logo from '@/components/svg/Logo';

export const metadata: Metadata = {
  title: 'Send mail agian',
  description: 'This is the send mail again page',
}
const ServerFormSendMailAgain = dynamic(() => import('./_component/FormSendMail'));

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Logo />
      <div className="h-full  grid place-content-center z-10 pb-20">
        <div className="order-2 md:order-2">
          <ServerFormSendMailAgain />
        </div>
      </div>
    </div>
  );
}
