import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const session = request.cookies.get("session");
	console.log("Session:", session);
	const url = request.nextUrl.clone();

	if (!session) {
		url.pathname = "/admin/login";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/dashboard/:path*"],
};
