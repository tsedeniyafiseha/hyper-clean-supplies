import Redis from 'ioredis';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;
const memoryStore = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(
  key: string,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000
): Promise<{ success: boolean; remaining: number; resetTime: number }> {
  const now = Date.now();

  if (redis) {
    const current = await redis.incr(key);
    if (current === 1) {
      await redis.expire(key, Math.ceil(windowMs / 1000));
    }
    const ttl = await redis.ttl(key);
    const resetTime = now + ttl * 1000;

    return {
      success: current <= limit,
      remaining: Math.max(0, limit - current),
      resetTime,
    };
  }

  // Fallback to memory store
  const record = memoryStore.get(key) || { count: 0, resetTime: now + windowMs };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count++;
  }

  memoryStore.set(key, record);

  return {
    success: record.count <= limit,
    remaining: Math.max(0, limit - record.count),
    resetTime: record.resetTime,
  };
}

export async function checkRateLimit(
  key: string,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000
): Promise<boolean> {
  const result = await rateLimit(key, limit, windowMs);
  return result.success;
}
