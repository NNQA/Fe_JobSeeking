"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { useTranslations } from "next-intl";
import { UpdateNewUser } from "./update-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import { cn } from "@/lib/utils";
import GroudRadioUpdate from "./GroudRadioUpdate";
import { updateNewUser } from "../action";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
function FormUpdate() {
  const t = useTranslations();
  const formSchema = UpdateNewUser(t);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      experiencelevel: "",
      phone: "",
      university: "",
    },
  });

  const { setValue } = form;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await updateNewUser({
      experiencelevel: data.experiencelevel,
      name: data.name,
      phone: data.phone,
      university: data.university,
    });
    if (result?.status === "ok") {
      toast({
        variant: "success",
        title: "Success",
        description: "You update your successfully",
      });
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);
      timer;
    } else {
      toast({
        variant: "destructive",
        title: "Failure",
        description: result?.message,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col w-full"
      >
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Họ và tên <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black text- font-medium"
                    placeholder={"Nhập họ và tên"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Số điện thoại <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black text- font-medium"
                    placeholder={"Nhập số điện thoại"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trường đại học <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black text- font-medium"
                  placeholder={"Nhập trường đại học"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <GroudRadioUpdate setValue={setValue} />
        <div className="mt-2 text-end space-x-4">
          <Button
            type="reset"
            className={cn(
              buttonVariants({ variant: "outlineVariant" }),
              "bg-background text-foreground"
            )}
          >
            Cài lại
          </Button>
          <Button
            type="submit"
            className="w-fit text-background relative"
            disabled={form.formState.isSubmitting}
          >
            <span
              className={clsx("block transition ease-in-out", {
                "opacity-0": form.formState.isSubmitting,
                "scale-0": form.formState.isSubmitting,
              })}
            >
              Cập nhật
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
  );
}

export default FormUpdate;
