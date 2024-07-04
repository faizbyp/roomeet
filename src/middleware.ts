import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("Middleware is running");

    if (req.nextUrl.pathname.startsWith("/dashboard") && req.nextauth.token === undefined) {
      console.log("Unauthorized");
      return NextResponse.rewrite(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
