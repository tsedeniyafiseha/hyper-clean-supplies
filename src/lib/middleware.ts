import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    return handler(req, session);
  };
}

export async function withAdmin(handler: Function) {
  return async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    return handler(req, session);
  };
}

export function withRateLimit(handler: Function, limit = 100) {
  const requests = new Map();
  
  return async (req: NextRequest) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    
    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      const record = requests.get(ip);
      if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
      } else {
        record.count++;
      }
      
      if (record.count > limit) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
      }
    }
    
    return handler(req);
  };
}