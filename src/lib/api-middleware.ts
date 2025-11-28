import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { rateLimit } from './rate-limit';
import { errorResponse, unauthorizedResponse, forbiddenResponse, tooManyRequestsResponse } from './api-response';
import { logger } from './logger';

export async function withAuth(handler: (req: NextRequest, session: any) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return unauthorizedResponse();
      }
      return handler(req, session);
    } catch (error) {
      logger.error('Auth middleware error', error as Error);
      return errorResponse('Internal server error', 500);
    }
  };
}

export async function withAdmin(handler: (req: NextRequest, session: any) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session || session.user?.email !== process.env.ADMIN_EMAIL) {
        return forbiddenResponse();
      }
      return handler(req, session);
    } catch (error) {
      logger.error('Admin middleware error', error as Error);
      return errorResponse('Internal server error', 500);
    }
  };
}

export async function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000
) {
  return async (req: NextRequest) => {
    try {
      const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
      const key = `rate-limit:${ip}`;
      const result = await rateLimit(key, limit, windowMs);

      if (!result.success) {
        return tooManyRequestsResponse(Math.ceil((result.resetTime - Date.now()) / 1000));
      }

      const response = await handler(req);
      response.headers.set('X-RateLimit-Limit', limit.toString());
      response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
      response.headers.set('X-RateLimit-Reset', result.resetTime.toString());
      return response;
    } catch (error) {
      logger.error('Rate limit middleware error', error as Error);
      return errorResponse('Internal server error', 500);
    }
  };
}

export async function withValidation(
  handler: (req: NextRequest, data: any) => Promise<NextResponse>,
  schema: any
) {
  return async (req: NextRequest) => {
    try {
      const body = await req.json();
      const result = schema.safeParse(body);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return NextResponse.json(
          { success: false, error: 'Validation failed', errors },
          { status: 422 }
        );
      }

      return handler(req, result.data);
    } catch (error) {
      logger.error('Validation middleware error', error as Error);
      return errorResponse('Invalid request body', 400);
    }
  };
}

export function withErrorHandling(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      logger.error('API route error', error as Error);
      return errorResponse('Internal server error', 500);
    }
  };
}
