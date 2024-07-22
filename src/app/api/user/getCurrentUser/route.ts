import { NextResponse } from "next/server";
import { SessionApi } from "@/lib/service/session-api.server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    if (cookies().get("accessToken")) {
      const api = SessionApi.from(cookies());
      const response = await api.get("/api/user/getCurrentUser");
      if (response.isOk()) {
        const user = await response.value.json();
        return NextResponse.json(user);
      }
    }
    return NextResponse.json(null);
  } catch (error) {
    return NextResponse.error();
  }
}
