"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputCustomIcon from "@/components/inputcustom/InputCustomIcon";
import { Building, Building2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import { actionUpgradeUser, getCurrentUser } from "./actions";
import { User } from "@/lib/models/User";
import { toast } from "@/components/ui/use-toast";
import { Company } from "@/lib/models/Company";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { upgradeAccountSchema } from "./upgrade-zod";
import { Address, AddressComponent } from "@/lib/models/Address";
import InputSearchAddress from "@/components/inputcustom/InputSearchAddress";

export default function Page() {
  const t = useTranslations("upgradeAccount");
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const locale = useLocale();
  const formSchema = upgradeAccountSchema(t);
  const [addressComponent, setAddressComponent] = useState<AddressComponent>();

  useEffect(() => {
    getCurrentUser().then((r) => {
      if (r?.status === "Ok") {
        setUser(r.user);
      }

      if (r?.status === "failure") {
        router.push(`/${locale}/auth/login`);
      }
    });
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
      phone: "",
      company: "",
      address: "",
    },
  });
  const {
    setValue,
    formState: { errors },
  } = form;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!addressComponent) return;
    console.log(addressComponent);
    const result = await actionUpgradeUser({
      address: {
        addressName: addressComponent.address,
        communeName: addressComponent.commune,
        provinceName: addressComponent.province,
        districtName: addressComponent.district,
        formattedAddressName: addressComponent.formatted_address,
        lat: addressComponent.location.lat,
        lng: addressComponent.location.lng,
      } as Address,
      nameCompany: data.company,
      phone: data.phone,
    } as Company);
    if (result?.status === "ok") {
      toast({
        variant: "success",
        title: "Success",
        description: "You update your successfully",
      });
      router.push(`/${locale}/supplier`);
    } else {
      toast({
        variant: "destructive",
        title: "Failure",
        description: result?.message,
      });
    }
  }
  return (
    <MaxWidthWrapper className="h-[calc(100vh-3rem)] flex justify-center items-center">
      <div className="px-10 py-4">
        <div className="flex flex-col gap-2">
          <h3 className="h-fit flex gap-2">
            {t("title")}
            <p className="text-primary font-medium">
              {user?.name ?? user?.email}
            </p>
          </h3>
          <p className="text-primary font-medium">{t("subtitle")}</p>
          <p>{t("description")}:</p>
        </div>
        <div className="mt-6">
          <p className="text-xl font-medium">Thong tin tuyen dung: </p>
        </div>

        <div>
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
                    <FormLabel>
                      Email <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputCustomIcon
                        className="text-black text- font-medium"
                        defaultValue={user?.email}
                        disabled={true}
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("phone.label")} <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputCustomIcon
                        placeholder={t("phone.placeholder")}
                        {...field}
                        icon={<Phone className="h-4 w-4 mt-1 text-primary" />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("company.label")}{" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputCustomIcon
                        placeholder={t("company.placeholder")}
                        {...field}
                        icon={
                          <Building className="h-4 w-4 mt-1 text-primary" />
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Address <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <InputSearchAddress
                        placeholder="Enter your address"
                        icon={
                          <Building2 className="h-4 w-4 mt-1 text-primary" />
                        }
                        setValue={setValue}
                        addressComponent={addressComponent}
                        setAddressComponent={setAddressComponent}
                        className="w-full"
                        {...field}
                      />
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
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
