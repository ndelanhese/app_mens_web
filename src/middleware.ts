import { validateIfTheUseCanSeeThePath } from '@utils/permissions';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const permissionsOne = request.cookies.get('permission_one')?.value;
  const permissionsTwo = request.cookies.get('permission_two')?.value;
  const userPermissions = `${permissionsOne ?? ''}${permissionsTwo ?? ''}`;
  const { pathname } = request.nextUrl;
  const ONE_MINUTE_IN_SECONDS = 60;

  if (!token && pathname !== '/signin') {
    const redirectURL = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`,
    );

    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/signin`),
      {
        headers: {
          'Set-Cookie': `redirectTo=${redirectURL}; Path=/; max-age=${ONE_MINUTE_IN_SECONDS};`,
        },
      },
    );
  }

  if (pathname === '/signin' && token) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, request.url),
    );
  }

  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`, request.url),
    );
  }

  const userCanAccess = validateIfTheUseCanSeeThePath(
    pathname,
    userPermissions,
  );

  if (
    !userCanAccess &&
    pathname !== '/signin' &&
    pathname !== '/dashboard-fallback'
  ) {
    return NextResponse.redirect(new URL('/dashboard-fallback', request.url), {
      headers: {
        'Set-Cookie': `redirectTo=${request.nextUrl.basePath}/${pathname}; Path=/; max-age=${ONE_MINUTE_IN_SECONDS};`,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/dashboard-fallback/:path*',
    '/signin/:path*',
    '/administration/users/:path*',
    '/administration/roles-permissions/:path*',
    '/data-management/brands/:path*',
    '/data-management/categories/:path*',
    '/data-management/products/:path*',
    '/customers/customers/:path*',
    '/customers/orders/:path*',
    '/customers/sales/:path*',
    '/employees/employees/:path*',
    '/employees/suppliers/:path*',
    '/promotions/promotion-categories/:path*',
    '/promotions/promotions/:path*',
  ],
};
