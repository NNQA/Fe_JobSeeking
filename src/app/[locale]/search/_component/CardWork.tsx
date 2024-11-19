"use client";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Work } from "@/lib/models/Work";
import { formatRelativeDateFromNowAndDistanceDate } from "@/lib/utils/dates";
import { Avatar } from "@radix-ui/react-avatar";
import { BadgeDollarSign, Heart } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";
type Props = {
  work: Work;
};
function CardWork({ work }: Props) {
  const locale = useLocale();
  return (
    <div className="border hover:border-primary rounded-2xl group shadow-md px-3 py-3 bg-card">
      <div className="flex gap-2">
        <div className="w-36 h-36 border rounded-2xl shadow-md aspect-auto p-2">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="rounded-md"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="p-3 basis-[85%] flex justify-start flex-col">
          <div className="justify-between flex w-full">
            <div className="space-y-2">
              <h3 className="mt-1 font-medium text-foreground/85 whitespace-pre">
                {work.title}
              </h3>
              <p className="font-medium text-foreground/50">
                {work.company?.nameCompany}
              </p>
            </div>
            <div className="flex mb-10 gap-1 items-center">
              <BadgeDollarSign className="text-primary w-4 h-4" />
              <p className="font-bold whitespace-pre-line text-primary text-sm">
                {work.salary.value}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-foreground/5 text-foreground">
              {work.address.provinceName}
            </Badge>
            <Badge className="bg-foreground/5 text-foreground">
              {work.experience}
            </Badge>
          </div>
          <hr className="w-full border mt-3" />
          <div className="flex justify-between mt-1">
            <p className="text-foreground/50 font-medium">
              {work.categories[0].jobCategoryName}
            </p>
            <div className="flex gap-3 items-center">
              <p className="text-foreground/80 group-hover:hidden">
                {formatRelativeDateFromNowAndDistanceDate(
                  new Date(work.createdDateTime!),
                  locale
                )}
              </p>
              <Button
                className="group-hover:block hidden rounded-full text-xs h-fit text-secondary"
                asChild
              >
                <Link href={`work/${encodeURIComponent(work.title)}`}>
                  Ứng Tuyển
                </Link>
              </Button>
              <div className="border-primary border bg-primary/5 rounded-full p-2">
                <Heart className="text-primary h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardWork;
