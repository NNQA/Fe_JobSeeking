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
    <ServerFormSendMailAgain />
  );
}
