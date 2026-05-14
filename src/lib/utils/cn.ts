// ============================================================
// FANTASY REALM — CLASS NAME UTILITY
// Menggabungkan class names dengan aman
// Menghindari class yang undefined/null/false
// ============================================================

/**
 * Gabungkan beberapa class name menjadi satu string
 * Filter otomatis yang falsy (null, undefined, false, '')
 *
 * Contoh: cn('glass', isActive && 'glow-primary', className)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
