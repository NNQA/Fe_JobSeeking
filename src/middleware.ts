import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

let protectRoutes = ["supplier", "updateuser", "upgradeaccount", "newUser"];
let publicRoutes = ["login", "signup", "", "search"];

export async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware(routing);

  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const restructedPathname = `/${locale}/${segments.join("/")}`;
  protectRoutes = protectRoutes.map((protectRoute) =>
    protectRoute.startsWith(`/${locale}`)
      ? protectRoute
      : `/${locale}/${protectRoute}`.replace(/\/\/+/g, "/")
  );

  publicRoutes = publicRoutes.map((publicRoute) =>
    publicRoute.startsWith(`/${locale}`)
      ? publicRoute
      : `/${locale}/${publicRoute}`.replace(/\/\/+/g, "/")
  );
  const nextUrl = request.nextUrl.clone();

  const accessToken = request.cookies.get("accessToken");
  const isProtectRoutes = protectRoutes.includes(restructedPathname);

  console.log(protectRoutes);
  console.log(isProtectRoutes);
  if (isProtectRoutes) {
    if (!accessToken) {
      nextUrl.pathname = `/${locale}/login`;
      return NextResponse.redirect(nextUrl);
    }
  }

  const response = handleI18nRouting(request);
  return response;
}
export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/", "/(vi|en)/:path*"],
};
