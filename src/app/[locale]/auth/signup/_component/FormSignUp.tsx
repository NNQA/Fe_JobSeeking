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
import Link from "next/link";
import PasswordInput from "@/components/inputcustom/PasswordInput";
import InputCustomIcon from "@/components/inputcustom/InputCustomIcon";
import { CheckCircle, Mail } from "lucide-react";
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { toast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";
import LoginWithSocialMedia from "../../_component/LoginWithSocialMedia";
import StraightLineOrChosen from "../../_component/StraightLineOrChosen";
import dynamic from "next/dynamic";

const ButtonProgressLoadingDynamic = dynamic(() => import("@/components/custom/ButtonProgressLoading"), { ssr: false });
const Schema = (t: (arg: string) => string) => {
  return z.object({
    email: z
      .string({ required_error: t("email.err") })
      .email(t("email.invalid")),
    password: z
      .string()
      .min(1, { message: t("password.required") })
      .min(8, { message: t("password.length") })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: t("password.complexity") }
      ),
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
    <div className="md:px-12 md:py-8 px-6 py-4 rounded-md border flex flex-col gap-6 md:max-w-lg max-w-md">
      <div className="space-y-8">
        <div className="space-y-1">
          <p className="font-medium text-border-hover">Step 1 of 2 </p>
          <h1 className="font-semibold">{t("title")}</h1>
        </div>
        <LoginWithSocialMedia />
      </div>
      <StraightLineOrChosen />

      <div className="font-medium text-foreground/80">

        <p>{t("login.title")}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-secondary-foreground/50 font-semibold tracking-tight">
            {t("login.accountexitst")}
          </p>
          <Button asChild variant={"link"} size="sm" className="p-0 m-0">
            <Link href={`/auth/login`} >
              {t("login.link")}
            </Link>
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 flex flex-col max-w"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <InputCustomIcon
                    {...field}
                    placeholder={t("email.placeholder")}
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
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <PasswordInput id="password" {...field} placeholder={t("password.placeholder")} className="w-full" />
                </FormControl>
                <FormMessage className="w-full break-words" />
              </FormItem>
            )}
          />
          <div className="text-end">
            <ButtonProgressLoadingDynamic
              type="submit"
              state={form.formState.isSubmitting}
              text={t("button.text")}
              className={clsx("rounded-full relative")}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export default FormSignup;
