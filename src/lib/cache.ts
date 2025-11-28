import Redis from 'ioredis';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

export async function getCache<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key: string, value: any, ttl = 3600) {
  if (!redis) return;
  await redis.setex(key, ttl, JSON.stringify(value));
}

export async function deleteCache(key: string) {
  if (!redis) return;
  await redis.del(key);
}
