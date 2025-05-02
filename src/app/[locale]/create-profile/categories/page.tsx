import IndustrySpecializationStep from "./_component/IndustrySpecializationStep";
import { CategoriesActionFetching } from "@/lib/action/categories/categories.action";
import { useProfileWizard } from "@/lib/context/ProfileWizardProvider";
import { Suspense } from "react";

export default async function Page() {
    const categories = await CategoriesActionFetching.getCategories();
    console.log(categories)
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
            <Suspense fallback={<div className="h-10">Loading...</div>}>
                <IndustrySpecializationStep data={categories} />
            </Suspense>
        </div>
    );
}