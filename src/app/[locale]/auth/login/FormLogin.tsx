"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { checkInstanceResponsce } from "@/lib/utils";
import { User } from "@/lib/models/User";
import { setCookie } from "../actions";

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
  const [email, setEmail] = useState<string>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDialogError, setShowDialogError] = useState<boolean>(false);
  const locale = useLocale();
  const linkGGLogin =
    process.env.NEXT_PUBLIC_API_GG +
    "/" +
    locale +
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT;
  console.log(linkGGLogin);
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
        const response = await x.json();
        await setCookie(response);
        const timer = setTimeout(() => {
          router.push("/");
        }, 1500);
      },
      async (err) => {
        const action = await toActionErrorsAsync(err);
        if (checkInstanceResponsce(action.form[1]) == 1) {
          setEmail(data.email);
          setShowDialogError(true);
        } else {
          toast({
            variant: "destructive",
            title: t("progressaction.failure.title"),
            description: action.form[0],
          });
        }
      }
    );
  }
  return (
    <div className="h-[600px] w-[510px] bg-background px-12 py-8 rounded-md shadow-xl flex flex-col gap-4">
      <h1 className="font-semibold ">{t("title")}</h1>

      <div className="flex flex-col gap-1">
        <p className="text-xs">
          {t("signup.title")}
          <Link
            href={`/${locale}/auth/signup`}
            className="text-blue-500 font-medium"
          >
            {t("signup.link")}
          </Link>
        </p>
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
      <div className="w-full flex items-center gap-3">
        <hr className="h-[1px] bg-border-hover w-48 border-none" />
        Or
        <hr className="h-[1px] bg-border-hover w-48 border-none" />
      </div>
      <div className="flex flex-col gap-2 mt-4 mb-2">
        <Button
          asChild
          className="border-2 border-border w-full flex justify-center bg-accent hover:bg-accent text-foreground focus:bg-accent  gap-2 items-center px-2 py-2 rounded-full hover:ring-0 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer"
        >
          <Link href={linkGGLogin ?? "/"} className="">
            <EnvelopeClosedIcon className="w-5 h-5 text-red-500"></EnvelopeClosedIcon>
            <p className="font-medium">Continue with Google</p>
          </Link>
        </Button>
        <div className="border-2 border-border w-full flex justify-center  gap-2 items-center px-2 py-2 rounded-full hover:ring-0 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
          <LinkedInLogoIcon className="w-5 h-5 text-blue-500"></LinkedInLogoIcon>
          <p className="font-medium">Continue with Linkin</p>
        </div>
        <div className="border-2 border-border w-full flex justify-center  gap-2 items-center px-2 py-2 rounded-full hover:ring-0 hover:ring-inset hover:ring-border-hover hover:border-border-hover hover:cursor-pointer">
          <GitHubLogoIcon className="w-5 h-5"></GitHubLogoIcon>
          <p className="font-medium">Continue with Github</p>
        </div>
      </div>
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
                href={`/${locale}/auth/verificationcode?email=${encodeURIComponent(
                  email ? email : ""
                )}`}
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
