"use client";
import React, { useState } from "react";
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
import { ApiClient, ApiError } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import { getErrorMessage } from "@/lib/utils";
import { setCookie } from "../../actions";
import { Mail } from "lucide-react";
import { Authorities, ERole } from "@/lib/models/User";
import Designposter from "./Designposter";
import dynamic from "next/dynamic";
import { Button, } from "@/components/ui/button";
import StraightLineOrChosen from "../../_component/StraightLineOrChosen";
import { TypeResponseSuccess } from "@/lib/models/TypeResponseSuccess";

const ButtonProgressLoadingDynamic = dynamic(() => import("@/components/custom/ButtonProgressLoading"), { ssr: false });
const CommonAlertDialog = dynamic(() => import("./CommonAlertDialog"));
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
  authorities: Array<Authorities>;
}
const Schema = (t: (arg: string) => string) => {
  return z.object({
    email: z
      .string({ required_error: t("email.err") })
      .email(t("email.invalid")),
    password: z.string()
      .min(1, { message: t("password.required") })
      .min(8, { message: t("password.length") })
  });
};

function FormLogin() {
  const router = useRouter();
  const t = useTranslations("login");
  const formSchema = Schema(t);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDialogError, setShowDialogError] = useState<boolean>(false);
  const locale = useLocale();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await ApiClient.instance.post("api/auth/login", {
      body: {
        email: data.email,
        password: data.password,
      },
    });
    result.match(
      async (x) => {
        setShowDialog(true);

        const response = (await x.json()) as TypeResponseSuccess<LoginResponse>;
        await setCookie({
          refreshToken: response.body.refreshToken,
          accessToken: response.body.accessToken,
        });
        form.reset();
        setTimeout(() => {
          if (response.body.newUser) {
            router.push(`/${locale}/newUser`);
          }
          else {
            if (
              response.body.authorities.some(
                (e: Authorities) => e.authority === ERole.ROLE_SUPPLIER
              )
            ) {
              router.push(`/${locale}/supplier`);
            } else {
              router.push(`/${locale}`);
            }
          }
        }, 2000);
      },
      async (err) => {
        const action = await toActionErrorsAsync(err);
        const isUnverifiedEmailError =
          err instanceof ApiError &&
          (err.details.title === "Verify email issue" ||
            (err.details.errors &&
              err.details.errors.some(
                (error) =>
                  error.name === "email" &&
                  error.message.includes("not verified email")
              )));
        if (isUnverifiedEmailError) {
          setShowDialogError(true);
        } else {
          toast({
            variant: "destructive",
            title: t("progressaction.failure.title"),
            description: getErrorMessage(action),
          });
        }
      }
    );
  }
  return (
    <div className="md:px-12 md:py-8 px-6 py-4 rounded-md border flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-border-hover">Đăng nhập</p>
        <h1 className="font-semibold">{t("title")}</h1>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-xs text-secondary-foreground/50 font-semibold tracking-tight">
          {t("signup.title")}
        </p>
        <Button asChild variant="link" size="sm" className="p-0 m-0">
          <Link
            href={`/${locale}/auth/signup`}
          >
            {t("signup.link")}
          </Link>
        </Button>
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
              <FormItem className="space-y-2">
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <InputCustomIcon
                    placeholder="Nhập email của bạn"
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
                <div className="flex justify-between items-center">
                  <FormLabel>Password *</FormLabel>
                  <Link href={`/auth/forgotpassword`} aria-label="link to Page forgot" className="text-sm font-medium">{t("forgotPassword.label")}</Link>
                </div>
                <FormControl>
                  <PasswordInput id="password" placeholder={t("password.placeholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-end">
            <ButtonProgressLoadingDynamic
              type="submit"
              state={form.formState.isSubmitting}
              text={t("button.text")}
              className="rounded-full px-4 py-0"
            />
          </div>
        </form>
      </Form>
      <StraightLineOrChosen />
      <Designposter textGithub={t("socialLogin.github")} textLinkin={t("socialLogin.linkin")} textGoogle={t("socialLogin.google")} key={"Designposter"} />
      <CommonAlertDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        variant="success"
        title={t("progressaction.success.title")}
        description={t("progressaction.success.description")}
        titleClassName="text-primary"
      />

      <CommonAlertDialog
        open={showDialogError}
        onOpenChange={setShowDialogError}
        variant="error"
        title={t("progressaction.failure.title")}
        description={t("progressaction.failure.description")}
        titleClassName="text-destructive"
        cancelText={t("progressaction.failure.buttoncancel")}
        actionText={t("progressaction.failure.button")}
        actionLink="/auth/send-mail-again"
      />
    </div>
  );
}

export default FormLogin;
