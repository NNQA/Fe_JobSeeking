import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

function AlertCheckedTokenResult({ isOpen }: { isOpen: boolean }) {
  const t = useTranslations("verifiedToken");
  return (
    <AlertDialog open={!isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-3 items-center">
            <TriangleAlert className="text-destructive" />
            {t("title")}
          </AlertDialogTitle>
          <AlertDialogDescription>{t("description")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Link href={"/"}>Cancel</Link>
          </AlertDialogCancel>
          <AlertDialogAction className="text-secondary">
            <Link href={"/auth/send-mail-again"} className="text-secondary hover:no-underline">Send again</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertCheckedTokenResult;
