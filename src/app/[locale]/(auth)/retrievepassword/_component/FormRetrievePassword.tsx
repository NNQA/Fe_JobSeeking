"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle, SendIcon } from "lucide-react";
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { toast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { getErrorMessage } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import PasswordInput from "@/components/inputcustom/PasswordInput";
export const Schema = (t: (arg: string) => string) => {
    return z
        .object({
            password: z
                .string()
                .min(1, { message: t("password.required") })
                .min(8, { message: t("password.length") })
                .regex(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    { message: t("password.complexity") }
                ),
            confirmPassword: z
                .string()
                .min(1, { message: t("confirmPassword.required") }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("confirmPassword.donotmatch"),
            path: ["confirmPassword"],
        });
};
function FormRetrievePassword({ checkToken }: { checkToken: string }) {
    const t = useTranslations("retrieve-password");

    const formSchema = Schema(t);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const result = await ApiClient.instance.post(
            "api/auth/is-new-password",
            {
                body: {
                    token: checkToken,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                },
            }
        );
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
            },
            async (err) => {
                const errAfterActionAs = await toActionErrorsAsync(err);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: getErrorMessage(errAfterActionAs),
                });
            }
        );
    }
    return (
        <div className="w-[510px] bg-background dark:bg-background/80 shadow-md px-12 py-8 rounded-md flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <SendIcon className="h-6 w-6 text-primary" />
                <h1 className="font-semibold ">{t("title")}</h1>
            </div>
            <div>{t("description")}</div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=""
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="password">{t("password.label")}</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        id="password"
                                        placeholder={t("password.placeholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="confirmPassword">{t("confirmPassword.label")}</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        id="password"
                                        placeholder={t("confirmPassword.placeholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-9 text-end space-x-4">
                        <Button variant={"outlineVariant"} asChild>
                            <Link href={"/"} className="hover:no-underline">
                                {t("button.second.text")}
                            </Link>
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-sm relative bg-primary/90 dark:text-secondary-foreground"
                            disabled={form.formState.isSubmitting}
                        >
                            <span
                                className={clsx("block transition ease-in-out", {
                                    "opacity-0": form.formState.isSubmitting,
                                    "scale-0": form.formState.isSubmitting,
                                })}
                            >
                                {t("button.primary.text")}
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

export default FormRetrievePassword;
