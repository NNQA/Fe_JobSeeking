"use server"

import { cookies } from "next/headers"

interface CookieProps {
    accessToken: string,
    refreshToken: string,
}

export async function setCookie(input: CookieProps) {
    cookies().set("accessToken", input.accessToken, {expires: Date.now() + 864000000})
    cookies().set("refreshToken", input.refreshToken, {expires: Date.now() + 864000000})
}