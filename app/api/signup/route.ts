import {NextResponse} from "next/dist/server/web/spec-extension/response";
import bcrypt from "bcrypt";
import { userTable } from '@/db/schema';
import {db} from "@/db";
import {eq} from "drizzle-orm";
import {cookies} from "next/headers";

export async function POST(request: Request) {
    try {
        const {username, email, password} = await request.json();

        const cookieStrore = await cookies()

        if(!email || !password) {
            return NextResponse.json({error: "Email or password is required"}, {status: 400})
        }
        const existingUser = await db.select()
            .from(userTable)
            .where(eq(userTable.email, email))
            .limit(1)

        if (existingUser.length > 0) {
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.insert(userTable).values({
            email,
            password: hashedPassword,
            username
        }).returning({
            id: userTable.id,
            email: userTable.email
        });

        cookieStrore.set("userId", String(user[0].id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        })

        return NextResponse.json({message: "User is created successfully.", userId: user[0].id})

    } catch (error) {
        NextResponse.json({error: "Server error. Please try again later."}, {status: 500})
    }

}