'use server'

import { User } from "@/lib/models/User";
import { cookies } from "next/headers";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
export async function setCookie(user: User) {
    cookies().set("user", JSON.stringify(user), { maxAge: Date.now() + 864000000 });
}

export const getCurrentUserSignup = async () => {
    const cookieUser = cookies().get("user");
    const user = cookieUser ? (cookieUser.value as unknown as User) : null;
    return {
      user,
    };
  };