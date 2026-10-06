import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin auth is now strictly in-memory (AdminAuthContext) 
  // so that refreshing or opening a new tab forces a new login.
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
