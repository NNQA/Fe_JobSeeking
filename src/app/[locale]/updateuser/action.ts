"use server";

import { toActionErrorsAsync } from "@/lib/error.server";
import { SessionApi } from "@/lib/service/session-api.server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface ResponseAction {
  status: string;
  message: string;
}
interface DataPropsUpdateUsers {
  phone: string;
  name: string;
  university: string;
  experiencelevel: string;
}

export const updateNewUser = async (data: DataPropsUpdateUsers) => {
  const api = SessionApi.from(cookies());
  let response: ResponseAction;
  try {
    const result = await api.put("api/user/updateNewUser", {
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.isOk()) {
        response = {
          status: "ok",
          message: "",
        }
        revalidateTag("user");
      } else {
        const errPro = await toActionErrorsAsync(result.error); 
        response = {
          status : "failure",
          message :  errPro.form[0] ? errPro.form[0].split('+')[0] : errPro.from[1],
        }
      }
      return response;
  } catch (e) {
    console.error(e);
    response = {
        status : "failure",
        message : "Server error"
      }

      return response;
  }
};
