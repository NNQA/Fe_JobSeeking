import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { Authorities, ERole } from "./lib/models/User";
import { redirect } from "next/dist/server/api-utils";

const fetchUserData = async (request: NextRequest) => {
  console.log(
    new URL(
      "http://localhost:3000/api/user/getCurrentUser",
      request.url
    ).toString()
  );
  const response = await fetch(
    new URL(
      "http://localhost:3000/api/user/getCurrentUser",
      request.url
    ).toString(),
    {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (response.ok) {
    return response.json();
  }
  console.error("Failed to fetch user data:", response.statusText);
  return null;
};
export async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: ["en", "vi"],
    defaultLocale: "en",
  });

  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  if (request.nextUrl.pathname.startsWith(`/${locale}/supplier`)) {
    console.log("first");
    try {
      const user = await fetchUserData(request);
      console.log("Fetched User:", user);

      if (
        user &&
        !user.authorities.some(
          (e: Authorities) => e.authority === ERole.ROLE_SUPPLIER
        )
      ) {
        request.nextUrl.pathname = `/${locale}/upgradeaccount`;
      }
    } catch (error) {
      console.error("Error in middleware user fetch:", error);
    }
  }
  const response = handleI18nRouting(request);
  return response;
}
export const config = {
  matcher: ["/", "/(vi|en)/:path*"],
};
