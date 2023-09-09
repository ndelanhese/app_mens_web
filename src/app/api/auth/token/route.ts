import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookiesStore = cookies();
  const token = cookiesStore.get('token')?.value;
  return NextResponse.json({ token }, { status: 200 });
}
