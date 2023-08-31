import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

export const validateJWT = async (jwt: string) => {
	const { payload } = await jwtVerify(
		jwt,
		new TextEncoder().encode(process.env.JWT_SECRET)
	);

	return payload.payload;
};

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	// console.log(pathname, "middleware pathname");
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/static") ||
		pathname.startsWith("/signin") ||
		pathname.startsWith("/register") ||
		PUBLIC_FILE.test(pathname)
	) {
		return NextResponse.next();
	}
	const jwt = req.cookies.get(process.env.COOKIE_NAME as string);
	// console.log(jwt, "cookie val from middleware");
	if (!jwt) {
		// console.log(req.nextUrl, "jwt not found");
		req.nextUrl.pathname = "/signin";
		return NextResponse.redirect(req.nextUrl);
	}

	try {
		await validateJWT(jwt.value);
		return NextResponse.next();
	} catch (e) {
		console.error(e);
		req.nextUrl.pathname = "/signin";
		return NextResponse.redirect(req.nextUrl);
	}
}
