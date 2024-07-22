"use client";

import React, { useEffect, useState } from "react";
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
import { Building, Building2, Mail, Phone, Warehouse } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import { actionUpgradeUser, getCurrentUser } from "./actions";
import { User } from "@/lib/models/User";
import { InputSearch } from "@/components/inputcustom/InputSearch";
import Fuse from "fuse.js";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Company } from "@/lib/models/Company";
interface ListProvince {
  id: number;
  name: string;
}
interface ListDistrict {
  id: number;
  name: string;
}
const Schema = (t: (arg: string) => string) => {
  return z.object({
    email: z.string({}).optional(),
    phone: z.string({ required_error: t("phone.err") }).min(4),
    company: z
      .string({ required_error: t("company.err") })
      .min(1, { message: t("phone.err") }),
    province: z.string({ required_error: t("province.err") }),
    district: z.string({ required_error: t("district.err") }),
  });
};
export default function Page() {
  const t = useTranslations("upgradeAccount");
  const [user, setUser] = useState<User>();
  const [inputProvince, setInputProvince] = useState<ListProvince>({
    name: "",
    id: -1,
  });
  const [listProvinceApi, setListProvinceApi] = useState<ListProvince[]>([]);
  const [listProvince, setListProvince] = useState<ListProvince[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fuseProvince, setFuseProvince] = useState<Fuse<ListProvince> | null>(
    null
  );
  const [fuseDisTrict, setFuseDistrict] = useState<Fuse<ListDistrict> | null>(
    null
  );
  const [inputDistrict, setInputDistrict] = useState<ListProvince>({
    name: "",
    id: -1,
  });
  const [listDistrictApi, setListDistrictApi] = useState<ListDistrict[]>([]);
  const [listDistrict, setListDistrict] = useState<ListDistrict[]>([]);
  const [isOpenDistrict, setIsOpenDistrict] = useState<boolean>(false);
  const [disableDistrict, setDisableDistrict] = useState<boolean>(true);
  const router = useRouter();
  const locale = useLocale();
  const formSchema = Schema(t);
  const fuseOptions = {
    keys: ["name"],
    threshold: 0.3,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
      phone: "",
      company: "",
      district: "",
      province: "",
    },
  });

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
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              Token: "c54bbac7-2a22-11ef-8e53-0a00184fe694",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch provinces");
        }

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          const transformedProvinces = data.data.map((province: any) => ({
            id: province.ProvinceID,
            name: province.ProvinceName,
          }));
          setListProvinceApi(transformedProvinces);
          setListProvince(transformedProvinces);
          setFuseProvince(new Fuse(transformedProvinces, fuseOptions));
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (inputProvince.id === -1) return;
    if (inputProvince.id === -1 && inputProvince.name === "") {
      setListDistrict([]);
      setListDistrictApi([]);
      setDisableDistrict(true);
      return;
    }
    const fetchDistrict = async () => {
      setDisableDistrict(false);
      try {
        const response = await fetch(
          `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${inputProvince.id}`,
          {
            method: "GET",
            headers: {
              Token: "c54bbac7-2a22-11ef-8e53-0a00184fe694",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch District");
        }

        const data = await response.json();
        console.log(data);
        if (data.data && Array.isArray(data.data)) {
          const transformedDistrict = data.data.map((district: any) => ({
            id: district.DistrictID,
            name: district.DistrictName,
          }));
          setListDistrictApi(transformedDistrict);
          setListDistrict(transformedDistrict);
          setFuseDistrict(new Fuse(transformedDistrict, fuseOptions));
        }
      } catch (error) {
        console.error("Error fetching District:", error);
      }
    };

    fetchDistrict();
  }, [inputProvince]);

  const handleOnchangeProvince = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e) return;
    const value = e.currentTarget.value;
    setInputProvince((pre) => ({
      ...pre,
      name: value,
    }));
    if (value.trim() === "") {
      setListProvince(listProvinceApi);
      setInputProvince((pre) => ({
        ...pre,
        id: -1,
      }));
    } else {
      if (fuseProvince) {
        const filtered = fuseProvince
          .search(value)
          .map((result) => result.item);
        setListProvince(filtered);
      }
    }
  };
  const handleOnchangeDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputDistrict((pre) => ({
      ...pre,
      name: value,
    }));
    if (value.trim() !== "") {
      setListDistrict(listDistrictApi);
    } else {
      if (fuseDisTrict) {
        const filtered = fuseDisTrict
          .search(value)
          .map((result) => result.item);
        setListDistrict(filtered);
      }
    }
  };
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (
      listDistrictApi.some(
        (r) => r.id === inputDistrict.id && r.name === inputDistrict.name
      ) === false
    ) {
      toast({
        variant: "destructive",
        title: "Address invalid",
        description: "Please check and choose correct address!!!",
      });
      return;
    }
    const company: Company = {
      address: {
        provinceName: inputProvince.name,
        districtName: inputDistrict.name,
      },
      phone: data.phone,
      nameCompany: data.company,
    };
    const result = await actionUpgradeUser(company);
    if (result?.status === "ok") {
      toast({
        variant: "success",
        title: "Success",
        description: "You update your successfully",
      });
      const timer = setTimeout(() => {
        router.push(`/${locale}/supplier`);
      }, 1000);
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
              <div className="flex gap-10 justify-between w-full">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        {t("province.label")}{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <InputSearch
                          placeholder={t("province.placeholder")}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          valueInput={inputProvince}
                          handleOnChange={handleOnchangeProvince}
                          setValueInput={setInputProvince}
                          items={listProvince}
                          {...field}
                          icon={
                            <Building2 className="h-4 w-4 mt-1 text-primary" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        {t("district.label")}{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <InputSearch
                          placeholder={t("district.placeholder")}
                          disabled={disableDistrict}
                          isOpen={isOpenDistrict}
                          setIsOpen={setIsOpenDistrict}
                          valueInput={inputDistrict}
                          handleOnChange={handleOnchangeDistrict}
                          setValueInput={setInputDistrict}
                          items={listDistrict}
                          {...field}
                          icon={
                            <Warehouse className="h-4 w-4 mt-1 text-primary" />
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
