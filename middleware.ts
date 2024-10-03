import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest) {
    const tokenUser = request.cookies.get('token_user')?.value

    const rootPath = request.nextUrl.pathname === '/'
    const signInPath = request.nextUrl.pathname === '/signin'
    const backofficeRoute = request.nextUrl.pathname.startsWith('/backoffice')

    if (rootPath) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    if (tokenUser) {
        try {
            const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_TOKEN || '')
            const { payload } = await jose.jwtVerify(tokenUser, secret)
            
            // Create a new headers object
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('x-user-id', payload.id as string)
            requestHeaders.set('x-user-username', payload.username as string)
            requestHeaders.set('x-user-role', payload.role as string)

            // If on signin path, redirect to backoffice
            if (signInPath) {
                return NextResponse.redirect(new URL('/backoffice', request.url))
            }

            // For other paths, continue with the modified headers
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
        } catch (error) {
            // If token is invalid, treat as if there's no token
            console.error('Invalid token:', error)
        }
    }

    // If no token or invalid token, and trying to access backoffice, redirect to signin
    if (backofficeRoute) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // For all other cases, continue normally
    return NextResponse.next()
}

export const config = {
    matcher: ['/backoffice/:path*', '/signin', '/']
}