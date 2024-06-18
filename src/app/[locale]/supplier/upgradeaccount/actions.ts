"use server"

import { Company } from "@/lib/models/Company";
import { User } from "@/lib/models/User";
import { SessionApi } from "@/lib/service/session-api.server";
import { useLocale } from "next-intl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
    if (cookies().get("accessToken")) {
      const api = SessionApi.from(cookies());
  
      const response = await api.get("/api/user/getCurrentUser", {
        next: { revalidate: 3600 },
      });
  
      if (response.isOk()) {
        const user = (await response.value.json()) as User;
        console.log(user);
        return user;
      }
    }
    const locale = useLocale();
    return redirect(`/${locale}/auth/login`);
  };

export const actionUpgradeUser = async (company: Company) => {
  const api = SessionApi.from(cookies());
  let status: string;

  try {
    const response = await api.post("api/supplier/upgradeRole", {
      body: {
        province: company.province,
        district: company.district,
        nameCompanny: company.nameCompanny,
        phone: company.phone,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.isOk()) {
      status = "ok";
    } else {
      status = "failure";
    }
  } catch (error) {
    console.error("Error upgrading user:", error);
    status = "failure";
  }

  return status;

}