"use client";
import React, {
  useEffect,
  useState,
} from "react";

import { Button, buttonVariants } from "@/components/ui/button";

import { useTranslations } from "next-intl";
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import {
  notFound,
  usePathname,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";
import { cn, getErrorMessage } from "@/lib/utils";
import { toast } from "sonner";

function FormVerifiCation() {
  const t = useTranslations("verify-email");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const url = searchParams.toString();
    if (!url || url.length < 1) {
      notFound();
    }
    setEmail(decodeURIComponent(url.split("=")[1]));
  }, [pathname, searchParams]);
  async function hanleSendMailAgain() {
    setIsLoading(true);
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
        toast.success(t("progressacction.success.description"))
      },
      async (err) => {
        const errAfterActionAs = await toActionErrorsAsync(err);
        toast.error(getErrorMessage(errAfterActionAs));
      }
    );
    setIsLoading(false)
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
          onClick={() => hanleSendMailAgain()}
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
