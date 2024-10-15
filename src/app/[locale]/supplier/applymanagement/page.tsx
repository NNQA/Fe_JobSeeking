import ActionButton from "./_component/ActionButton";
import ComboBox from "./_component/ComboBox";
import { getJobPagination } from "./action";
import TableManagementJob from "./TableManagementJob";
import PaginationBar from "@/components/custom/PaginationBar";

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

  const a = await getJobPagination({ text: searchStr });
  return (
    <>
      <div className="px-6 py-4 space-y-6 flex flex-col justify-between w-full">
        <div className="flex justify-between items-center">
          <h4>Job Management</h4>
          <ActionButton />
        </div>
        <TableManagementJob data={a?.data?.jobResponseList ?? []} />
        <div className="w-full flex justify-between items-center px-2">
          <div className="text-sm flex items-center gap-10 text-card-foreground/70 font-medium">
            <div className="flex items-center gap-4">
              <p className="text-sm text-foreground/80 font-medium">
                Lines per page :
              </p>
              <ComboBox />
            </div>
            <p className="text-sm text-foreground/80 font-medium">
              Showing: {a?.data?.jobResponseList.length ?? 0}
            </p>
          </div>
          <div className="text-end">
            <PaginationBar totalCount={a?.data?.totalElements ?? 5} />
          </div>
        </div>
      </div>
    </>
  );
}
