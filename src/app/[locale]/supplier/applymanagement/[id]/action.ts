"use server";
import { toActionErrorsAsync } from "@/lib/error.server";
import { Work } from "@/lib/models/Work";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";
interface Response {
  status: string;
  message: string;
  data: Work | undefined;
};
export const getJobWithIdOrTitle = async (id: string) => {
  const api = SessionApi.from(cookies());
  
  try {
    const result = await api.get(`api/job/getDetailJobForCompany/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response: Response;
    if (result.isOk()) {
      const data = (await result.value.json()) as Work;
      response = {
        status: "ok",
        message: "",
        data: data
      }
      return response;
    } else {
      const errPro = await toActionErrorsAsync(result.error); 
      response= {
        status : "failure",
        message :  errPro.form[0] ? errPro.form[0].split('+')[0] : errPro.from[1],
        data: undefined
      }
    }
    return response;
  } catch (error) {
    console.error("Error upgrading user:", error);
  } 
}

export const actionCreateNewJob = async (work: Work) => {
  console.log(work)
    const api = SessionApi.from(cookies());
    let response : {
      status: string;
      message: string;
    };
  
    try {
      const result = await api.put(`api/job/udpateDetailJobForCompany/${work.id}`, {
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