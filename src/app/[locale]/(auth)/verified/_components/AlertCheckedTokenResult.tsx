import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

function AlertCheckedTokenResult({ isOpen }: { isOpen: boolean }) {
  const t = useTranslations("verifiedToken");
  return (
    <AlertDialog open={!isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-3 items-center text-destructive">
            <TriangleAlert className="text-destructive" />
            {t("title")}
          </AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Link href={"/"} className="text-primary hover:no-underline">Cancel</Link>
          </AlertDialogCancel>
          <AlertDialogAction className="text-secondary">
            <Link href={"/send-mail-again"} className="text-secondary hover:no-underline">Send again</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertCheckedTokenResult;
