"use server";

import { toActionErrorsAsync } from "@/lib/error.server";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";
import ApplicantPaginationResponse from "./type.data";

interface ResponseAction {
  status: string;
  message: string;
  data: ApplicantPaginationResponse | undefined;
}
interface PaginationAction {
  text: string;
}
export const getApplicattionPagination = async (paginationAction: PaginationAction) => {
  const api = SessionApi.from(cookies());
  let response: ResponseAction;
  try {
    const result = await api.get(
      `api/applicant/getApplicantPagination?${paginationAction.text}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (result.isOk()) {
      const data = (await result.value.json()) as ApplicantPaginationResponse;
      response = {
        status: "ok",
        message: "",
        data: data,
      };
      return response;
    } else {
      const errPro = await toActionErrorsAsync(result.error);
      response = {
        status: "failure",
        message: errPro.form[0] ? errPro.form[0].split("+")[0] : errPro.from[1],
        data: undefined,
      };
    }
    return response;
  } catch (error) {
    console.error("Error upgrading user:", error);
  }
};