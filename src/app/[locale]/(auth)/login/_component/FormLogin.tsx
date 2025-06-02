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
import { useRouter } from "next/navigation";
import { cn, getErrorMessage } from "@/lib/utils";
import { setCookie } from "../../actions";
import { Mail } from "lucide-react";
import { Authorities, ERole } from "@/lib/models/User";
import dynamic from "next/dynamic";
import StraightLineOrChosen from "../../_component/StraightLineOrChosen";
import { TypeResponseSuccess } from "@/lib/models/TypeResponseSuccess";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginSchema } from "./login.zod";
import LoginWithSocialMedia from "../../_component/LoginWithSocialMedia";
import { toast } from "sonner";

const ButtonProgressLoadingDynamic = dynamic(() => import("@/components/custom/ButtonProgressLoading"), { ssr: false });
const CommonAlertDialog = dynamic(() => import("./CommonAlertDialog"));
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
  authorities: Array<Authorities>;
}
function FormLogin(
  {
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"div">
) {
  const router = useRouter();
  const t = useTranslations("login");
  const formSchema = LoginSchema(t);
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
          toast.error(t("progressaction.failure.title"), {
            description: getErrorMessage(action),
          });
        }
      }
    );
  }
  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="flex flex-col">
        <CardTitle className="font-medium text-primary/50 text-lg">
          {t("title")}
        </CardTitle>
        <CardDescription className="font-semibold text-2xl text-border-hover">
          {t("des")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center">
          <p className="text-xs text-secondary-foreground/50 font-semibold tracking-tight">
            {t("signup.title")}
          </p>
          <Link
            href={`/${locale}/newUser`}
            className="text-sm font-medium"
          >
            {t("signup.link")}
          </Link>
        </div>
      </CardContent>

      <CardContent className="flex flex-col gap-3 mb-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 flex flex-col py-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <InputCustomIcon
                      placeholder={t("email.placeholder")}
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
                    <Link href={`/forgotpassword`} aria-label="link to Page forgot" className="text-sm font-medium">{t("forgotPassword.label")}</Link>
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
                className="w-full rounded-lg"
              />
            </div>
          </form>
        </Form>
        <StraightLineOrChosen t={t("socialLogin.or")} />
        <LoginWithSocialMedia textGithub={t("socialLogin.github")} textLinkin={t("socialLogin.linkin")} textGoogle={t("socialLogin.google")} key={"Designposter"} />
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
          actionLink="/send-mail-again"
        />
      </CardContent>
    </Card>
  );
}

export default FormLogin;
