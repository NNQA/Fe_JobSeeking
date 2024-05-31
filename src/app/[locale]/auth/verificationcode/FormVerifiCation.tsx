"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import Link from "next/link";
import PasswordInput from "@/components/inputcustom/PasswordInput";
import InputCustomIcon from "@/components/inputcustom/InputCustomIcon";
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

const Schema = (t: (arg: string) => string) => {
  return z.object({
    code: z.string().nonempty({ message: t("code.err") }),
  });
};

function FormVerifiCation() {
  const t = useTranslations("verifycode");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<String | null>(null);
  const router = useRouter();
  useEffect(() => {
    const url = searchParams.toString();
    if (!url || url.length < 1) {
      notFound();
    }
    setEmail(decodeURIComponent(url.split("=")[1]));
  }, [pathname, searchParams]);
  const formSchema = Schema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(email);
    const result = await ApiClient.instance.post("api/auth/verifycode", {
      body: {
        code: data.code,
        email: email,
      },
    });
    result.match(
      (x) => {
        toast({
          variant: "success",
          // title: "Signup success",
          // description: "Aasdasdd",
          action: (
            <div className="w-full flex items-center text-primary gap-2">
              <CheckCircle className="h-5 w-5" />
              <span className="first-letter:capitalize">
                {t("progressacction.success.description")}
              </span>
            </div>
          ),
        });
        const timer = setTimeout(() => {
          router.push("login");
        }, 1500);
      },
      async (err) => {
        const a = await toActionErrorsAsync(err);
        toast({
          variant: "destructive",
          title: "Error",
          description: a.form[0],
        });
      }
    );
  }
  return (
    <div className="h-[600px] w-[510px] bg-background px-12 py-8 rounded-md shadow-xl flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-border-hover">Step 2 of 2</p>
        <h1 className="font-semibold ">{t("title")}</h1>
      </div>
      <div>{t("description")}</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-start items-center gap-10"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("code.label")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="code"
                    placeholder={t("code.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-9 text-end">
            <Button
              type="submit"
              className="w-fit rounded-full relative"
              disabled={form.formState.isSubmitting}
            >
              <span
                className={clsx("block transition ease-in-out", {
                  "opacity-0": form.formState.isSubmitting,
                  "scale-0": form.formState.isSubmitting,
                })}
              >
                {t("button.text")}
              </span>

              <Transition
                show={form.formState.isSubmitting}
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
          </div>
        </form>
      </Form>
    </div>
  );
}

export default FormVerifiCation;
