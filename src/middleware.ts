import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export function middleware(request: NextRequest){

    const authResponse = checkAuthenticated(request);
    if(authResponse){
        return authResponse
    }

    return NextResponse.next()
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

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|globals.css).*)',
    ],
  }