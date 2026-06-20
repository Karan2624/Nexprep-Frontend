
import { NextResponse } from 'next/server';

export function proxy(request) {
  const token = request.cookies.get('accessToken')?.value || request.cookies.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isPublicRoute = pathname === '/';

  if (!token && !isPublicRoute) {

    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};