"use client";
import { InputSearch } from "@/components/inputcustom/InputSearch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  BackpackIcon,
  BetweenHorizonalStart,
  BriefcaseBusiness,
  CoinsIcon,
  FilterIcon,
  MapPin,
  StarIcon,
} from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

import { usePathname, useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import ShowDataSearch from "./ShowDataSearch";
import Comboboxfilter from "./Comboboxfilter";

interface Props {
  cate: string[];
  provinceName: string[];
}
const dateTypeJob = [
  {
    value: "Part-Time",
    label: "Part-Time",
  },
  { value: "Full-Time", label: "Full-Time" },
  {
    value: "Co-working",
    label: "Co-working",
  },
  {
    value: "Freelance",
    label: "Freelance",
  },
  {
    value: "Seasonal",
    label: "Seasonal",
  },
  {
    value: "Remote",
    label: "Remote",
  },
];
const dataPostion = [
  {
    value: "Thuc tap sinh",
    label: "Thuc tap sinh",
  },
  { value: "Fresher", label: "Fresher" },
  {
    value: "Senior",
    label: "Senior",
  },
  {
    value: "Freelance",
    label: "Freelance",
  },
];
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
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathName = usePathname();

  const formattedCate = cate.map((item) => ({
    value: item.toLowerCase().replace(/\s/g, "-"),
    label: item,
  }));
  const formattedprovinceName = provinceName.map((item) => ({
    value: item.toLowerCase(),
    label: item,
  }));
  const handleSearch = async () => {
    const formValues = {
      title: value,
      provinceName: valueAddress,
      experience: valueExp,
      position: valueLevel,
      type: valueTypeJob,
      cate: valueCate,
    };

    const filteredValues = Object.fromEntries(
      Object.entries(formValues).filter(([key, value]) => value !== "")
    );

    const query = Object.keys(filteredValues)
      .map((key) => `${key}=${encodeURIComponent(filteredValues[key])}`)
      .join("&");

    startTransition(() => {
      router.push(`${pathName}?${query}`);
    });
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <section className="bg-green-800">
        <form action={handleSearch} className="mx-auto">
          <div className="w-[75%] mx-auto px-4 py-4 flex gap-1 justify-between text-center items-center">
            <div className="border-r-2 pr-2 flex gap-2">
              <InputSearch
                type="search"
                placeholder="Vị trí tuyển dụng, tên công ty"
                className="w-[370px] p-2 font-semibold rounded-md border-none hover:border-none focus-visible:ring-white ring-0 focus:border-none focus:ring-0"
                setValueInput={setValue}
                handleOnChange={(e) => {
                  setValue(e.target.value);
                }}
                items={[]}
                icon={null}
              />
              <Comboboxfilter
                open={openAddress}
                setOpen={setOpenAddress}
                icon={<MapPin className="h-4 w-4"></MapPin>}
                arrayValue={formattedprovinceName}
                valueStr={valueAddress}
                setValueStr={setValueAddress}
                title={"Tất cả tỉnh/Thành Phố"}
                placeHolder={"Tất cả tỉnh/Thành Phố"}
              />
            </div>
            <div className="pr-1">
              <Comboboxfilter
                open={openCate}
                setOpen={setOpenCate}
                icon={<BackpackIcon className="h-4 w-4"></BackpackIcon>}
                arrayValue={formattedCate}
                valueStr={valueCate}
                setValueStr={setValueCate}
                title={"Tất cả các ngành nghề"}
                placeHolder={"Tất cả các ngành nghề"}
              />
            </div>
            <Button
              type="submit"
              className="px-8 py-3 text-card bg-primary"
              onClick={handleSearch}
              disabled={isPending}
            >
              {isPending ? "Đang tải..." : "Tìm kiếm"}
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
            <div className="w-[75%] mx-auto px-4 py-2 flex gap-1 justify-between text-center items-center">
              <Comboboxfilter
                open={openExp}
                setOpen={setOpenExp}
                icon={<StarIcon className="h-4 w-4"></StarIcon>}
                arrayValue={formattedCate}
                valueStr={valueExp}
                setValueStr={setValueExp}
                title={"Kinh nghiệm"}
                placeHolder={"Kinh nghiệm"}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                classNameButton="border-secondary/30"
              />
              <Comboboxfilter
                open={openSal}
                setOpen={setOpenSal}
                icon={<CoinsIcon className="h-4 w-4"></CoinsIcon>}
                arrayValue={formattedCate}
                valueStr={valueSal}
                setValueStr={setValueSal}
                title={"Mức Lương"}
                placeHolder={"Mức Lương"}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                classNameButton="border-secondary/30"
              />
              <Comboboxfilter
                open={openLevel}
                setOpen={setOpenLevel}
                icon={
                  <BetweenHorizonalStart className="h-4 w-4"></BetweenHorizonalStart>
                }
                arrayValue={dataPostion}
                valueStr={valueLevel}
                setValueStr={setValueLevel}
                title={"Cấp bậc"}
                placeHolder={"Cấp bậc"}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                classNameButton="border-secondary/30"
              />

              <Comboboxfilter
                open={openTypeJob}
                setOpen={setOpenTypeJob}
                icon={
                  <BriefcaseBusiness className="h-4 w-4"></BriefcaseBusiness>
                }
                arrayValue={dateTypeJob}
                valueStr={valueTypeJob}
                setValueStr={setValueTypeJob}
                title={"Hình thức"}
                placeHolder={"Hình thức"}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                classNameButton="border-secondary/30"
              />
              <Comboboxfilter
                open={openComp}
                setOpen={setOpenComp}
                icon={<BackpackIcon className="h-4 w-4"></BackpackIcon>}
                arrayValue={formattedCate}
                valueStr={valueComp}
                setValueStr={setValueComp}
                title={"Tất cả các Công ty"}
                placeHolder={"Tất cả các Công ty"}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                classNameButton="border-secondary/30"
              />
            </div>
          </Transition>
        </form>
      </section>
      <section className="bg-foreground/5 flex flex-col gap-3 flex-1">
        <div className="w-[75%] mx-auto px-4 pt-4 flex items-center gap-10">
          <p className="font-medium">Ưu tiên hiển thị theo:</p>
          <div>
            <RadioGroup defaultValue="comfortable" className="flex gap-12">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="default"
                  id="r1"
                  className="size-[20px]"
                  classNameIcon="w-3 h-3"
                />
                <Label htmlFor="r1" className="text-base font-normal">
                  Ngày đăng
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="comfortable"
                  id="r2"
                  className="size-[20px]"
                  classNameIcon="w-3 h-3"
                />
                <Label htmlFor="r2" className="text-base font-normal">
                  Ngày cập nhật
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="compact"
                  id="r3"
                  className="size-[20px]"
                  classNameIcon="w-3 h-3"
                />
                <Label htmlFor="r3" className="text-base font-normal">
                  Lương cao đến thấp
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <ShowDataSearch />
      </section>
    </div>
  );
}

export default SectionSearch;
