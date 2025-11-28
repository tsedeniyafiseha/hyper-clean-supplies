import { z } from 'zod';

export const sanitizeInput = (input: string): string => {
  // Remove HTML tags and dangerous characters
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"]/g, '')
    .trim();
};

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = {} as T;
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeInput(value) as T[keyof T];
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key as keyof T] = sanitizeObject(value) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  return sanitized;
};

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[0-9]/, 'Password must contain number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain special character');

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
});

export const signinSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password required'),
});

export const productSchema = z.object({
  title: z.string().min(3, 'Title required').max(200),
  description: z.string().max(5000).optional(),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().min(0),
  categoryId: z.number().int().optional(),
  imageUrl: z.string().url('Invalid image URL'),
  discountPercentage: z.number().min(0).max(100).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Name required').max(100),
  slug: z.string().min(2).max(100),
});

export const checkoutSchema = z.object({
  email: emailSchema,
  name: z.string().min(2),
  address: z.string().min(5),
  city: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
});
