"use client";
import React, {
  useTransition,
} from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { sendEmailAgainAction } from "../../actions";
import { TypeResponseError } from "@/lib/models/TypeResponseSuccess";
import { Button, buttonVariants } from "@/components/ui/button";
function FormVerifiCation({ email }: { email: string }) {
  const t = useTranslations("verify-email");
  const [isPending, startTransition] = useTransition();
  const handleSendMailAgain = () => {
    startTransition(async () => {
      const result = await sendEmailAgainAction(email);
      if (!result.success) {
        const error = result as TypeResponseError
        toast.error(t("progressacction.failure.title"), {
          description: error.error
        });
        return;
      }
      toast.success('success', {
        description: t("progressacction.success.description")
      });
    });
  }
  return (
    <Card className="max-w-md w-full shadow-2xl shadow-primary/5 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-primary" />
            </div>
            <div className="w-8 h-0.5 bg-primary/20"></div>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-medium">
                2
              </span>
            </div>
            <span className="text-sm text-muted-foreground ml-2">{t("step")}</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{t("check_email")}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {t("instruction")}
          </p>
        </div>
        <div className="space-y-3">
          <Button
            onClick={() => handleSendMailAgain()}
            disabled={isPending}
            type="submit"
            className="w-full relative hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-all hover:shadow-primary/20"
          >
            <div
              className={clsx("block transition ease-in-out", {
                "opacity-0": isPending,
                "scale-0": isPending,
              })}
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{t("resend_email")}</span>
              </div>
            </div>

            <Transition
              show={isPending}
              enter="transition ease-in-out"
              enterFrom="opacity-0 scale-0"
              leave="transition ease-in-out duration-300"
              leaveTo="opacity-0 scale-0"
            >
              <div className="w-[50%] h-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ProgressCircle
                  className="w-full h-full text-primary-500"
                  aria-label="signing in"
                />
              </div>
            </Transition>
          </Button>
          <Button variant={"ghost"} asChild
            className="w-full text-muted-foreground hover:text-foreground hover:bg-primary/5 py-3 rounded-lg transition-all duration-200"
          >
            <Link
              href={"/login"}
              className={cn(buttonVariants({ variant: "link" }), "hover:no-underline")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("back_to_login")}
            </Link>
          </Button>
        </div>
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            {t("didnt_receive")}
            <Button
              variant={"ghost"}
              onClick={handleSendMailAgain}
              className="text-primary hover:text-primary/80 hover:bg-transparent font-medium underline underline-offset-2 transition-colors"
            >
              {t("try_again")}
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default FormVerifiCation;
