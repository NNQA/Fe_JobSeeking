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
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Transition } from "@headlessui/react";
import ShowDataSearch from "./ShowDataSearch";
import Comboboxfilter from "./Comboboxfilter";
import SalaryFilter from "./SalaryFilter";

interface Props {
  cate: string[];
  provinceName: string[];
  level: string[];
}

interface SearchFilters {
  title?: string;
  provinceName?: string;
  experience?: string;
  position?: string;
  type?: string;
  cate?: string;
  salary?: string;
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
const dataExper = [
  {
    value: "Không yêu cầu",
    label: "Không yêu cầu kinh nghiệm",
  },
  {
    value: "1 năm",
    label: "1 năm",
  },
  {
    value: "2 năm",
    label: "2 năm",
  },
  {
    value: "3 năm",
    label: "3 năm",
  },
  {
    value: "4 năm",
    label: "4 năm",
  },
  {
    value: "5 năm",
    label: "5 năm",
  },
];
function SectionSearch({ cate, provinceName, level }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initialTitle = searchParams.get("title") || "";

  const [filters, setFilters] = useState<SearchFilters>({});
  const [openFilters, setOpenFilters] = useState({
    address: false,
    category: false,
    company: false,
    experience: false,
    salary: false,
    level: false,
    typeJob: false,
  });
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const parsedFilters: SearchFilters = {};

    const paramMap = {
      title: "title",
      provinceName: "provinceName",
      experience: "experience",
      position: "position",
      type: "type",
      cate: "cate",
      salary: "salary",
    };

    (Object.entries(paramMap) as Array<[string, keyof SearchFilters]>).forEach(
      ([urlKey, filterKey]) => {
        const value = searchParams.get(urlKey);

        if (value !== null) {
          switch (filterKey) {
            case "salary":
              if (value === "") break;
              parsedFilters[filterKey] = value;
              break;
            case "title":
            case "provinceName":
            case "experience":
            case "position":
            case "type":
            case "cate":
              parsedFilters[filterKey] = value;
              break;
          }
        }
      }
    );

    setFilters(parsedFilters);
  }, [searchParams]);

  const updateFilter = (
    key: keyof SearchFilters,
    value: string | number | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleFilterOpen = (filterKey: keyof typeof openFilters) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };
  const formattedCate = React.useMemo(
    () =>
      cate.map((item) => ({
        value: item.toLowerCase().replace(/\s/g, "-"),
        label: item,
      })),
    [cate]
  );

  const formattedProvinceName = React.useMemo(
    () =>
      provinceName.map((item) => ({
        value: item.toLowerCase(),
        label: item,
      })),
    [provinceName]
  );

  const formattedPositionName = React.useMemo(
    () =>
      level.map((item) => ({
        value: item.toLowerCase(),
        label: item,
      })),
    [level]
  );
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    startTransition(() => {
      router.push(`${pathName}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="w-full flex flex-col">
      <section className="bg-green-800">
        <form onSubmit={handleSearch} className="mx-auto">
          <div className="w-[75%] mx-auto px-4 py-4 flex gap-1 justify-between text-center items-center">
            <div className="border-r-2 pr-2 flex gap-2">
              <InputSearch
                type="search"
                placeholder="Vị trí tuyển dụng, tên công ty"
                defaultValue={initialTitle}
                onChange={(e) => updateFilter("title", e.target.value)}
                className="w-[370px] p-2 font-semibold rounded-md border-none hover:border-none focus-visible:ring-offset-0 ring-0 focus:border-none focus:ring-0"
                icon={undefined}
              />

              <Comboboxfilter
                open={openFilters.address}
                setOpen={() => toggleFilterOpen("address")}
                icon={<MapPin className="h-4 w-4" />}
                arrayValue={formattedProvinceName}
                valueStr={filters.provinceName || ""}
                setValueStr={(value) => updateFilter("provinceName", value)}
                title="Tất cả tỉnh/Thành Phố"
                placeholder="Tất cả tỉnh/Thành Phố"
                emptyMessage="Không có tỉnh thành phố"
              />
            </div>
            <div className="pr-1">
              <Comboboxfilter
                open={openFilters.category}
                setOpen={() => toggleFilterOpen("category")}
                icon={<BackpackIcon className="h-4 w-4"></BackpackIcon>}
                arrayValue={formattedCate}
                valueStr={filters.cate || ""}
                setValueStr={(value) => updateFilter("cate", value)}
                title={"Tất cả các ngành nghề"}
                placeholder={"Tất cả các ngành nghề"}
                emptyMessage="Không có ngành nghề"
              />
            </div>
            <Button
              type="submit"
              className="px-8 py-3 text-card bg-primary"
              disabled={isPending}
            >
              {isPending ? "Đang tải..." : "Tìm kiếm"}
            </Button>
            <Button
              variant="secondary"
              className="bg-secondary/40 text-secondary flex gap-3 items-center"
              onClick={() => setAdvancedFilterOpen(!advancedFilterOpen)}
            >
              <FilterIcon className="w-4 h-4" />
              Lọc nâng cao
            </Button>
          </div>
          <Transition show={advancedFilterOpen}>
            <div className="w-[75%] mx-auto px-4 py-2 flex gap-1 justify-between text-center items-center">
              <Comboboxfilter
                open={openFilters.experience}
                setOpen={() => toggleFilterOpen("experience")}
                icon={<StarIcon className="h-4 w-4" />}
                arrayValue={dataExper}
                valueStr={filters.experience || ""}
                setValueStr={(value) => updateFilter("experience", value)}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                title="Kinh nghiệm"
                placeholder="Kinh nghiệm"
                emptyMessage="Không có giá trị"
              />
              <SalaryFilter
                open={openFilters.salary}
                setOpen={() => toggleFilterOpen("salary")}
                icon={<CoinsIcon className="h-4 w-4"></CoinsIcon>}
                valueStr={filters.salary || ""}
                setValueStr={(value) => updateFilter("salary", value)}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                buttonClassName="border-secondary/30"
                title={"Mức Lương"}
                placeholder={"Mức Lương"}
                emptyMessage="Không có giá trị"
              />
              <Comboboxfilter
                open={openFilters.level}
                setOpen={() => toggleFilterOpen("level")}
                icon={<CoinsIcon className="h-4 w-4"></CoinsIcon>}
                arrayValue={formattedPositionName}
                valueStr={filters.experience || ""}
                setValueStr={(value) => updateFilter("position", value)}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                buttonClassName="border-secondary/30"
                title={"Cấp bậc"}
                placeholder={"Cấp bậc"}
                emptyMessage="Không có giá trị"
              />
              <Comboboxfilter
                open={openFilters.typeJob}
                setOpen={() => toggleFilterOpen("typeJob")}
                icon={
                  <BriefcaseBusiness className="h-4 w-4"></BriefcaseBusiness>
                }
                arrayValue={dateTypeJob}
                valueStr={filters.type || ""}
                setValueStr={(value) => updateFilter("type", value)}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                buttonClassName="border-secondary/30"
                title={"Hình thức"}
                placeholder={"Hình thức"}
                emptyMessage="Không có giá trị"
              />
              <Comboboxfilter
                open={openFilters.company}
                setOpen={() => toggleFilterOpen("company")}
                icon={<BackpackIcon className="h-4 w-4"></BackpackIcon>}
                arrayValue={[]}
                valueStr={""}
                setValueStr={() => {}}
                className="bg-secondary/10 hover:bg-secondary/20 hover:text-secondary hover:border-primary text-secondary"
                buttonClassName="border-secondary/30"
                title={"Tất cả các Công ty"}
                placeholder={"Tất cả các Công ty"}
                emptyMessage="Không có giá trị"
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
      </section>
    </div>
  );
}

export default SectionSearch;
