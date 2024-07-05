import dynamic from "next/dynamic";
const FormCreateApplyComp = dynamic(() => import("./FormCreateApply"), {
  loading: () => <p>Loading....</p>,
});
export default function Page() {
  return (
    <div className="px-6 py-4 space-y-12">
      <h4>Create New Application</h4>
      <FormCreateApplyComp />
    </div>
  );
}
