
import {NextResponse} from "next/dist/server/web/spec-extension/response";
import {db} from "@/db";
import {userTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json();

        const cookieStrore = await cookies()

        if(!email || !password) {
            return NextResponse.json({error: "Email or password is required"})
        }

        const users = await db.select()
            .from(userTable)
            .where(eq(userTable.email, email))
            .limit(1)

        const user = users[0];

        if (!user) {
            return NextResponse.json({error: "Invalid email or password"}, {status: 401})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return NextResponse.json({error: "Invalid email or password"}, {status: 401})
        }

        cookieStrore.set("userId", String(user.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        })

        return NextResponse.json({message: "User is logged in successfully.", userId: user.id})
    } catch (error) {
        return NextResponse.json({error: "Server error. Please try again later."}, {status: 401})
    }
}