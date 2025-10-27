import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const GENERAL_PATHS = ["/privacy-policy", "/terms-and-conditions"]
const PUBLIC_PATHS = ["/login", "/register", "/forgot-password"]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isGeneralPath = GENERAL_PATHS.some(path => pathname.startsWith(path));
    if (isGeneralPath) {
        return NextResponse.next();
    }

    const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));
    if (isPublicPath) {
        const accessToken = request.cookies.get("access_token");
        
        if (accessToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        
        return NextResponse.next();
    }

    const whoamiResult = await callWhoami(request);
    
    if (!whoamiResult.success) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return checkUserProfile(request);
}

async function callWhoami(request: NextRequest) {
    try {
        const cookies = request.cookies.getAll()
        const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
        
        const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': cookieString
            },
            body: JSON.stringify({
                query: `query { whoami }`
            })
        });

        const result = await response.json();
        
        if (result.errors) {
            return { success: false };
        }
        
        return { success: true, whoami: result.data?.whoami };
        
    } catch (error) {
        return { success: false };
    }
}

async function checkUserProfile(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    try {
        const cookies = request.cookies.getAll();
        const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
        
        const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Cookie': cookieString
            },
            body: JSON.stringify({
                query: `query { myProfile { display_name } }`
            })
        });

        const result = await response.json();
        
        if (result.errors) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        
        const displayName = result.data?.myProfile?.display_name?.trim() ?? "";

        if (pathname === "/introduction" && displayName) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        
        if (pathname !== "/introduction" && !displayName) {
            return NextResponse.redirect(new URL("/introduction", request.url));
        }
    } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|.*\\..*).*)',]
}