import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function isEmployerPath(path: string) {
  return path === "/employer" || path.startsWith("/employer/");
}

function isJobseekerPath(path: string) {
  return path === "/jobseeker" || path.startsWith("/jobseeker/");
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const path = req.nextUrl.pathname;

  // Only protect dashboards (not login/register)
  const isAuthPage =
    path.includes("/login") || path.includes("/register");

  if ((isEmployerPath(path) || isJobseekerPath(path)) && !isAuthPage) {
    if (!user) {
      const to = new URL(isEmployerPath(path) ? "/employer/login" : "/jobseeker/login", req.url);
      return NextResponse.redirect(to);
    }

    // Role enforcement (based on user_metadata.role)
    const role = String(user.user_metadata?.role || "").toUpperCase();

    if (isEmployerPath(path) && role !== "EMPLOYER") {
      return NextResponse.redirect(new URL("/jobseeker/overview", req.url));
    }

    if (isJobseekerPath(path) && role !== "JOBSEEKER") {
      return NextResponse.redirect(new URL("/employer/overview", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/employer/:path*", "/jobseeker/:path*"],
};