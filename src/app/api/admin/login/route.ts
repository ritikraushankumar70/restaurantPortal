import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  let username = '';
  let password = '';
  try {
    const body = await req.json();
    username = body.username;
    password = body.password;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // 1. Check Brute Force (5 attempts in last 15 mins)
    const [attempts]: any = await pool.query(
      `SELECT COUNT(*) as count FROM admin_login_attempts 
       WHERE email = ? AND is_success = 0 AND attempted_at >= NOW() - INTERVAL 15 MINUTE`,
      [username]
    );

    if (attempts[0].count >= 5) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    // 2. Fetch Admin
    const [rows]: any = await pool.query(
      `SELECT * FROM admins WHERE (email = ? OR phone = ?) AND is_active = 1 LIMIT 1`,
      [username, username]
    );

    const admin = rows[0];

    if (!admin) {
      // Log failed attempt
      await pool.query(
        `INSERT INTO admin_login_attempts (email, ip_address, is_success) VALUES (?, ?, 0)`,
        [username, ip]
      );
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 3. Verify Password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      await pool.query(
        `INSERT INTO admin_login_attempts (email, ip_address, is_success) VALUES (?, ?, 0)`,
        [username, ip]
      );
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 4. Password is valid - Log successful attempt (Step 1 passed)
    await pool.query(
      `INSERT INTO admin_login_attempts (email, ip_address, is_success) VALUES (?, ?, 1)`,
      [username, ip]
    );
    
    // Log activity
    await pool.query(
      `INSERT INTO admin_activity_logs (admin_id, action, ip_address) VALUES (?, 'Initiated Login (OTP pending)', ?)`,
      [admin.id, ip]
    );

    // 5. Ideally, generate OTP here and send via Email/SMS. 
    // We are returning success to prompt the frontend to ask for OTP.
    // For production, you'd store the generated OTP temporarily (e.g. in redis or a table).
    
    return NextResponse.json({ 
      success: true, 
      message: 'Credentials verified. Proceed to OTP.',
      adminId: admin.id || 1, 
      email: admin.email || username
    });

  } catch (error: any) {
    console.error('Admin Login Error:', error);
    
    // FALLBACK MOCK LOGIC FOR DEMO PURPOSES
    // If DB is not configured, it will fall into this catch block.
    if (username === "admin" && password === "Abc@2026") {
      return NextResponse.json({ 
        success: true, 
        message: 'Credentials verified (Mock Mode). Proceed to OTP.',
        adminId: 1, 
        email: 'admin@restaurant.com'
      });
    }
    
    return NextResponse.json({ error: 'Invalid credentials or Database not connected' }, { status: 401 });
  }
}
