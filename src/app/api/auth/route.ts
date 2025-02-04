import { LoginRequest } from "@/apiTypes/AuthTypes"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"


const validPassword = process.env.LOGIN_PASSWORD

export async function POST(req: Request) {

    const data: LoginRequest = await req.json()

    if (!data.password || data.password == "") {
        return NextResponse.json({ message: "Empty Request!" }, { status: 401 })
    }

    if (data.password === validPassword) {
        const cookieStore = await cookies()
        cookieStore.set('x-authenticated', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 2 * 60 * 60,
            path: '/',
            sameSite: "lax"
        })
        const res = NextResponse.json({ message: "Lets go." }, { status: 200 })
        return res
    } else {
        return NextResponse.json({ message: "Wrong password!" }, { status: 401 })
    }

}
