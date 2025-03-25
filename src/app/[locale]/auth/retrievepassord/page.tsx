import FormRetrievePassword from "./_component/FormRetrievePassword";
import Logo from "@/components/svg/Logo";
export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: any };
}) {
    if (!searchParams.token) {
        throw new Error("Cannot find token in url");
    }

    return <div className="relative h-screen w-screen overflow-hidden">
        <Logo />
        <div className="h-full  grid place-content-center z-10 pb-20">
            <div className="order-2 md:order-2">
                <FormRetrievePassword checkToken={searchParams.token} />
            </div>
        </div>
    </div>
}
