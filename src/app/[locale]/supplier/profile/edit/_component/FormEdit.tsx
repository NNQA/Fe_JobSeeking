"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyEditSchema } from "../form-edit-zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import Tiptap from "@/components/tiptab/Tiptap";
import InputSearchAddress from "@/components/inputcustom/InputSearchAddress";
import { Address, AddressComponent } from "@/lib/models/Address";
import { actionUpdateUser } from "../action";
import { Company } from "@/lib/models/Company";
import { toast } from "@/components/ui/use-toast";
function FormEdit({ company }: { company: Company }) {
  const t = useTranslations("supplier.createapply");
  const formSchema = CompanyEditSchema(t);

  const [addressComponent, setAddressComponent] = useState<
    AddressComponent | undefined
  >({
    address: company.address?.addressName || "",
    commune: company.address?.communeName || "",
    province: company.address?.provinceName || "",
    district: company.address?.districtName || "",
    formatted_address: company.address?.formattedAddressName || "",
    location: {
      lat: company.address?.lat || 0,
      lng: company.address?.lng || 0,
    },
    name: company.address?.addressName || "",
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: company.phone,
      address: company.address.formattedAddressName,
      nameCompany: company.nameCompany,
      linkComp: company.linkComp ?? "",
      numberEmp: company.numberEmp ?? "",
      businessType: company.businessType ?? "",

      description: company.description ?? "",

      businessRegistrationNumber: company.businessRegistrationNumber ?? "",
    },
  });
  const { setValue } = form;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    const updatedFields = Object.entries(data).reduce((acc, [key, value]) => {
      const typedKey = key as keyof typeof data;

      if (value !== form.formState.defaultValues?.[typedKey]) {
        acc[typedKey] = value;
      }

      return acc;
    }, {} as Partial<z.infer<typeof formSchema>>);

    console.log("Updated fields:", updatedFields);

    if (Object.keys(updatedFields).length === 0) {
      toast({
        variant: "destructive",
        title: "No changes",
        description: "Nothing to update.",
      });
      return;
    }

    // if (!form.formState.isDirty) {
    //   toast({
    //     variant: "destructive",
    //     title: "No changes",
    //     description: "Nothing to update.",
    //   });
    //   return;
    // }
    if (!addressComponent) return;
    const result = await actionUpdateUser({
      address: {
        addressName: addressComponent.address,
        communeName: addressComponent.commune,
        provinceName: addressComponent.province,
        districtName: addressComponent.district,
        formattedAddressName: addressComponent.formatted_address,
        lat: addressComponent.location.lat,
        lng: addressComponent.location.lng,
      } as Address,
      nameCompany: data.nameCompany,
      phone: data.phone,
      businessRegistrationNumber: data.businessRegistrationNumber,
      businessType: data.businessType,
      linkComp: data.linkComp,
      numberEmp: data.numberEmp,
      description: data.description,
    } as Company);
    if (result?.status === "ok") {
      toast({
        variant: "success",
        title: "Success",
        description: "You update your successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failure",
        description: result?.message,
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col pb-10"
      >
        <div className="w-full flex justify-between">
          <div className="space-y-1">
            <h6 className="font-bold">Company profile</h6>
            <p className="text-foreground/30 font-medium text-sm">
              Update your company photo and details here
            </p>
          </div>
          <div className="mt-2 text-end space-x-4">
            <Button
              type="reset"
              className={cn(
                buttonVariants({ variant: "outlineVariant" }),
                "bg-background text-foreground"
              )}
              // onClick={() => {
              //   const { reset } = form;
              //   setSkillActiveTagIndex(null);

              //   setActiveTagIndexCategories(null);
              //   setCategories([]);
              //   setSkill([]);
              //   reset();
              //   setAddressComponent(undefined);
              //   setValue("description", "");
              //   setValue("address", "");
              // }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="w-fit relative bg-foreground text-secondary hover:bg-foreground/80"
              disabled={form.formState.isSubmitting}
              variant={"default"}
            >
              <span
                className={clsx("block transition ease-in-out", {
                  "opacity-0": form.formState.isSubmitting,
                  "scale-0": form.formState.isSubmitting,
                })}
              >
                Save changes
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
        </div>
        <hr className="w-full border-[1.5px]" />
        <div className="w-full flex gap-24">
          <div className="basis-[35%] space-y-1">
            <h6 className="font-bold">Public profile</h6>
            <p className="text-foreground/30 font-medium text-sm">
              This will display on your profile
            </p>
          </div>
          <div className="basis-[50%] space-y-3">
            <FormField
              control={form.control}
              name="nameCompany"
              render={({ field }) => (
                <FormItem className="flex gap-10 w-2/3">
                  <FormLabel className="text-end w-24 flex mb-2 items-end">
                    Name<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      placeholder={"Enter name"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="linkComp"
              render={({ field }) => (
                <FormItem className="flex gap-10 w-2/3">
                  <FormLabel className="text-end w-24 flex mb-2 items-end">
                    Http://<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      placeholder={"Enter link"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="numberEmp"
              render={({ field }) => (
                <FormItem className="flex gap-10 w-2/3">
                  <FormLabel className="text-end w-24 flex mb-2 items-end">
                    Employees<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      placeholder={"Enter link"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <hr className="w-full border-[1.5px]" />
        <div className="w-full flex gap-24">
          <div className="basis-[35%] space-y-1">
            <h6 className="font-bold">Describe company</h6>
            <p className="text-foreground/30 font-medium text-sm">
              This will introduce about your company
            </p>
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("description.label")}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Controller
                    render={({ field }) => (
                      <Tiptap content={field.value} onChange={field.onChange} />
                    )}
                    name="description"
                    defaultValue=""
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        <hr className="w-full border-[1.5px]" />
        <div className="w-full flex gap-24">
          <div className="basis-[35%] space-y-1">
            <h6 className="font-bold">Business licenses and services</h6>
            <p className="text-foreground/30 font-medium text-sm">
              This will display on your profile
            </p>
          </div>
          <div className="basis-[50%] space-y-3">
            <FormField
              control={form.control}
              name="businessRegistrationNumber"
              render={({ field }) => (
                <FormItem className="flex gap-10 w-2/3">
                  <FormLabel className="text-end w-24 flex mb-2 items-end">
                    Number <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      placeholder={"Enter Business registration number"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem className="flex gap-10 w-2/3">
                  <FormLabel className="text-end w-24 flex mb-2 items-end">
                    Business type <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      placeholder={"Enter Business registration number"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>
        <hr className="w-full border-[1.5px]" />
        <div className="w-full flex gap-24">
          <div className="basis-[35%] space-y-1">
            <h6 className="font-bold">Address</h6>
          </div>
          <div className="basis-[50%]">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex gap-10">
                  <FormLabel className="text-end w-16 flex mb-2 items-end">
                    {t("address.label")} <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <InputSearchAddress
                      icon={null}
                      setValue={setValue}
                      addressComponent={addressComponent}
                      setAddressComponent={setAddressComponent}
                      className="w-[290px]"
                      placeholder={t("address.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}

export default FormEdit;
