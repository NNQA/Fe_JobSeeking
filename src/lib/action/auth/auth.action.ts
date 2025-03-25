import { User } from "@/lib/models/User";
import { ApiClient } from "@/lib/service/api-client.server";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";

export class AuthActionFetching {
  static async verifyUserSession() {
    if (cookies().get("accessToken")) {
      console.log(cookies().get("accessToken"));
      const api = SessionApi.from(cookies());

      const response = await api.get("/api/user/getCurrentUser", {
        next: {
          tags: ["user"],
          revalidate: 10
        },
      });

      if (response.isOk()) {
        const user = (await response.value.json()) as User;
        console.log(user);
        return user;
      }
    }
    return null;
  }

  static async VerifiedToken(token: string) { 
    const api = ApiClient.instance;
    const response = await api.post("/api/auth/verify-email", {
      body: {
        token: token,
      },
    });
    console.log(response)
    if (response.isOk()) {
      return true;
    }
    return false;
  } 
}
