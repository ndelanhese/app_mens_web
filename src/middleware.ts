import { NextRequest, NextResponse } from 'next/server'

// This is a function to verify if the route is a protected route
// const isAProtectedRoute = (pathname: string) => {
//   return (
//     pathname.includes('/users') ||
//     pathname.includes('/roles-permissions') ||
//     pathname.includes('/roles-permissions') ||
//     pathname.includes('/brands') ||
//     pathname.includes('/brands') ||
//     pathname.includes('/categories') ||
//     pathname.includes('/products') ||
//     pathname.includes('/orders') ||
//     pathname.includes('/sales') ||
//     pathname.includes('/employees') ||
//     pathname.includes('/suppliers') ||
//     pathname.includes('/summaries') ||
//     pathname.includes('/promotion-categories') ||
//     pathname.includes('/promotions')
//   )
// }

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

  // caller function to verify if the route is a protected route
  // const isProtectedRoute = isAProtectedRoute(pathName)
  // const isProtectedRoute = false
  // if (isProtectedRoute) {
  //   return NextResponse.redirect(new URL('/', request.url), {
  //     headers: {
  //       'Set-Cookie': `redirectTo=${request.nextUrl.basePath}; Path=/; max-age=${ONE_MINUTE_IN_SECONDS};`,
  //     },
  //   })
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/signin/:path*',
    '/administration/users/:path*',
    '/administration/roles-permissions/:path*',
    '/data-management/brands/:path*',
    '/data-management/categories/:path*',
    '/data-management/products/:path*',
    '/customers/orders/:path*',
    '/customers/sales/:path*',
    '/employees/employees/:path*',
    '/employees/suppliers/:path*',
    '/financial/summaries/:path*',
    '/promotions/promotion-categories/:path*',
    '/promotions/promotions/:path*',
  ],
}
