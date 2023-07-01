import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import store from "./store/store";

export default function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get("token");

  if (pathname.includes("/_next")) return null;

  // if (!pathname.includes("/admin") || pathname.includes("/login")) {
  //   if (token) return NextResponse.redirect(new URL(origin));
  // } else {
  //   if (!token) return NextResponse.redirect(new URL(`${origin}/login`));
  // }
}
