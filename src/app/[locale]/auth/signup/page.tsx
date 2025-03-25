import { Metadata } from "next";
import FormSignup from "./_component/FormSignUp";
import Logo from "@/components/svg/Logo";

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'This is the sign up page',
}
export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background" >
      <Logo />
      <div className="h-full w-full grid place-content-center z-10 md:py-10 pt-20">
        <FormSignup />
      </div>
    </div>
  );
}
