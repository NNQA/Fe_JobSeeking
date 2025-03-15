"use client";
import React from "react";
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
import { useLocale, useTranslations } from "next-intl";
import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import PasswordInput from "@/components/inputcustom/PasswordInput";
import InputCustomIcon from "@/components/inputcustom/InputCustomIcon";
import { CheckCircle, Mail } from "lucide-react";
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { toast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";

const Schema = (t: (arg: string) => string) => {
  return z.object({
    email: z
      .string({ required_error: t("email.err") })
      .email(t("email.invalid")),
    password: z
      .string({ required_error: t("password.err") })
      .min(8, t("password.invalid")),
  });
};

function FormSignup() {
  const router = useRouter();

  const t = useTranslations("signup");
  const formSchema = Schema(t);
  const locale = useLocale();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await ApiClient.instance.post("api/auth/signup", {
      body: {
        email: data.email,
        password: data.password,
      },
    });
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
        const timer = setTimeout(() => {
          router.push(`verify-email?email=${encodeURIComponent(data.email)}`);
        }, 1500);
        console.log(x);
      },
      async (err) => {
        const resultErr = await toActionErrorsAsync(err);
        toast({
          variant: "destructive",
          title: t("progressacction.failure.title"),
          description: getErrorMessage(resultErr),
        });
      }
    );
  }
  return (
    <div className="bg-background px-12 py-8 rounded-md shadow-xl flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="font-medium text-border-hover">Step 1 of 2</p>
        <h1 className="font-semibold ">{t("title")}</h1>
      </div>

      <div className="flex gap-2 mt-4 mb-2">
        <div className="border-2 border-border w-fit px-2 py-2 rounded-full hover:ring-1 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
          <EnvelopeClosedIcon className="w-7 h-7 text-red-500"></EnvelopeClosedIcon>
        </div>
        <div className="border-2 border-border w-fit px-2 py-2 rounded-full hover:ring-1 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
          <LinkedInLogoIcon className="w-7 h-7 text-blue-500"></LinkedInLogoIcon>
        </div>
        <div className="border-2 border-border w-fit px-2 py-2 rounded-full hover:ring-1 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
          <GitHubLogoIcon className="w-7 h-7"></GitHubLogoIcon>
        </div>
      </div>
      <div className="w-full flex items-center gap-3">
        <hr className="h-[1px] bg-border-hover w-48 border-none" />
        Or
        <hr className="h-[1px] bg-border-hover w-48 border-none" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium">{t("login.title")}</p>
        <div className="flex">
          <p className="text-xs">
            {t("login.accountexitst")}
            <Link href={`/auth/login`} className="text-blue-500 font-medium">
              {" "}
              {t("login.link")}
            </Link>{" "}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <InputCustomIcon
                    {...field}
                    icon={<Mail className="h-4 w-4 mt-1 text-primary" />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput id="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2 text-end">
            <Button
              type="submit"
              className="w-fit rounded-full relative"
              disabled={form.formState.isSubmitting}
              aria-label="Sign up with Email"
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

export default FormSignup;
