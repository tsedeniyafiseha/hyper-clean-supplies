import { sanitizeInput, sanitizeObject, emailSchema, passwordSchema } from '@/lib/validation';

describe('Validation Utils', () => {
  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      expect(sanitizeInput(input)).toBe('alertxssHello');
    });

    it('removes dangerous characters', () => {
      const input = 'Hello<>"\' World';
      expect(sanitizeInput(input)).toBe('Hello World');
    });

    it('trims whitespace', () => {
      const input = '  Hello World  ';
      expect(sanitizeInput(input)).toBe('Hello World');
    });

    it('handles empty strings', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });

  describe('sanitizeObject', () => {
    it('sanitizes string values in object', () => {
      const obj = {
        name: '<script>alert("xss")</script>John',
        email: 'test@example.com',
      };
      const result = sanitizeObject(obj);
      expect(result.name).toBe('alertxssJohn');
      expect(result.email).toBe('test@example.com');
    });

    it('handles nested objects', () => {
      const obj = {
        user: {
          name: '<b>John</b>',
        },
      };
      const result = sanitizeObject(obj);
      expect(result.user.name).toBe('John');
    });

    it('preserves non-string values', () => {
      const obj = {
        name: 'John',
        age: 30,
        active: true,
      };
      const result = sanitizeObject(obj);
      expect(result.age).toBe(30);
      expect(result.active).toBe(true);
    });
  });

  describe('emailSchema', () => {
    it('validates correct email', () => {
      expect(() => emailSchema.parse('test@example.com')).not.toThrow();
    });

    it('rejects invalid email', () => {
      expect(() => emailSchema.parse('invalid-email')).toThrow();
    });
  });

  describe('passwordSchema', () => {
    it('validates strong password', () => {
      expect(() => passwordSchema.parse('Password123!')).not.toThrow();
    });

    it('rejects short password', () => {
      expect(() => passwordSchema.parse('Pass1!')).toThrow();
    });

    it('rejects password without uppercase', () => {
      expect(() => passwordSchema.parse('password123!')).toThrow();
    });

    it('rejects password without number', () => {
      expect(() => passwordSchema.parse('Password!')).toThrow();
    });

    it('rejects password without special character', () => {
      expect(() => passwordSchema.parse('Password123')).toThrow();
    });
  });
});
