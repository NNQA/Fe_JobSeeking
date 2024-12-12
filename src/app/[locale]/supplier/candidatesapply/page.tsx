import PaginationBar from "@/components/custom/PaginationBar";
import ComboBox from "./_component/Combobox";
import TableManagementApplicants from "./TableManagementApplicants";
import { getApplicattionPagination } from "./action";
import { Suspense } from "react";

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}
interface PageProp {
  searchParams: { [key: string]: string };
}
export default async function Page({ searchParams }: PageProp) {
  let searchStr = Object.keys(searchParams)

    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(searchParams[key])}`
    )
    .join("&");

  const a = await getApplicattionPagination({ text: searchStr });
  console.log(a?.data?.applicantResponses);
  return (
    <>
      <div className="px-6 py-4 space-y-6 flex flex-col justify-between w-full">
        <div className="flex justify-between items-center">
          <h4>Applicants</h4>
          {/* <ActionButton /> */}
        </div>
        <Suspense fallback={<>Loading.....</>}>
          <TableManagementApplicants data={a?.data?.applicantResponses ?? []} />
        </Suspense>
        <div className="w-full flex justify-between items-center px-2">
          <div className="text-sm flex items-center gap-10 text-card-foreground/70 font-medium">
            <div className="flex items-center gap-4">
              <p className="text-sm text-foreground/80 font-medium">
                Lines per page :
              </p>
              <ComboBox />
            </div>
            <p className="text-sm text-foreground/80 font-medium">
              Showing: {a?.data?.applicantResponses.length ?? 0}
            </p>
          </div>
          <div className="text-end">
            <PaginationBar totalCount={5} />
          </div>
        </div>
      </div>
    </>
  );
}
