import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Real-ish check (in production this would be bcrypt + DB)
        if (email === 'admin@europia.com' && password === 'admin123') {
            return NextResponse.json({ success: true, token: 'mock-jwt-token-for-europia' });
        }

        return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
    }
}
