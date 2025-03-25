import Logo from "@/components/svg/Logo";
import FormForgotPassword from "./_component/FormForgotPass";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Forgot password',
    description: 'This is the forgot password page',
}
export default function Page() {
    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <Logo />
            <div className="h-full  grid place-content-center z-10 pb-20">
                <div className="order-2 md:order-2">
                    <FormForgotPassword />
                </div>
            </div>
        </div>
    );
}
