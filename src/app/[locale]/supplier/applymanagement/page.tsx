import ActionButton from "./_component/ActionButton";
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
      <div className="px-6 py-4 space-y-8 flex flex-col justify-between w-full">
        <div className="flex justify-between items-center">
          <h4>Job Management</h4>
          <ActionButton />
        </div>
        <TableManagementJob data={a?.data?.jobResponseList ?? []} />
        <div className="w-full flex justify-between items-center px-2">
          <div>Showing: {a?.data?.totalElements ?? 0}</div>
          <div className="text-end">
            <PaginationBar totalCount={a?.data?.totalElements ?? 5} />
          </div>
        </div>
      </div>
    </>
  );
}
