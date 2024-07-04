import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const user = "321de04f-1e49-4ed0-b301-3ed6ea54ce9c";
    const admin = "43dba1a3-e595-4f0b-aaa8-9f33b28caf51";

    console.log("Middleware is running");

    console.log("REQ USER", req.nextauth.token?.role_id);

    if (req.nextUrl.pathname.startsWith("/dashboard") && req.nextauth.token?.role_id !== user) {
      console.log("Unauthorized");
      return NextResponse.rewrite(new URL("/login", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role_id !== admin) {
      console.log("Unauthorized: You are not admin");
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
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
