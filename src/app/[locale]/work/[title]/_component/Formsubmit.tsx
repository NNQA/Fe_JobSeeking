import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
interface Props {
  form: UseFormReturn<
    {
      email: string;
      name: string;
      phone: string;
      resume: File;
    },
    any,
    undefined
  >;
}
function Formsubmit({ form }: Props) {
  return (
    <div className="w-full pb-2 flex flex-col">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
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
      <div className="flex w-full gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black text- font-medium w-full"
                  placeholder={"Nhập email"}
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
                  className="text-black text- font-medium w-full"
                  placeholder={"Nhập phone"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
      </div>
    </div>
  );
}

export default Formsubmit;
