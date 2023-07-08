import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const ONE_MINUTE_IN_SECONDS = 60
  const { pathname } = request.nextUrl
  if (!token && pathname !== '/signin') {
    return NextResponse.redirect(new URL('/signin', request.url), {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; max-age=${ONE_MINUTE_IN_SECONDS};`,
      },
    })
  }
  if (pathname === '/signin' && token) {
    return NextResponse.redirect(new URL('/', request.url), {
      headers: {
        'Set-Cookie': `redirectTo=${request.nextUrl.basePath}; Path=/; max-age=${ONE_MINUTE_IN_SECONDS};`,
      },
    })
  }

  const permission = request.cookies.get('permission')?.value
  const ADMIN_PERMISSION = '1'
  if (permission === ADMIN_PERMISSION) {
    return NextResponse.next()
  }

  const isProtectedRoute =
    pathname.includes('/usuarios') || pathname.includes('/financeiro')
  if (isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url), {
      headers: {
        'Set-Cookie': `redirectTo=${request.nextUrl.basePath}; Path=/; max-age=${ONE_MINUTE_IN_SECONDS};`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/signin/:path*'],
}
