"use server"

import { toActionErrorsAsync } from "@/lib/error.server";
import { Company } from "@/lib/models/Company";
import { User } from "@/lib/models/User";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
  interface response {
    status: string;
    message: string;
    user: User | undefined;
  };
    if (cookies().get("accessToken")) {
      const api = SessionApi.from(cookies());
  
      const response = await api.get("/api/user/getCurrentUser", {
        next: { revalidate: 3600 },
      });
  
      if (response.isOk()) {
        const user = (await response.value.json()) as User;
        return {
          status:"Ok",
          message: "",
          user: user
        } as response;
      }
      return {
        status:"failure",
        message: "",
        user: undefined
      } as response;
    }
  };

export const actionUpgradeUser = async (company: Company) => {
  const api = SessionApi.from(cookies());
  let response : {
    status: string;
    message: string;
  };

  try {
    const result = await api.post("api/supplier/upgradeRole", {
      body: company,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.isOk()) {
      response = {
        status: "ok",
        message: "",
      }
      return response;
    } else {
      const errPro = await toActionErrorsAsync(result.error); 
      console.log("Aaa");
      console.log( errPro.form[0].split("+")[0]);
      response = {
        status : "failure",
        message :  errPro.form[0] ? errPro.form[0].split('+')[0] : errPro.from[1],
      }
    }
    return response;
  } catch (error) {
    console.error("Error upgrading user:", error);
  }
}