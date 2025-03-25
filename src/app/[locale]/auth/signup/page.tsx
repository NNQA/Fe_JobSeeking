import { Metadata } from "next";
import FormSignup from "./_component/FormSignUp";
import Logo from "@/components/svg/Logo";

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'This is the sign up page',
}
export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Logo />
      <div className="h-full  grid place-content-center z-10 pb-20">
        <div className="order-2 md:order-2">
          <FormSignup />
        </div>
      </div>
    </div>
  );
}
