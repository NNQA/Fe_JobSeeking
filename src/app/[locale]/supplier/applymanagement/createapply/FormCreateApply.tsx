"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Tag, TagInput } from "emblor";
import { useTranslations } from "next-intl";
import Tiptap from "@/components/tiptab/Tiptap";
import { Input } from "@/components/ui/input";
import { EJobTypeZod, WorkSchema } from "./apply-zod";
import z, { date } from "zod";
import { Address, AddressComponent } from "@/lib/models/Address";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import InputSearchAddress from "@/components/inputcustom/InputSearchAddress";
import { actionCreateNewJob } from "./action";
import { toast } from "@/components/ui/use-toast";
import SelectCustom from "@/components/custom/SelectCustom";

export const salaryOptions = [
  { label: "Dưới 10 triệu", value: 1 },
  { label: "10 - 15 triệu", value: 2 },
  { label: "15 - 20 triệu", value: 3 },
  { label: "20 - 25 triệu", value: 4 },
  { label: "25 - 30 triệu", value: 5 },
  { label: "30 - 50 triệu", value: 6 },
  { label: "Trên 50 triệu", value: 8 },
  { label: "Thỏa thuận", value: 127 },
];
function FormCreateApply() {
  const [skill, setSkill] = useState<Tag[]>([]);
  const [skillActiveTagIndex, setSkillActiveTagIndex] = useState<number | null>(
    null
  );
  const [categories, setCategories] = useState<Tag[]>([]);
  const [activeTagIndexCategories, setActiveTagIndexCategories] = useState<
    number | null
  >(null);

  const [addressComponent, setAddressComponent] = useState<AddressComponent>();
  const t = useTranslations("supplier.createapply");
  const formSchema = WorkSchema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      experience: "",
      position: "",
      skill: [],
      jobtype: "Part-Time",
      salary: 1,
      category: [],
      expireDate: new Date(),
    },
  });
  const {
    setValue,
    formState: { errors },
  } = form;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!addressComponent) return;
    const result = await actionCreateNewJob({
      id: "",
      address: {
        addressName: addressComponent.address,
        communeName: addressComponent.commune,
        provinceName: addressComponent.province,
        districtName: addressComponent.district,
        formattedAddressName: addressComponent.formatted_address,
        lat: addressComponent.location.lat,
        lng: addressComponent.location.lng,
      } as Address,
      categories: data.category.map((e) => ({
        jobCategoryName: e.text,
      })),
      skills: data.skill.map((e) => ({
        nameSkill: e.text,
      })),
      title: data.title,
      description: data.description,
      salary: {
        numberSort: data.salary,
        value: salaryOptions.find((opt) => opt.value === data.salary)?.label!,
      },
      experience: data.experience,
      expiredDate: data.expireDate,
      position: {
        jobPositionName: data.position,
      },
      type: {
        jobTypeName: data.jobtype,
      },
    });
    console.log(result);
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
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6">
        <div className="flex flex-col gap-3 w-[50%]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("title.label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-black text- font-medium"
                    placeholder={t("title.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
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

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {t("address.label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <InputSearchAddress
                    icon={null}
                    setValue={setValue}
                    addressComponent={addressComponent}
                    setAddressComponent={setAddressComponent}
                    className="w-full"
                    placeholder={t("address.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("salary.label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <SelectCustom
                    selectValue={salaryOptions}
                    onChange={field.onChange}
                    value={field.value}
                    key={"salary"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t("position.label")}{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      placeholder={t("position.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t("experience.label")}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      placeholder={t("experience.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
        </div>

        <div className="flex flex-col space-y-6 border-l pl-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("category.label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <TagInput
                    {...field}
                    activeTagIndex={activeTagIndexCategories}
                    setActiveTagIndex={setActiveTagIndexCategories}
                    placeholder={t("category.placeholder")}
                    tags={categories}
                    draggable={true}
                    direction="row"
                    inputFieldPosition="bottom"
                    inlineTags={false}
                    className="sm:min-w-[450px] flex px-4 font-medium ring-0 ring-primary"
                    setTags={(newTags) => {
                      setCategories(newTags);
                      setValue("category", newTags as [Tag, ...Tag[]]);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("skill.label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <TagInput
                    {...field}
                    activeTagIndex={skillActiveTagIndex}
                    setActiveTagIndex={setSkillActiveTagIndex}
                    placeholder={t("skill.placeholder")}
                    tags={skill}
                    draggable={true}
                    direction="row"
                    inputFieldPosition="bottom"
                    inlineTags={false}
                    className="sm:min-w-[450px] flex px-4 font-medium ring-0 ring-primary"
                    setTags={(newTags) => {
                      setSkill(newTags);
                      setValue("skill", newTags as [Tag, ...Tag[]]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobtype"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {t("type.label")}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your JobType link" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {EJobTypeZod._def.values.map((e, index) => (
                        <SelectItem value={e as string} key={index}>
                          {e.toString()}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"expireDate"}
            render={({ field }) => (
              <FormItem className="w-full flex flex-col">
                <FormLabel>
                  {t("expired.label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outlineVariant"}
                        className={cn(
                          "w-fulll justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("expired.placeholder")}</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-2 text-end space-x-4">
            <Button
              type="reset"
              className={cn(
                buttonVariants({ variant: "outlineVariant" }),
                "bg-background text-foreground"
              )}
              onClick={() => {
                const { reset } = form;
                setSkillActiveTagIndex(null);
                setActiveTagIndexCategories(null);
                setCategories([]);
                setSkill([]);
                reset();
                setAddressComponent(undefined);
                setValue("description", "");
                setValue("address", "");
              }}
            >
              {t("buttonreset.text")}
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
        </div>
      </form>
    </Form>
  );
}

export default FormCreateApply;
