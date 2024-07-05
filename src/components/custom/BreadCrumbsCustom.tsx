"use client";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

function BreadCrumbsCustom() {
  const pathname = usePathname();
  const [items, setItems] = useState<
    {
      text: string;
      href: string;
    }[]
  >([]);

  useEffect(() => {
    function gennerateBreadcrubms() {
      const asPathWithoutQuery = pathname.substring(3).split("?")[0];

      const asPathNestedRoutes = asPathWithoutQuery
        .split("/")
        .filter((v) => v.length > 0);

      const crumlist = asPathNestedRoutes.map((subpath, idx) => {
        const href =
          "/vi" + "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        const text = subpath.charAt(0).toUpperCase() + subpath.slice(1);
        return {
          href,
          text,
        };
      });

      setItems(crumlist);
    }

    gennerateBreadcrubms();
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ href, text }, idx) => (
          <div key={idx} className="flex items-center">
            {idx === items.length - 1 ? (
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">{text}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={href}>{text}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumbsCustom;
