// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search, hostname, protocol } = request.nextUrl;

  // ---- 1. Force HTTPS ----
  if (protocol === 'http:') {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 301);
  }

  // ---- 2. Force non-www (remove www) ----
  if (hostname.startsWith('www.')) {
    const newUrl = new URL(request.url);
    newUrl.hostname = hostname.replace(/^www\./, '');
    return NextResponse.redirect(newUrl, 301);
  }

  // ---- 3. Add noindex to low-quality / auto-generated pages ----
  const noindexPaths = [
    '/medicine/',
    '/order',
    '/checkout',
    '/cart',
    '/products/dxn-spirulina-tablet', // already redirected but keep noindex as fallback
  ];

  const shouldNoindex = noindexPaths.some(p => pathname === p || pathname.startsWith(p));

  if (shouldNoindex) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, follow');
    return response;
  }

  // ---- 4. Noindex for query parameters that create duplicates ----
  if (search.includes('category=') || search.includes('page=') || search.includes('filter=')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, follow');
    return response;
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};