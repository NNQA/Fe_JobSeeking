import Logo from "@/components/svg/Logo";
import FormForgotPassword from "./_component/FormForgotPass";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Forgot password',
    description: 'This is the forgot password page',
}
export default function Page() {
    return (
        <FormForgotPassword />
    );
}
