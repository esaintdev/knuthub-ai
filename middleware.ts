import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/', '/login', '/signup', '/pricing']
const authRoutes = ['/login', '/signup']

export default async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl

    // Check if the current route is public
    const isPublicRoute = publicRoutes.some(route => pathname === route)
    const isAuthRoute = authRoutes.some(route => pathname === route)

    // If user is logged in and tries to access auth routes, redirect to dashboard
    if (session && isAuthRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If user is not logged in and tries to access protected routes, redirect to login
    if (!session && !isPublicRoute && !pathname.startsWith('/api/auth')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)']
}
