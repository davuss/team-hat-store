import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();
    const adminPin = process.env.ADMIN_PIN || '0000'; // Default to 0000 if not set

    if (pin === adminPin) {
      // Set secure HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Bad Request' }, { status: 400 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return NextResponse.json({ success: true });
}
