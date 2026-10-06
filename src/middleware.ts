import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/admin/login';
  
  const token = request.cookies.get('admin_token')?.value || '';

  // If trying to access admin paths (except login) and no token, redirect to login
  if (path.startsWith('/admin') && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If accessing login page and already have token, redirect to dashboard
  if (path === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/:path*'
  ],
};
