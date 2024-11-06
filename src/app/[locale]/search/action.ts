"use server";
import { Work } from "@/lib/models/Work";

interface ResponseAction {
  status: string;
  message: string;
  data: Work[];
};
export async function searchResult(str: string) {
  try {
    const result = await fetch(
      `http://172.23.192.1:8080/api/clientController/searchJob?${str}`,
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
      data: [],
    } as ResponseAction;
  }
}
