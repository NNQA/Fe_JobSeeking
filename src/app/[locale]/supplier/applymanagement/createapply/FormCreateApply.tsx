"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Tag, TagInput } from "emblor";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { Transition } from "@headlessui/react";
import ProgressCircle from "@/components/svg/ProgressCircle";
import clsx from "clsx";

const ELevelZod = z.enum(["EXPERT", "EXPERIENCE", "ENTRY"]);
const SkillSchema = (t: (arg: string) => string) => {
  return z.object({
    mainskill: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
        })
      )
      .nonempty(t("skill.err")),
    other: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    ),
  });
};

const WorkSchema = (t: (arg: string) => string) => {
  return z.object({
    title: z.string().nonempty(t("title.err")),
    description: z.string().nonempty(t("description.err")),
    salary: z.number().positive(t("salary.err")),
    level: ELevelZod,
    skill: SkillSchema(t),
    activeDate: z.string().nonempty(t("date.start.err")),
    expiredDate: z.string().nonempty(t("date.end.err")),
  });
};

function FormCreateApply() {
  const [start, setStartDate] = useState<Date | undefined>(undefined);
  const [end, setEndDate] = useState<Date | undefined>(undefined);
  const [mainskill, setMainSkill] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [other, setOther] = useState<Tag[]>([]);
  const [activeTagIndexOther, setActiveTagIndexOther] = useState<number | null>(
    null
  );
  const t = useTranslations("supplier.createapply");
  const formSchema = WorkSchema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      activeDate: "",
      expiredDate: "",
      level: "ENTRY",
      skill: {
        mainskill: [],
        other: [],
      },
      salary: 0,
    },
  });
  const { setValue } = form;
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6">
        <div className="flex flex-col gap-3 w-[40%]">
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
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("description.label")}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("description.placeholder")}
                    className="text-black text- font-medium"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div className="flex justify-between gap-6">
            <FormField
              control={form.control}
              name={"activeDate"}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>
                    {t("date.start.label")}{" "}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outlineVariant"}
                          className={cn(
                            "w-fulll justify-start text-left font-normal",
                            !start && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {start ? (
                            format(start, "PPP")
                          ) : (
                            <span>{t("date.start.placeholder")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={start}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"expiredDate"}
              render={({ field }) => (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>
                    {t("date.end.label")}
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outlineVariant"}
                          className={cn(
                            "w-fulll justify-start text-left font-normal",
                            !end && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {end ? (
                            format(end, "PPP")
                          ) : (
                            <span>{t("date.end.placeholder")}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={end}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name={"salary"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t("salary.label")} <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black text- font-medium"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    {t("level.label")} <span className="text-red-600">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your calendly link" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {ELevelZod._def.values.map((e, index) => (
                          <SelectItem value={e as string} key={index}>
                            {t("level." + e.toString())}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6 border-l pl-6">
          <h4>Skill *</h4>
          <FormField
            control={form.control}
            name="skill.mainskill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("skill.label")} <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <TagInput
                    {...field}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                    placeholder={t("skill.placeholder")}
                    tags={mainskill}
                    draggable={true}
                    direction="row"
                    inputFieldPosition="bottom"
                    inlineTags={false}
                    className="sm:min-w-[450px] flex px-4 font-medium ring-0 ring-primary"
                    setTags={(newTags) => {
                      setMainSkill(newTags);
                      setValue("skill.mainskill", newTags as [Tag, ...Tag[]]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skill.other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("otherskill.label")}{" "}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <TagInput
                    {...field}
                    activeTagIndex={activeTagIndexOther}
                    setActiveTagIndex={setActiveTagIndexOther}
                    placeholder={t("otherskill.placeholder")}
                    tags={other}
                    draggable={true}
                    direction="row"
                    inputFieldPosition="bottom"
                    inlineTags={false}
                    className="sm:min-w-[450px] font-medium ring-0 ring-primary"
                    setTags={(newTags) => {
                      setOther(newTags);
                      setValue("skill.other", newTags as [Tag, ...Tag[]]);
                    }}
                  />
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
                setActiveTagIndex(null);
                setActiveTagIndexOther(null);
                setOther([]);
                setMainSkill([]);
                setEndDate(undefined);
                setStartDate(undefined);
                reset();
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
