import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./src/services/AuthService";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/products/],
  company: [/^\/company/, /^\/products/],
  admin: [/^\/admin/, /^\/products/],
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
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
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
    "/admin",
    "/admin/:page",
    "/company",
    "/company/:page",
    "/user",
    "/user/:page",
    "/products/:page",
  ],
};
