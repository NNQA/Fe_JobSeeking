"use client";
import { InputSearch } from "@/components/inputcustom/InputSearch";
import { BackpackIcon, Check, ChevronsUpDown, MapPin, X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

interface Props {
  cate: string[];
  provinceName: string[];
}
function SectionSearch({ cate, provinceName }: Props) {
  const [value, setValue] = useState<string>("");
  const [openAddress, setOpenAddress] = React.useState(false);
  const [valueAddress, setValueAddress] = React.useState("");
  const [openCate, setOpenCate] = React.useState(false);
  const [valueCate, setValueCate] = React.useState("");

  const t = useTranslations("home");
  const formattedCate = cate.map((item) => ({
    value: item.toLowerCase().replace(/\s/g, "-"),
    label: item,
  }));
  const formattedprovinceName = provinceName.map((item) => ({
    value: item.toLowerCase().replace(/\s/g, "-"),
    label: item,
  }));
  return (
    <div className="min-h-[200px] bg-gradient-to-b w-full from-[#e1f3e1] via-[#e6f8e6] to-white pb-5">
      <header className="flex flex-col gap-6 items-center text-center w-full justify-center pt-7">
        <h2 className="text-3xl font-bold text-green-600">{t("title")}</h2>
        <p className="text-sm mb-6">{t("subtitle")}</p>
      </header>
      <section className="mx-auto">
        <div className="bg-card w-[78%] mx-auto rounded-full border px-4 py-4 flex justify-between text-center items-center">
          <div className="border-r-2 pr-2">
            <InputSearch
              type="text"
              placeholder={t("input")}
              className="w-[450px] font-semibold rounded-md border-none hover:border-none focus-visible:ring-white ring-0 focus:border-none focus:ring-0"
              icon={
                <X className="w-4 h-4 mt-1 hover:bg-foreground/10 cursor-pointer rounded-full text-foreground/60"></X>
              }
            />
          </div>
          <div className="border-r-2 pr-1">
            <Popover open={openAddress} onOpenChange={setOpenAddress}>
              <PopoverTrigger asChild>
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openAddress}
                  className="w-[250px] justify-between border-none"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4"></MapPin>
                    {valueAddress ? (
                      (() => {
                        const selectedFramework = formattedprovinceName.find(
                          (framework) => framework.value === valueAddress
                        );

                        return selectedFramework
                          ? selectedFramework.label
                          : null;
                      })()
                    ) : (
                      <div className="flex items-center gap-1">
                        <p>{t("province")}</p>
                      </div>
                    )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder={t("province")} />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {formattedprovinceName.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValueAddress(
                              currentValue === valueAddress ? "" : currentValue
                            );
                            setOpenAddress(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="border-r-2 pr-1">
            <Popover open={openCate} onOpenChange={setOpenCate}>
              <PopoverTrigger asChild>
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openCate}
                  className="w-[250px] justify-between border-none"
                >
                  <div className="flex items-center gap-2">
                    <BackpackIcon className="h-4 w-4"></BackpackIcon>
                    {valueCate
                      ? formattedCate.find(
                          (framework) => framework.value === valueCate
                        )?.label
                      : t("category")}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] p-0">
                <Command>
                  <CommandInput placeholder={t("category")} />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {formattedCate.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValueCate(
                              currentValue === valueCate ? "" : currentValue
                            );
                            setOpenCate(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Button className="px-8 py-3 text-card rounded-full" asChild>
            <Link href={"/search"}>{t("button")}</Link>
          </Button>
        </div>
        <div className="mt-10">
          <div className="container mx-auto flex justify-center space-x-8">
            <div className="flex items-center gap-2">
              <h3 className="text-sm">Vị trí chờ bạn khám phá:</h3>
              <p className="text-sm text-green-600 font-bold">44,721</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm">Việc làm mới nhất:</h3>
              <p className="text-sm text-green-600 font-bold">2,256</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm">Cập nhật lúc:</h3>
              <p className="text-sm text-green-600 font-bold">
                06:33 16/10/2024
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SectionSearch;
