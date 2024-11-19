"use server";


import { Work } from "@/lib/models/Work";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";

interface ResponseAction {
  status: string;
  message: string;
  data: Work;
};


export async function getJobDetailsWithTitle(str: string) {
  try {
    const result = await fetch(
      `http://172.23.192.1:8080/api/clientController/getDetailsJob?title=${str}`,
      {
        method:"GET"
      }
    );
    const data = await result.json();
    return {
        status: "ok",
        message: "",
        data: data,
    } as unknown as ResponseAction;
  } catch (e) {
    console.error(e);
    return {
        status: "failure",
        message: "",
        data: null,
    } as unknown as ResponseAction;
  }
}


export async function IsCheckApplied(id: string) {
  try {
    const api = SessionApi.from(cookies());

    const result = await api.get(`api/applicant/checkIsApply/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    let check;
    if(result.isOk()) {
      const data = await result.value.json() as {
        checkApplied: boolean
      }
      check = data.checkApplied;
    } 
    return {
        status: "ok",
        message: "",
        data: check,
    };
  } catch (e) {
    console.error(e);
    return {
        status: "failure",
        message: "",
        data: null,
    };
  }
}
