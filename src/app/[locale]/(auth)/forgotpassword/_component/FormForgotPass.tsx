"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle, SendIcon } from "lucide-react";
import { ApiClient } from "@/lib/service/api-client.server";
import { toActionErrorsAsync } from "@/lib/error.server";
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
import InputCustomIcon from "@/components/inputcustom/InputCustomIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
const Schema = (t: (arg: string) => string) => {
    return z.object({
        email: z
            .string({ required_error: t("input.err") })
            .email(t("input.invalid")),
    });
};
function FormForgotPassword() {
    const t = useTranslations("forgot-password");
    const router = useRouter();

    const formSchema = Schema(t);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const result = await ApiClient.instance.post(
            "api/auth/forgot-password",
            {
                body: {
                    email: data.email,
                },
            }
        );
        result.match(
            (x) => {
                toast.success(t("progressacction.success.description"));
            },
            async (err) => {
                const errAfterActionAs = await toActionErrorsAsync(err);
                toast.error(getErrorMessage(errAfterActionAs))
            }
        );
    }
    return (
        <div className="w-[510px] bg-background dark:bg-background/80 shadow-md px-12 py-8 rounded-md flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <SendIcon className="h-6 w-6 text-green-500" />
                <h1 className="font-semibold text-green-500">{t("title")}</h1>
            </div>
            <div className="font-semibold text-sm text-primary">{t("description")}</div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=""
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="email">{t("input.label")}</FormLabel>
                                <FormControl>
                                    <InputCustomIcon
                                        icon={null}
                                        id="email"
                                        className=""
                                        placeholder={t("input.placeholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-9 text-end space-x-4">
                        <Button variant={"outlineVariant"} asChild>
                            <Link href={"/"} className="hover:no-underline text-primary">
                                {t("button.second.text")}
                            </Link>
                        </Button>
                        <Button
                            type="submit"
                            className="relative"
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

export default FormForgotPassword;
