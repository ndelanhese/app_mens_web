import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const redirectUrl = new URL(
    `${process.env.NEXT_PUBLIC_BASE_URL}/signin`,
    request.url,
  );
  const TOKEN_COOKIE = 'token=; Path=/; max-age=0;';
  const REDIRECT_TO_COOKIE = 'redirectTo=; Path=/; max-age=0;';
  const USER_COOKIE = 'user=; Path=/; max-age=0;';
  const PERMISSION_COOKIE = 'permission=; Path=/; max-age=0;';
  const STOCK_COOKIE = 'stock-notifications-mens-modas=; Path=/; max-age=0;';
  const header = new Headers();
  header.append('Set-Cookie', TOKEN_COOKIE);
  header.append('Set-Cookie', REDIRECT_TO_COOKIE);
  header.append('Set-Cookie', PERMISSION_COOKIE);
  header.append('Set-Cookie', USER_COOKIE);
  header.append('Set-Cookie', STOCK_COOKIE);
  return NextResponse.redirect(redirectUrl, {
    headers: header,
  });
}
