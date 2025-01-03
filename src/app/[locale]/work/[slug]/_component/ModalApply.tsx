import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CloudUploadIcon,
  FileWarningIcon,
  FolderEdit,
  LeafIcon,
  UndoDotIcon,
  UploadIcon,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { ApplyCvSchema } from "../submit-applyCv";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormLabel } from "@/components/ui/form";
import Formsubmit from "./Formsubmit";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import UploadControllerComp from "./UploadControllerComp";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/lib/models/User";
import ProgressCircle from "@/components/svg/ProgressCircle";
interface Props {
  title?: string;
  user: User | null;
  idJob: string;
  isApplied: boolean;
}
function ModalApply({ title, user, idJob, isApplied }: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [valueSelected, setValueSelected] = useState<string>("1");

  const [isCheckedModal, setisCheckModal] = useState<boolean>(isApplied);
  const t = useTranslations();
  const idUSer = user?.id.toString();
  const formSchema = ApplyCvSchema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
      name: user?.name,
      phone: user?.phone,
      resume: new File([], ""),
    },
  });
  const { control } = form;
  const onChange = (value: string) => {
    setValueSelected(value);
    if (value === "2") {
      console.log(selected);
      setSelected(true);
      return;
    }
    setSelected(false);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data.resume);
    if (
      !data.resume ||
      !(data.resume instanceof File) ||
      data.resume.size === 0
    ) {
      toast({
        variant: "destructive",
        title: "CV",
        description: "Vui lòng chọn CV trước khi nộp hồ sơ ứng tuyển!",
      });
      return;
    }
    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("idUser", idUSer!);
    formData.append("idJob", idJob);
    console.log("formdata", data);
    const result = await fetch("/api/applyCv", {
      method: "POST",
      body: formData,
    });
    if (result.status === 200) {
      toast({
        variant: "success",
        title: "Success",
        description: "You update your successfully",
      });
      setisCheckModal(true);
    } else {
      const a = await result?.json();
      toast({
        variant: "destructive",
        title: "Failure",
        description: a.message,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          {isCheckedModal ? (
            <div className="flex items-center gap-2">
              <UndoDotIcon className="w-5 h-5" />
              <p>Ứng tuyển lại</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UploadIcon className="w-5 h-5" />
              <p>Ứng tuyển ngay</p>
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] flex flex-col gap-2 bg-white shadow-lg border border-gray-300">
        <DialogHeader className="">
          <DialogTitle className="w-full gap-1  whitespace-nowrap flex">
            <p>Ứng tuyển</p>
            <p className="text-primary">{title}</p>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full">
              <hr className="w-full h-1" />
            </div>

            <ScrollArea className="h-[500px]">
              <div className="py-3 px-5 flex flex-col gap-3">
                <div className="mb-4">
                  <Label className="mb-2 flex gap-2 items-center text-base font-medium">
                    <FolderEdit className="w-5 h-5 fill-primary text-secondary stroke-orange-200" />
                    <p>Chọn CV để ứng tuyển</p>
                  </Label>
                  <div className="space-y-2">
                    <RadioGroup
                      className="flex gap-3 flex-col"
                      defaultValue={valueSelected}
                      onValueChange={onChange}
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-2">
                        <RadioGroupItem
                          value="1"
                          id="1"
                          className="size-[20px]"
                          classNameIcon="w-3 h-3"
                          checked={valueSelected === "1"}
                        />
                        <Label htmlFor="1" className="text-base font-normal">
                          Cv trong ngân hàng cv
                        </Label>
                      </div>
                      <div
                        className={clsx(
                          "flex flex-col space-x-2 gap-10 border rounded-md p-2 items-start border-dashed",
                          {
                            "border border-primary": selected,
                          }
                        )}
                      >
                        <div className="flex gap-24 items-start ">
                          <RadioGroupItem
                            value="2"
                            id="2"
                            className="size-[20px]"
                            classNameIcon="w-3 h-3"
                            checked={valueSelected === "2"}
                          />
                          <Label
                            htmlFor="2"
                            className="text-base font-normal text-center flex flex-col items-center"
                          >
                            <div className="flex items-center space-x-2">
                              <CloudUploadIcon className="w-6 h-6 text-foreground/30" />
                              <span className="text-sm font-bold">
                                Tải lên CV từ máy tính, chọn hoặc kéo thả
                              </span>
                            </div>
                            <p className="text-foreground/50 text-sm mt-1 font-bold">
                              Hỗ trợ định dạng .doc, .docx, pdf có kích thước
                              dưới 5MB
                            </p>
                            <UploadControllerComp control={control} />
                          </Label>
                        </div>
                        <Transition
                          show={selected}
                          enter="transition-all duration-300 ease-in-out"
                          enterFrom="max-h-0 opacity-0"
                          enterTo="max-h-[300px] opacity-100"
                          leave="transition-all duration-300 ease-in-out"
                          leaveFrom="max-h-[300px] opacity-100"
                          leaveTo="max-h-0 opacity-0"
                        >
                          <div className="overflow-hidden w-full px-3 space-y-3">
                            <div className="w-full">
                              <hr className="w-full h-1" />
                            </div>
                            <div className="flex justify-between w-full">
                              <p className="text-sm text-primary">
                                Vui lòng nhập đầy đủ thông tin chi tiết:
                              </p>
                              <p className="text-sm text-destructive">
                                (*) Thông tin bắt buộc.
                              </p>
                            </div>
                            <Formsubmit form={form} />
                          </div>
                        </Transition>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div>
                  <h5 className="text-primary flex items-center gap-2">
                    <LeafIcon className="fill-primary text-secondary"></LeafIcon>
                    <p className="font-bold">Giới thiệu bản thân:</p>
                  </h5>
                  <p className="font-bold text-foreground/60 text-sm">
                    Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên
                    chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
                  </p>
                </div>
                <Textarea placeholder="Type your message here." />
                <div className="border rounded-md px-4 py-2 space-y-3">
                  <h5 className="text-destructive flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-rose-400">
                      <FileWarningIcon className="text-secondary"></FileWarningIcon>
                    </div>
                    <p className="font-bold">Lưu ý:</p>
                  </h5>
                  <div className="space-y-2">
                    <div className="flex text-sm gap-2">
                      <span>1.</span>
                      <p>
                        TopCV khuyên tất cả các bạn hãy luôn cẩn trọng trong quá
                        trình tìm việc và chủ động nghiên cứu về thông tin công
                        ty, vị trí việc làm trước khi ứng tuyển. Ứng viên cần có
                        trách nhiệm với hành vi ứng tuyển của mình. Nếu bạn gặp
                        phải tin tuyển dụng hoặc nhận được liên lạc đáng ngờ của
                        nhà tuyển dụng, hãy báo cáo ngay cho TopCV qua email
                        hotro@topcv.vn để được hỗ trợ kịp thời.
                      </p>
                    </div>
                    <div className="flex text-sm gap-2">
                      <span>2.</span>
                      <p>
                        Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo tại đây.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant={"outlineVariant"}>Hủy</Button>
              <Button type="submit" className="w-full relative text-white">
                <span
                  className={clsx("block transition ease-in-out", {
                    "opacity-0": form.formState.isSubmitting,
                    "scale-0": form.formState.isSubmitting,
                  })}
                >
                  Nộp hồ sơ ứng tuyển
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
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalApply;
