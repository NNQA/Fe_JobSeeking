"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/utils";
import LoginWithSocialMedia from "../../_component/LoginWithSocialMedia";
import StraightLineOrChosen from "../../_component/StraightLineOrChosen";
import dynamic from "next/dynamic";
import { SignUpSchema } from "./signup.zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ButtonProgressLoadingDynamic = dynamic(() => import("@/components/custom/ButtonProgressLoading"), { ssr: false });


function FormSignup() {
  const router = useRouter();
  const t = useTranslations("signup");
  const formSchema = SignUpSchema(t);
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
        toast.success('success', {
          description: t("progressacction.success.description")
        });
        const timer = setTimeout(() => {
          router.push(`verify-email?email=${encodeURIComponent(data.email)}`);
        }, 1500);
        console.log(x);
      },
      async (err) => {
        const resultErr = await toActionErrorsAsync(err);
        toast.error(t("progressacction.failure.title"), {
          description: getErrorMessage(resultErr),
        });
      }
    );
  }
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="flex flex-col gap-3">
        <CardDescription className="font-medium text-border-hover">Step 1 of 2 </CardDescription>
        <CardTitle className="font-semibold">{t("title")}</CardTitle>
        <LoginWithSocialMedia className="justify-start gap-2" textGithub={t("socialLogin.github")} textLinkin={t("socialLogin.linkin")} textGoogle={t("socialLogin.google")} key={"Designposter"} />
      </CardHeader>
      <CardContent >
        <StraightLineOrChosen t={t("socialLogin.or")} />
        <div className="font-medium text-foreground/80">
          <div className="flex items-center gap-2">
            <p className="text-xs text-secondary-foreground/50 font-semibold tracking-tight">
              {t("login.accountexitst")}
            </p>
            <Link href={`/login`} className="text-sm">
              {t("login.link")}
            </Link>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 flex flex-col py-5"
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
                className={clsx("rounded-lg relative")}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default FormSignup;
