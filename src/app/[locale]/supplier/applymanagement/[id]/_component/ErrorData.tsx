"use client";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

function ErrorData() {
  const locale = useLocale();
  return (
    <div className="w-full h-full flex justify-center items-center">
      Sorry have some error with data!!!!
      <Button asChild variant={"outlineVariant"}>
        <Link href={`/${locale}/supplier/applymanagement`}>Back to table</Link>
      </Button>
    </div>
  );
}

export default ErrorData;
