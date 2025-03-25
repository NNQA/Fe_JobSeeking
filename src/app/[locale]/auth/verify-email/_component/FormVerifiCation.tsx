"use client";
import React, {
  startTransition,
  useEffect,
  useState,
  useTransition,
} from "react";

import { Button, buttonVariants } from "@/components/ui/button";

import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { toast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import {
  notFound,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { cn, getErrorMessage } from "@/lib/utils";

function FormVerifiCation() {
  const t = useTranslations("verify-email");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useTransition();
  useEffect(() => {
    const url = searchParams.toString();
    if (!url || url.length < 1) {
      notFound();
    }
    setEmail(decodeURIComponent(url.split("=")[1]));
  }, [pathname, searchParams]);
  async function hanleSendMailAgain() {
    const result = await ApiClient.instance.post(
      "api/auth/request-token-email",
      {
        body: {
          email: email,
        },
      }
    );
    result.match(
      (x) => {
        toast({
          variant: "success",
          action: (
            <div className="w-full flex items-center text-primary gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="first-letter:capitalize">
                {t("progressacction.success.description")}
              </span>
            </div>
          ),
        });
      },
      async (err) => {
        const errAfterActionAs = await toActionErrorsAsync(err);
        toast({
          variant: "destructive",
          title: "Error",
          description: getErrorMessage(errAfterActionAs),
        });
      }
    );
  }
  return (
    <div className="w-[510px] bg-background px-12 py-8 rounded-md shadow-xl flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-border-hover">Step 2 of 2</p>
        <h1 className="font-semibold ">{t("title")}</h1>
      </div>
      <div>{t("description")}</div>
      <div className="flex gap-4">
        <Button
          type="submit"
          className="w-fit relative text-secondary"
          disabled={isLoading}
          onClick={() => startTransition(() => hanleSendMailAgain())}
        >
          <span
            className={clsx("block transition ease-in-out", {
              "opacity-0": isLoading,
              "scale-0": isLoading,
            })}
          >
            {t("button.primary.text")}
          </span>

          <Transition
            show={isLoading}
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
        <Button variant={"secondary"}>
          <Link
            href={`/auth/login`}
            className={cn(buttonVariants({ variant: "link" }))}
          >
            {t("button.second.text")}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default FormVerifiCation;
