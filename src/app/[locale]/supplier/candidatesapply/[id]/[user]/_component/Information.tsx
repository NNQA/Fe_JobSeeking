"use client";
import { Applicant } from "@/lib/models/Applicant";
import React from "react";
import AvataUser from "./AvataUser";
import { Button } from "@/components/ui/button";
import { MailIcon, MailsIcon, PhoneCallIcon, SchoolIcon } from "lucide-react";

interface Props {
  applicant: Applicant;
}
function Information({ applicant }: Props) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-6">
          <AvataUser />
          <div>
            <p className="font-bold">{applicant.user.name}</p>
            <p className="text-card-foreground/30 font-medium">#89089213</p>
          </div>
        </div>
        <div className="flex gap-4 items-end mt-2 text-secondary">
          <Button variant={"destructive"} className="">
            Reject profile
          </Button>
          <Button variant={"default"}>Accept profile</Button>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-2 mt-6">
        <div className="border-r space-y-3 border-accent-foreground/40">
          <div className="space-y-1">
            <h6 className="font-bold text-sm tracking-wide pb-1">About</h6>
            <div className="flex gap-4">
              <div className="text-accent-foreground/40 flex items-center gap-2">
                <MailIcon className="w-4 h-4" />
                <p className="font-bold text-sm">Email: </p>
              </div>
              <p className="font-medium">{applicant.user.email}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-accent-foreground/40 flex items-center gap-2">
                <PhoneCallIcon className="w-4 h-4" />
                <p className="font-bold text-sm">Phone: </p>
              </div>
              <p className="font-medium">{applicant.user.phone}</p>
            </div>
          </div>
          <hr className="w-full border-[1.5px] bg-secondary-foreground/50" />
          <div className="space-y-2">
            <h6 className="font-bold text-sm tracking-wide pb-1">
              More details
            </h6>
            <div className="flex gap-4">
              <div className="text-accent-foreground/40 flex items-center gap-2">
                <SchoolIcon className="w-4 h-4" />
                <p className="font-bold text-sm">University: </p>
              </div>
              <p className="font-medium">{applicant.user.university}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-2">
            <h6 className="font-bold text-sm tracking-wide">Introduce</h6>
            {/* <div className="flex gap-4">
              <div className="text-accent-foreground/30 flex items-center gap-2">
                <MailIcon className="w-4 h-4" />
                <p className="font-medium text-sm">Email: </p>
              </div>
              <p className="font-medium">{applicant.user.email}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
