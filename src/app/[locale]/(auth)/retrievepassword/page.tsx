import { Metadata } from "next";
import FormRetrievePassword from "./_component/FormRetrievePassword";
import Logo from "@/components/svg/Logo";

export const metadata: Metadata = {
    title: 'Retrieve password',
    description: 'This is the retrieve password page',
}
export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: any };
}) {
    if (!searchParams.token) {
        throw new Error("Cannot find token in url");
    }

    return <FormRetrievePassword checkToken={searchParams.token} />
}
