"use client";
import { InputSearch } from "@/components/inputcustom/InputSearch";
import {
  BackpackIcon,
  BetweenHorizonalStart,
  BriefcaseBusiness,
  Check,
  ChevronsUpDown,
  CoinsIcon,
  FilterIcon,
  MapPin,
  StarIcon,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { usePathname, useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";

interface Props {
  cate: string[];
  provinceName: string[];
}
function SectionSearch({ cate, provinceName }: Props) {
  const [value, setValue] = useState<string>("");
  const [openAddress, setOpenAddress] = React.useState(false);
  const [valueAddress, setValueAddress] = React.useState("");

  const [openComp, setOpenComp] = React.useState(false);
  const [valueComp, setValueComp] = React.useState("");

  const [openExp, setOpenExp] = React.useState(false);
  const [valueExp, setValueExp] = React.useState("");

  const [openSal, setOpenSal] = React.useState(false);
  const [valueSal, setValueSal] = React.useState("");

  const [openLevel, setOpenLevel] = React.useState(false);
  const [valueLevel, setValueLevel] = React.useState("");

  const [openTypeJob, setOpenTypeJob] = React.useState(false);
  const [valueTypeJob, setValueTypeJob] = React.useState("");

  const [openCate, setOpenCate] = React.useState(false);
  const [valueCate, setValueCate] = React.useState("");
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const router = useRouter();
  const pathName = usePathname();

  const formattedCate = cate.map((item) => ({
    value: item.toLowerCase().replace(/\s/g, "-"),
    label: item,
  }));
  const formattedprovinceName = provinceName.map((item) => ({
    value: item.toLowerCase().replace(/\s/g, "-"),
    label: item,
  }));

  const handleRouting = () => {
    router.push(pathName + "/" + value);
  };
  return (
    <div className="bg-green-800">
      <section className="mx-auto">
        <div className="w-[70%] mx-auto px-4 py-4 flex gap-2 justify-between text-center items-center">
          <div className="border-r-2 pr-2 flex gap-2">
            <InputSearch
              type="text"
              placeholder="Vị trí tuyển dụng, tên công ty"
              className="w-[300px] font-semibold rounded-md border-none hover:border-none focus-visible:ring-white ring-0 focus:border-none focus:ring-0"
              // setIsOpen={setValue}
              setValueInput={setValue}
              handleOnChange={undefined}
              items={[]}
              icon={
                <X className="w-4 h-4 mt-1 hover:bg-foreground/10 cursor-pointer rounded-full text-foreground/60"></X>
              }
            />
            <Popover open={openAddress} onOpenChange={setOpenAddress}>
              <PopoverTrigger asChild>
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openAddress}
                  className="w-[210px] justify-between border-none"
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
                        <p>Tất cả tỉnh/Thành Phố</p>
                      </div>
                    )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Tất cả tỉnh/Thành Phố" />
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
                  className="w-[210px] justify-between border-none"
                >
                  <div className="flex items-center gap-2">
                    <BackpackIcon className="h-4 w-4"></BackpackIcon>
                    {valueCate
                      ? formattedCate.find(
                          (framework) => framework.value === valueCate
                        )?.label
                      : "Tất cả các ngành nghề"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Tất cả các ngành nghề" />
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
          <Button className="px-8 py-3 text-card rounded-full bg-primary">
            Tìm kiếm
          </Button>
          <Button
            variant="secondary"
            className="bg-secondary/40 text-secondary flex gap-3 items-center"
            onClick={() => setOpenFilter((prev) => !prev)}
          >
            <FilterIcon className="w-4 h-4" />
            Lọc nâng cao
          </Button>
        </div>
        <Transition show={openFilter}>
          <div className="w-[70%] mx-auto px-4 py-2 flex gap-2 justify-between text-center items-center">
            <Popover open={openComp} onOpenChange={setOpenComp}>
              <PopoverTrigger
                asChild
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
              >
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openComp}
                  className="w-[210px] justify-between border-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <BackpackIcon className="h-4 w-4"></BackpackIcon>
                    {valueComp
                      ? formattedCate.find(
                          (framework) => framework.value === valueComp
                        )?.label
                      : "Tất cả các Công ty"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Tất cả các ngành nghề" />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {formattedCate.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValueComp(
                              currentValue === valueComp ? "" : currentValue
                            );
                            setOpenComp(false);
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
            <Popover open={openExp} onOpenChange={setOpenExp}>
              <PopoverTrigger
                asChild
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
              >
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openExp}
                  className="w-[210px] justify-between border-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-4 w-4"></StarIcon>
                    {valueExp
                      ? formattedCate.find(
                          (framework) => framework.value === valueExp
                        )?.label
                      : "Kinh nghiệm"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Kinh nghiệm" />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {formattedCate.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValueExp(
                              currentValue === valueExp ? "" : currentValue
                            );
                            setOpenExp(false);
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
            <Popover open={openSal} onOpenChange={setOpenSal}>
              <PopoverTrigger
                asChild
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
              >
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openSal}
                  className="w-[210px] justify-between border-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <CoinsIcon className="h-4 w-4"></CoinsIcon>
                    {valueSal
                      ? formattedCate.find(
                          (framework) => framework.value === valueSal
                        )?.label
                      : "Mức lương"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Mức Lương" />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {formattedCate.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValueSal(
                              currentValue === valueSal ? "" : currentValue
                            );
                            setOpenSal(false);
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
            <Popover open={openLevel} onOpenChange={setOpenLevel}>
              <PopoverTrigger
                asChild
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
              >
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openLevel}
                  className="w-[210px] justify-between border-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <BetweenHorizonalStart className="h-4 w-4"></BetweenHorizonalStart>
                    {valueLevel
                      ? formattedCate.find(
                          (framework) => framework.value === valueLevel
                        )?.label
                      : "Cấp bậc"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Cấp bậc" />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {formattedCate.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValueLevel(
                              currentValue === valueLevel ? "" : currentValue
                            );
                            setOpenLevel(false);
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
            <Popover open={openTypeJob} onOpenChange={setOpenTypeJob}>
              <PopoverTrigger
                asChild
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
              >
                <Button
                  variant="outlineVariant"
                  role="combobox"
                  aria-expanded={openTypeJob}
                  className="w-[210px] justify-between border-secondary/30"
                >
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4"></BriefcaseBusiness>
                    {valueTypeJob
                      ? formattedCate.find(
                          (framework) => framework.value === valueTypeJob
                        )?.label
                      : "Hình thức"}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Hình thức" />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {formattedCate.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValueTypeJob(
                              currentValue === valueTypeJob ? "" : currentValue
                            );
                            setOpenTypeJob(false);
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
        </Transition>
      </section>
    </div>
  );
}

export default SectionSearch;
