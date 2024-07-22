import { Suspense } from "react";
import { SkeletonCard } from "@/components/SeletonCard";

export default async function Page() {
  // const queryClient = getQueryClient();
  // const { data: user, isLoading } = queryClient.qure({
  //   queryKey: ["loadingUserSupplier"],
  //   queryFn: getData,
  // });
  // const locale = useLocale();
  // if (
  //   !user ||
  //   !user?.authorities.some((e) => e.authority === ERole.ROLE_SUPPLIER)
  // ) {
  //   redirect(`/${locale}/upgradeaccount`);
  // }
  return (
    <div>
      <Suspense fallback={<SkeletonCard />}></Suspense>
    </div>
  );
}
