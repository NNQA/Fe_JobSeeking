"use client";
import React, { useEffect, useMemo } from "react";
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
import { useTranslations } from "next-intl";
import Link from "next/link";
import PasswordInput from "@/components/inputcustom/PasswordInput";
import InputCustomIcon from "@/components/inputcustom/InputCustomIcon";
import { Mail } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import LoginWithSocialMedia from "../../_component/LoginWithSocialMedia";
import StraightLineOrChosen from "../../_component/StraightLineOrChosen";
import dynamic from "next/dynamic";
import { SignUpSchema } from "./signup.zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ERole } from "@/lib/models/User";
import { signUpActionForm } from "../action";
import { TypeResponseError } from "@/lib/models/TypeResponseSuccess";

const ButtonProgressLoadingDynamic = dynamic(() => import("@/components/custom/ButtonProgressLoading"), { ssr: false });

function FormSignup({
  role
}: {
  role: ERole
}) {
  const router = useRouter();
  const t = useTranslations("signup");
  const formSchema = useMemo(() => SignUpSchema(t), [t]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    setFocus,
    formState: { errors },
  } = form;
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as keyof z.infer<typeof formSchema>;
    if (firstErrorField) {
      setFocus(firstErrorField);
    }
  }, [errors, setFocus, formSchema])
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const result = await signUpActionForm(data.email, data.password, role as ERole);
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
      router.push(`verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  }
  return (
    <Card className="p-2">
      <CardHeader className="flex flex-col gap-4">
        <div className="space-y-2">
          <CardDescription className="font-bold text-muted-foreground">{t("subtitle")}</CardDescription>
          <CardTitle className="font-semibold">{t("title")}</CardTitle>
        </div>
        <LoginWithSocialMedia className="justify-start gap-3" textGithub={t("socialLogin.github")} textLinkin={t("socialLogin.linkin")} textGoogle={t("socialLogin.google")} />
      </CardHeader>
      <CardContent className="space-y-4">
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
            className="space-y-5 flex flex-col"
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
                      aria-label="input email"
                      placeholder={t("email.placeholder")}
                      icon={<Mail className="h-4 w-4 mt-1 text-primary/70" />}
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
                className={clsx("rounded-sm relative sm:w-auto sm:min-w-[120px]")}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default FormSignup;
