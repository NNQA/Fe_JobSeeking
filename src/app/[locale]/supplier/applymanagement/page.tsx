import SkeletonTable from "@/components/SkeletonCustom/SkeletonTable";

export default function Page() {
  const a = true;

  if (a)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <SkeletonTable />
      </div>
    );
  return (
    <>
      <div>aasdad</div>
    </>
  );
}
