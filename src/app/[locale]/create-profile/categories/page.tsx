import { categoriesData } from "@/app/mocks/Categories";
import IndustrySpecializationStep from "./_component/IndustrySpecializationStep";

export default function Page() {

    const data = categoriesData;
    return (
        <div className="h-full grid content-center md:px-20 px-2 gap-6 py-10">
            <p>1/10</p>
            <h1>
                Great, so what kind of work are you here to do?
            </h1>
            <p>
                Don't worry, you can change these choices later on.
            </p>
            <hr className="border-foreground/10 h-1" />
            <IndustrySpecializationStep data={data} />
        </div>
    );
}