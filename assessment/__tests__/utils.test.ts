import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  describe('cn (classNames utility)', () => {
    it('merges class names correctly', () => {
      const result = cn('px-4', 'py-2');
      expect(result).toBe('px-4 py-2');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const result = cn('btn', isActive && 'active');
      expect(result).toContain('btn');
      expect(result).toContain('active');
    });

    it('removes false/null/undefined values', () => {
      const result = cn('btn', false && 'hidden', null, undefined, 'primary');
      expect(result).toBe('btn primary');
    });

    it('handles Tailwind class conflicts', () => {
      // The cn utility should merge Tailwind classes properly
      const result = cn('px-2 py-1', 'px-4');
      // Should keep the last px value (px-4)
      expect(result).toContain('px-4');
      expect(result).toContain('py-1');
    });

    it('works with arrays', () => {
      const result = cn(['px-4', 'py-2'], 'text-center');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('text-center');
    });

    it('handles objects with boolean values', () => {
      const result = cn({
        'bg-blue-500': true,
        'bg-red-500': false,
        'text-white': true,
      });
      expect(result).toContain('bg-blue-500');
      expect(result).not.toContain('bg-red-500');
      expect(result).toContain('text-white');
    });

    it('returns empty string for no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('handles complex combinations', () => {
      const isError = false;
      const isSuccess = true;
      const result = cn(
        'btn',
        'px-4 py-2',
        isError && 'text-red-500',
        isSuccess && 'text-green-500',
        { 'font-bold': true, 'underline': false }
      );
      
      expect(result).toContain('btn');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).not.toContain('text-red-500');
      expect(result).toContain('text-green-500');
      expect(result).toContain('font-bold');
      expect(result).not.toContain('underline');
    });
  });
});
