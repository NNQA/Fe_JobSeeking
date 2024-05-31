'use server'

import { cookies } from "next/headers";

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
export async function setCookie({
    accessToken, 
    refreshToken
}: LoginResponse) {
    cookies().set("accessToken", accessToken);
        cookies().set("refreshToken", refreshToken);
}