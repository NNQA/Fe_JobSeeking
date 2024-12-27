import { User } from "@/lib/models/User";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";

export class AuthActionFetching {
  static async verifyUserSession() {
    if (cookies().get("accessToken")) {
      console.log(cookies().get("accessToken"));
      const api = SessionApi.from(cookies());

      const response = await api.get("/api/user/getCurrentUser");

      if (response.isOk()) {
        const user = (await response.value.json()) as User;
        console.log(user);
        return user;
      }
    }
    return null;
  }
}
