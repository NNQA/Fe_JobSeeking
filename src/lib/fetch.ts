import { toActionErrorsAsync } from "./error.server";
import { ApiClient } from "./service/api-client.server";

export async function authorize() {
  console.log("Asds")
        const result = await ApiClient.instance.get("api/user/getUser", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3Iiwicm9sZXMiOltdLCJpYXQiOjE3MTcxNDg3MjAsImV4cCI6MTcxODAxMjcyMH0.ArhFFBseL3Huy6kXGoxC3wgNl14xTd4p3xFbqwAX5OkH9kBEYREYzrNk0u_fSUBgWIVS-T7rTcZ1T8cBup5fpA`,
          },
        });
        if (result.isErr()) {
          const a = await toActionErrorsAsync(result.error);
          console.log(a);
        }
        console.log(result)
  }
