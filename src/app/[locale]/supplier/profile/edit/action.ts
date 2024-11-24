"use server"

import { toActionErrorsAsync } from "@/lib/error.server";
import { Company } from "@/lib/models/Company";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";

export const actionUpdateUser = async (company: Company) => {
    const api = SessionApi.from(cookies());
    let response : {
      status: string;
      message: string;
    };
  
    try {
      const result = await api.put("api/supplier/updateCompany", {
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