import { cn, compareArrays } from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'active', false && 'inactive')).toBe('base active');
    });

    it('handles tailwind conflicts', () => {
      expect(cn('px-2', 'px-4')).toBe('px-4');
    });
  });

  describe('compareArrays', () => {
    it('returns true for identical arrays', () => {
      expect(compareArrays([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('returns false for different arrays', () => {
      expect(compareArrays([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('returns false for different lengths', () => {
      expect(compareArrays([1, 2], [1, 2, 3])).toBe(false);
    });

    it('handles empty arrays', () => {
      expect(compareArrays([], [])).toBe(true);
    });
  });
});
