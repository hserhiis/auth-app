
import * as React from 'react';
import {SuccessView} from "@/components/success";
import {cookies} from "next/headers";
import Interceptors from "undici-types/interceptors";
import { redirect } from "next/navigation";
import {db} from "@/db";
import {userTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const userId = await cookieStore.get("userId")?.value;

    if(!userId) {
        redirect('/auth');
    }

    const user = await db.select()
        .from(userTable)
        .where(eq(userTable.id, Number(userId)))
        .limit(1)

    if(!user) {
        redirect('/auth');
    }

    const decodedEmail = decodeURIComponent(user[0].email);

    return (
        <div>
            <SuccessView email={decodedEmail} />
        </div>
    );
}