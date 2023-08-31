import { validateJWT } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const jwt = req.cookies.get(process.env.COOKIE_NAME as string);
	// console.log(jwt, "jwt from project api");
	const data = await req.json();
	const path = req.nextUrl.pathname;
	// console.log(path, "path from project api");
	const name = data;
	// console.log(data, "data from project api");
	const user = await validateJWT(jwt);
	// console.log(user, "user from project api");
	const project = await prisma.project.create({
		data: {
			ownerId: user?.id,
			name,
		},
	});

	// revalidatePath("/home");
	return NextResponse.json({
		message: "Project created successfully",
	});
}
