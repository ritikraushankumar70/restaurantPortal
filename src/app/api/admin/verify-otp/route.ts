import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secure-secret-key-change-this';

export async function POST(req: Request) {
  let email = '';
  let otp = '';
  let adminId = '';
  try {
    const body = await req.json();
    email = body.email;
    otp = body.otp;
    adminId = body.adminId;

    if (!email || !otp || !adminId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. Verify OTP
    // In production, you would fetch the stored OTP for this adminId/email and compare.
    // For this demonstration based on the provided logic:
    if (otp !== '123456') {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
    }

    // 2. Fetch Admin to verify role and status
    const [rows]: any = await pool.query(
      `SELECT * FROM admins WHERE id = ? AND is_active = 1 LIMIT 1`,
      [adminId]
    );

    const admin = rows[0];

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found or inactive' }, { status: 401 });
    }

    // 3. Create Session (JWT Cookie) - Session Timeout 30 mins
    const token = jwt.sign(
      { 
        id: admin.id, 
        email: admin.email, 
        role: admin.role,
        session_id: crypto.randomUUID() // for single device login tracking
      },
      JWT_SECRET,
      { expiresIn: '30m' } // Session Timeout: 30 mins
    );

    const cookieStore = await cookies();
    
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 60, // 30 minutes
      path: '/',
    });

    // 4. Update Last Login details
    await pool.query(
      `UPDATE admins SET last_login_at = NOW(), last_login_ip = ? WHERE id = ?`,
      [ip, admin.id]
    );

    // 5. Log Activity
    await pool.query(
      `INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (?, 'Successfully Logged In via OTP', ?)`,
      [admin.id, ip]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Authentication successful',
      role: admin.role 
    });

  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    
    // FALLBACK MOCK LOGIC FOR DEMO PURPOSES
    if (otp === '123456') {
      const token = jwt.sign(
        { id: 1, email: 'admin@restaurant.com', role: 'super_admin', session_id: crypto.randomUUID() },
        JWT_SECRET,
        { expiresIn: '30m' }
      );
      const cookieStore = await cookies();
      cookieStore.set('admin_token', token, {
        httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 30 * 60, path: '/',
      });
      return NextResponse.json({ success: true, message: 'Authentication successful (Mock Mode)', role: 'super_admin' });
    }
    
    return NextResponse.json({ error: 'Invalid OTP or Database not connected' }, { status: 500 });
  }
}
