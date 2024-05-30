import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { redirect } from "next/dist/server/api-utils";

export default withAuth(
  function middleware(req: any) {
    console.log("role", req?.nextauth?.token?.role);

    var url = req.nextUrl.pathname;
    var role = req?.nextauth?.token?.role;

    if (!role) {
      role = "dosen";
    }

    if (url.startsWith("/admin") === true) {
      if (role !== "dosen") {
        return NextResponse.redirect(new URL("/mahasiswa", req.url));
      } else {
        return NextResponse.next();
      }
    }

    if (url.startsWith("/mahasiswa") === true) {
      if (role !== "mahasiswa") {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if (token) return true;
        return false;
      },
    },
    pages: {
      signIn: "/auth/login",
      error: "/api/auth/error",
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*", "/mahasiswa", "/mahasiswa/:path*"],
};
