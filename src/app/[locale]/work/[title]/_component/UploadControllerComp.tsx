import React, { useRef, useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Control, Controller } from "react-hook-form";
import { FileTextIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  control: Control<
    {
      email: string;
      name: string;
      phone: string;
      resume: File;
    },
    any
  >;
}
function UploadControllerComp({ control }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const handleFileChange = (e, onChange) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    onChange(file);
  };

  const handleRemoveFile = (onChange) => {
    setSelectedFile(null);
    onChange(null);
  };
  return (
    <div>
      <Controller
        name="resume"
        control={control}
        render={({ field }) => (
          <div className="flex gap-2">
            {selectedFile ? (
              <div className="flex items-center gap-3">
                <FileTextIcon className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm leading-tight w-24 font-bold overflow-hidden whitespace-nowrap">
                  {selectedFile.name}
                </span>
                <Button
                  variant="outlineVariant"
                  size="icon"
                  className="text-destructive bg-destructive/20 p-0 rounded-md"
                  onClick={() => handleRemoveFile(field.onChange)}
                >
                  <Trash2Icon className="w-4 h-4" />
                </Button>
              </div>
            ) : null}
            <FormLabel>
              <Button
                asChild
                className="mt-2 h-fit px-8 font-bold text-secondary whitespace-pre-line"
                onClick={() => ref.current?.click()}
              >
                <p>Chọn CV</p>
              </Button>
              <Input
                className="text-black hidden font-medium"
                placeholder={"Nhập họ và tên"}
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, field.onChange)}
                value={undefined}
                ref={ref}
              />
            </FormLabel>
          </div>
        )}
      />
    </div>
  );
}

export default UploadControllerComp;
