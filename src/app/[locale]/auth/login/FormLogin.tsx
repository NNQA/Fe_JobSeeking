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
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getErrorMessage } from "@/lib/utils";
import { setCookie } from "../actions";
import { Mail } from "lucide-react";
import { Authorities, ERole } from "@/lib/models/User";
import Designposter from "./Designposter";
import dynamic from "next/dynamic";
import { Button, buttonVariants } from "@/components/ui/button";

const ButtonProgressLoadingDynamic = dynamic(() => import("@/components/custom/ButtonProgressLoading"), { ssr: false });

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
    password: z.string({ required_error: t("password.err") }).min(4),
  });
};

function FormLogin() {
  const router = useRouter();
  const t = useTranslations("login");
  const formSchema = Schema(t);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDialogError, setShowDialogError] = useState<boolean>(false);
  const locale = useLocale();
  const linkGGLogin = `${process.env.NEXT_PUBLIC_API_GG}/${locale}${process.env.NEXT_PUBLIC_GOOGLE_CLIENT}`;

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
        const response = (await x.json()) as LoginResponse;
        await setCookie({
          refreshToken: response.refreshToken,
          accessToken: response.accessToken,
        });
        if (response.newUser) {
          router.push(`/${locale}/newUser`);
        } else {
          if (
            response.authorities.some(
              (e: Authorities) => e.authority === ERole.ROLE_SUPPLIER
            )
          ) {
            router.push(`/${locale}/supplier`);
          } else {
            router.push("/");
          }
        }
      },
      async (err) => {
        const action = await toActionErrorsAsync(err);
        toast({
          variant: "destructive",
          title: t("progressaction.failure.title"),
          description: getErrorMessage(action),
        });
      }
    );
  }
  return (
    <div className="py-2 rounded-md flex flex-col gap-6">
      <div className="space-y-[12px]">
        <h1 className="font-semibold text-4xl m-0 p-0 text-foreground">{t("title")}</h1>
        <div className="gap-2 flex items-center">
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
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <InputCustomIcon
                    className="border-2 py-5"
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
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <PasswordInput id="password" className="border-2 py-5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonProgressLoadingDynamic
            type="submit"
            state={form.formState.isSubmitting}
            text={t("button.text")}
            className="rounded-md py-5"
          />
        </form>
      </Form>
      <div className="w-full flex items-center gap-3">
        <hr className="h-[1px] bg-border-hover w-48 border-none" />
        Or
        <hr className="h-[1px] bg-border-hover w-48 border-none" />
      </div>
      <Designposter linkGGLogin={linkGGLogin} key={"Designposter"} />
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader className="p-4">
            <AlertDialogTitle className="text-primary">
              {t("progressaction.success.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("progressaction.success.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showDialogError} onOpenChange={setShowDialogError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              {t("progressaction.failure.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("progressaction.failure.description")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("progressaction.failure.buttoncancel")}
            </AlertDialogCancel>
            <AlertDialogAction>
              <Link
                href={`/auth/send-mail-again`}
              >
                {t("progressaction.failure.button")}
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FormLogin;
