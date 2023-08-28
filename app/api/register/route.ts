import { createJWT } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();
	const { email, password, firstName, lastName } = data;
	// console.log(data, "data in api route");
	const user = await prisma.user.create({
		data: {
			password: password,
			lastName: lastName,
			email: email,
			firstName: firstName,
		},
	});
	const jwt = await createJWT(user);
	const response = NextResponse.next();

	const cookie = response.cookies.set({
		name: process.env.COOKIE_NAME as string,
		value: jwt,
		httpOnly: true,
		path: "/",
		maxAge: 60 * 60 * 24 * 7,
	});

	return NextResponse.json(
		{ message: "user register successfully" },
		{ headers: { "Set-Cookie": cookie.toString() } }
	);
}
