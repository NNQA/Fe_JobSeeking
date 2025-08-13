"use client"

import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useTranslations } from "next-intl"
import { Mail, Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { sendEmailServerAction } from "../action"
import type { TypeResponseError } from "@/lib/models/TypeResponseSuccess"
import ButtonProgressLoading from "@/components/custom/ButtonProgressLoading"

const Schema = (t: (arg: string) => string) => {
  return z.object({
    email: z.string({ required_error: t("input.err") }).email(t("input.invalid")),
  })
}

function FormSendMailAgain() {
  const t = useTranslations("send-email-again")
  const router = useRouter()

  const formSchema = Schema(t)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const loadingToastId = toast.loading(t("progressacction.loading.description"))
    try {
      const result = await sendEmailServerAction(data.email)
      toast.dismiss(loadingToastId)
      if (result.success) {
        toast.success(result.message || t("progressacction.success.description"))
        setTimeout(() => {
          router.push(`verify-email?email=${encodeURIComponent(data.email)}`)
        }, 1500)
      } else {
        const error = result as TypeResponseError
        toast.error(error.error)
      }
    } catch (error) {
      toast.dismiss(loadingToastId)
      toast.error("An unexpected error occurred")
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("input.label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t("input.placeholder")}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ButtonProgressLoading
                type="submit"
                className="w-full"
                state={form.formState.isSubmitting}
                text={t("button.primary.text")}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormSendMailAgain
