"use server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { Work } from "@/lib/models/Work";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";



export const actionCreateNewJob = async (work: Work) => {
    const api = SessionApi.from(cookies());
    let response : {
      status: string;
      message: string;
    };
  
    try {
      const result = await api.post("api/job/addNewJob", {
        body: work,
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