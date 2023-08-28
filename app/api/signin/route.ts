import { comparePassword, createJWT } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const data = await request.json();
	const { email, password } = data;
	console.log(email, password, "email and pw from signin api");

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	console.log(user);
	if (!user) {
		NextResponse.json({ error: "invalid user" });
		return;
	}

	const isUser = password === user.password;
	console.log(isUser, "is user from signin api");

	if (isUser) {
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
			{ message: "signed in successfully" },
			{
				status: 201,
				headers: {
					"Set-Cookie": cookie.toString(),
				},
			}
		);
	} else {
		return NextResponse.json({ error: "invalid login" }, { status: 401 });
	}
}
