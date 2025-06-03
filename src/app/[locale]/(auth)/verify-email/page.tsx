import Logo from "@/components/svg/Logo";
import FormVerifiCation from "./_component/FormVerifiCation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Retrieve password',
}
export default function Page() {
  return (
    <FormVerifiCation />
  );
}
