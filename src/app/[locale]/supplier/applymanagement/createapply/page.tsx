import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
const FormCreateApplyComp = dynamic(() => import("./FormCreateApply"), {
  loading: () => <p>Loading....</p>,
});
export default function Page() {
  const t = useTranslations();
  return (
    <div className="px-6 py-4 space-y-12 mt-2">
      <h4>{t("supplier.h4")}</h4>
      <FormCreateApplyComp />
    </div>
  );
}
