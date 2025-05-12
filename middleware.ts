import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./src/services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard\/user/, /^\/products/, /^\/profile$/],
  ADMIN: [/^\/dashboard\/admin/, /^\/products/, /^\/profile$/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_BASE_API}/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const allowedRoutes = roleBasedPrivateRoutes[userInfo.role as Role];
    const isAuthorized = allowedRoutes.some((pattern) =>
      pattern.test(pathname)
    );

    if (isAuthorized) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(
    new URL(`/?error=Unauthorized Access`, request.url)
  );
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/products/:path*",
    "/profile",
  ],
};
