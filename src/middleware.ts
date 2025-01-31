import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export function middleware(request: NextRequest){
    if (request.nextUrl.pathname.startsWith("/_next") || request.nextUrl.pathname.includes('/auth')){
        console.log('Static file request', request.url)
        return NextResponse.next();
    }

    const requestHeaders = new Headers(request.headers)

    requestHeaders.set('x-url', request.url)

    const authResponse = checkAuthenticated(request);
    if(authResponse){
        return authResponse
    }

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    })
}

function checkAuthenticated(request: NextRequest) : NextResponse | undefined{
    const cookies = request.cookies
    const token = cookies.get('x-authenticated')

    if(token && token.value == "true"){
        if(request.url.includes('/login')){
            return NextResponse.redirect(new URL('/', request.url))
        }
        return undefined
    }
    if(!request.url.includes('/login') && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return undefined

}