import { Button } from "@/components/ui/button";
import { Company } from "@/lib/models/Company";
import Link from "next/link";
import React from "react";

function ShowDetailsComp({ company }: { company: Company }) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-2 ">
      <div className="bg-foreground/5 rounded-md">
        <div className="p-6">
          <h6 className="font-bold text-sm">About</h6>
          <div className="px-14 mt-2">
            <div className="flex gap-4">
              <p className="font-medium">Name company:</p>
              <p>{company.nameCompany}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-medium">Telephone:</p>
              <p>{company.phone}</p>
            </div>
          </div>
        </div>
        <hr className="border-2 w-full bg-foreground" />
        <div className="p-6">
          <h6 className="font-bold text-sm">Description</h6>
          {company.description && (
            <div
              dangerouslySetInnerHTML={{ __html: company.description }}
              className="px-14"
            />
          )}
        </div>
        <hr className="border-2 w-full bg-foreground" />
        <div className="p-6">
          <h6 className="font-bold text-sm">Business license</h6>
          <div className="px-14 mt-5">
            <div className="flex gap-4">
              <p className="font-medium">Business type:</p>
              <p>{company.businessType}</p>
            </div>
            <div className="flex gap-4">
              <p className="font-medium">Business registration number:</p>
              <p>{company.businessRegistrationNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-secondary rounded-md h-fit">
        <div className="p-6">
          <h6 className="font-bold text-sm">Addrress</h6>
          <div className="px-7 mt-8">
            <div className="flex gap-4">
              <p className="font-medium w-full">Full address:</p>
              <p>{company.address.formattedAddressName}</p>
            </div>
          </div>
        </div>
        <hr className="border-2 w-full bg-foreground" />
        <div className="p-6">
          <div className="flex gap-4 items-center">
            <p className="font-medium">Link:</p>
            <Button asChild variant={"link"}>
              <Link href={company.linkComp}>{company.linkComp}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowDetailsComp;
