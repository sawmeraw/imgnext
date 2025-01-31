import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(req: Request){

    const cookieStore = cookies()
    cookieStore.delete('x-authenticated')

    return NextResponse.redirect(new URL('/login', req.url))

}